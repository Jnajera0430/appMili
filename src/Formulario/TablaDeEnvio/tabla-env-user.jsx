import React, { useEffect, useState } from "react";
import {
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Table,
  TableContainer,
  Button,
  Box,
} from "@chakra-ui/react";
import { MdDelete, MdTaskAlt } from "react-icons/md";
import Celdas from "./celdas";
export const TablaEnvUser = ({solicitado, deleteID, funcionSolicitud ,idUser}) => {
  
  return (
    <Box p="10px" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <TableContainer border="1px solid black">
          <p>Tus solicitudes</p>
          <hr />
          <Table size="sm">
            <Thead>
              <Tr>
                <Th textAlign="center">Nombre Empresa</Th>
                <Th textAlign="center">Nit Empresa</Th>
                <Th textAlign="center">Estadia en Empresa</Th>
                <Th textAlign="center">Monto</Th>
                <Th textAlign="center">Estado</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
            {
              solicitado.map(solicitud=>{
                
                return <Celdas key={solicitud.id} solicitud={solicitud}  deleteID={deleteID} funcionSolicitud={funcionSolicitud} idUser={idUser}/* aprobarState={aprobarState} *//>
              })
            }
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default TablaEnvUser;
