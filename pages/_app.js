import { SessionProvider } from "next-auth/react";
import CustomizedSnackbars from "../components/snackbar/snackbar";
import SimpleBackdrop from "../components/backdrop/backdrop";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <CustomizedSnackbars>
        <SimpleBackdrop>
          <Component {...pageProps} />
        </SimpleBackdrop>
      </CustomizedSnackbars>
    </SessionProvider>
  );
}
