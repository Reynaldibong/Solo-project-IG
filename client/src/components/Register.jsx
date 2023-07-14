import {
  Box,
  Flex,
  Center,
  Image,
  Input,
  Button,
  useToast,
  Text,
  Icon,
  FormControl,
  FormErrorMessage,
  Stack,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import igtitle from "../assets/igtitle.png";
import {
  AiFillFacebook,
  AiOutlineEyeInvisible,
  AiOutlineEye,
} from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Registercomp() {
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();
  YupPassword(Yup);
  const [seePassword, setSeePassword] = useState(false);
  const check = async () => {
    alert(formik.values.password);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullname: "",
      username: "",
    },
    onSubmit: check,
    validationSchema: Yup.object().shape({
      email: Yup.string().required().email("Example : vsc@gmail.com"),
      password: Yup.string()
        .required()
        .min(
          8,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1),
      fullname: Yup.string().required(),
      username: Yup.string().required(),
    }),
  });

  const toast = useToast();

  const inputHandler = (e) => {
    const { target } = e;
    formik.setFieldValue(target.id, target.value);
  };

  const register = async () => {
    if (!formik.values.email || !formik.values.password) {
      toast({
        title: "Please, make sure all data already filled.",
        status: "warning",
        position: "top",
        duration: 1000,
        isClosable: true,
      });
    } else {
      await api
        .post("/users/register", formik.values)
        .then((res) => {
          toast({
            title: res.data.message,
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
          nav("/");
        })
        .catch((err) => {
          toast({
            description: err.response.data.message,
            status: "error",
            duration: 1000,
            isClosable: true,
            position: "top",
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <Center>
        <Box w={"414px"} h={"896px"} px={"25px"}>
          <Box border={"1px solid #e2e2e2"} marginY={"15px"}>
            <Box display={"flex"} justifyContent={"center"}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                w={"45%"}
                pt={"5%"}
              >
                <Image src={igtitle} />
              </Box>
            </Box>

            <Center>
              <Box w={"80%"} textAlign={"center"} display={"grid"} gap={"10px"}>
                <Box color={"#73738a"} fontSize={"18px"} fontWeight={"medium"}>
                  Sign up to see photos and videos from your friends.
                </Box>

                <Box>
                  <Button
                    bgColor={"#0095f6"}
                    color={"#ffffff"}
                    w={"90%"}
                    h={"35px"}
                    borderRadius={"7px"}
                    gap={"5px"}
                    fontSize={"14px"}
                    _hover={""}
                  >
                    <Icon as={AiFillFacebook} boxSize={"20px"} />
                    Log in with facebook{" "}
                  </Button>
                </Box>

                <Box
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  px={"10px"}
                  gap={"15px"}
                  fontSize={"13px"}
                  color={"#73738a"}
                >
                  <Box borderBottom={"1px solid #e2e2e2 "} w={"40%"}></Box>
                  OR
                  <Box borderBottom={"1px solid #e2e2e2"} w={"40%"}></Box>
                </Box>

                <Box className="Input">
                  <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={"2"}>
                      <FormControl isInvalid={formik.errors.email}>
                        <Input
                          placeholder="Mobile number or Email"
                          fontSize={"13px"}
                          bgColor={"#fafafa"}
                          id="email"
                          onChange={inputHandler}
                        ></Input>
                        <FormErrorMessage fontSize={"12px"}>
                          {formik.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={formik.errors.fullname}>
                        <Input
                          placeholder="Fullname"
                          fontSize={"13px"}
                          bgColor={"#fafafa"}
                          id="fullname"
                          onChange={inputHandler}
                        ></Input>
                        <FormErrorMessage fontSize={"12px"}>
                          {formik.errors.fullname}
                        </FormErrorMessage>
                      </FormControl>
                      <FormControl isInvalid={formik.errors.username}>
                        <Input
                          placeholder="Username"
                          fontSize={"13px"}
                          bgColor={"#fafafa"}
                          id="username"
                          onChange={inputHandler}
                        ></Input>{" "}
                        <FormErrorMessage fontSize={"12px"}>
                          {formik.errors.username}
                        </FormErrorMessage>
                      </FormControl>

                      <FormControl isInvalid={formik.errors.password}>
                        <InputGroup>
                          <Input
                            placeholder="Password"
                            fontSize={"13px"}
                            type={seePassword ? "text" : "password"}
                            bgColor={"#fafafa"}
                            id="password"
                            onChange={inputHandler}
                          ></Input>
                          <InputRightElement>
                            <Icon
                              as={
                                seePassword
                                  ? AiOutlineEye
                                  : AiOutlineEyeInvisible
                              }
                              boxSize={"25px"}
                              color={"#a5a5a5"}
                              cursor={"pointer"}
                              onClick={() => setSeePassword(!seePassword)}
                            />
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage fontSize={"12px"} textAlign={"left"}>
                          {formik.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    </Stack>
                  </form>
                </Box>

                <Box
                  fontSize={"12px"}
                  color={"#73738a"}
                  gap={"10px"}
                  display={"grid"}
                >
                  <Box>
                    <Text>People who use our service may have uploaded</Text>

                    <Box display={"flex"} justifyContent={"center"} gap={"2px"}>
                      your contact information to Instagram.
                      <Text color={"blue.800"}> Learn More</Text>{" "}
                    </Box>
                  </Box>

                  <Box>
                    <Text>By signing up, you agree to our Terms ,</Text>

                    <Box display={"flex"} justifyContent={"center"} gap={"5px"}>
                      <Text color={"blue.800"}>Privacy Policy </Text> and
                      <Text color={"blue.800"}> Cookies Policy . </Text>{" "}
                    </Box>
                  </Box>
                </Box>

                <Box pb={"10px"}>
                  <Button
                    w={"90%"}
                    bgColor={"#4cb5f9"}
                    color={"#ffffff"}
                    h={"35px"}
                    fontSize={"14px"}
                    borderRadius={"7px"}
                    _hover={""}
                    isLoading={isLoading}
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => {
                        setIsLoading(false);
                        register();
                      }, 2000);
                    }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </Box>
            </Center>
          </Box>

          <Flex
            justifyContent={"center"}
            py={"15px"}
            gap={"5px"}
            fontSize={"14px"}
            border={"1px solid #e2e2e2 "}
          >
            Have an account?
            <Link to={"/"}>
              <Text color={"blue.400"}>Log in</Text>
            </Link>
          </Flex>

          <Flex
            justifyContent={"center"}
            textAlign={"center"}
            py={"15px"}
            fontSize={"15px"}
          >
            Get the app.
          </Flex>

          <Flex gap={"10px"} justifyContent={"center"} py={"10px"}>
            <Image
              w={"38%"}
              glis
              src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png"
            />
            <Image
              w={"35%"}
              src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
            />
          </Flex>

          <Flex
            justifyContent={"center"}
            textAlign={"center"}
            // py={"5px"}
            fontSize={"12px"}
            gap={"10px"}
          >
            <Box>
              English <Icon as={BsChevronDown} />
            </Box>
            <Text>© 2023 Instagram from Meta</Text>
          </Flex>
        </Box>
      </Center>
    </>
  );
}
