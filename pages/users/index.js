import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  CardActions,
  Button,
  Chip,
  Box,
  useMediaQuery,
} from "@mui/material";
import Link from "next/link";
import useUsers from "../../hooks/useUsers";

import styles from "../../styles/teams.module.css"; 

export default function Users() {
  const [users, setUsers] = useState([]);
  const { getAll } = useUsers();
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    async function fetchUsersData() {
      try {
        const data = await getAll();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users data:", error);
      }
    }

    fetchUsersData();
  }, []);

  return (
    <div className={styles.center}>
      <Grid container spacing={2}>
        {users?.map((user) => (
          <Grid item md={6} lg={4} sm={12} key={user._id}>
            <Card
              className={styles.card} 
              sx={{
                maxWidth: isMobile ? 300 : 700,
                background: "#F3F2EF",
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={
                  user.avatar ||
                  "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                }
                alt="User Avatar"
              />
              <CardContent sx={{ flex: 1 }}>
                <Typography gutterBottom variant="h5" component="div">
                  {!user.firstName || !user.lastName
                    ? `User ${user._id}`
                    : `${user.firstName} ${user.lastName}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.description}
                </Typography>
                <Box sx={{ mt: 1 }}>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {user?.technologies?.map((item) => (
                      <Chip
                        key={item}
                        sx={{
                          marginRight: 1,
                          marginBottom: 1,
                          fontSize: isMobile ? 12 : 14,
                          textAlign: "center", // Wyśrodkuj tekst wewnątrz Chip
                        }}
                        color="primary"
                        label={item}
                      />
                    ))}
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}