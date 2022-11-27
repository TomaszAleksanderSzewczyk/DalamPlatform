import { SessionProvider } from "next-auth/react";
import CustomizedSnackbars from "../components/snackbar/snackbar";
import SimpleBackdrop from "../components/backdrop/backdrop";
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { createTheme } from "@mui/material";
import Navbar from "../components/layout/Navbar";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

const muiBaseTheme = createTheme();

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


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={theme}>
          <SessionProvider session={session}>
            <CustomizedSnackbars>
              <SimpleBackdrop>
                <Navbar />
                <Component {...pageProps} />
              </SimpleBackdrop>
            </CustomizedSnackbars>
          </SessionProvider>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}
