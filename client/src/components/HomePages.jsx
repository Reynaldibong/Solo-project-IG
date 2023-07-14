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
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import igtitle from "../assets/igtitle.png";
import pwk from "../assets/pwk.jpg";
import verif from "../assets/verified.png";
import picture from "../assets/picture.png";
import bar from "../assets/bar.jpg";
import piter from "../assets/piter.png";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { VscHome } from "react-icons/vsc";
import { GrSearch } from "react-icons/gr";
import { TfiVideoClapper } from "react-icons/tfi";
import { BsMessenger, BsThreeDotsVertical } from "react-icons/bs";
import { BiPlus, BiBookmark } from "react-icons/bi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { api } from "../api/api";
import moment from "moment/moment";
import Comment from "./comment";

import { Link } from "react-router-dom";

export default function Home() {
  const userSelector = useSelector((state) => state.auth);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [likes, setLikes] = useState({});

  console.log(likes);
  // console.log(posts);

  useEffect(() => {
    fetchAll();
    fetchLike();
  }, []);

  const fetchAll = async () => {
    try {
      const request = await api.get("/posts");
      // const tempResponse = request.data.content?.sort((a, b) =>
      //   moment(b.date).diff(a.date)
      // );
      const result = request.data.content?.map((post) => ({
        ...post,
        comment: [],
      }));
      setPosts(result);

      result.forEach((post) => {
        fetchComments(post.id);
        // console.log(post.id);
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async (post_id) => {
    try {
      const request = await api.get(`/comment/${post_id}`);
      const comment = request.data;
      // console.log(post_id);
      setPosts((prevResult) => {
        const prevRes = prevResult.map((post) => {
          if (post.id === post_id) {
            return {
              ...post,
              comment: comment,
            };
          }
          return post;
        });
        return prevRes;
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleComment = (e) => {
    setComments(e.target.value);
  };

  const addComment = async (post_id) => {
    console.log(post_id);

    try {
      if (comments) {
        const request = await api.post(`/comment/${post_id}`, {
          user_id: userSelector.id,
          comment: comments,
        });
        const comment = request.data;

        setPosts((prevResult) => {
          const updated = prevResult.map((post) => {
            if (post.id === post_id) {
              return {
                ...post,
                comment: [...post.comment, comment],
              };
            }
            return post;
          });
          return updated;
        });
        setComments("");
        fetchComments(post_id);
      } else {
        console.log("Type some words to comment");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchLike = async () => {
    try {
      const request = await api.get(`likes/${userSelector.id}`);
      //acc = accumulator, exp output: {post_id}: "LIKE"
      const likes = request.data.reduce((acc, like) => {
        acc[like.post_id] = like.status;
        return acc;
      }, {});

      setLikes(likes);
    } catch (err) {
      console.log(err.message);
    }
  };

  const Like_Unlike = async (post_id) => {
    console.log(post_id);
    try {
      const liked = likes[post_id] === "LIKE";
      console.log(liked);
      if (liked) {
        await api.delete(`/likes/${post_id}`, {
          data: {
            user_id: userSelector.id,
          },
        });
      } else {
        await api.post(`/likes/${post_id}`, {
          user_id: userSelector.id,
        });
      }
      fetchLike();
      fetchAll();
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {posts.length === 0 ? (
        <Center h={"100vh"}>
          <Box
            w={"414px"}
            h={"100%"}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            borderX={"2px solid #dbdbdb"}
          >
            No post available
          </Box>
        </Center>
      ) : (
        <Center>
          <Box
            borderX={"2px solid #dbdbdb"}
            w={"414px"}
            alignItems={"center"}
            h={!posts ? "100vh" : null}
            pt={"155px"}
            pb={"45px"}
          >
            {posts?.map((post) => {
              const liked = likes[post.id] === "LIKE";
              return (
                <>
                  <Box borderBottom={"1px solid #dbdbdb"}>
                    <Flex
                      key={post.id}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      px={"10px"}
                    >
                      <Box
                        display={"flex"}
                        gap={"5px"}
                        alignItems={"center"}
                        fontSize={"12px"}
                        fontWeight={"bold"}
                        py={"10px"}
                      >
                        <Avatar size="sm" src={post.user.avatar_url} />
                        {post.user.username}
                        <Image src={verif} w={"20px"} />
                      </Box>
                      <Box>
                        <Icon as={BsThreeDotsVertical} fontSize={"20px"} />
                      </Box>
                    </Flex>

                    <Box>
                      <Image
                        // src={userSelector.avatar_url}
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
                          <Icon
                            color={"red.500"}
                            as={liked ? AiFillHeart : AiOutlineHeart}
                            fontSize={"30px"}
                            cursor={"pointer"}
                            onClick={() => Like_Unlike(post.id)}
                          />

                          <Icon
                            as={IoChatbubbleOutline}
                            cursor={"pointer"}
                            onClick={() => onOpen(fetchComments(post.id))}
                          />

                          <Modal
                            size={"sm"}
                            isOpen={isOpen}
                            onClose={onClose}
                            key={post.id}
                          >
                            <ModalOverlay />
                            <ModalContent borderRadius={"40px"}>
                              <ModalHeader
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"center"}
                                fontWeight={"bold"}
                                fontSize={"17px"}
                                borderBottom={"1px solid #dbdbdb"}
                              >
                                Comments
                              </ModalHeader>
                              <ModalCloseButton
                                p={"15px 20px 0px 0px"}
                                bgColor={"white"}
                              />

                              <ModalBody
                                textAlign={"center"}
                                fontSize={"15px"}
                                display={"flex"}
                                flexDir={"column"}
                                gap={"40px"}
                              >
                                <Box
                                  h={"500px"}
                                  display={"flex"}
                                  flexDir={"column"}
                                  gap={"25px"}
                                  overflowY={"scroll"}
                                >
                                  {post?.comment.map((comment) => (
                                    <Flex
                                      key={comment?.id}
                                      // gap={"15px"}
                                      justifyContent={"space-between"}
                                      px={"10px"}
                                    >
                                      <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        gap={"13px"}
                                      >
                                        <Box>
                                          <Avatar
                                            size={"md"}
                                            src={comment?.user?.avatar_url}
                                          />
                                        </Box>
                                        <Box
                                          display={"flex"}
                                          flexDir={"column"}
                                          // alignItems={"center"}
                                          justifyContent={"center"}
                                          gap={"3px"}
                                          textAlign={"left"}
                                        >
                                          <Text
                                            fontWeight={"bold"}
                                            fontSize={"12px"}
                                          >
                                            {comment?.user?.username}
                                          </Text>
                                          <Text>{comment.comment}</Text>
                                          <Text
                                            color={"grey"}
                                            fontSize={"12px"}
                                          >
                                            Reply
                                          </Text>
                                        </Box>
                                      </Box>
                                      <Box pt={"7px"} fontSize={"20px"}>
                                        <Icon as={AiOutlineHeart} />
                                      </Box>
                                    </Flex>
                                  ))}
                                </Box>
                              </ModalBody>

                              {/* Comment */}
                              <ModalFooter borderTop={"1px solid #dbdbdb"}>
                                <Flex gap={"15px"} w={"80%"}>
                                  <Avatar
                                    boxSize={"40px"}
                                    src={userSelector.avatar_url}
                                  />
                                  <Input
                                    // textAlign={"center"}
                                    fontSize={"13px"}
                                    variant={"unstyled"}
                                    placeholder={`Add a comment for ${post.user?.username}...`}
                                    onChange={handleComment}
                                  />
                                </Flex>
                                <Button
                                  fontSize={"13px"}
                                  fontWeight={"semibold"}
                                  cursor={"pointer"}
                                  bgColor={"white"}
                                  // w={"60px"}
                                  onClick={() => addComment(post.id)}
                                >
                                  Post
                                </Button>
                              </ModalFooter>
                            </ModalContent>
                          </Modal>

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
                          <Text fontWeight={"bold"}>{post.likes} others</Text>
                        </Flex>

                        <Flex gap={"5px"}>
                          <Box fontWeight={"bold"}>
                            {/* purwadhikaschool */}
                            {post.user.username}
                          </Box>
                          {/* Design is thinking made visual 😎 */}
                          {post.caption}
                        </Flex>

                        <Flex>...</Flex>
                        <Flex>more</Flex>
                        <Flex>{`View all ${post.comment.length} comments`}</Flex>
                        <Flex fontSize={"10px"} pb={"20px"}>
                          2 DAYS AGO
                        </Flex>
                      </Box>
                    </Box>
                  </Box>
                </>
              );
            })}
          </Box>
        </Center>
      )}
    </>
  );
}
