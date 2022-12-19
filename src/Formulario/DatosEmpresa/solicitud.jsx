import { Input, Button, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { getUserIsAllowed } from "../../features/appMili/appmiliSlice";

export const Solicitud = ({handleSubmitUser}) => {
  const dispatch = useDispatch();
  const [book, setBook] = useState();
  const [user, setuser] = useState({});
  const handleChange = (e) => {
    /* e.preventDefault(); */
    setBook({
      ...book,
      [e.target.name]: e.target.value,
      iduser: user[0].idUser,
    });
  };
  const handleSubmit = (e) => {
    /* e.preventDefault(); */
    console.log(book);

    //consulta
    const requesInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    };

    fetch("http://localhost:8000/api/solicitudes", requesInit)
      .then((response) => response.json())
      .catch((err) => err.json);
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

  return (
    <Box width="auto">
      <form onSubmit={(e)=>{
        handleSubmit(e);
        handleSubmitUser(e);
        
        }}>
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
            </div>
            <div className="items">
              <label>Suber tu documento</label>
              <input type="file" /* name="archivosubido"  */ />
            </div>
          </div>
          <div className="button">
            <Button colorScheme="green" type="submit" >
              Solicitar
            </Button>
          </div>
        </div>
      </form>
    </Box>
  );
};
