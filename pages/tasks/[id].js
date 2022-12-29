import { getSession } from "next-auth/react";
import styles from "../../styles/tasks.module.css";
import TeamProfile from "../../components/teamProfile/TeamProfile";
import { Navbar } from "../../components/layout/Navbar";
import { useRouter } from "next/router";
import TeamForm from "../../components/teamForm/TeamForm";
import { useMutation, useQuery } from "react-query";
import useTaskData from "../../hooks/useTasks";
import useOffersData from "../../hooks/useOffers";
import useUserData from "../../hooks/useUser";
import OfferForm from "../../components/offers/OfferForm";
import { Container, CssBaseline } from "@mui/material";
import TaskForm from "../../components/tasks/TaskForm";
import OfferPreview from "../../components/offers/OfferPreview";
import Link from "next/link";

function TeamPage(props) {
  const { userData } = useUserData();
  const { query } = useRouter();
  const { getOne, update } = useTaskData();
  const { getAll, getOne: getOffer } = useOffersData();
  const { data: task, refetch } = useQuery(["task", query.id], () =>
    getOne(query.id)
  );
  const { data: offer } = useQuery(
    ["offer", task?.offer],
    () => getOffer(task?.offer),
    {
      enabled: !!task?.offer,
    }
  );
  const { data: offers } = useQuery(["offers", query.id], () =>
    getAll({
      task: query.id,
    })
  );
  const { mutate: accept } = useMutation((vars) => update(vars.id, vars));

  const handleAccept = (offer) => {
    accept(
      {
        id: query.id,
        isAccepted: true,
        team: offer.team,
        offer: offer._id,
      },
      {
        onSettled: () => refetch(),
      }
    );
  };

  console.log(offers);
  console.log(task);
  return (
    <Container
      component='main'
      maxWidth='xs'
      sx={{ marginTop: 2, backgroundColor: "#F3F2EF" }}
    >
      {task ? (
        <div>
          <div className={styles.taskName}>{task?.name}</div>
          <hr />
          <div className={styles.description}>{task?.description}</div>
          <hr />
          <div className='taskName'> Salary: {task?.salary} $</div>
          <hr />
          <div className='taskName'>
            {" "}
            Estimated time: {task?.deadline} months{" "}
          </div>
          <hr />
          <Link href={`/users/${task?.owner}`}>
            <div
              style={{ cursor: "pointer", fontWeight: "bold" }}
              className={styles.links}
            >
              {" "}
              Owner
            </div>
          </Link>
          <hr />
          {task?.team && (
            <>
              <Link href={`/teams/${task?.team}`}>
                <div
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  className={styles.links}
                >
                  {" "}
                  Assigned Team
                </div>
              </Link>
              <hr />
            </>
          )}
          {task?.owner === userData?._id && (
            <>
              <div style={{ fontWeight: "bold" }} className='taskName'>
                {" "}
                Link to done task:{" "}
                {`${task?.link ? task?.link : "There is no solve task yet"}`}
              </div>
              <hr />
            </>
          )}
        </div>
      ) : (
        "Loading..."
      )}
      {offer && (
        <div>
          <h3>Accepted offer</h3>
          <OfferPreview offer={offer} task={task} />
        </div>
      )}
      <CssBaseline />
      <div>
        <h2>Offers</h2>
        {offers?.map((offer) => (
          <OfferPreview
            offer={offer}
            task={task}
            key={offer._id}
            onAccept={handleAccept}
          />
        ))}
      </div>
      {task?.owner === userData?._id && task && (
        <div>
          <TaskForm {...task} />
        </div>
      )}
      {task?.owner !== userData?._id && <OfferForm />}
    </Container>
  );
}

export default TeamPage;
