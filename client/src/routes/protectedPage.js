import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ProtectedPage({ children }) {
  const userSelector = useSelector((state) => state.auth);
  const nav = useNavigate();
  const token = JSON.parse(localStorage.getItem("user"));
  // console.log(userSelector);
  console.log(token);
  useEffect(() => {
    if (token) {
      return nav("/homepage");
    } else {
      return nav("/");
    }
  }, [userSelector]);

  return children;
}
