import { Box, Button, Input, Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserIsAllowed } from "../../features/appMili/appmiliSlice";
import { Solicitud } from "../DatosEmpresa/solicitud";

import TablaEnvUser from "../TablaDeEnvio/tabla-env-user";
import "./forms.css";
import { SingUp } from "../../components/SingUp";
const options = [
  
  { value: 'F', label: 'F' },
]


function Form() {

  const dispatch = useDispatch();
  const [user,setUser] = useState([])
  const [datos,setdatos] = useState({})

  console.log(datos);
  useEffect(() => {
    const objs = dispatch(getUserIsAllowed());
    const requesInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: objs.payload.email }),
    };
    fetch("http://localhost:8000/api/users", requesInit)
      .then((response) => response.json())
      .then((res) => setUser(res[0]))
      .catch((err) => err.json);
  }, []);

  const handleChange =(e)=>{
    setdatos({...datos,[e.target.name]:e.target.value})
  }

  const handleSubmitUser =(e)=>{
    e.preventDefault();
    const users = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    };
      fetch(`http://localhost:8000/api/users/${user.idUser}`,users);
      alert('datos guardados');
      
  }
  return (
    <Box width="100%" height="95vh" display="flex" flexDirection="column">
      <header>
        <h1>SOLICITUD DE PRESTAMO</h1>
      </header>
      <Box>
        Datos Personales
        <form onSubmit={handleSubmitUser}>
          <div className="form-group">
            <div className="form-group-complet">
              <div className="items">
                <label>Nombre(s) </label>
                <Input
                  name="NumCedula"
                  disabled
                  defaultValue={user.nombre}
                  borderColor="teal"
                  color="black"
                />
              </div>

              <div className="items">
                <label>Apellidos </label>
                <Input
                  name="Apellidos"
                  disabled
                  defaultValue={user.Apellidos}
                  borderColor="teal"
                  color="black"
                />
              </div>

              <div className="items">
                <label>Cedula </label>
                <Input
                  name="NumCedula"
                  disabled
                  defaultValue={user.NumCedula}
                  borderColor="teal"
                  color="black"
                />
              </div>
              <div className="items">
                <label>Email </label>
                <Input
                  name="email"
                  disabled
                  defaultValue={user.email}
                  borderColor="teal"
                  color="black"
                />
              </div>
            </div>

            <div className="form-group-complet">
            <div className="items">
                <label>Tipo de documento </label>
                <Input
                  name="email"
                  disabled
                  defaultValue={user.TipoDocumento}
                  borderColor="teal"
                  color="black"
                />
              </div>
            <div className="items">
                <label>Telefono </label>
                <Input
                  name="email"
                  type="number"
                  borderColor="teal"
                  color="teal"
                  placeholder="Telefono"
                  _placeholder={{ color: "inherit" }}
                  defaultValue={user.Telefono ? user.Telefono:''}
                  disabled={user.Telefono ? true : false}
                  onChange={handleChange}
                />
              </div>

              <div className="items">
                <label>Edad </label>
                <Input
                  name="Edad"
                  type="number"
                  borderColor="teal"
                  color="teal"
                  placeholder="Edad"
                  _placeholder={{ color: "inherit" }}
                  defaultValue={user.Edad ? user.Edad : ''}
                  disabled={user.Edad ? true : false}
                  onChange={handleChange}
                />
              </div>

              <div className="items">
                <label>Sexo </label>
                <Select
                  name="sexo"
                  borderColor="teal"
                  color="teal"
                  placeholder={user.sexo ? user.sexo:'Seleccionar'}
                  _placeholder={{ color: "inherit" }}
                  defaultValue={user.sexo ? user.sexo:''}
                  disabled={user.sexo ? true : false}
                  options={options}
                  onChange={handleChange}
                >
                  <option value="M">M</option>
                  <option value="F">F</option>
                </Select>
              </div>
            </div>
          </div>
        </form>
      </Box>
      <br />
      <Box>
        <Solicitud handleSubmitUser={handleSubmitUser}/>
      </Box>
      <TablaEnvUser />
    </Box>
  );
}

export default Form;
