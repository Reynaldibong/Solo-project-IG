import {
  Box,
  Flex,
  Center,
  Grid,
  Image,
  Input,
  Button,
  Text,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useToast,
} from "@chakra-ui/react";

import kafka from "../assets/kafka.jpg";

import { BsChevronDown, BsArrowRight } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { TbBoxMultiple } from "react-icons/tb";
import { BiCamera } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";
import { MdGraphicEq } from "react-icons/md";
import { FcNext } from "react-icons/fc";
import addFile from "../assets/addfile.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import { api } from "../api/api";

export default function Posting() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);
  const inputFileRef = useRef(null);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(addFile);
  const [selectedFile, setSelectedFile] = useState(null);
  const [post, setPost] = useState({
    caption: "",
  });

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempPost = { ...post };
    tempPost[id] = value;
    console.log(tempPost);
    setPost(tempPost);
  };

  const imageHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const upload = async () => {
    if (!selectedFile && !post.caption) {
      toast({
        title: "Make sure to fill caption field.",
        status: "warning",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
    }
    const formData = new FormData();
    formData.append("post", selectedFile);
    formData.append("caption", post.caption);

    await api
      .post("/posts/createpost/" + userSelector.id, formData)
      .then((res) => {
        toast({
          title: res.data.message,
          status: "success",
          position: "top",
          duration: 1000,
          isClosable: true,
        });
        nav("/profile");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <>
      <Center>
        <Box
          w={"414px"}
          h={"896px"}
          textAlign={"center"}
          border={"1px solid #dbdbdb"}
        >
          <Box fontSize={"18px"} fontWeight={"bold"}>
            <Box
              borderBottom={"1px solid"}
              display={"flex"}
              justifyContent={"space-between"}
              px={"10px"}
              pb={"5px"}
              pt={"10px"}
            >
              <Flex gap={"20px"}>
                <Link to={"/profile"}>
                  <Box display={"flex"} alignItems={"center"}>
                    <Icon as={RxCross2} boxSize={"30px"} />{" "}
                  </Box>
                </Link>
                <Text>New Post</Text>
              </Flex>
              <Flex>
                <Icon
                  as={BsArrowRight}
                  boxSize={"30px"}
                  color={"blue.400"}
                  onClick={onOpen}
                  cursor={"pointer"}
                />
              </Flex>
            </Box>

            <Box>
              <Image src={kafka} />
            </Box>
          </Box>

          <Box
            h={"5%"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            px={"15px"}
            borderY={"1px solid"}
          >
            <Box
              display={"flex"}
              gap={"5px"}
              alignItems={"center"}
              fontWeight={"semibold"}
            >
              Gallery <Icon as={BsChevronDown} />
            </Box>

            <Box display={"flex"} gap={"5px"} fontSize={"30px"}>
              <Icon
                as={TbBoxMultiple}
                color={"white"}
                bgColor={"grey"}
                borderRadius={"30px"}
                border={"6px solid grey"}
              />
              <Icon
                as={BiCamera}
                color={"white"}
                bgColor={"grey"}
                borderRadius={"30px"}
                border={"6px solid grey"}
              />
            </Box>
          </Box>

          <Box display={"flex"} bgcolor>
            <Grid templateColumns="repeat(4, 1fr)" gap={0.5}>
              <Button onClick={onOpen} boxSize={"100%"}>
                Open
              </Button>
              <Image src={kafka} />
              <Image src={kafka} />
              <Image src={kafka} />
              <Image src={kafka} />
              <Image src={kafka} />
              <Image src={kafka} />
              <Image src={kafka} />
              <Image src={kafka} />
              <Image src={kafka} />
              <Image src={kafka} />
              <Image src={kafka} />
            </Grid>

            <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  <Box
                    borderBottom={"1px solid"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    pb={"5px"}
                    pt={"10px"}
                  >
                    <Flex gap={"20px"}>
                      {/* <Link to={"/profile"}> */}
                      <Box display={"flex"} alignItems={"center"}>
                        <Icon
                          as={RxCross2}
                          boxSize={"30px"}
                          onClick={onClose}
                        />{" "}
                      </Box>
                      {/* </Link> */}
                      <Text>New Post</Text>
                    </Flex>
                    <Button
                      bgColor={"white"}
                      isLoading={isLoading}
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          upload();
                        }, 2000);
                      }}
                      cursor={"pointer"}
                    >
                      <Icon
                        as={BsArrowRight}
                        boxSize={"30px"}
                        color={"blue.400"}
                      />
                    </Button>
                  </Box>
                </ModalHeader>

                <ModalBody gap={"5px"} overflow={"hidden"}>
                  <Box display={"flex"} gap={"10px"} pb={"5px"}>
                    <Box
                      w={"80px"}
                      h={"65px"}
                      border={"3px dashed #dbdbdb"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"center"}
                    >
                      <Input
                        type="file"
                        accept="image/png, image/jpeg"
                        display="none"
                        ref={inputFileRef}
                        onChange={imageHandler}
                      />
                      {/* <Icon as={AiFillFileAdd} boxSize={"30px"} /> */}
                      <Image
                        cursor={"pointer"}
                        w={"50px"}
                        src={image}
                        onClick={() => {
                          inputFileRef.current.click();
                        }}
                      />
                    </Box>
                    <Input
                      variant={"unstyled"}
                      placeholder="Write a caption..."
                      fontSize={"15px"}
                      id="caption"
                      onChange={inputHandler}
                    ></Input>
                  </Box>
                  <Box fontSize={"13px"} fontWeight={"semibold"}>
                    <Box py={"10px"} borderY={"1px solid #dbdbdb"} z>
                      Tag people
                    </Box>
                    <Box py={"10px"}>Add location</Box>
                    <Box py={"10px"} borderY={"1px solid #dbdbdb"}>
                      Add music
                    </Box>

                    <Box
                      py={"10px"}
                      borderBottom={"1px solid #dbdbdb"}
                      display={"flex"}
                      gap={"10px"}
                    >
                      <Button
                        h={"30px"}
                        fontSize={"13px"}
                        fontWeight={"semibold"}
                        display={"flex"}
                        gap={"5px"}
                        overflow={"hidden"}
                      >
                        <Icon as={MdGraphicEq} />
                        Kana Boon - Silhoutte
                      </Button>
                      <Button
                        h={"30px"}
                        fontSize={"13px"}
                        fontWeight={"semibold"}
                        display={"flex"}
                        gap={"5px"}
                        overflow={"hidden"}
                      >
                        <Icon as={MdGraphicEq} />
                        Kamado Nezuko No Uta
                      </Button>
                    </Box>

                    <Box
                      fontWeight={"semibold"}
                      fontSize={"13px"}
                      display={"flex"}
                      justifyContent={"space-between"}
                      py={"10px"}
                    >
                      Advance settings
                      <Box pr={"5px"} fontSize={"15px"}>
                        <Icon as={FcNext} />
                      </Box>
                    </Box>
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </Box>
          <Box bgColor={"black"} h={"9.5%"}></Box>
        </Box>
      </Center>
    </>
  );
}
