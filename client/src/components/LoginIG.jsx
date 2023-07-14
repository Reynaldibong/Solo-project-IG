import {
  Box,
  Flex,
  Center,
  Grid,
  Image,
  Input,
  Button,
} from "@chakra-ui/react";
import ig from "../assets/instagram.png";
import fb from "../assets/meta-logo-0.png";
import back from "../assets/v960-ning-29.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  const load = () => {
    nav("/registernumber");
  };

  return (
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
                placeholder="Username, email or mobile number"
              />

              <Input
                bgColor={"white"}
                h={"50px"}
                placeholder="Password"
                type="hidden"
              />
              <Grid gap={"10px"}>
                <Button
                  bgColor={"#0064e0"}
                  color={"white"}
                  borderRadius={"20px"}
                >
                  Login
                </Button>

                <Link to={"/forgetpass"}>
                  <Button
                    variant={"ghost"}
                    color={"#1d2b34"}
                    borderRadius={"20px"}
                  >
                    Forgot Password?
                  </Button>
                </Link>
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
  );
}
