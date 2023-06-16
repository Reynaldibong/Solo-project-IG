import { Route } from "react-router-dom";
import ProtectedPage from "./protectedPage";
import LoginPage from "../pages/IgLoginPage";
import RegisterNumber from "../pages/registernumber";
import RegisterEmail from "../pages/registeremail";
import HomePage from "../pages/homePage";
import Profile from "../pages/profilePage";
import { LogOut } from "../components/Logout";
import ForgotPassword from "../pages/ForgotPassword";
const routes = [
  <Route
    path="/login"
    key={"loginPage"}
    element={
      <ProtectedPage>
        <LoginPage />
      </ProtectedPage>
    }
  />,
  <Route path="/registernumber" element={<RegisterNumber />} />,
  <Route path="/registeremail" element={<RegisterEmail />} />,
  <Route path="/homepage" element={<HomePage />} />,
  <Route path="/profile" element={<Profile />} />,
  <Route path="/logout" element={<LogOut />} />,
  <Route path="/forget" element={<ForgotPassword />} />,
];

export default routes;
