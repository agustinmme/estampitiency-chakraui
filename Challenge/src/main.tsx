import React from "react";
import ReactDOM from "react-dom";
import {ChakraProvider} from "@chakra-ui/react";

import CartContext from "./context";
import App from "./App";

ReactDOM.render(
  <ChakraProvider>
    <CartContext>
      <App />
    </CartContext>
  </ChakraProvider>,
  document.getElementById("root"),
);
