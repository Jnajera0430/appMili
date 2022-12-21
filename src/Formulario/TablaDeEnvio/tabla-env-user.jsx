import React, { useEffect, useState } from "react";
import {
  Tbody,
  Th,
  Thead,
  Tr,
  Table,
  TableContainer,
  Box,
} from "@chakra-ui/react";
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
        <TableContainer border="1px solid black" w={"80%"} >
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
              solicitado.map((solicitud,_,arrSolicitud)=>{
                
                return <Celdas key={solicitud.id} solicitud={solicitud}  deleteID={deleteID} funcionSolicitud={funcionSolicitud} arrSolicitud={arrSolicitud} idUser={idUser}/>
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
