import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { LoadScript } from "@react-google-maps/api";
import { initializeApp } from "firebase/app";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import App from "./App";
import { firebaseConfig } from "./config/firebase";
import { gmapKey } from "./config/key";

initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <BrowserRouter>
        <ChakraProvider>
          <ColorModeScript initialColorMode="dark" />
          <LoadScript googleMapsApiKey={gmapKey}>
            <App />
          </LoadScript>
        </ChakraProvider>
      </BrowserRouter>
    </RecoilRoot>
  </React.StrictMode>
);
