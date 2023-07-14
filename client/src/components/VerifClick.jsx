import { Box, Center, useToast, Text, Button } from "@chakra-ui/react";

import { api } from "../api/api";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function VerifButton() {
  const userSelector = useSelector((state) => state.auth);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const verifyacc = async () => {
    let token;
    try {
      await api.get("/users/verify/" + userSelector.email).then((res) => {
        console.log(res.data.token);
        token = res.data.token;
        toast({
          title: res.data.message,
          status: "info",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Center>
        <Button
          w={"414px"}
          h={"30px"}
          bgColor={"red.300"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          fontSize={"14px"}
          borderRadius={"50px"}
          position={"fixed"}
          zIndex={3}
          top={"3px"}
          isLoading={isLoading}
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => {
              setIsLoading(false);
              verifyacc();
            }, 1000);
          }}
          // opacity={"90%"}
        >
          Click here to send an email to verify your account.
          {/* <Button
            display={"flex"}
            // gap={"3px"}
            color={"white"}
            textAlign={"center"}
            alignItems={"center"}
          >
            <Text
              bgColor={"red.300 "}
              borderRadius={"50px"}
              fontSize={"14px"}
              h={"30px"}
              cursor={"pointer"}
              _hover={{ textDecoration: "underline", color: "white" }}
              color={"blue.200"}
              isLoading={isLoading}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  verifyacc();
                }, 3000);
              }}
            >
              Click here
            </Text>
            to send an email to verify your account.
          </Button> */}
        </Button>
      </Center>
    </>
  );
}
