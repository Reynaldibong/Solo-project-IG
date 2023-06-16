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
import { BsFacebook } from "react-icons/bs";
import back from "../assets/v960-ning-29.jpg";
import { useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

export function ForgotPass() {
  return (
    <Center>
      <Box w={"414px"} h={"896px"} bgImg={back}>
        <Box h={"5%"}></Box>

        <Grid h={"40%"}>
          <Box display={"flex"} alignItems={"center"}>
            <Link to={"/login"}>
              <Button variant={"ghost"} fontSize={"25px"} width={"5px"}>
                <Icon as={HiOutlineArrowNarrowLeft} />
              </Button>
            </Link>
          </Box>

          <Box display={"grid"} px={"10px"} gap={"5px"}>
            <Box fontSize={"25px"} color={"#1d2b34"} fontWeight={"bold"}>
              Find your account
            </Box>
            <Box>
              <Box color={"#1d2b34"} fontSize={"15px"}>
                Enter your username, email, or mobile number.
              </Box>
              <Link color="teal.500" href="/help">
                Can't reset your password?
              </Link>
            </Box>
            <Input
              placeholder="Username, email, or mobile number"
              height={"60px"}
              bgColor={"white"}
              borderRadius={"15px"}
            />

            <Button bgColor={"#0064e0"} color={"white"} borderRadius={"20px"}>
              Find account
            </Button>

            <Button
              variant={"ghost"}
              color={"#1d2b34"}
              borderRadius={"20px"}
              border={"1px"}
              gap={"10px"}
            >
              <Icon as={BsFacebook} />
              Log in with Facebook
            </Button>
          </Box>
        </Grid>

        <Box h={"55%"}></Box>
      </Box>
    </Center>
  );
}
