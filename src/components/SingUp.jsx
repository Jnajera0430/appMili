import { Box, Button, Flex, Heading, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ValidEmail } from "./validate";

export const SingUp = () => {
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
        firtsName: e.target.value.length > 0 ? "" : "Value Required",
      });
    }
    if (e.target.name === "lastName") {
      setValidateForm({
        ...validateForm,
        lastName: e.target.value.length > 0 ? "" : "Value Required",
      });
    }
    if (e.target.name === "email") {
      setValidateForm({
        ...validateForm,
        email:
          e.target.value.length === 0
            ? "Value Required"
            : ValidEmail(e.target.value)
            ? ""
            : "Email invalided",
      });
    }
    if (e.target.name === "selectTipoCedula") {
      setValidateForm({
        ...validateForm,
        tipoId: e.target.value.length === 0 ? "Value Required" : "",
      });
    }
    if (e.target.name === "numCedula") {
      setValidateForm({
        ...validateForm,
        numCedula: e.target.value.length === 0 ? "Value Required" : "",
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
          passwordCheck: e.target.value !== dataUser.password ? 'Password does not match':''
        });
      }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const firtsName = e.target.firtsName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const tipoId = e.target.selectTipoCedula.value;
    const numCedula = e.target.numCedula.value;
    const password = e.target.password.value;
    setDataUser({
      firtsName,
      lastName,
      email,
      tipoId,
      numCedula,
      password,
      estado: true,
      rol: "EMPLOYED",
    });
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
      height="100vh"
      justifyContent="center"
      alignItems="center"
      width="100vw"
      gap={5}
    >
      <Heading width="100%" textAlign="center">
        SIGN UP
      </Heading>
      <form
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
        onSubmit={handleSubmit}
        id="form"
      >
        <Flex
          width="50%"
          direction="column"
          gap={5}
          justifyContent="center"
          alignItems="center"
        >
          <Input
            placeholder="Firts Name"
            name="firtsName"
            type="text"
            onChange={handleChange}
          />
          <Box color='red.300' width='100%' pl={5} h='10px'>{validateForm.firtsName}</Box>
          <Input
            placeholder="Last Name"
            name="lastName"
            type="text"
            onChange={handleChange}
          />
          <Box color='red.300' width='100%' pl={5} h='10px'>{validateForm.lastName}</Box>
          <Input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleChange}
          />
          <Box color='red.300' width='100%' pl={5} h='10px'>{validateForm.email}</Box>
          <Select
            name="selectTipoCedula"
            placeholder="Tipo de identificacion"
            onChange={handleChange}
          >
            <option value="cedula de Ciudania">Cedula de Ciudania</option>
            <option value="cedula de Extrangeria">Cedula de Extrangeria</option>
          </Select>
          <Box color='red.300' width='100%' pl={5}  h='10px'>{validateForm.tipoId}</Box>
          <Input
            placeholder="Num. de cedula"
            name="numCedula"
            type="number"
            onChange={handleChange}
          />
          <Box color='red.300' width='100%' pl={5} h='10px'>{validateForm.numCedula}</Box>
          <Input
            placeholder="Password"
            name="password"
            type="password"
            onChange={handleChange}
          />
          <Box color='red.300' width='100%' pl={5} h='10px'>{validateForm.password}</Box>
          <Input
            placeholder="Check password"
            name="checkPassword"
            type="password"
            onChange={handleChange}
          />
          <Box color='red.300' width='100%' pl={5} h='10px'>{validateForm.passwordCheck}</Box>
          <Button disabled={!isValidedForm} type="submit" width="7rem">
            Sing Up
          </Button>
        </Flex>
      </form>
    </Flex>
  );
};
