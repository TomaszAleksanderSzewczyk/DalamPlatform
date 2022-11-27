import { connectToDatabase } from "../../../../lib/db";
import nc from "next-connect";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

// todo check if user is owner of the requested team

// get All for team
export default nc()
  .get(async (req, res) => {
    const session = await getSession({ req: req });
    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const id = req.query.id;

    const client = await connectToDatabase();

    const invitationsCollection = client.db().collection("invitations");
    const usersCollection = client.db().collection("users");

    // check if requesting user is part of the team
    const user = await usersCollection.findOne({
      email: session.user.email,
      team: ObjectId(id),
    })

    if (!user) {
      res.status(401).json({ message: "Not authorized!" });
      client.close();
      return;
    }

    const invitations = await invitationsCollection
      .find({ teamId: id })
      .toArray();

    client.close();
    res.status(200).json(invitations);
  })