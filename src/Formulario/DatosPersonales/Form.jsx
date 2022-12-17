import { Box, Button, Input } from "@chakra-ui/react";
import React from "react";
import Solicitud from "../DatosEmpresa/solicitud";
import TablaEnvUser from "../TablaDeEnvio/tabla-env-user";
import "./forms.css";
function Form() {
  return (
    <Box width="100%" height="95vh" display="flex" flexDirection="column" >
      <header>
        <h1>SOLICITUD DE PRESTAMO</h1>
      </header>
<Box>

      Datos Personales
      <form action="">
        <div className="form-group">
          <div className="form-group-complet">
            <div className="items">
              <label>Nombre(s) </label>
              <Input 
              borderColor="teal"
              color="black"
              
              />
            </div>

            <div className="items">
              <label>Apellido </label>
              <Input
              borderColor="teal"
              color="black"
              
              />
            </div>
            
            <div className="items">
              <label>Cedula </label>
              <Input
              borderColor="teal"
              color="black"
              
              />
            </div>
            <div className="items">
              <label>Telefono </label>
              <Input
              borderColor="teal"
              color="black"
              
              />
            </div>
          </div>

          <div className="form-group-complet">
            <div className="items">
              <label>Email </label>
              <Input
              borderColor="teal"
              color="black"
              
              />
            </div>
          
          
            <div className="items">
              <label>Edad </label>
              <Input
              borderColor="teal"
              color="black"
              
              />
            
            </div>
          
            <div className="items">
              <label>Sexo </label>
              <Input
              borderColor="teal"
              color="black"
              
              />
            </div>

          </div>
          
        </div>
      </form>
              </Box>
      <br />
      <Box>
        

      <Solicitud/>
      </Box>
      <TablaEnvUser/>
              </Box>

  );
}

export default Form;
