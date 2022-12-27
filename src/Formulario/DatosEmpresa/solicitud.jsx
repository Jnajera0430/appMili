import { Input, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
  const [userLogin, setUserLogin]=useState({});
  const handleChange = (e) => {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      iduser: user.idUser,
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
      headers: { "Content-Type": "application/json","token":userLogin.token  },
      body: JSON.stringify(input),
    };

    fetch("http://localhost:8000/api/solicitudes", requesInit)
    .then((response) => response.json())
    .catch((err) => err.json);


    // downloadDocument();
    e.target.reset();
    setTimeout(() => {
      window.location.reload();  
           },700) 
  };
  useEffect(() => {
    const  payload = JSON.parse(localStorage.getItem('user'));
    const requesInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json","token":payload.token  } 
    };
    fetch("http://localhost:8000/api/users/myself", requesInit)
      .then((response) => response.json())
      .then((res) => setuser(res))
      .catch((err) => err.json);
      setUserLogin(payload);
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
