import nc from "next-connect";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../../lib/db";

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

    const team = await teamsCollection.findOne({ _id: new ObjectId(id) });

    if (!team) {
      res.status(404).json({ message: "Team not found." });
      client.close();
      return;
    }

    client.close();
    res.status(200).json(team);
  })
  .patch(async (req, res) => {
    const session = await getSession({ req: req });

    if (!session) {
      res.status(401).json({ message: "Not authenticated!" });
      return;
    }

    const id = req.query.id;

    const email = session.user.email;
    const name = req.body.name;
    const description = req.body.description;
    const users = req.body.users;
    const avatar = req.body.avatar;
    const technologies = req.body.technologies;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection("users");
    const teamsCollection = client.db().collection("teams");

    const user = await usersCollection.findOne({ email });
    const update = {};
    
    if (name) {
      update.name = name;
    }
    if (description) {
      update.description = description;
    }
    if (avatar) {
      update.avatar = avatar;
    }

    if (technologies) {
      update.technologies = technologies;
    }


    
    console.log(update)

    if (users) {
      console.log("users");
      for (const user of users) {
        const userData = await usersCollection.findOne({ email: user });

        if (userData.team) {
          res
            .status(400)
            .json({ message: "User " + user + " already has a team!" });
          client.close();
          return;
        }
      }
      update.users = users;
    }

    const team = await teamsCollection.findOne({ name });

    // if name is being updated
    if (name) {
      if (team) {
        res
          .status(400)
          .json({ message: "Team with this name already exists!" });
        client.close();
        return;
      }
      update.name = name;
    }

    if (technologies) {
      console.log("technologies", technologies);
      update.technologies = technologies;
    }

    const result = await teamsCollection.updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          ...update,
        },
      }
    );
    client.close();
    res.status(200).json(result);
  })
  // todo add delete
  // check if user is owner

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
    const teamsCollection = client.db().collection("teams");

    const team = await teamsCollection.findOne({ _id: new ObjectId(id) });

    if (!team) {
      res.status(404).json({ message: "Team not found." });
      client.close();
      return;
    }

    if (team.owner.toString() !== user._id.toString()) {
      res.status(403).json({ message: "You are not the owner of this team." });
      client.close();
      return;
    }

    const result = await teamsCollection.deleteOne({ _id: new ObjectId(id) });

    const usersWithTeam = await usersCollection.find({
      team: ObjectId(id),
    }).toArray();

    console.log(usersWithTeam);
    for (const user of usersWithTeam) {
      console.log('test', user, user._id.toString());
      await usersCollection.updateOne(
        { _id: user._id },
        {
          $set: {
            team: null,
          },
        }
      );
    }

    // delete invitations
    // delete task assignements or inform users about team deletion
    // delete team

    client.close();
    res.status(200).json(true);
  });
