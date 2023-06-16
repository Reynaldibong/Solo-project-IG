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

export function RegisterNum() {
  return (
    <Center>
      <Box w={"414px"} h={"896px"} bgImg={back}>
        <Box h={"5%"}></Box>

        <Grid h={"45%"} px={"10px"}>
          <Box display={"flex"} alignItems={"center"}>
            <Link to={"/login"}>
              <Button variant={"ghost"} fontSize={"25px"} width={"5px"}>
                <Icon as={HiOutlineArrowNarrowLeft} />
              </Button>
            </Link>
          </Box>
          <Box display={"grid"} px={"10px"} gap={"5px"}>
            <Box fontSize={"25px"} color={"#1d2b34"} fontWeight={"bold"}>
              What's your mobile number?
            </Box>
            <Box color={"#1d2b34"} fontSize={"15px"}>
              Enter the mobile number where you can be contacted. No one will
              see this option on your profile.
            </Box>
            <Input
              placeholder="Mobile number"
              height={"60px"}
              bgColor={"white"}
              borderRadius={"15px"}
            />
            <Box fontSize={"13px"}>
              You may receive SMS notifications from us for security and login
              purposes.
            </Box>
            <Button bgColor={"#0064e0"} color={"white"} borderRadius={"20px"}>
              Next
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
  );
}
