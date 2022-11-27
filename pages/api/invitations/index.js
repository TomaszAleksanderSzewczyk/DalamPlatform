import { connectToDatabase } from "../../../lib/db";
import nc from "next-connect";
import { getSession } from "next-auth/react";

export default nc()
  .get(async (req, res) => {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const client = await connectToDatabase();

    const invitationsCollection = client.db().collection("invitations");

    const invitations = await invitationsCollection.find({
      email: session.user.email,
    }).toArray();

    client.close();
    res.status(200).json(invitations);
  })
  .post(async (req, res) => {
    // add invitation
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const client = await connectToDatabase();

    const invitationsCollection = client.db().collection("invitations");
    const usersCollection = client.db().collection("users");

    const { email, teamId } = req.body;
    
    // check if user exists
    const user = await usersCollection
      .findOne({ email: email });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }

    // check if team has already invited user
    const existing = await invitationsCollection
      .findOne({ email, teamId });

    if (existing) {
      res.status(409).json({ message: "User already invited." });
      client.close();
      return;
    }

    const invitation = await invitationsCollection.insertOne({
      email,
      teamId,
    });

    client.close();
    res.status(201).json(invitation);
  });