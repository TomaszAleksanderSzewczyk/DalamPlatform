import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Grid,
  CardActions,
} from "@mui/material";

import styles from "../../styles/teams.module.css";

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
    <div className={styles.center}>
      <Grid container spacing={1}>
        {teamsData?.map((team) => {
          return (
            <Grid item md={6} lg={6} sm={12} key={team._id}>
              <Card
                sx={{
                  maxHeight: 400,
                  background: "#F3F2EF",
                }}
              >
                <CardMedia
                  component='img'
                  height='160'
                  image={
                    team?.avatar
                      ? team?.avatar
                      : "https://www.evolvetraining.com/wp-content/uploads/2016/05/Team-Placeholder.jpg"
                  }
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
                <CardActions sx>
                  <Link href={`/teams/${team._id}`}>
                    <Button size='small'>Profile</Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
