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
import React, { useEffect, useState } from "react";
import "./admin.css";
import Tabla from "./tabla";



export default function Admin() {
  const [solicitado, setSolicitado] = useState([])

  const Solicitud = async()=>{
    

    const dataSoli =  await fetch('http://localhost:8000/api/unionU_S');
    const user = await dataSoli.json();
    console.log(user);
    setSolicitado(user);
  }
  useEffect(() => {
    Solicitud()
  },[])
  return (
    <Box height={"95vh"}  p="10px" justifyContent="center" alignItems="center">
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" >

      <TableContainer border="1px solid black">
      <p>Lista de solicitudes de creditos</p>
      <hr/>
        <Table size="sm" >
          
          <Thead>
            <Tr>
              <Th textAlign="center">Nombre</Th>
              <Th textAlign="center">Email</Th>
              <Th textAlign="center">Apellidos</Th>
              <Th textAlign="center">C.C</Th>
              <Th textAlign="center">Telefono</Th>
              <Th textAlign="center">Edad</Th>
              <Th textAlign="center">Sexo</Th>
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
                return <Tabla key={solicitud.id} solicitud={solicitud}/>
              })
            }
          </Tbody>
        </Table>
      </TableContainer>
            </Box>
    </Box>
  );
}
