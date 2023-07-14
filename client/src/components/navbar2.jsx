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
} from "@chakra-ui/react";

import { useSelector } from "react-redux";
import { BiPlus } from "react-icons/bi";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiBars3 } from "react-icons/hi2";

export default function Navbar2() {
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      {/* //navbar */}
      <Center>
        <Flex
          h={"60px"}
          w={"410px"}
          justifyContent={"space-between"}
          px={"15px"}
          borderColor={"#dbdbdb"}
          borderBottom={"1px solid #dbdbdb"}
          position={"fixed"}
          bgColor={"white"}
          top={0}
          zIndex={2}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={"10px"}
            fontWeight={"bold"}
          >
            {userSelector.username}
            <Icon as={FaAngleDown} />
          </Box>

          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"20px"}
            h={"100%"}
          >
            <Flex h={"100%"} alignItems={"center"}>
              <Icon
                as={BiPlus}
                border={"2px"}
                borderRadius={"7px"}
                boxSize={"25px"}
              />
            </Flex>
            <Flex display={"flex"} alignItems={"center"} h={"100%"}>
              <Link to={"/logout"}>
                <Icon as={HiBars3} fontSize={"40px"} pt={1} />
              </Link>
            </Flex>
          </Box>
        </Flex>
      </Center>
    </>
  );
}
