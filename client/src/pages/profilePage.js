import UserProfile from "../components/Profile";
import VerifClick from "../components/VerifClick";
import Footer from "../components/footer";
import Navbar2 from "../components/navbar2";
import { useSelector } from "react-redux";

export default function Profile() {
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      {userSelector.status == "unverified" ? <VerifClick /> : null}
      <Navbar2 />
      <UserProfile />
      <Footer />
    </>
  );
}
