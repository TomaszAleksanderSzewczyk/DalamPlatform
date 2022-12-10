import useUserData from "../../hooks/useUser";

const OfferPreview = ({ offer, task, onAccept }) => {
  const { userData } = useUserData();
    if (!offer) {
        return null;
    }

    if (!task) {
        return null;
    }

    return (
        <div key={offer._id}>
            <div>Price: {offer.price}</div>
            <div>Description: {offer.description}</div>
            {task.offer === offer._id && <div>Accepted</div>}
          <pre>
            {JSON.stringify(offer, null, 2)}
          </pre>
            {!task.team && task.owner === userData._id && (
              <button onClick={() => onAccept(offer)}>Accept</button>
            )}
            {offer.owner === userData._id && offer && !task.team && <OfferForm {...offer} />}
            <hr />
        </div>
    )
}

export default OfferPreview;
