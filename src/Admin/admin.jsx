import {
  Tbody,
  Th,
  Thead,
  Tr,
  Table,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useGetAllSolicitudesQuery } from "../app/appMiliSlice";
import "./admin.css";
import Tabla from "./tabla";

export default function Admin() {
  const [solicitado, setSolicitado] = useState([]);
  const [user, setUser] = useState(null);
  const datosUser  = JSON.parse(localStorage.getItem('user'))
  const {data:allSolicitudes,isError,error,isSuccess}=useGetAllSolicitudesQuery(datosUser.token);
  if (isError)return console.log(error);
  
  const deleteID = async (deleteID) => {
    try {
      const request = {
        method: "DELETE",
        headers: {
          "token": datosUser.token,
        }
      };
      await fetch(`http://localhost:8000/api/solicitudes/${deleteID}`, request);
      alert("solicitud eliminada");
    } catch (error) {
      console.log(error);
    }
  };
  const aprobarState = async (solicitudId, solicitadoEstado) => {
    try {
      const { token } = user;
      const solicitud = {
        method: "PUT",
        headers: { "Content-Type": "application/json","token":user?.token },
        body: JSON.stringify({
          estado: !solicitadoEstado,
          token,
        }),
      };
      await fetch(
        `http://localhost:8000/api/solicitudes/${solicitudId}`,
        solicitud
      );
      alert("estado actualizado");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(  () => {
    const algo = ()=>{
      if (isSuccess) {
        console.log(allSolicitudes);
        setSolicitado(allSolicitudes);
      }

    }
    algo();
  }, [allSolicitudes]);

    
 
  return (
    <Box height={"95vh"} p="10px" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <TableContainer border="1px solid black">
          <p>Lista de solicitudes de creditos</p>
          <hr />
          <Table size="sm">
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
                <Th textAlign="center">Documento</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {solicitado.map((solicitud) => {
                return (
                  <Tabla
                    key={solicitud.id}
                    solicitud={solicitud}
                    deleteID={deleteID}
                    aprobarState={aprobarState}
                    token={datosUser.token}
                  />
                );
              })} 
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
