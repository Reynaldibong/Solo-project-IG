import {
  Box,
  Center,
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
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { useFormik } from "formik";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

export default function NewPass() {
  const [token, setToken] = useState();
  const [user, setUser] = useState([]);
  const location = useLocation();
  const toast = useToast();

  const inputHandler = (e) => {
    const { id, value } = e.target;
    formik.setFieldValue(id, value);
  };

  const nav = useNavigate();
  YupPassword(Yup);
  const [seePassword, setSeePassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm: "",
    },

    validationSchema: Yup.object().shape({
      password: Yup.string()
        .required()
        .min(
          8,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
        )
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1),
    }),
    onSubmit: async () => {
      try {
        const { password } = formik.values;
        const userPass = { password };

        await api
          .get("/users/token", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            console.log(res.data);
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err.message);
          });

        await api
          .patch("/users/resetpassword", userPass, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            toast({
              title: res.data.message,
              status: "success",
              position: "top",
              duration: 1000,
              isClosable: true,
            });
            return nav("/");
          });
      } catch (err) {
        toast({
          title: err.response.data,
          status: "error",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
      }
    },
  });

  useEffect(() => {
    const tokenUrl = location.pathname.split("/")[2];
    setToken(tokenUrl);
  }, []);

  return (
    <>
      <Center>
        <Box
          w={"414px"}
          h={"896px"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Box
            className="Input"
            h={"30%"}
            w={"95%"}
            border={"3px dashed #dbdbdb"}
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"20px"}
          >
            <Text fontSize={"20px"}>Reset Password</Text>

            <form onSubmit={formik.handleSubmit}>
              <Stack spacing={"5"} w={"350px"}>
                <FormControl isInvalid={formik.errors.password}>
                  <InputGroup>
                    <Input
                      placeholder="New Password"
                      fontSize={"13px"}
                      type={seePassword ? "text" : "password"}
                      bgColor={"#fafafa"}
                      id="password"
                      onChange={inputHandler}
                    ></Input>
                    <InputRightElement>
                      <Icon
                        as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
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

                <FormControl isInvalid={formik.errors.password}>
                  <InputGroup>
                    <Input
                      placeholder="Confirm Password"
                      fontSize={"13px"}
                      type={seePassword ? "text" : "password"}
                      bgColor={"#fafafa"}
                      id="confirm"
                      onChange={inputHandler}
                    ></Input>
                    <InputRightElement>
                      <Icon
                        as={seePassword ? AiOutlineEye : AiOutlineEyeInvisible}
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

            <Button
              w={"50%"}
              h={"30px"}
              bgColor={"#4cb5f9"}
              color={"#ffffff"}
              onClick={formik.handleSubmit}
            >
              Save
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
}
