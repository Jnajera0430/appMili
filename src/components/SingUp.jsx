import { Box, Button, Flex, Heading, Input, Select, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ValidEmail } from "./validate";
import { setSignUp } from "../features/appMili/appmiliSlice";
import { useCreateUserMutation } from "../features/appMiliQuery/apiSliceQuery";
export const SingUp = () => {
  const [createUser]=useCreateUserMutation()
  const dispacth = useDispatch();
  const inputBackground = useColorModeValue("white", "gray.600");
  const [dataUser, setDataUser] = useState({
    firtsName: "",
    lastName: "",
    email: "",
    tipoId: "",
    numCedula: "",
    password: "",
  });
  const [validateForm, setValidateForm] = useState({
    firtsName: undefined,
    lastName: undefined,
    email: undefined,
    tipoId: undefined,
    numCedula: undefined,
    password: undefined,
    passwordCheck: undefined,
  });

  const handleChange = (e) => {
    e.preventDefault();

    if (e.target.name === "firtsName") {
      setValidateForm({
        ...validateForm,
        firtsName: e.target.value.length > 0 ? "" : "Value is Required",
      });
    }
    if (e.target.name === "lastName") {
      setValidateForm({
        ...validateForm,
        lastName: e.target.value.length > 0 ? "" : "Value is Required",
      });
    }
    if (e.target.name === "email") {
      setValidateForm({
        ...validateForm,
        email:
          e.target.value.length === 0
            ? "Value is Required"
            : ValidEmail(e.target.value)
            ? ""
            : "Email invalided",
      });
    }
    if (e.target.name === "selectTipoCedula") {
      setValidateForm({
        ...validateForm,
        tipoId: e.target.value.length === 0 ? "Value is Required" : "",
      });
    }
    if (e.target.name === "numCedula") {
      setValidateForm({
        ...validateForm,
        numCedula: e.target.value.length === 0 ? "Value is Required" : "",
      });
    }
    if (e.target.name === "password") {
      setDataUser({
        ...dataUser,
        password: e.target.value,
      });
    }
    if (e.target.name === "checkPassword") {
      setValidateForm({
        ...validateForm,
        passwordCheck:
          e.target.value !== dataUser.password ? "Password does not match" : "",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nombre = e.target.firtsName.value;
    const Apellidos = e.target.lastName.value;
    const email = e.target.email.value;
    const TipoDocumento = e.target.selectTipoCedula.value;
    const NumCedula = e.target.numCedula.value;
    const Contraseña = e.target.password.value;

    /* dispacth(
      setSignUp({
        nombre,
        Apellidos,
        email,
        TipoDocumento,
        Telefono: null,
        Edad: null,
        sexo: null,
        NumCedula,
        Contraseña,
        estado: true,
        rol: "EMPLOYE",
      })
    ); */
    createUser({
      nombre,
      Apellidos,
      email,
      TipoDocumento,
      Telefono: null,
      Edad: null,
      sexo: null,
      NumCedula,
      Contraseña,
      estado: true,
      rol: "EMPLOYE",
    })
    e.target.reset();
  };
  useEffect(() => {
    if (dataUser.password.length >= 0) {
      setValidateForm((validateForm) => {
        return {
          ...validateForm,
          password:
            dataUser.password.length < 8 && dataUser.password.length > 0
              ? "The password must be at least 8 characters long"
              : dataUser.password.length === 0
              ? "value is required"
              : "",
        };
      });
    }
  }, [dataUser]);
  const isValidedForm = Object.keys(validateForm).every(
    (key) => validateForm[key] === ""
  );
  return (
    <Flex
      direction="column"
      height="80vh"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      gap={0.2}
    >
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          maxWidth: "500px",
          
        }}
        onSubmit={handleSubmit}
        id="form"
      >
        <Flex direction='column' padding={20} gap={5} background='gray.200'>
          <Heading width="100%" textAlign="center">
            SIGN UP
          </Heading>
          <Box >
            <Input
              placeholder="Firts Name"
              name="firtsName"
              type="text"
              onChange={handleChange}
              background={inputBackground}
            />
            <span color="red.300" width="100%" pl={5} role={'alert'}>
              {validateForm.firtsName}
            </span>
          </Box>
          <Box>
            <Input
              placeholder="Last Name"
              name="lastName"
              type="text"
              onChange={handleChange}
              background={inputBackground}
            />
            <span color="red.300" width="100%" pl={5} role={'alert'}>
              {validateForm.lastName}
            </span>
          </Box>
          <Box>
            <Input
              placeholder="Email"
              name="email"
              type="email"
              onChange={handleChange}
              background={inputBackground}
            />
            <span color="red.300" width="100%" pl={5} role={'alert'}>
              {validateForm.email}
            </span>
          </Box>
          <Box>
            <Select
              name="selectTipoCedula"
              placeholder="Tipo de identificacion"
              onChange={handleChange}
              background={inputBackground}
            >
              <option value="cedula de Ciudania">Cedula de Ciudania</option>
              <option value="cedula de Extrangeria">Cedula de Extrangeria</option>
            </Select>
            <span color="red.300" width="100%" pl={5} role={'alert'}>
              {validateForm.tipoId}
            </span>
          </Box>
          <Box>
            <Input
              placeholder="Num. de cedula"
              name="numCedula"
              type="number"
              onChange={handleChange}
              background={inputBackground}
            />
            <span color="red.300" width="100%" pl={5} role={'alert'}>
              {validateForm.numCedula}
            </span>
          </Box>
          <Box>
            <Input
              placeholder="Password"
              name="password"
              type="password"
              onChange={handleChange}
              background={inputBackground}
            />
            <span color="red.300" width="100%" pl={5} role={'alert'}>
              {validateForm.password}
            </span>
          </Box>
          <Box>
            <Input
              placeholder="Check password"
              name="checkPassword"
              type="password"
              onChange={handleChange}
              background={inputBackground}
            />
            <span color="red.300" width="100%" pl={5} role={'alert'}>
              {validateForm.passwordCheck}
            </span>
          </Box>
          <Button disabled={!isValidedForm} type="submit" width="7rem" colorScheme="teal">
            Sign Up
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
