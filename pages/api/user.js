import { connectToDatabase } from "../../lib/db";
import nc from "next-connect";

export default nc().get(async (req, res) => {
  const session = await getSession({ req: req });

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

  const result = await usersCollection.updateOne(
    { email },
    { $set: { ...req.body } }
  );

  client.close();
  res.status(200).json({ message: "Password updated!" });
});
