import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import Link from "next/link";
import useUsers from "../../hooks/useUsers";

export default function Teams() {
  const [users, setUsers] = useState();
  const { getAll } = useUsers();
  useEffect(() => {
    getAll().then((data) => setUsers(data));
  }, []);

  console.log(users, "test");

  return (
    <Grid container spacing={1}>
      {users?.map((user) => {
        return (
          <Grid item md={3} key={user._id}>
            <Card sx={{ maxWidth: 345, background: "#F3F2EF" }}>
              <CardMedia
                component='img'
                height='160'
                image={
                  user.avatar
                    ? user.avatar
                    : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                }
                alt='green iguana'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {!user.firstName || !user.lastName
                    ? `User ${user._id}`
                    : `${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {user.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={`/users/${user._id}`}>
                  <Button size='small'>Profile</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
