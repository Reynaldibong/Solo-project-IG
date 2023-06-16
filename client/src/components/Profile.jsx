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

import kafka from "../assets/kafka.jpg";

import { BsChevronDown } from "react-icons/bs";
import { HiBars3 } from "react-icons/hi2";
import { CiSquarePlus } from "react-icons/ci";
import { AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
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

export function UserProfile() {
  return (
    <Center>
      <Box w={"414px"} h={"896px"} borderX={"2px solid #dbdbdb"}>
        <Box h={"7%"}>
          <Flex
            h={"100%"}
            justifyContent={"space-between"}
            px={"2%"}
            borderBottom={"1px"}
            borderColor={"#dbdbdb"}
          >
            <Flex
              justifyContent={"center"}
              alignItems={"center"}
              gap={"5px"}
              fontWeight={"bold"}
            >
              Kafka
              <Icon as={BsChevronDown} />
            </Flex>

            <Flex
              w={"20%"}
              alignItems={"center"}
              justifyContent={"center"}
              gap={"20px"}
              fontSize={"30px"}
            >
              <Icon
                as={BiPlus}
                border={"2px"}
                borderRadius={"7px"}
                boxSize={"25px"}
              />
              <Box display={"flex"} boxSize={"35px"}>
                <Link to={"/logout"}>
                  <Icon as={HiBars3} fontSize={"25px"} boxSize={"35px"} />
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Box>

        <Box h={"28%"}>
          <Flex h={"40%"} px={"10px"}>
            <Center w={"20%"}>
              <Box textAlign={"center"} gap={"5px"} display={"grid"}>
                <Avatar src={kafka} boxSize={"80px"} />
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
                gap={"40px"}
                fontWeight={"bold"}
                fontSize={"15px"}
              >
                <Box>
                  10
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

          <Grid h={"20%"} px={"15px"}>
            <Text fontWeight={"medium"}>Kafka</Text>

            <Flex fontWeight={"bold"}>Submission : Stellaron Hunter</Flex>
          </Grid>

          <Flex h={"40%"} justifyContent={"center"}>
            <Flex
              gap={"10px"}
              w={"100%"}
              // justifyContent={"center"}
              // alignItems={"center"}
              pt={"2%"}
              px={"10px"}
            >
              <Button w={"50%"}>Edit Profile</Button>
              <Button w={"50%"}>Share Profile</Button>
            </Flex>
          </Flex>
        </Box>

        <Box h={"10%"}>
          <Button>
            <Icon as={AiOutlinePlus} />
          </Button>
        </Box>

        <Box h={"50%"}></Box>

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
            <Link to="/homepage">
              <Button variant={"link"} fontSize={"32px"} color={"black"}>
                <Icon as={VscHome} />
              </Button>
            </Link>
            <Button variant={"link"} fontSize={"25px"} color={"black"}>
              <Icon as={GrSearch} />
            </Button>{" "}
            <Button variant={"link"} fontSize={"30px"} color={"black"}>
              <Icon as={CiSquarePlus} />
            </Button>{" "}
            <Button variant={"link"} fontSize={"25px"} color={"black"}>
              <Icon as={TfiVideoClapper} />
            </Button>{" "}
            <Button variant={"link"} fontSize={"30px"} color={"black"}>
              <Avatar name="" size={"sm"} />
            </Button>
          </Box>
        </Flex>
      </Box>
    </Center>
  );
}
