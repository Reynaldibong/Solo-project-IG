import {
  Box,
  Flex,
  Center,
  Grid,
  Image,
  Input,
  Button,
  useToast,
  Icon,
} from "@chakra-ui/react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import back from "../assets/v960-ning-29.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import { api } from "../api/api";

export function LogOut() {
  const nav = useNavigate();

  const logOut = async () => {
    localStorage.removeItem("user");
    return nav("/login");
  };

  return (
    <>
      <Center
        display={"grid"}
        alignItems={"center"}
        justifyContent={"center"}
        h={"300px"}
      >
        <Link to={"/login"}>
          <Button
            variant={"link"}
            display={"flex"}
            gap={"10px"}
            fontSize={"80px"}
            w={"100%"}
            onClick={logOut}
          >
            <Icon as={BiLogOut} onClick={logOut} />
            Log Out
          </Button>
        </Link>
      </Center>
    </>
  );
}
