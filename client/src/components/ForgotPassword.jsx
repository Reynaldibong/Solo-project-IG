import {
  Box,
  Flex,
  Center,
  Image,
  Input,
  Button,
  useToast,
  Icon,
  Text,
} from "@chakra-ui/react";
import { BsChevronDown } from "react-icons/bs";
import igtitle from "../assets/igtitle.png";
import locked from "../assets/Untitled-2.png";
import { useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";

export function ForgotPass() {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ForgotPassword = async () => {
    if (!email) {
      toast({
        title: "Email field data required",
        status: "error",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      await api
        .get("/users/forgotpassword/" + email, {
          params: {
            email,
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
        })
        .catch((err) => {
          console.log(err);
          toast({
            title: err.response.data,
            status: "error",
            position: "top",
            duration: 2000,
            isClosable: true,
          });
        });
    }
  };
  return (
    <>
      <Center>
        {" "}
        <Box w={"414px"} h={"896px"} border={"1px solid #e2e2e2"}>
          <Box display={"flex"} alignItems={"center"}>
            <Image src={igtitle} w={"33%"} p={"20px 0px 10px 20px"} />
            <Box w={"80%"} h={"1%"}></Box>
          </Box>

          <Center py={"50px"} pb={"150px"}>
            <Box
              display={"grid"}
              justifyItems={"center"}
              borderY={"1px solid #e2e2e2"}
              gap={"10px"}
              pt={"15px"}
            >
              <Box>
                <Image src={locked} boxSize={"100px"} />
              </Box>

              <Box
                display={"grid"}
                textAlign={"center"}
                gap={"15px"}
                px={"30px"}
              >
                {" "}
                <Box display={"grid"} gap={"5px"}>
                  <Text fontWeight={"semibold"} fontSize={"17px"}>
                    Trouble logging in?
                  </Text>
                  <Text fontSize={"14px"} px={"5px"}>
                    Enter your email, phone, or username and we'll send you a
                    link to get back into your account.
                  </Text>
                </Box>
                <Box display={"grid"} gap={"15px"} px={"18px"}>
                  <Input
                    bgColor={"#fafafa"}
                    placeholder="Email"
                    fontSize={"14px"}
                    focusBorderColor="#e2e2e2"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    id="email"
                  ></Input>
                  <Button
                    color={"white"}
                    bgColor="#0095f6"
                    h={"33px"}
                    fontSize={"14px"}
                    isLoading={isLoading}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        ForgotPassword();
                      }, 2000);
                    }}
                  >
                    Send login link
                  </Button>
                </Box>
                <Flex
                  fontSize={"13px"}
                  color={"#00376b"}
                  w={"100%"}
                  justifyContent={"center"}
                >
                  Can't reset your password?
                </Flex>
                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  px={"10px"}
                  gap={"15px"}
                  fontSize={"13px"}
                  color={"#73738a"}
                  pt={"10px"}
                >
                  <Box borderBottom={"1px solid #e2e2e2 "} w={"40%"}></Box>
                  OR
                  <Box borderBottom={"1px solid #e2e2e2"} w={"40%"}></Box>
                </Box>
                <Text fontSize={"14px"} fontWeight={"semibold"} pb={"70px"}>
                  <Link to={"/register"}>Create new account</Link>
                </Text>
              </Box>

              <Center
                bgColor={"#fafafa"}
                w={"100%"}
                border={"1px solid #e2e2e2"}
              >
                <Box fontSize={"15px"} fontWeight={"semibold"} py={"10px"}>
                  <Link to={"/"}>Back to login</Link>
                </Box>
              </Center>
            </Box>
          </Center>

          <Center fontSize={"12px"} gap={"10px"}>
            <Box>
              English <Icon as={BsChevronDown} />
            </Box>
            <Text>© 2023 Instagram from Meta</Text>
          </Center>
        </Box>
      </Center>
    </>
  );
}
