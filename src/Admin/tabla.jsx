import { Button, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { MdDelete, MdTaskAlt } from 'react-icons/md';
export default function Tabla({ solicitud }) {
  const{user}=solicitud;
  return (
    <Tr > 
      <Td>{user.nombre}</Td>
      <Td>{user.email}</Td>
      <Td>{user.Apellidos}</Td>
      <Td>{user.NumCedula}</Td>
      <Td>{user.Telefono}</Td>
      <Td>{user.Edad}</Td>
      <Td>{user.sexo}</Td>
      <Td>{solicitud.NombreEmpresa}</Td>
      <Td>{solicitud.nitEmpresa}</Td>
      <Td>{solicitud.EstadiaEnEmpresa}</Td>
      <Td>{solicitud.Monto}</Td>
      <Td>{solicitud.estado ? <>Aprobado</> : <> No aprobado</>}</Td>
      <Td display={"flex"}>

        <Button type="submit">
        <MdTaskAlt className="acceptar-solicitud"/>
        </Button>
        <Button type="submit">
          <MdDelete className="delete"/>
        </Button>
        
      </Td>
    </Tr>
  );
}
