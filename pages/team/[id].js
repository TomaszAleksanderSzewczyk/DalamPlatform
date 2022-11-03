import { connectToDatabase } from "../../lib/db";
import nc from "next-connect";

export default nc()
  .get(async (req, res) => {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const id = req.query.id;

    const client = await connectToDatabase();

    const teamsCollection = client.db().collection("teams");

    const team = await teamsCollection.findOne({ id });

    if (!team) {
      res.status(404).json({ message: "Team not found." });
      client.close();
      return;
    }

    client.close();
    res.status(200).json(team);
  })
  .post(async (req, res) => {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const email = session.user.email;
    const name = req.body.name;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email });

    if (user.team) {
      res.status(400).json({ message: "User already has a team" });
      client.close();
      return;
    }

    const result = await db.collection("teams").insertOne({
      name,
      owner: email,
    });
    await usersCollection.updateOne(
      { email },
      {
        team: result._id,
      }
    );
    client.close();
    res.status(200).json(result);
  });
