import { Input, Button, Box, AlertIcon, Alert } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useCreateNewSolicitudMutation, useUpDateUserMutation } from "../../app/appMiliSlice";

export const Solicitud = ({ datosUser, downloadDocument,datosUserEdit }) => {
  console.log(datosUser);
  const userDatos = JSON.parse(localStorage.getItem("user"));
  console.log(userDatos.token);
  const [input, setInput] = useState({});
  const [alerSoliEnv, setAlerSoliEnv] = useState(false);
  console.log(input);
  const [validaDatos, setValidaDatos] = useState({
    NombreEmpresa: undefined,
    nitEmpresa: undefined,
    EstadiaEnEmpresa: undefined,
    fecha: undefined,
    Monto: undefined,
  });
  const [upDateUser, { isError: isErrorEdit, error: errorEditUser }] =
    useUpDateUserMutation();
  if (isErrorEdit)return console.log(errorEditUser);
  const [createNewSolicitud,{isError:isErrorSolNew,error:errorSolNew}] = useCreateNewSolicitudMutation();
  if(isErrorSolNew)return console.log(errorSolNew);
  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      iduser: datosUser.idUser,
    });

    if (
      e.target.name == "NombreEmpresa" ||
      e.target.name == "nitEmpresa" ||
      e.target.name == "EstadiaEnEmpresa" ||
      e.target.name == "Monto" ||
      e.target.name == "fecha"
    ) {
      setValidaDatos({
        ...validaDatos,
        [e.target.name]: e.target.value.length > 0 ? "" : "Value is required",
      });
    }
  };

  const isValidedForm = Object.keys(validaDatos).every(
    (key) => validaDatos[key] === ""
  );

  return (
    <Box width="auto">
      {alerSoliEnv ? (
            <Box
              w={"80%"}
              display="flex"
              justifyContent={"end"}
              height="100px"
              alignItems={"center"}
              position="fixed"
              top={"40px"}
            >
              <Alert
                status="success"
                variant="solid"
                top={"10px"}
                height={10}
                w={"auto"}
              >
                <AlertIcon />
                Solicitud generada con exito
              </Alert>
            </Box>
          ) : (
            <></>
          )}
      <header>
        <h1>
          <b>REQUERMIENTOS DE PRESTAMO</b>
        </h1>
      </header>
      <form
        onSubmit={(e) => {
            e.preventDefault();
            if(datosUserEdit) upDateUser({idUser:datosUser.idUser, token:userDatos.token, datos:datosUserEdit} )
            if(input)createNewSolicitud({token:userDatos.token,datosSolicitud:input}); 
            setTimeout(() => {
              setAlerSoliEnv(true);
              setTimeout(() => {
              setAlerSoliEnv(true);
                window.location.reload()
              }, 1000);
            },0);
            e.target.reset();
        }}
      >
        <div className="form-group">
          <div className="form-group-completado">
            <div className="items">
              <label>Nombre de la empresa </label>
              <Input
                onChange={handleChange}
                name="NombreEmpresa"
                borderColor="teal"
                color="black"
                placeholder="Nombre de la empresa"
                _placeholder={{ color: "inherit" }}
              />
              <span role="alert">
                <b>{validaDatos.NombreEmpresa}</b>
              </span>
            </div>
            <div className="items">
              <label>Nit </label>
              <Input
                onChange={handleChange}
                type="number"
                name="nitEmpresa"
                borderColor="teal"
                color="black"
                placeholder="Nit"
                _placeholder={{ color: "inherit" }}
              />
              <span role="alert">
                <b>{validaDatos.nitEmpresa}</b>
              </span>
            </div>
            <div className="items">
              <label>Estancia en la empresa </label>
              <Input
                onChange={handleChange}
                name="EstadiaEnEmpresa"
                borderColor="teal"
                color="black"
                placeholder="Estancia en la empresa"
                _placeholder={{ color: "inherit" }}
              />
              <span role="alert">
                <b>{validaDatos.EstadiaEnEmpresa}</b>
              </span>
            </div>
            <div className="items">
              <label>Monto </label>
              <Input
                onChange={handleChange}
                name="Monto"
                type="number"
                borderColor="teal"
                color="black"
                placeholder="Monto"
                _placeholder={{ color: "inherit" }}
              />
              <span role="alert">
                <b>{validaDatos.Monto}</b>
              </span>
            </div>
          </div>
          <div className="form-group-complet">
            <div className="items">
              <label>Fecha </label>
              <Input
                onChange={handleChange}
                name="fecha"
                type="date"
                borderColor="teal"
                color="black"
                placeholder="Estancia en la empresa"
                _placeholder={{ color: "inherit" }}
              />
              <span role="alert">
                <b>{validaDatos.fecha}</b>
              </span>
            </div>
          </div>
          <div className="button">
            <Button colorScheme="green" type="submit"  disabled={!isValidedForm} >
              Solicitar
            </Button>
          </div>
        </div>
      </form>
    </Box>
  );
};
