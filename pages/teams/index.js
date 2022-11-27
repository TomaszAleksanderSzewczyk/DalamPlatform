import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Button,
  Grid,
  CardActions,
} from "@mui/material";

import useTeamData from "../../hooks/useTeams";

import Link from "next/link";

export default function Teams() {
  const [teamsData, setTeamsData] = useState();
  useEffect(() => {
    getAll().then((data) => setTeamsData(data));
  }, []);
  const { getAll } = useTeamData();

  console.log(teamsData);

  return (
    <Grid container spacing={1}>
      <Grid item md={3}></Grid>

      {teamsData?.map((team) => {
        return (
          <Grid item md={3} key={team._id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component='img'
                height='160'
                image='https://images.panda.org/assets/images/pages/welcome/orangutan_1600x1000_279157.jpg'
                alt='green iguana'
              />
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {team.name}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                  {team.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link href={`/teams/${team._id}`}>
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
