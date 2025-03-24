import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import Dashboard from "@/components/Notifications";


export default function App({ Component, pageProps:{ session, ...pageProps } }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <SessionProvider session={{session}}>
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
}
