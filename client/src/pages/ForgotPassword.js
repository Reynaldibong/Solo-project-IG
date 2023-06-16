import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ForgotPass } from "../components/ForgotPassword";
export default function ForgotPassword() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
  };

  return (
    <>
      <ForgotPass />
    </>
  );
}
