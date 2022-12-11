import { connectToDatabase } from "../../../lib/db";
import nc from "next-connect";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

export default nc()
  .get(async (req, res) => {
    console.log("GET ALL OFFERS");
    const id = req.query.id;
    const owner = req.query.owner;
    const offeredBy = req.query.offeredBy;
    const team = req.query.team;
    const task = req.query.task;

    const client = await connectToDatabase();

    const offersCollection = client.db().collection("offers");

    const query = {};
    if (id) {
      query._id = ObjectId(id);
    }
    if (owner) {
      query.owner = owner;
    }
    if (offeredBy) {
      query.teamOffers = offeredBy;
    }
    if (team) {
      query.team = team;
    }
    if (task) {
      query.task = task;
    }
    console.log("QUERY", query);
    const offers = await offersCollection.find(query).toArray();

    client.close();
    res.status(200).json(offers);
  })
  .post(async (req, res) => {
    console.log("Create offer");
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const email = session.user.email;

    const description = req.body.description;
    const price = req.body.price;
    const task = req.body.task;
    console.log("TASKKKK", task);

    const client = await connectToDatabase();

    const usersCollection = client.db().collection("users");
    const tasksCollection = client.db().collection("tasks");
    const teamsCollection = client.db().collection("teams");
    const offersCollection = client.db().collection("offers");

    const user = await usersCollection.findOne({ email });
    const teamId = user.team;
    const team = await teamsCollection.findOne({ _id: ObjectId(teamId) });

    if (team.owner.toString() !== user._id.toString()) {
      client.close();
      res.status(401).json({
        message: "You can't offer when you are not owner of the team!",
      });
      return;
    }

    console.log("test3");
    console.log("req body", req.body);
    const result = await offersCollection.insertOne({
      team: teamId,
      description,
      price,
      owner: user._id,
      task,
    });
    // const result1 = await tasksCollection.insertOne({
    //   team: user._id,
    //   description,
    //   price,
    //   task,
    // });
    client.close();
    res.status(200).json(result);
  });
