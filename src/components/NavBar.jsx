import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export const Navegation = ({ user }) => {
  const [route,setRoute]=useState(false);
  const handleButton =()=>{
    if (route) {
      setRoute(false);
    }else{
      setRoute(true)
    }
  }
  return (
    <>
      {!!user.email ? (
        <Flex width="100%" height="100%" direction="row" justifyContent='space-between' px={5} py={5}>
          <Box height='100%' alignItems='center' textAlign='center'>
            <Heading fontSize="larger">APP MILI</Heading>
          </Box>
          <Box height='100%' alignItems='center' textAlign='center'>
            <Heading fontSize='medium'>
              BIENVENIDO A MILI DONDE PODRAS REALIZAR TUS SUEÑOS
            </Heading>
          </Box>
          <Box height='100%' alignItems='center' textAlign='center'>
            <Button onClick={(e)=>{
                e.preventDefault();
                localStorage.clear();
                window.location.reload();
              }} >Logout</Button>
          </Box>
        </Flex>
      ) : (
        <Flex width="100%"  direction="row" justifyContent='space-between' px={5} paddingTop={3} pb={1} background='gray.200'>
          <Box height='100%' alignItems='center' textAlign='center'>
            <Heading fontSize="larger">APP MILI</Heading>
          </Box>
          <Box height='100%' alignItems='center' textAlign='center'>
            <Heading fontSize="medium">
              BIENVENIDO A MILI DONDE PODRAS REALIZAR TUS SUEÑOS
            </Heading>
          </Box>
          <Box height='100%' alignItems='center' textAlign='center'>
            <Button onClick={handleButton}>{route ?<Link to='/login'>Log in</Link>:<Link to='/signup'>Sign Up</Link>}</Button>
          </Box>
        </Flex>
      )}
    </>
  );
};
