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

function TeamPage(props) {
  const { userData } = useUserData();
  const { query } = useRouter();
  const { getOne, update } = useTaskData();
  const { getAll } = useOffersData();
  const { data: task } = useQuery(["task", query.id], () => getOne(query.id));
  const { data: offers } = useQuery(["offers", query.id], () =>
    getAll({
      task: query.id,
    })
  );
  const { mutate: accept } = useMutation(update);

  const handleAccept = (offer) => {
    accept(offer._id, {
      isAccepted: true,
      team: offer.team,
    });
  };

  return (
    <Container component='main' maxWidth='xs'>
      <div className='taskName'>{task?.name}</div>
      <hr />
      <div className='taskName'>{task?.description}</div>
      <hr />
      <div className='taskName'>{task?.salary}</div>
      <CssBaseline />
      <div>
        <h2>Offers</h2>
        {offers?.map((offer) => (
          <div key={offer._id}>
            <div>Price: {offer.price}</div>
            <div>Description: {offer.description}</div>
            {offer.isAccepted && <div>Accepted</div>}
            {!task?.team && task?.owner === userData?._id && (
              <button onClick={() => handleAccept(offer._id)}>Accept</button>
            )}
            {offer.owner === userData?._id && offer && <OfferForm {...offer} />}
            <hr />
          </div>
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
