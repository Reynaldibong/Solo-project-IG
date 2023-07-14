import { useSelector } from "react-redux";
import Home from "../components/HomePages";
import VerifClick from "../components/VerifClick";
import NavbarHome from "../components/navbarHome";
import Footer from "../components/footer";
import { Center, Box } from "@chakra-ui/react";

export default function HomePage() {
  const userSelector = useSelector((state) => state.auth);

  return (
    <>
      {userSelector.status == "unverified" ? <VerifClick /> : null}
      <NavbarHome />
      <Home />
      <Footer />
    </>
  );
}
