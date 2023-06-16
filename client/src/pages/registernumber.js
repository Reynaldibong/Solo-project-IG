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
import { api } from "../api/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { RegisterNum } from "../components/RegisterNum";

export default function RegisterNumber() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [user, setUser] = useState({
    email: "",
    password: "",
    fullname: "",
    username: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
  };
  const register = async () => {
    if (!user.email || !user.password) {
      toast({
        title: "fill in all data.",
        status: "warning",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      await api.post("/users/register", user).then((res) => {
        nav("/login");
      });
    }
  };

  return (
    <>
      <Center>
        <Box w={"414px"} h={"896px"} bgImg={back}>
          <Box h={"5%"}></Box>

          <Grid h={"45%"} px={"10px"} gap={"10px"}>
            <Box display={"flex"} alignItems={"center"}>
              <Link to={"/login"}>
                <Button variant={"ghost"} fontSize={"25px"} width={"5px"}>
                  <Icon as={HiOutlineArrowNarrowLeft} />
                </Button>
              </Link>
            </Box>

            <Box display={"grid"} px={"10px"} gap={"5px"}>
              <Box
                fontSize={"25px"}
                color={"#1d2b34"}
                fontWeight={"bold"}
                display={"flex"}
                textAlign={"center"}
              >
                Sign up to see photos and videos from your friends.
              </Box>
              <Box color={"#1d2b34"} fontSize={"15px"} h={"30px"}></Box>
              <Input
                placeholder="Phone or Email "
                height={"60px"}
                bgColor={"white"}
                borderRadius={"15px"}
                id="email"
                onChange={inputHandler}
              />{" "}
              <Input
                placeholder="Fullname"
                height={"60px"}
                bgColor={"white"}
                borderRadius={"15px"}
                id="fullname"
                onChange={inputHandler}
              />
              <Input
                placeholder="Username"
                height={"60px"}
                bgColor={"white"}
                borderRadius={"15px"}
                id="username"
                onChange={inputHandler}
              />
              <Input
                placeholder="Password"
                height={"60px"}
                bgColor={"white"}
                borderRadius={"15px"}
                id="password"
                type="password"
                onChange={inputHandler}
              />{" "}
              <Box fontSize={"13px"} textAlign={"center"}>
                People who use our service may have uploaded your contact
                information to Instagram. Learn More
              </Box>
              <Box fontSize={"13px"} textAlign={"center"}>
                By signing up, you agree to our Terms , Privacy Policy and
                Cookies Policy .
              </Box>
              <Button
                bgColor={"#0064e0"}
                color={"white"}
                borderRadius={"20px"}
                onClick={register}
              >
                sign up
              </Button>
              <Link to="/registeremail">
                <Button
                  variant={"ghost"}
                  color={"#1d2b34"}
                  borderRadius={"20px"}
                  border={"1px"}
                  w={"100%"}
                >
                  Sign up with email
                </Button>
              </Link>
            </Box>
          </Grid>

          <Box h={"40%"}></Box>

          <Box
            display={"grid"}
            h={"10%"}
            justifyItems={"center"}
            alignContent={"center"}
          >
            <Link to={"/login"}>
              <Button variant={"ghost"} color={"#0064e0"} fontSize={"15px"}>
                Already have an account?
              </Button>
            </Link>
          </Box>
        </Box>
      </Center>
    </>
  );
}
