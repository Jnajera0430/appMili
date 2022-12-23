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
import { useDispatch } from "react-redux";
import { getUserIsAllowed } from "../features/appMili/appmiliSlice";
import "./admin.css";
import Tabla from "./tabla";

export default function Admin() {
  const dispatch = useDispatch();
  const [solicitado, setSolicitado] = useState([]);
  const [user, setUser] = useState(null);
  

  const Solicitud = async () => {
    const { payload } = dispatch(getUserIsAllowed());
    setUser(payload)
    const request = {
      headers: {
        token: payload?.token,
      },
    };
    const dataSoli = await fetch("http://localhost:8000/api/unionU_S", request);
    const dataUser = await dataSoli.json();

    setSolicitado(dataUser);
  };

  const deleteID = async (deleteID) => {
    try {
      const { token } = user;
      const request = {
        method: "DELETE",
        body: JSON.stringify({
          token,
        }),
        headers: {
          "token": user?.token,
        }
      };
      await fetch(`http://localhost:8000/api/solicitudes/${deleteID}`, request);
      alert("solicitud eliminada");
      Solicitud();
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
      Solicitud();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(  () => {
    Solicitud();
  }, []);
 
    
 
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
                    Solicitud={Solicitud}
                    token={user.token}
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
