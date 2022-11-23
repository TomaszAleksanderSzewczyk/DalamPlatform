import { connectToDatabase } from "../../lib/db";
import nc from "next-connect";
import { getSession } from "next-auth/react";
//getting all users

export const mapUsers = ({ _id, email, firstName, lastName }) => ({
  _id,
  email,
  firstName,
  lastName,
});

export default nc().get(async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Not authenticated!" });
    return;
  }

  const client = await connectToDatabase();

  const usersCollection = Array.from(
    await client.db().collection("users").find().toArray()
  ).map(mapUsers);

  if (!usersCollection) {
    res.status(404).json({ message: "Users not found." });
    client.close();
    return;
  }

  client.close();
  res.status(200).json(usersCollection);
});
