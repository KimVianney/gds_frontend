import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Popups from "../components/Popups";
import { persistor, store } from "../state";
import "../styles/globals.css";
import theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Component {...pageProps} />
          <Popups />
        </PersistGate>
      </ReduxProvider>
    </ChakraProvider>
  );
}
export default MyApp;
