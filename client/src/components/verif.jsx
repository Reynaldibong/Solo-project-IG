import {
  Box,
  Flex,
  Center,
  Image,
  Button,
  useToast,
  Text,
} from "@chakra-ui/react";
import email from "../assets/email.png";

import { useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Verification() {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState();
  const [token, setToken] = useState();
  const toast = useToast();

  useEffect(() => {
    const tokenUrl = location.pathname.split("/")[2];
    verif(tokenUrl);
    setToken(tokenUrl);
  }, []);

  const verif = async (token) => {
    try {
      await api
        .get("/users/token/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data);
          console.log(res.data);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  const Patch = async () => {
    await api
      .patch("/users/verifyupdate", user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        toast({
          title: res.data.message,
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
        nav("/homepage");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Center>
        <Box
          w={"414px"}
          h={"896px"}
          px={"25px"}
          display={"grid"}
          alignItems={"center"}
          textAlign={"center"}
          border={"1px solid #dbdbdb"}
        >
          <Box
            fontSize={"13px"}
            display={"grid"}
            gap={"15px"}
            border={"3px dashed #dbdbdb"}
            py={"10px"}
          >
            <Box display={"flex"} justifyContent={"center"}>
              <Image src={email} w={"120px"} />
            </Box>

            <Text fontSize={"25px"} fontWeight={"medium"}>
              Verify your email
            </Text>

            <Text px={"40px"}>
              Click on button below to verify your email to your instagram
              account.
            </Text>

            <Box>
              <Button
                w={"50%"}
                h={"30px"}
                bgColor={"#4cb5f9"}
                color={"#ffffff"}
                isLoading={isLoading}
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    Patch();
                  }, 2000);
                }}
              >
                Verify
              </Button>
            </Box>

            <Box>
              <Flex gap={"5px"} justifyContent={"center"}>
                <Link to={"/verification"}>
                  <Text color={"blue.400"}> Click here </Text>
                </Link>
                if you didn't receive an email verification link.
              </Flex>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
