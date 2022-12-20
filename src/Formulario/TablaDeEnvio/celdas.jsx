import { Button, Td, Tr } from "@chakra-ui/react";
import React from "react";
import { MdDelete, MdTaskAlt } from 'react-icons/md';
export default function Celdas({ solicitud, deleteID}) {


  return (
    <Tr > 
      <Td>{solicitud.NombreEmpresa}</Td>
      <Td>{solicitud.nitEmpresa}</Td>
      <Td>{solicitud.EstadiaEnEmpresa}</Td>
      <Td>{solicitud.Monto}</Td>
      <Td>{solicitud.estado ? <>Aprobado</> : <> No aprobado</>}</Td>
      <Td display={"flex"}>

        <Button type="submit">
        <MdTaskAlt className="acceptar-solicitud" />
        </Button>
        <Button type="submit" onClick={() => deleteID(solicitud.id)}>
          <MdDelete className="delete" />
        </Button>
        
      </Td>
    </Tr>
  );
}