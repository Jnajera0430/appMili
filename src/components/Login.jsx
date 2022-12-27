import {
  background,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {  useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { ValidEmail } from "./validate";
import { useNavigate } from "react-router-dom";
import { useGetUserCheckedQuery } from "../app/appMiliSlice";


export const Login = () => {
  const navigate = useNavigate();
  const { toggleColorMode } = useColorMode();
  const formBackgound = useColorModeValue("gray.100", "gray.700");
  const inputBackground = useColorModeValue("white", "gray.600");
  const [userLogin, setUserLogin] = useState({
    email:'',
    Contraseña:''
  });
  
  const {data:userChecked,isError,error}= useGetUserCheckedQuery(userLogin);
  if(isError)return console.log(error);
  const [seePassword, setSeePassword] = useState(null);
  const [validatedForm, setValidatedForm] = useState({
    email: undefined,
    password: undefined,
    userPass: undefined,
  });
  
  

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    if (userChecked) {  
      console.log(userChecked);    
         if(userChecked.rol === 'EMPLOYE'){
          localStorage.setItem('user',JSON.stringify(userChecked))
          navigate('/user');        
          window.location.reload();
        }else{
          if (userChecked.rol === 'ADMIN') {
            localStorage.setItem('user',JSON.stringify(userChecked))
            navigate('/admin');
            window.location.reload();
          }
        } 
    }else{
      e.preventDefault();
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
      setUserLogin({
        ...userLogin,
        [e.target.name]:e.target.value
      })
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
      setUserLogin({
        ...userLogin,
        Contraseña:e.target.value
      })
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
              autoComplete='on'
              autoFocus
            />
            <Box h={0.5} color="red.300">
              {validatedForm.email}
            </Box>
            <Flex
              direction="row"
              width="100%"
              height="100%"
              rounded={5}
              justifyContent="center"
              alignItems="center"
              background={inputBackground}
              _hover={{background:'gray.200'}}
              _focusWithin={{borderColor:'#3182ce',border:'2px solid #3182ce',background:'gray.100'}}
              _active={{background:'gray.200'}}
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
                width="80%"
                autoComplete="on"
                border='none'
                _hover={{background:'gray.200'}}
                rounded='none'
                _focusWithin={{background:'gray.200'}}

              />
              <Box width='20%' >
                {seePassword === null ? (
                  ""
                ) : (
                  <Button
                    width="100%"
                    onClick={handleSeePassword}
                    background='gray.200'
                    _hover={{bg:'white'}}
                    rounded='none'
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
