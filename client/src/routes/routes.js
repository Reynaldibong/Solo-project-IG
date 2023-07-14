import { Route } from "react-router-dom";
import Register from "../pages/register";
import ProtectedPage from "./protectedPage";
import LoginPage from "../pages/IgLoginPage";
import HomePage from "../pages/homePage";
import Profile from "../pages/profilePage";
import { LogOut } from "../components/Logout";
import ForgotPassword from "../pages/ForgotPassword";
import Verification from "../components/verif";
import EditProfile from "../components/EditProfile";
import Posting from "../components/post";
import VerifButton from "../components/VerifClick";
import NewPass from "../pages/NewPassword";
import PostByUser from "../pages/PostByU";

const routes = [
  <Route
    path="/"
    key={"loginPage"}
    element={
      <ProtectedPage guestOnly={true}>
        <LoginPage />
      </ProtectedPage>
    }
  />,
  <Route
    path="/register"
    element={
      <ProtectedPage guestOnly={true}>
        {" "}
        <Register />
      </ProtectedPage>
    }
  />,

  <Route
    path="/homepage"
    element={
      <ProtectedPage needLogin={true}>
        {" "}
        <HomePage />{" "}
      </ProtectedPage>
    }
  />,
  <Route
    path="/profile"
    element={
      <ProtectedPage needLogin={true}>
        <Profile />{" "}
      </ProtectedPage>
    }
  />,
  <Route
    path="/logout"
    element={
      <ProtectedPage needLogin={true}>
        <LogOut />
      </ProtectedPage>
    }
  />,
  <Route
    path="/forgotpassword"
    element={
      <ProtectedPage guestOnly={true}>
        <ForgotPassword />
      </ProtectedPage>
    }
  />,
  <Route
    path="/verification/:token"
    element={
      <ProtectedPage needLogin={true}>
        <Verification />{" "}
      </ProtectedPage>
    }
  />,
  <Route
    path="/editprofile"
    element={
      <ProtectedPage needLogin={true}>
        <EditProfile />{" "}
      </ProtectedPage>
    }
  />,
  <Route
    path="/postbyu/:id"
    element={
      <ProtectedPage needLogin={true}>
        <PostByUser />
      </ProtectedPage>
    }
  />,
  <Route
    path="/post"
    element={
      <ProtectedPage needLogin={true}>
        <Posting />{" "}
      </ProtectedPage>
    }
  />,
  <Route
    path="/verifbutton"
    element={
      <ProtectedPage needLogin={true}>
        <VerifButton />{" "}
      </ProtectedPage>
    }
  />,
  <Route
    path="/resetPassword/:token"
    element={
      <ProtectedPage guestOnly={true}>
        <NewPass />
      </ProtectedPage>
    }
  />,
];

export default routes;
