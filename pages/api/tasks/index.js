import { connectToDatabase } from "../../../lib/db";
import nc from "next-connect";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

export default nc()
  .get(async (req, res) => {
    const id = req.query.id;
    const owner = req.query.owner;
    const team = req.query.team;
    console.log("pobieraj wszystkie");
    const client = await connectToDatabase();

    const tasksCollection = client.db().collection("tasks");

    const query = {};
    if (id) {
      query._id = ObjectId(id);
    }

    if (owner) {
      query.owner = ObjectId(owner);
    }

    if (team) {
      query.team = team;
    }

    console.log(query);
    const teams = await tasksCollection.find(query).toArray();

    client.close();
    console.log(teams);
    res.status(200).json(teams);
  })
  .post(async (req, res) => {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }
    const client = await connectToDatabase();

    const email = session.user.email;
    const name = req.body.name;
    console.log(name);

    const description = req.body.description;
    const salary = req.body.salary;
    const deadline = req.body.deadline;
    console.log(description);
    console.log("name:", name);
    console.log("salary", salary);
    console.log("description", description);
    console.log("deadline", deadline);
    // console.log(client);

    const usersCollection = client.db().collection("users");
    const tasksCollection = client.db().collection("tasks");

    const user = await usersCollection.findOne({ email });

    console.log("test3");
    console.log("req body", req.body);
    const result = await tasksCollection.insertOne({
      name: name,
      owner: user._id,
      description: description,
      salary: salary,
      deadline: deadline,
      team: null,
      isCompleted: false,
    });

    client.close();
    res.status(200).json(result);
  });
