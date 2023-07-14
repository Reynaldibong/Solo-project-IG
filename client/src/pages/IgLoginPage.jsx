import {
  Box,
  Center,
  Grid,
  Image,
  Input,
  Button,
  useToast,
  InputGroup,
  Icon,
  InputRightElement,
} from "@chakra-ui/react";
import ig from "../assets/instagram.png";
import fb from "../assets/meta-logo-0.png";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { api } from "../api/api";

export default function LoginPage() {
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);

  const nav = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [user, setUser] = useState({
    emailOrUsername: "",
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

    if (!user.emailOrUsername || !user.password) {
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
        })
        .catch((err) =>
          toast({
            title: err.response.data,
            status: "error",
            position: "top",
            duration: 3000,
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
            payload: res.data.user,
          });
          toast({
            title: res.data.message,
            status: "success",
            position: "top",
            duration: 3000,
            isClosable: true,
          });
          return nav("/homepage");
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const load = () => {
    nav("/register");
  };
  return (
    <>
      <Center>
        <Box
          w={"414px"}
          h={"896px"}
          py={"15px"}
          border={"1px solid #e2e2e2"}
          // p={"10px"}
        >
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
                  id="emailOrUsername"
                  placeholder="Username, email or mobile number"
                  onChange={inputHandler}
                />
                <InputGroup>
                  <Input
                    bgColor={"white"}
                    h={"50px"}
                    id="password"
                    placeholder="Password"
                    type={seePassword ? "text" : "password"}
                    onChange={inputHandler}
                  />
                  <InputRightElement h={"100%"} px={"30px"}>
                    <Icon
                      as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
                      boxSize={"25px"}
                      color={"#a5a5a5"}
                      cursor={"pointer"}
                      onClick={() => setSeePassword(!seePassword)}
                    />
                  </InputRightElement>
                </InputGroup>
                <Grid gap={"15px"} py={"20px"}>
                  <Button
                    bgColor={"#0064e0"}
                    color={"white"}
                    borderRadius={"20px"}
                    isLoading={isLoading}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        login();
                      }, 2000);
                    }}
                  >
                    Login
                  </Button>

                  <Button
                    variant={"link"}
                    color={"#1d2b34"}
                    borderRadius={"20px"}
                  >
                    <Link to={"/forgotpassword"}>Forgot Password?</Link>
                  </Button>
                </Grid>
              </Box>
            </Box>
          </Grid>

          <Box h={"20%"}></Box>

          <Box display={"grid"} h={"10%"} justifyItems={"center"}>
            <Box w={"95%"}>
              {/* <Link to="/register"> */}
              <Button
                variant={"ghost"}
                color={"#0064e0"}
                fontSize={"15px"}
                border={"1px"}
                borderRadius={"20px"}
                w={"100%"}
                isLoading={isLoading1}
                onClick={() => {
                  setIsLoading1(true);
                  setTimeout(() => {
                    setIsLoading1(false);
                    load();
                  }, 1000);
                }}
              >
                Create new account
              </Button>
              {/* </Link> */}
            </Box>

            <Center>
              <Image src={fb} w={"90px"} h={"100%"} />
            </Center>
          </Box>
        </Box>
      </Center>
    </>
  );
}
