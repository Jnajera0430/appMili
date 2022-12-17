import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { ValidEmail } from "./validate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {setUser} from '../features/appMili/appmiliSlice';
import { useSelector } from 'react-redux';
import { users } from "../db/db";


export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const { toggleColorMode } = useColorMode();
  const formBackgound = useColorModeValue("gray.100", "gray.700");
  const inputBackground = useColorModeValue("white", "gray.600");

  const [userLogin, setUserLogin] = useState({
    email:'',
    password:''
  });
  const [seePassword, setSeePassword] = useState(null);

  const [validatedForm, setValidatedForm] = useState({
    email: undefined,
    password: undefined,
    userPass: undefined,
  });

  const validLoginUser =(user, password)=>user.find(userPass => userPass.password == password);


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    setUserLogin({
      email,
      password,
    });
    const user = users.filter((user) => user.email == email);
    
    if (user.length > 0) {
      const userVerified = validLoginUser(user,password);
      if (userVerified) {
        console.log(userVerified);
        if(userVerified.rol == 'EMPLOYED'){
          dispatch(setUser(userVerified))        
          navigate('/user');
        }else{
          if (userVerified.rol == 'ADMIN') {
            setuser(userVerified);
            navigate('/admin');
          }
        }
      }else{
        setValidatedForm(
          {
            ...validatedForm,
            userPass: 'User or account does not match'
          }
        );
      }
    } else {
      setValidatedForm(
        {
          ...validatedForm,
          userPass: 'User or account does not match'
        }
      );
    }
  };

  const onChangeForm = (e) => {
    if (e.target.name === "email") {
      setValidatedForm({
        ...validatedForm,
        email:
          e.target.value.length === 0
            ? "Value is required"
            : !ValidEmail(e.target.value)
            ? "Email not valid"
            : "",
        userPass: "",
      });
    }
    if (e.target.name === "password") {
      
      setValidatedForm({
        ...validatedForm,
        password: e.target.value.length < 7 ? "Password too short" : "",
        userPass: "",
      });
    }
  };

  const onChangePassword = (e) => {
    if (e.target.value.length === 0) {
      setSeePassword(null);
    } else {
      setSeePassword(false);
    }
  };

  const handleSeePassword = () => {
    if (seePassword) {
      setSeePassword(false);
    } else {
      setSeePassword(true);
    }
  };

  const isValidedForm = Object.keys(validatedForm).every(
    (key) => validatedForm[key] === ""
  );

  
  return (
    <Flex height="100vh" alignItems="center" justifyContent="center">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        background={formBackgound}
      >
        <form onSubmit={handleSubmit}>
          <Flex direction={"column"} background={formBackgound} gap={5} p={12}>
            <Heading mb={6} textAlign="center">
              LogIn
            </Heading>

            <Input
              placeholder="user@example.com"
              name="email"
              type={"email"}
              variant="filled"
              background={inputBackground}
              onChange={onChangeForm}
            />
            <Box h={0.5} color="red.300">
              {validatedForm.email}
            </Box>
            <Flex
              direction="row"
              width="100%"
              height="100%"
              background="white"
              rounded={5}
              justifyContent="center"
              alignItems="center"
            >
              <Input
                placeholder="*********"
                onChange={(e) => {
                  onChangePassword(e);
                  onChangeForm(e);
                }}
                name="password"
                type={seePassword ? "text" : "password"}
                variant="filled"
                background={inputBackground}
                width="100%"
              />
              <Box width="20px">
                {seePassword === null ? (
                  ""
                ) : (
                  <Button
                    background="white"
                    width="100%"
                    onClick={handleSeePassword}
                  >
                    <AiOutlineEye />
                  </Button>
                )}
              </Box>
            </Flex>
            <Box h={0.5} color='red.300'>{validatedForm.password}</Box>
            <Button
              disabled={!isValidedForm}
              type="submit"
              colorScheme="teal"
              mb={5}
            >
              Log in
            </Button>
            <Box h={0.5} color='red.300'>{validatedForm.userPass}</Box>
            {/* <Button  onClick={toggleColorMode}>Toggle color mode</Button> */}
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};
