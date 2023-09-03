import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Container,
} from "@mui/material";

import useTeamData from "../../hooks/useTeams";
import Link from "next/link";

import styles from "../../styles/Teams.module.css";

export default function Teams() {
  const [teamsData, setTeamsData] = useState([]);
  const { getAll } = useTeamData();

  useEffect(() => {
    async function fetchTeamsData() {
      try {
        const data = await getAll();
        setTeamsData(data);
      } catch (error) {
        console.error("Error fetching teams data:", error);
      }
    }

    fetchTeamsData();
  }, []);

  return (
    <Container className={styles.container}>
      <Grid container spacing={3}>
        {teamsData.map((team) => (
          <Grid item xs={12} sm={6} md={4} key={team._id}>
            <Link href={`/teams/${team._id}`} passHref>
              <Card className={styles.card}>
                <CardMedia
                  component="img"
                  height="160"
                  image={
                    team?.avatar ||
                    "https://www.evolvetraining.com/wp-content/uploads/2016/05/Team-Placeholder.jpg"
                  }
                  alt="Team Avatar"
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {team.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {team.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}