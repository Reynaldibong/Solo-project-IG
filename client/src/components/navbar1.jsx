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

import { BsArrowLeft } from "react-icons/bs";

import { Link } from "react-router-dom";

export default function Navbar1() {
  return (
    <>
      <Center>
        <Box
          h={"60px"}
          w={"410px"}
          justifyContent={"space-between"}
          px={"15px"}
          borderBottom={"1px solid #dbdbdb"}
          position={"fixed"}
          display={"flex"}
          alignItems={"center"}
          top={0}
          zIndex={2}
        >
          <Flex gap={"30px"} alignItems={"center"}>
            <Link to={"/profile"}>
              <Box display={"flex"} alignItems={"center"}>
                <Icon as={BsArrowLeft} boxSize={"25px"} />{" "}
              </Box>
            </Link>
            <Text fontWeight={"bold"}>Posts</Text>
          </Flex>
        </Box>
      </Center>
    </>
  );
}
