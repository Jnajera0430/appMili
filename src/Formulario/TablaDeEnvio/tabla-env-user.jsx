import React from 'react';
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
const TablaEnvUser = () => {
    return (
        <Box height={"95vh"}  p="10px" justifyContent="center" alignItems="center">
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" >
  
        <TableContainer border="1px solid black">
        <p>Tus solicitudes</p>
        <hr/>
          <Table size="sm" >
            
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
{/*               {
                solicitudes.map(solicitud=>{
                  console.log(solicitud.estado);
                  return <Tabla key={solicitud.id} solicitud={solicitud}/>
                })
              } */}
            </Tbody>
          </Table>
        </TableContainer>
              </Box>
      </Box>
    );
}

export default TablaEnvUser;
