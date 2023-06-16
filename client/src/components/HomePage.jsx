import {
  Box,
  Flex,
  Center,
  Grid,
  Image,
  Input,
  Button,
  useToast,
  Icon,
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Text,
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
import { BsMessenger, BsThreeDots } from "react-icons/bs";
import { BiPlus, BiBookmark } from "react-icons/bi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

import { Link } from "react-router-dom";
import { useState } from "react";
import { api } from "../api/api";

export function HomePages() {
  return (
    <Center>
      <Box w={"414px"} h={"896px"} borderX={"2px solid #dbdbdb"}>
        <Box h={"5%"}>
          <Flex h={"100%"} justifyContent={"space-between"} px={"2%"}>
            <Flex>
              <Image src={igtitle} />
            </Flex>

            <Flex
              w={"20%"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"20px"}
              fontSize={"30px"}
            >
              <Icon as={AiOutlineHeart} />
              <Icon as={BsMessenger} fontSize={"25px"} />
            </Flex>
          </Flex>
        </Box>

        <Box h={"12%"}>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            h={"100%"}
            borderY={"2px solid #dbdbdb"}
            bgColor={"#fafafa"}
          >
            <Box
              w={"20%"}
              display={"grid"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"15px"}
            >
              <Avatar name="" size={"lg"}>
                <AvatarBadge
                  borderColor="white"
                  bg="#0095f6"
                  boxSize="25px"
                  as={BiPlus}
                />
              </Avatar>{" "}
              kue
            </Box>
            <Box
              w={"20%"}
              display={"grid"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"15px"}
            >
              <Avatar name="" size={"lg"} border={"3px solid #f9343c"} />
              kue
            </Box>{" "}
            <Box
              w={"20%"}
              display={"grid"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"15px"}
            >
              <Avatar name="" size={"lg"} border={"3px solid #f9343c"} />
              kue
            </Box>{" "}
            <Box
              w={"20%"}
              display={"grid"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"15px"}
            >
              <Avatar name="" size={"lg"} border={"3px solid #f9343c"} />
              kue
            </Box>{" "}
            <Box
              w={"20%"}
              display={"grid"}
              justifyContent={"center"}
              textAlign={"center"}
              fontSize={"15px"}
            >
              <Avatar name="" size={"lg"} border={"3px solid #f9343c"} />
              kue
            </Box>{" "}
          </Flex>
        </Box>

        <Box h={"78%"}>
          <Box h={"100%"}>
            <Box
              h={"7%"}
              display={"flex"}
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
              >
                <Avatar size="sm" src={pwk} /> purwadhikaschool{" "}
                <Image src={verif} boxSize={"20px"} h={"100%"} />
              </Box>
              <Box>
                <Button
                  as={BsThreeDots}
                  variant={"link"}
                  boxSize={"25px"}
                  color={"blackAlpha.700"}
                ></Button>
              </Box>
            </Box>

            <Box bgColor={"pink"} h={"70%"}>
              <Image src={picture} boxSize={"100%"} />
            </Box>

            <Box h={"23%"} px={"15px"} pt={"5px"}>
              <Box display={"flex"} justifyContent={"space-between"}>
                <Flex
                  variant={"link"}
                  color={"black"}
                  gap={"15px"}
                  fontSize={"25px"}
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
                  <Box fontWeight={"bold"}>purwadhikaschool</Box>
                  Design is thinking made visual 😎
                </Flex>

                <Flex>...</Flex>
                <Flex>more</Flex>
                <Flex>View all 9 comments</Flex>
                <Flex fontSize={"10px"}>2 DAYS AGO</Flex>
              </Box>
            </Box>
          </Box>
        </Box>

        <Flex
          h={"5%"}
          alignItems={"center"}
          justifyContent={"center"}
          borderTop={"1px solid #dbdbdb"}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"40px"}
          >
            <Button variant={"link"} fontSize={"32px"} color={"black"}>
              <Icon as={VscHome} />
            </Button>
            <Button variant={"link"} fontSize={"25px"} color={"black"}>
              <Icon as={GrSearch} />
            </Button>{" "}
            <Button variant={"link"} fontSize={"30px"} color={"black"}>
              <Icon as={CiSquarePlus} />
            </Button>{" "}
            <Button variant={"link"} fontSize={"25px"} color={"black"}>
              <Icon as={TfiVideoClapper} />
            </Button>{" "}
            <Link to="/profile">
              <Button variant={"link"} fontSize={"30px"} color={"black"}>
                <Avatar name="" size={"sm"} />
              </Button>
            </Link>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
}
