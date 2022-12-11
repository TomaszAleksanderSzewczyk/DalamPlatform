import Link from "next/link";
import useUserData from "../../hooks/useUser";
import OfferForm from "./OfferForm";
import styles from "../../styles/tasks.module.css";
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
      <div>
        <strong>Price:</strong> {offer.price}
      </div>

      <div>
        <strong>Description:</strong> {offer.description}
      </div>
      <Link href={`/users/${offer?.owner}`}>
        <div
          style={{ cursor: "pointer", fontWeight: "bold" }}
          className={styles.links}
        >
          {" "}
          TEAM CEO
        </div>
      </Link>
      <Link href={`/teams/${offer?.team}`}>
        <div
          style={{ cursor: "pointer", fontWeight: "bold" }}
          className={styles.links}
        >
          {" "}
          TEAM
        </div>
      </Link>
      {task.offer === offer._id && (
        <div>
          <strong>Status:</strong> Accepted
        </div>
      )}
      {!task.team && task.owner === userData._id && (
        <button onClick={() => onAccept(offer)}>Accept</button>
      )}
      {offer.owner === userData._id && offer && !task.team && (
        <OfferForm {...offer} />
      )}
      <hr />
    </div>
  );
};

export default OfferPreview;
