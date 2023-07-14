import {
  Flex,
  Box,
  Center,
  Grid,
  Image,
  Button,
  Icon,
  Avatar,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import { VscHome } from "react-icons/vsc";
import { GrSearch } from "react-icons/gr";
import { TfiVideoClapper } from "react-icons/tfi";
import { useSelector } from "react-redux";

export default function Footer(props) {
  const userSelector = useSelector((state) => state.auth);
  return (
    <>
      {/* footer */}
      <Center>
        <Flex
          h={"45px"}
          w={"414px"}
          alignItems={"center"}
          justifyContent={"center"}
          borderX={"2px solid #dbdbdb"}
          borderTop={"2px solid #dbdbdb"}
          position={"fixed"}
          bottom={0}
          bgColor={"white"}
          zIndex={2}
        >
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"40px"}
            h={"100%"}
            w={"100%"}
          >
            <Link to="/homepage">
              <Button
                variant={"link"}
                fontSize={"32px"}
                color={"black"}
                display={"flex"}
                alignItems={"center"}
              >
                <Icon as={VscHome} />
              </Button>
            </Link>
            <Button variant={"link"} fontSize={"28px"} color={"black"}>
              <Icon as={GrSearch} />
            </Button>{" "}
            <Link to={"/post"}>
              <Button
                variant={"link"}
                fontSize={"33px"}
                color={"black"}
                display={"flex"}
                alignItems={"center"}
              >
                <Icon as={CiSquarePlus} />
              </Button>
            </Link>
            <Button variant={"link"} fontSize={"25px"} color={"black"}>
              <Icon as={TfiVideoClapper} />
            </Button>{" "}
            <Button variant={"link"} fontSize={"30px"} color={"black"}>
              <Link to={"/profile"}>
                <Avatar
                  name=""
                  size={"sm"}
                  src={userSelector.avatar_url}
                  border={"1px solid black"}
                  display={"flex"}
                  alignItems={"center"}
                />
              </Link>
            </Button>
          </Box>
        </Flex>
      </Center>
    </>
  );
}
