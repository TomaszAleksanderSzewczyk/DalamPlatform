import { connectToDatabase } from "../../../lib/db";
import nc from "next-connect";
import { getSession } from "next-auth/react";

export default nc().get(async (req, res) => {
  const session = await getSession({ req: req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const id = req.query.id;

  const client = await connectToDatabase();

  const teamsCollection = client.db().collection("teams");

  const team = await teamsCollection.findOne({ _id: new ObjectId(id) });

  if (!team) {
    res.status(404).json({ message: "Team not found." });
    client.close();
    return;
  }

  client.close();
  res.status(200).json(team);
});
