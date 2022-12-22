import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import App from "./App";
import { store } from "./app/store";
import {apiMiliSlice} from './features/appMiliQuery/apiSliceQuery'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider api={apiMiliSlice}>
      <Provider store={store}>
        <ChakraProvider >
          <App />
        </ChakraProvider>
      </Provider>
    </ApiProvider>
  </React.StrictMode>
);
