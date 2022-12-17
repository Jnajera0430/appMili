import { Input, Button, Box } from "@chakra-ui/react";
import React from "react";

export default function Solicitud() {
  
  return (
    <Box width="auto">
      <form >
        <div className="form-group">
          <div className="form-group-complet">
            <div className="items">
              <label>Nombre de la empresa </label>
              <Input
                name="name"
                borderColor="teal"
                color="black"
                placeholder="Nombre de la empresa"
                _placeholder={{ color: "inherit" }}
              />
            </div>

            <div className="items">
              <label>Nit </label>
              <Input
                name="nit"
                borderColor="teal"
                color="black"
                placeholder="Nit"
                _placeholder={{ color: "inherit" }}
              />
            </div>
            <div className="items">
              <label>Estancia en la empresa </label>
              <Input
                name="estancia"
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
                name="monto"
                type="number"
                borderColor="teal"
                color="black"
                placeholder="Monto"
                _placeholder={{ color: "inherit" }}
              />
            </div>
            <div className="items">
              <label>Suber tu documento</label>
              <input type="file" name="archivosubido" />
            </div>
          </div>
          <div className="button">
            <Button colorScheme="green">Solicitar</Button>
          </div>
        </div>
      </form>
    </Box>
  );
}
