import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
  Image,
  Box,
  Icon,
} from "@chakra-ui/react";
import { BiPencil } from "react-icons/bi";
import { BsArrowRight } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";

import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function EditContent(props) {
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [post, setPost] = useState({
    caption: props.caption,
  });
  // console.log(post);

  const inputHandler = (e) => {
    const { id, value } = e.target;
    const tempUser = { ...post };
    tempUser[id] = value;
    console.log(tempUser);
    setPost(tempUser);
  };

  const editContent = async () => {
    try {
      await api
        .patch("/posts/" + props.id, post)
        .then((res) => {
          console.log(res.data);
          toast({
            title: res.data.message,
            status: "success",
            position: "top",
            duration: 1000,
            isClosable: true,
          });
          props.fetch();
          props.onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Modal size={"sm"} isOpen={props.isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"flex"} justifyContent={"space-between"}>
            <Button onClick={props.onClose}>
              <Icon
                as={AiOutlineLeft}
                display={"flex"}
                alignItems={"center"}
                border={"2px solid #dbdbdb"}
                bgColor={"grey"}
                boxSize={"30px"}
                color={"white"}
                cursor={"pointer"}
                borderRadius={"20px"}
              />
            </Button>

            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              gap={"5px"}
              fontSize={"17px"}
            >
              <Icon as={BiPencil} />
              Caption Edit
            </Box>
            <Button
              bgColor={"#edf2f7"}
              isLoading={isLoading}
              variant={"ghost"}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  editContent();
                  nav("/profile");
                }, 2000);
              }}
            >
              <Icon
                as={AiOutlineRight}
                boxSize={"30px"}
                borderRadius={"30px"}
                border={"2px solid #dbdbdb"}
                bgColor={"grey"}
                color={"white"}
                cursor={"pointer"}
                display={"flex"}
                alignItems={"center"}
              />
            </Button>
          </ModalHeader>
          <ModalBody display={"flex"} flexDir={"column"} gap={"10px"}>
            <Box
              borderRadius={"20px"}
              overflow={"hidden"}
              border={"2px dashed #70cad0"}
            >
              <Image src={props.image} />
            </Box>
            <Box pb={"10px"}>
              <Input
                // py={"20px"}
                id="caption"
                variant={"flushed"}
                defaultValue={props.caption}
                placeholder="Write a caption..."
                onChange={inputHandler}
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
