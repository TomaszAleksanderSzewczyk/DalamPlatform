import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import JssProvider from "react-jss/lib/JssProvider";
import { createGenerateClassName } from "@material-ui/core/styles";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Navbar from "../../components/layout/Navbar";
import styles from "../../styles/teams.module.css";
import useTeamData from "../../hooks/useTeams";
import { Grid } from "@mui/material";
import Link from "next/link";
const faces = [
  "http://i.pravatar.cc/300?img=1",
  "http://i.pravatar.cc/300?img=2",
  "http://i.pravatar.cc/300?img=3",
  "http://i.pravatar.cc/300?img=4",
];

const muiBaseTheme = createTheme();

const generateClassName = createGenerateClassName({
  dangerouslyUseGlobalCSS: false,
});

const theme = {
  overrides: {
    MuiCard: {
      root: {
        "&.MuiEngagementCard--01": {
          transition: "0.3s",
          maxWidth: 300,
          margin: "auto",
          boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
          "&:hover": {
            boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
          },
          "& .MuiCardMedia-root": {
            paddingTop: "56.25%",
          },
          "& .MuiCardContent-root": {
            textAlign: "left",
            padding: muiBaseTheme.spacing.unit * 3,
          },
          "& .MuiDivider-root": {
            margin: `${muiBaseTheme.spacing.unit * 3}px 0`,
          },
          "& .MuiTypography--heading": {
            fontWeight: "bold",
          },
          "& .MuiTypography--subheading": {
            lineHeight: 1.8,
          },
          "& .MuiAvatar-root": {
            display: "inline-block",
            border: "2px solid black",
            "&:not(:first-of-type)": {
              marginLeft: -muiBaseTheme.spacing.unit,
            },
          },
        },
      },
    },
  },
};

export default function Teams() {
  const [teamsData, setTeamsData] = useState();
  useEffect(() => {
    getAll().then((data) => setTeamsData(data));
  }, []);
  const { getAll } = useTeamData();

  console.log(teamsData);

  return (
    <>
      <Navbar></Navbar>

      <JssProvider generateClassName={generateClassName}>
        <ThemeProvider theme={createTheme(theme)}>
          <Grid container spacing={1}>
            <Grid item md={3}></Grid>

            {teamsData?.map((team) => {
              return (
                <Grid item md={3}>
                  <Link href={`/teams/${team._id}`}>
                    <Card className={"MuiEngagementCard--01"}>
                      <CardMedia
                        image={
                          "https://image.freepik.com/free-photo/river-foggy-mountains-landscape_1204-511.jpg"
                        }
                      />
                      <CardContent>
                        <Typography
                          className={"MuiTypography--heading"}
                          variant={"h6"}
                          gutterBottom
                        >
                          {team.name}
                        </Typography>
                        <Typography
                          className={"MuiTypography--subheading"}
                          variant={"caption"}
                        >
                          {team.description}
                        </Typography>
                        <Divider light />
                        {faces.map((face) => (
                          <Avatar key={face} src={face} />
                        ))}
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </ThemeProvider>
      </JssProvider>
    </>
  );
}
