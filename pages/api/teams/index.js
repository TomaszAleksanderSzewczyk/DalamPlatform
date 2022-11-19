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

    const id = req.query.id;

    const client = await connectToDatabase();

    const teamsCollection = client.db().collection("teams");

    const teams = await teamsCollection.find().toArray();

    client.close();
    res.status(200).json(teams);
  })
  .post(async (req, res) => {
    console.log("TEST");
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const email = session.user.email;
    const name = req.body.name;
    const description = req.body.description;
    console.log("name:", name);
    console.log("description", description);
    const client = await connectToDatabase();
    // console.log(client);

    console.log("test");
    const usersCollection = client.db().collection("users");
    const teamsCollection = client.db().collection("teams");
    console.log("test2");

    const user = await usersCollection.findOne({ email });

    if (user.team) {
      res.status(400).json({ message: "User already has a team!" });
      client.close();
      return;
    }

    const team = await teamsCollection.findOne({ name });

    if (user.team) {
      res.status(400).json({ message: "Team with this name already exists!" });
      client.close();
      return;
    }
    console.log("test3");
    console.log("req body", req.body);
    const result = await teamsCollection.insertOne({
      name: name,
      owner: user._id,
      description: description,
    });
    console.log("test4");

    console.log(result);
    await usersCollection.updateOne(
      { email },
      {
        $set: {
          team: result.insertedId,
        },
      }
    );
    console.log("test5");
    client.close();
    res.status(200).json(result);
  });
