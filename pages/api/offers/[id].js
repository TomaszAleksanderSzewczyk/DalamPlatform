import nc from "next-connect";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

export default nc()
  .get(async (req, res) => {
    const id = req.query.id;

    const client = await connectToDatabase();

    const offersCollection = client.db().collection("offers");

    const offer = await offersCollection.findOne({ _id: new ObjectId(id) });

    if (!offer) {
      res.status(404).json({ message: "offer not found." });
      client.close();
      return;
    }

    client.close();
    res.status(200).json(offer);
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
    const offersCollection = client.db().collection("offers");
    const offer = await offersCollection.findOne({ _id: ObjectId(id) });

    if (!offer) {
      res.status(404).json({ message: "offer not found!" });
      client.close();
      return;
    }

    const user = await usersCollection.findOne({ email: session.user.email });

    if (offer.owner.toString() !== user._id.toString()) {
      res.status(403).json({ message: "Not authorized!" });
      client.close();
      return;
    }
    

    const description = req.body.description;
    const price = req.body.price;

    const update = {};
    if (description) {
      update.description = description;
    }
    if (price) {
      update.price = price;
    }

    const result = await offersCollection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: update,
      }
    );

    client.close();
    res.status(200).json(result);
  })
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
    const offersCollection = client.db().collection("offers");

    const offer = await offersCollection.findOne({ _id: new ObjectId(id) });

    if (!offer) {
      res.status(404).json({ message: "offer not found." });
      client.close();
      return;
    }

    if (offer.owner.toString() !== user._id.toString()) {
      res.status(403).json({ message: "You are not the owner of this offer." });
      client.close();
      return;
    }

    await offersCollection.deleteOne({ _id: new ObjectId(id) });
    
    client.close();
    res.status(200).json(true);
  });
