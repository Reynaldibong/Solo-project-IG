import {
  Box,
  Flex,
  Center,
  Image,
  Button,
  Icon,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Text,
  Menu,
  MenuButton,
  Divider,
  MenuList,
  MenuItem,
  useDisclosure,
} from "@chakra-ui/react";
import igtitle from "../assets/igtitle.png";
import pwk from "../assets/pwk.jpg";
import verif from "../assets/verified.png";
import picture from "../assets/picture.png";
import bar from "../assets/bar.jpg";
import piter from "../assets/piter.png";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineHeart } from "react-icons/ai";
import { VscHome } from "react-icons/vsc";
import { GrSearch } from "react-icons/gr";
import { TfiVideoClapper } from "react-icons/tfi";
import { BsMessenger, BsThreeDotsVertical } from "react-icons/bs";
import { BiPlus, BiBookmark, BiPencil } from "react-icons/bi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

import { SlTrash } from "react-icons/sl";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api/api";
import EditContent from "./EditModal";
import Delete from "./DeleteModal";

export default function PostByU() {
  const userSelector = useSelector((state) => state.auth);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [post, setPost] = useState([]);
  const DeleteModal = useDisclosure();
  const Edit = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const nav = useNavigate();

  // console.log(post);

  useEffect(() => {
    fetch();
  }, []);

  async function fetch() {
    try {
      await api
        .get("/posts/postby/" + id)
        .then((res) => {
          setPost(res.data.post);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <>
      <Center>
        <Box
          w={"414px"}
          h={"896px"}
          pt={"61px"}
          border={"1px solid #dbdbdb"}
          //   pb={"45px"}
          zIndex={"1"}
        >
          <Box>
            <Box
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              px={"10px"}
              py={"5px"}
            >
              <Box
                display={"flex"}
                gap={"5px"}
                alignItems={"center"}
                fontSize={"12px"}
                fontWeight={"bold"}
                py={"5px"}
              >
                <Avatar size="sm" src={userSelector.avatar_url} />{" "}
                {userSelector.username}{" "}
                <Image src={verif} boxSize={"20px"} h={"100%"} />
              </Box>
              <Box>
                <Menu>
                  <MenuButton>
                    <Image as={BsThreeDotsVertical} size={"sm"} boxSize={5} />
                  </MenuButton>
                  <MenuList minW={"100px"}>
                    <MenuItem
                      onClick={Edit.onOpen}
                      display={"flex"}
                      gap={"10px"}
                    >
                      <Icon as={BiPencil} />
                      Edit
                      <EditContent
                        id={post.id}
                        caption={post.caption}
                        image={post.image}
                        isOpen={Edit.isOpen}
                        onClose={Edit.onClose}
                        fetch={fetch}
                      />
                    </MenuItem>

                    <Divider />
                    <MenuItem
                      onClick={DeleteModal.onOpen}
                      display={"flex"}
                      gap={"10px"}
                      color={"red"}
                    >
                      <Icon as={SlTrash} />
                      Delete
                      <Delete
                        id={post.id}
                        isOpen={DeleteModal.isOpen}
                        onClose={DeleteModal.onClose}
                      />
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            </Box>

            <Box>
              <Image
                // src={picture}
                src={post.image}
                w={"100%"}
              />
            </Box>

            <Box
              px={"10px"}
              py={"10px"}
              display={"flex"}
              flexDir={"column"}
              gap={"5px"}
            >
              <Box display={"flex"} justifyContent={"space-between"}>
                <Flex
                  variant={"link"}
                  color={"black"}
                  gap={"15px"}
                  fontSize={"25px"}
                  alignItems={"center"}
                >
                  <Icon as={AiOutlineHeart} fontSize={"30px"} />
                  <Icon as={IoChatbubbleOutline} />
                  <Icon as={FiSend} />
                </Flex>

                <Flex
                  variant={"link"}
                  color={"black"}
                  gap={"20px"}
                  fontSize={"25px"}
                  alignItems={"center"}
                >
                  <Icon as={BiBookmark} />
                </Flex>
              </Box>

              <Box display={"grid"} gap={"1px"} fontSize={"13px"}>
                <Flex gap={"5px"} alignItems={"center"}>
                  <AvatarGroup size={"xs"} max={2} gap={"5px"}>
                    <Avatar src={bar} />
                    <Avatar src={piter} />
                  </AvatarGroup>
                  Liked by
                  <Text fontWeight={"bold"}>baarak08</Text>
                  and
                  <Text fontWeight={"bold"}>331 others</Text>
                </Flex>

                <Flex gap={"5px"}>
                  <Box fontWeight={"bold"}>
                    {/* purwadhikaschool */}
                    {userSelector.username}
                  </Box>
                  {/* Design is thinking made visual 😎 */}
                  {post.caption}
                </Flex>

                <Flex>...</Flex>
                <Flex>more</Flex>
                <Flex>View all 9 comments</Flex>
                <Flex fontSize={"10px"}>2 DAYS AGO</Flex>
              </Box>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
