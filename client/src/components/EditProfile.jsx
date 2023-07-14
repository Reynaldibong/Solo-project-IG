import {
  Box,
  Flex,
  Center,
  Input,
  Text,
  Icon,
  Avatar,
  InputGroup,
  useToast,
  Button,
} from "@chakra-ui/react";
import kafka from "../assets/kafka.jpg";
import Avatar1 from "../assets/avatar.png";

import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../api/api";

import { RxCross2 } from "react-icons/rx";
import { MdOutlineDone } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export default function EditProfile() {
  const nav = useNavigate();
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(userSelector.avatar_url);
  const [selectedFile, setSelectedFile] = useState(null);
  const [user, setUser] = useState({
    ...userSelector,
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...user };
    tempUser[id] = value;
    setUser(tempUser);
    console.log(tempUser);
  };

  const avatarPict = (e) => {
    setSelectedFile(e.target.files[0]);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const profileData = async () => {
    const formData = new FormData();
    formData.append("avatar", selectedFile);
    formData.append("fullname", user.fullname);
    formData.append("username", user.username);
    formData.append("bio", user.bio);

    await api
      .patch("/users/editProfile/" + userSelector.id, formData)
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
        dispatch({
          type: "login",
          payload: res.data.user,
        });
        nav("/profile");
      })
      .catch((err) => {
        // console.log(err);
        toast({
          title: err.response.data,
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      });
  };

  return (
    <>
      <Center>
        <Box
          w={"414px"}
          h={"896px"}
          display={"grid"}
          border={"1px solid #dbdbdb"}
        >
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            px={"10px"}
            alignItems={"center"}
            gap={"20px"}
            fontSize={"18px"}
            fontWeight={"bold"}
          >
            <Flex alignItems={"center"} gap={"20px"}>
              <Link to={"/profile"}>
                <Button
                  display={"flex"}
                  alignItems={"center"}
                  bgColor={"white"}
                  w={"20px"}
                >
                  <Icon as={RxCross2} boxSize={"30px"} />{" "}
                </Button>
              </Link>
              <Text>Edit profile</Text>
            </Flex>
            <Button
              cursor={"pointer"}
              bgColor={"white"}
              isLoading={isLoading}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  profileData();
                }, 2000);
              }}
            >
              <Icon as={MdOutlineDone} boxSize={"30px"} color={"blue.400"} />
            </Button>
          </Box>

          <Box pt={"10px"}>
            <Box display={"flex"} justifyContent={"center"} gap={"15px"}>
              <Input
                accept="image/jpeg, image/png"
                ref={inputFileRef}
                type="file"
                display="none"
                onChange={avatarPict}
              />
              <Avatar
                src={image}
                size={"lg"}
                border={"1px solid #dbdbdb"}
                cursor={"pointer"}
                onClick={() => {
                  inputFileRef.current.click();
                }}
              />
              <Avatar src={Avatar1} size={"lg"} border={"1px solid #dbdbdb"} />
            </Box>

            <Box display={"flex"} justifyContent={"center"}>
              <Box
                w={"35%"}
                color={"blue.300"}
                textAlign={"center"}
                fontSize={"13px"}
                fontWeight={"bold"}
                pt={"10px"}
                cursor={"pointer"}
                onClick={() => {
                  inputFileRef.current.click();
                }}
              >
                Edit picture or avatar{" "}
              </Box>
            </Box>
          </Box>

          <Box fontSize={"13px"} px={"10px"} display={"grid"} gap={"1px"}>
            <Text>Name</Text>
            <Input
              variant="flushed"
              h={"30px"}
              fontWeight={"bold"}
              id="fullname"
              defaultValue={userSelector.fullname}
              onChange={inputHandler}
            />
            <Text>Username</Text>
            <Input
              variant="flushed"
              h={"30px"}
              fontWeight={"bold"}
              id="username"
              defaultValue={userSelector.username}
              onChange={inputHandler}
            />
            <Text>Pronouns</Text>
            <Input variant="flushed" h={"30px"} fontWeight={"bold"} />
            <Text>Bio</Text>
            <Input
              variant="flushed"
              h={"30px"}
              fontWeight={"bold"}
              id="bio"
              defaultValue={userSelector.bio}
              onChange={inputHandler}
            />
            <Text fontWeight={"bold"} py={"15px"}>
              Add link
            </Text>
            <Text>Gender</Text>
            <InputGroup>
              <Input variant="flushed" h={"30px"} fontWeight={"bold"} />
            </InputGroup>
          </Box>

          <Box
            pt={"5px"}
            fontWeight={"bold"}
            fontSize={"13px"}
            color={"blue.300"}
          >
            <Text borderTop={"1px solid #dbdbdb"} py={"10px"} pl={"10px"}>
              Switch to professional account
            </Text>

            <Text borderY={"1px solid #dbdbdb"} py={"10px"} pl={"10px"}>
              Personal information settings
            </Text>

            <Text
              to={"/verification"}
              borderBottom={"1px solid #dbdbdb"}
              py={"10px"}
              pl={"10px"}
            >
              <Link to={"/verification"}> Verification your email</Link>
            </Text>
            <Box h={"190px"}></Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
