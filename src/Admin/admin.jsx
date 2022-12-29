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
  const [dataSolicitudes, setDataSolicitudes] = useState([]);
  const datosUser = JSON.parse(localStorage.getItem("user"));
  const {
    data: allSolicitudes,
    isError,
    error,
    isSuccess,
  } = useGetAllSolicitudesQuery(datosUser.token);
  if (isError) return console.log(error);

  useEffect(() => {
    const obtenerTodaSolicitud = () => {
      if (isSuccess) {
        setDataSolicitudes(allSolicitudes);
      }
    };
    obtenerTodaSolicitud();
  }, [allSolicitudes]);

  return (
    <Box height={"95vh"} p="10px" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <b>Lista de solicitudes de creditos</b>
        <TableContainer boxShadow={"0px 0px 8px  #5a5a5a"}>
          <Table size="sm">
            <Thead bg="#93dbb4">
              <Tr>
                <Th textAlign="center" color="black">
                  Nombre
                </Th>
                <Th textAlign="center" color="black">
                  Apellidos
                </Th>
                <Th textAlign="center" color="black">
                  Email
                </Th>
                <Th textAlign="center" color="black">
                  C.C
                </Th>
                <Th textAlign="center" color="black">
                  Telefono
                </Th>
                <Th textAlign="center" color="black">
                  Edad
                </Th>
                <Th textAlign="center" color="black">
                  Sexo
                </Th>
                <Th textAlign="center" color="black">
                  Nombre Empresa
                </Th>
                <Th textAlign="center" color="black">
                  Nit Empresa
                </Th>
                <Th textAlign="center" color="black">
                  Estadia en Empresa
                </Th>
                <Th textAlign="center" color="black">
                  Monto
                </Th>
                <Th textAlign="center" color="black">
                  Estado
                </Th>
                <Th textAlign="center" color="black">
                  Documento
                </Th>
                <Th textAlign="center" color="black">
                  Acciones
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {dataSolicitudes.map((solicitud) => {
                return (
                  <Tabla
                    key={solicitud.id}
                    solicitud={solicitud}
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
