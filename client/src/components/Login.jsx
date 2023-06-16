// import {
//   Box,
//   Flex,
//   Center,
//   Grid,
//   Image,
//   Input,
//   Button,
//   useToast,
// } from "@chakra-ui/react";
// import bg from "../assets/loginPizza.jpg";
// import icon1 from "../assets/logo PIZZA PIZZAZZ.png";
// import { useState } from "react";
// import { api } from "../api/api";

// export function Login() {
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });

//   const inputHandler = (e) => {
//     const { id, value } = e.target;
//     const tempUser = { ...user };
//     tempUser[id] = value;
//     setUser(tempUser);
//     console.log(tempUser);
//   };

//   const fetch = async () => {
//     const coba = await api.get("/users/coba");
//     console.log(coba.data);
//   };
//   const login = async () => {
//     if (!user.email || !user.password) {
//       alert("isi semua");
//     } else {
//       await api
//         .post("/users/login", user)
//         .then((res) => {
//           localStorage.setItem("user", JSON.stringify(res.data));
//         })
//         .catch((err) => {
//           alert("salah");
//           console.log(err.message);
//         });
//     }
//   };

//   return (
//     <>
//       <Center>
//         <Box
//           bgImage={bg}
//           w={"100vw"}
//           maxW={"1366px"}
//           h={"100vh"}
//           maxH={"1024px"}
//           display={"flex"}
//           justifyContent={"center"}
//         >
//           <Box
//             display={"flex"}
//             alignItems={"center"}
//             justifyContent={"space-between"}
//             px={"30px"}
//             w={"95%"}
//           >
//             <Box w={"60%"} color={"green.200"}>
//               <Grid fontSize={"30px"} fontWeight={"medium"}>
//                 Welcome to
//               </Grid>
//               <Grid fontSize={"60px"} fontWeight={"bold"}>
//                 Pizza Pizzazz
//               </Grid>
//               <Grid fontSize={"60px"} fontWeight={"bold"}>
//                 Back Office Platform
//               </Grid>
//             </Box>

//             <Box w={"30%"} h={"40%"} bgColor={"#ffffff"} borderRadius={"20px"}>
//               <Box>
//                 <Box p={"30px"} display={"grid"} gap={"15px"}>
//                   <Image src={icon1} w={"150px"} />
//                   <Box>
//                     Email
//                     <Input
//                       variant={"filled"}
//                       placeholder="Email"
//                       id="email"
//                       onChange={inputHandler}
//                     />
//                   </Box>

//                   <Box>
//                     Password
//                     <Input
//                       variant={"filled"}
//                       placeholder="Password"
//                       id="password"
//                       onChange={inputHandler}
//                     />
//                   </Box>

//                   <Button
//                     bg={"#F04438"}
//                     color={"white"}
//                     _hover={{ bg: "#FDA29B" }}
//                     w={"100%"}
//                     onClick={login}
//                   >
//                     Save
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//           </Box>{" "}
//         </Box>
//       </Center>
//     </>
//   );
// }
