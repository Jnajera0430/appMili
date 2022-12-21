import { Input, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getUserIsAllowed } from "../../features/appMili/appmiliSlice";

export const Solicitud = ({ handleSubmitUser ,downloadDocument}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState();
  const [user, setuser] = useState({});
  
  const [validaDatos, setValidaDatos] = useState({
    NombreEmpresa: undefined,
    nitEmpresa: undefined,
    EstadiaEnEmpresa: undefined,
    fecha: undefined,
    Monto: undefined,
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      iduser: user[0].idUser,
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
  const handleSubmit = (e) => {
    e.preventDefault();
    //consulta
    const requesInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    };

    fetch("http://localhost:8000/api/solicitudes", requesInit)
    .then((response) => response.json())
    .catch((err) => err.json);


    downloadDocument();
    e.target.reset();
    window.location.reload(); 
  };
  useEffect(() => {
    const objs = dispatch(getUserIsAllowed());
    const requesInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: objs.payload.email }),
    };
    fetch("http://localhost:8000/api/users", requesInit)
      .then((response) => response.json())
      .then((res) => setuser(res))
      .catch((err) => err.json);
  }, []);

  const isValidedForm = Object.keys(validaDatos).every(
    (key) => validaDatos[key] === ""
  );

  return (
    <Box width="auto">
           <header>
        <h1><b>REQUERMIENTOS DE PRESTAMO</b></h1>
      </header>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
          handleSubmitUser(e);
        }}
      >
        <div className="form-group">
          <div className="form-group-complet">
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
              <span role="alert"><b>{validaDatos.NombreEmpresa}</b></span>
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
              <span role="alert"><b>{validaDatos.nitEmpresa}</b></span>
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
              <span role="alert"><b>{validaDatos.EstadiaEnEmpresa}</b></span>
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
              <span role="alert"><b>{validaDatos.Monto}</b></span>
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
            <span role="alert"><b>{validaDatos.fecha}</b></span>
            </div>
         
         
          </div>
          <div className="button">
            <Button
              colorScheme="green"
              type="submit" disabled={!isValidedForm} 
            >
              Solicitar
            </Button>
          </div>
        </div>
      </form>
    </Box>
  );
};
