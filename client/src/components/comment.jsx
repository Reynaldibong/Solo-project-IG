import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
  Box,
  Text,
  Avatar,
  Input,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Comment(props) {
  console.log(props);
  const nav = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const userSelector = useSelector((state) => state.auth);

  return (
    <>
      <Modal size={"sm"} isOpen={props.isOpen} onClose={props.onClose}>
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
          <ModalCloseButton p={"15px 20px 0px 0px"} bgColor={"white"} />
          <ModalBody
            textAlign={"center"}
            fontSize={"13px"}
            display={"flex"}
            flexDir={"column"}
            gap={"40px"}
          >
            {props.data.map((val) => (
              <Box>{val.comment}</Box>
            ))}
          </ModalBody>
          {/* Comment */}
          <ModalFooter borderTop={"1px solid #dbdbdb"}>
            <Flex gap={"15px"} w={"80%"}>
              <Avatar boxSize={"40px"} src={userSelector.avatar_url} />
              <Input
                // textAlign={"center"}
                fontSize={"13px"}
                variant={"unstyled"}
                placeholder={"Add a comment for Creator..."}
                onChange={props.handleComment}
              />
            </Flex>
            <Button
              fontSize={"13px"}
              fontWeight={"semibold"}
              cursor={"pointer"}
              bgColor={"white"}
              // w={"60px"}
              onClick={props.addComment}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
