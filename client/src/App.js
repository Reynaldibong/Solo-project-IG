import { useEffect, useState } from "react";
import { Routes } from "react-router-dom";
import routes from "./routes/routes";
import { Box } from "@chakra-ui/react";
// import Loading from "./components/loading";

function App() {
  return <>{<Routes>{routes.map((val) => val)}</Routes>}</>;
}

export default App;
