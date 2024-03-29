import nc from "next-connect";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

export default nc().get(async (req, res) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const id = req.query.id;

  const client = await connectToDatabase();

  const usersCollection = client.db().collection("users");

  const user = await usersCollection.findOne({ _id: new ObjectId(id) });
  console.log("Test");
  if (!user) {
    res.status(404).json({ message: "Team not found." });
    client.close();
    return;
  }

  client.close();
  res.status(200).json(user);
});
