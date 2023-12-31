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

import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function LogOut() {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const logOut = async () => {
    localStorage.removeItem("user");
    return nav("/");
  };

  return (
    <>
      <Center
        display={"grid"}
        alignItems={"center"}
        justifyContent={"center"}
        h={"150px"}
      >
        <Button
          variant={"link"}
          display={"flex"}
          gap={"10px"}
          fontSize={"50px"}
          w={"100%"}
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              logOut();
            }, 2000);
          }}
        >
          <Icon as={BiLogOut} onClick={logOut} />
          Log Out
        </Button>
      </Center>
    </>
  );
}
