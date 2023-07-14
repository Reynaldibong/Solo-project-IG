import {
  Box,
  Center,
  Flex,
  Image,
  Icon,
  Avatar,
  AvatarBadge,
} from "@chakra-ui/react";
import igtitle from "../assets/igtitle.png";
import Jokowi from "../assets/Jokowi1.jpg";
import Elon_m from "../assets/Elon.jpg";
import Mark from "../assets/Zucker.jpg";
import Steve from "../assets/steveJobs.jpg";

import { AiOutlineHeart } from "react-icons/ai";
import { BsMessenger } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { useSelector } from "react-redux";

export default function NavbarHome() {
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      <Center>
        <Box zIndex={2} display={"flex"} justifyContent={"center"}>
          <Box
            // w={"100%"}
            // bgColor={"red"}
            bgColor={"white"}
            px={"7px"}
            borderX={"2px solid #dbdbdb"}
            borderBottom={"2px solid #dbdbdb"}
            position={"fixed"}
            zIndex={0}
            top={0}
            w={"414px"}
          >
            {/* atas */}
            <Box py={"10px"}>
              <Flex justifyContent={"space-between"} px={"2%"}>
                <Flex>
                  <Image src={igtitle} w={"125px"} />
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

            {/* story */}
            <Box h={"12%"}>
              <Flex
                alignItems={"center"}
                justifyContent={"center"}
                h={"100%"}
                // borderBottom={"2px solid #dbdbdb"}
                pb={"5px"}
                fontSize={"12px"}

                // bgColor={"#fafafa"}
              >
                <Box
                  w={"20%"}
                  display={"grid"}
                  justifyContent={"center"}
                  textAlign={"center"}
                >
                  <Avatar
                    name=""
                    size={"lg"}
                    src={userSelector.avatar_url}
                    border={"1px solid #dbdbdb"}
                  >
                    <AvatarBadge
                      borderColor="white"
                      bg="#0095f6"
                      boxSize="25px"
                      as={BiPlus}
                    />
                  </Avatar>{" "}
                  {userSelector.username}
                </Box>
                <Box
                  w={"20%"}
                  display={"grid"}
                  justifyContent={"center"}
                  textAlign={"center"}
                >
                  <Avatar
                    name=""
                    src={Jokowi}
                    size={"lg"}
                    border={"3px solid #f9343c"}
                  />
                  Jokowi
                </Box>{" "}
                <Box
                  w={"20%"}
                  display={"grid"}
                  justifyContent={"center"}
                  textAlign={"center"}
                >
                  <Avatar
                    name=""
                    src={Elon_m}
                    size={"lg"}
                    border={"3px solid #f9343c"}
                  />
                  Elon Musk
                </Box>{" "}
                <Box
                  w={"20%"}
                  display={"grid"}
                  justifyContent={"center"}
                  textAlign={"center"}
                >
                  <Avatar
                    name=""
                    src={Mark}
                    size={"lg"}
                    border={"3px solid #f9343c"}
                  />
                  zuck
                </Box>{" "}
                <Box
                  w={"20%"}
                  display={"grid"}
                  justifyContent={"center"}
                  textAlign={"center"}
                >
                  <Avatar
                    name=""
                    src={Steve}
                    size={"lg"}
                    border={"3px solid #f9343c"}
                  />
                  Steve Jobs
                </Box>{" "}
              </Flex>
            </Box>
          </Box>
        </Box>
      </Center>
    </>
  );
}
