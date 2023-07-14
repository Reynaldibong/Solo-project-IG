import {
  Box,
  Flex,
  Center,
  Grid,
  Image,
  Button,
  Icon,
  Avatar,
  Text,
  GridItem,
} from "@chakra-ui/react";

import { BsGrid3X3 } from "react-icons/bs";
import { LuContact } from "react-icons/lu";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

export default function UserProfile() {
  const userSelector = useSelector((state) => state.auth);
  const [post, setPost] = useState([]);

  console.log(userSelector);
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await api.get("/posts/" + userSelector.id);
      // const temporary = response.data.post.sort((a, b) =>
      //   moment(b.date).diff(a.date)
      // );
      const posted = response.data.post.map((post) => ({
        ...post,
      }));
      setPost(posted);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <Center>
        <Box
          w={"414px"}
          // h={"896px"}
          h={post.length <= 6 ? "100vh" : null}
          borderX={"2px solid #dbdbdb"}
          pt={"65px"}
          pb={"45px"}
          zIndex={0}
        >
          {/* main */}
          <Box>
            <Flex px={"10px"}>
              <Center w={"20%"}>
                <Box textAlign={"center"} gap={"5px"} display={"grid"}>
                  <Avatar
                    src={userSelector.avatar_url}
                    boxSize={"80px"}
                    border={"1px solid #dbdbdb"}
                  />
                </Box>
              </Center>

              <Box
                w={"80%"}
                display={"flex"}
                alignItems={"center"}
                textAlign={"center"}
              >
                <Center
                  w={"100%"}
                  gap={"35px"}
                  fontWeight={"bold"}
                  fontSize={"15px"}
                >
                  <Box>
                    {post.length}
                    <Text> Posts</Text>
                  </Box>
                  <Box>
                    300
                    <Text> Followers</Text>
                  </Box>{" "}
                  <Box>
                    267
                    <Text> Following</Text>
                  </Box>
                </Center>
              </Box>
            </Flex>

            <Grid px={"15px"} py={"5px"} fontSize={"15px"}>
              <Text fontWeight={"medium"}>{userSelector.fullname}</Text>

              <Flex fontWeight={"bold"}>{userSelector.bio}</Flex>
            </Grid>

            <Flex justifyContent={"center"} h={"60px"}>
              <Flex
                gap={"10px"}
                w={"100%"}
                px={"10px"}
                h={"100%"}
                alignItems={"center"}
              >
                <Box w={"50%"}>
                  <Link to={"/editprofile"}>
                    <Button w={"100%"}> Edit Profile</Button>
                  </Link>
                </Box>
                <Button w={"50%"}>Share Profile</Button>
              </Flex>
            </Flex>
          </Box>

          <Box display={"flex"} flexDirection={"column"}>
            <Box textAlign={"center"} px={"20px"} p={"10px 0px 20px 20px"}>
              <Box
                borderRadius={"50px"}
                border={"1px"}
                boxSize={"62px"}
                fontSize={"13px"}
                display={"grid"}
                gap={"5px"}
                fontWeight={"bold"}
              >
                <Button
                  variant={"unstyled"}
                  boxSize={"58px"}
                  fontSize={"30px"}
                  display={"flex"}
                >
                  +
                </Button>
                New
              </Box>
            </Box>

            <Box display={"flex"} fontSize={"25px"} h={"40px"}>
              <Flex w={"100%"}>
                <Center w={"50%"} borderBottom={"1px"}>
                  <Flex as={BsGrid3X3}></Flex>
                </Center>
                <Center w={"50%"}>
                  <Flex as={LuContact} fontSize={"30px"}></Flex>
                </Center>
              </Flex>
            </Box>
          </Box>

          {/* content */}
          <Box overflowY={"hidden"} pt={"5px"}>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={1}
              alignItems={"center"}
            >
              {post?.map((val, idx) => {
                return (
                  <>
                    <Link to={`/postbyu/${val.id}`}>
                      <GridItem
                        maxH={"135px"}
                        maxW={"148px"}
                        overflow={"hidden"}
                        // px={"2px"}
                      >
                        <Image key={idx} src={val.image} />
                      </GridItem>
                    </Link>
                  </>
                );
              })}
            </Grid>
          </Box>
        </Box>
      </Center>
    </>
  );
}
