import nc from "next-connect";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

export default nc()
  .get(async (req, res) => {
    const id = req.query.id;

    const client = await connectToDatabase();

    const tasksCollection = client.db().collection("tasks");

    console.log(id);
    const task = await tasksCollection.findOne({ _id: ObjectId(id) });

    if (!task) {
      res.status(404).json({ message: "task not found." });
      client.close();
      return;
    }

    client.close();
    res.status(200).json(task);
  })
  .patch(async (req, res) => {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const id = req.query.id;

    const client = await connectToDatabase();
    const usersCollection = client.db().collection("users");
    const tasksCollection = client.db().collection("tasks");
    const task = await tasksCollection.findOne({ _id: ObjectId(id) });

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
      client.close();
      return;
    }

    const user = await usersCollection.findOne({ email: session.user.email });

    if (task.owner.toString() !== user._id.toString()) {
      res.status(403).json({ message: "Not authorized!" });
      client.close();
      return;
    }
    

    const name = req.body.name;
    const description = req.body.description;
    const selectedTeam = req.body.team;
    const isCompleted = req.body.isCompleted;

    const update = {};
    if (name) {
      update.name = name;
    }
    if (description) {
      update.description = description;
    }
    if (selectedTeam) {
      update.team = selectedTeam;
    }
    if (isCompleted) {
      update.isCompleted = isCompleted;
    }

    console.log(id, update, req.body)

    const result = await tasksCollection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: update,
      }
    );

    client.close();
    res.status(200).json(result);
  })
  // note do not delete offers and display task was removed instead
  .delete(async (req, res) => {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const id = req.query.id;

    const email = session.user.email;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email });
    const tasksCollection = client.db().collection("tasks");

    const task = await tasksCollection.findOne({ _id: new ObjectId(id) });

    if (!task) {
      res.status(404).json({ message: "task not found." });
      client.close();
      return;
    }

    if (task.owner.toString() !== user._id.toString()) {
      res.status(403).json({ message: "You are not the owner of this task." });
      client.close();
      return;
    }

    await tasksCollection.deleteOne({ _id: new ObjectId(id) });

    client.close();
    res.status(200).json(true);
  });
