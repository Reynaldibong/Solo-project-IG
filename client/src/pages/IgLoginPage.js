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
import ig from "../assets/instagram.png";
import fb from "../assets/meta-logo-0.png";
import back from "../assets/v960-ning-29.jpg";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { api } from "../api/api";

export default function LoginPage() {
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
    console.log(tempUser);
  };

  const login = async () => {
    let token;

    if (!user.email || !user.password) {
      toast({
        title: "please, fill all data field",
        status: "warning",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      await api
        .post("/users/login", user)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data.token));
          token = res.data.token;
          // console.log(token);
        })
        .catch((err) =>
          toast({
            title: "incorrect email/password",
            status: "error",
            position: "top",
            duration: 1000,
            isClosable: true,
          })
        );

      await api
        .get("/users/token", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          dispatch({
            type: "login",
            payload: res.data,
          });
          console.log(token);
          if (res.data.message == "succesfully login") {
            toast({
              title: "success login",
              status: "success",
              position: "top",
              duration: 1000,
              isClosable: true,
            });
            return nav("/homepage");
          }
        })
        .catch((err) => console.log(err.message));
    }
  };

  return (
    <>
      <Center>
        <Box w={"414px"} h={"896px"} bgImg={back} py={"15px"}>
          <Grid px={"10px"} h={"70%"}>
            <Box>
              <Box textAlign={"center"}>English (US)</Box>
              <Box h={"10%"}></Box>
              <Center h={"40%"}>
                <Image src={ig} w={"50px"} />
              </Center>

              <Box borderRadius={"15px"} display={"grid"} gap={"10px"}>
                <Input
                  bgColor={"white"}
                  h={"50px"}
                  id="email"
                  placeholder="Username, email or mobile number"
                  onChange={inputHandler}
                />

                <Input
                  bgColor={"white"}
                  h={"50px"}
                  id="password"
                  placeholder="Password"
                  type="password"
                  onChange={inputHandler}
                />
                <Grid gap={"10px"}>
                  <Button
                    bgColor={"#0064e0"}
                    color={"white"}
                    borderRadius={"20px"}
                    onClick={login}
                  >
                    Login
                  </Button>
                  <Button
                    variant={"ghost"}
                    color={"#1d2b34"}
                    borderRadius={"20px"}
                  >
                    Forgot Password?
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Grid>

          <Box h={"20%"}></Box>

          <Box display={"grid"} h={"10%"} justifyItems={"center"}>
            <Link to="/registernumber">
              <Button
                variant={"ghost"}
                color={"#0064e0"}
                fontSize={"15px"}
                border={"1px"}
                borderRadius={"20px"}
                w={"95%"}
              >
                Create new account
              </Button>
            </Link>

            <Center>
              <Image src={fb} w={"90px"} h={"100%"} />
            </Center>
          </Box>
        </Box>
      </Center>
    </>
  );
}
