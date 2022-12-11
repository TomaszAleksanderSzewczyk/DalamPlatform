import nc from "next-connect";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

export default nc().post(async (req, res) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const { type } = req.body; // accept or decline

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");
  const invitationsCollection = client.db().collection("invitations");
  const teamsCollection = client.db().collection("teams");

  const { _id } = usersCollection.findOne({ email: session.user.email });

  const invitation = await invitationsCollection.findOne({
    _id: ObjectId(req.query.id),
    email: session.user.email,
  });

  if (!invitation) {
    res.status(404).json({ message: "Invitation not found." });
    client.close();
    return;
  }

  if (type === "reject") {
    await invitationsCollection.deleteOne({
      _id: ObjectId(req.query.id),
    });
    client.close();
    res.status(200).json({ message: "Invitation rejected." });
    return;
  }

  const team = await teamsCollection.findOne({
    _id: ObjectId(invitation.teamId),
  });

  team.users = [...(team.users || []), _id];

  await teamsCollection.updateOne({ _id: ObjectId(invitation.teamId) }, { $set: team });

  await invitationsCollection.deleteMany({ email: session.user.email });
  await usersCollection.updateOne(
    { email: session.user.email },
    {
      $set: {
        team: ObjectId(invitation.teamId),
      },
    }
  );
  client.close();
  res.status(201).json(invitation);
});
