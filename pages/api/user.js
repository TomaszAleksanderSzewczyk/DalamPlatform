import { connectToDatabase } from "../../lib/db";
import nc from "next-connect";
import { getSession } from "next-auth/react";

export default nc()
  .get(async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const email = session.user.email;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }

    delete user.password;

    client.close();
    res.status(200).json(user);
  })
  .patch(async (req, res) => {
    const session = await getSession({ req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const email = session.user.email;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection("users");

    const user = await usersCollection.findOne({ email });

    if (!user) {
      res.status(404).json({ message: "User not found." });
      client.close();
      return;
    }
    console.log(req.body);

    const result = await usersCollection.updateOne(
      { email },
      { $set: { ...JSON.parse(req.body) } }
    );

    client.close();
    res.status(200).json({ message: "Data updated!" });
  });
