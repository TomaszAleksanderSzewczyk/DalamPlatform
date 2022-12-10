import { getSession } from "next-auth/react";

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

function TeamPage(props) {
  const { userData } = useUserData();
  const { query } = useRouter();
  const { getOne, update } = useTaskData();
  const { getAll, getOne: getOffer } = useOffersData();
  const { data: task, refetch } = useQuery(["task", query.id], () => getOne(query.id));
  const { data: offer } = useQuery(["offer", task?.offer], () => getOffer(task?.offer), {
    enabled: !!task?.offer
  });
  const { data: offers } = useQuery(["offers", query.id], () =>
    getAll({
      task: query.id,
    })
  );
  const { mutate: accept } = useMutation(vars => update(vars.id, vars));

  const handleAccept = (offer) => {
    accept({
      id: query.id,
      isAccepted: true,
      team: offer.team,
      offer: offer._id,
    }, {
      onSettled: () => refetch()
    })
  };

  console.log(offers);

  return (
    <Container component='main' maxWidth='xs'>
      {task ? (
        <div>
          <div className='taskName'>{task?.name}</div>
          <hr />
          <div className='taskName'>{task?.description}</div>
          <hr />
          <div className='taskName'>{task?.salary}</div>
          <pre>
            {JSON.stringify(task, null, 2)}
          </pre>
        </div>
      ) : "Loading..."}
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
          <OfferPreview offer={offer} task={task} key={offer._id} onAccept={handleAccept} />
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
