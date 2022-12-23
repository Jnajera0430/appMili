import React, { useEffect, useState } from "react";
import {
  Tbody,
  Th,
  Thead,
  Tr,
  Table,
  TableContainer,
  Box,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Celdas from "./celdas";
export const TablaEnvUser = ({
  solicitado,
  deleteID,
  funcionSolicitud,
  idUser,
}) => {
  const [eliminaSoli, setEliminaSoli] = useState(false);
  console.log(solicitado)
  return (
    <Box p="10px" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <TableContainer border="1px solid black" w={"80%"}>
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
              {/* {solicitado.map((solicitud, _, arrSolicitud) => {
                return (
                  <Celdas
                    key={solicitud.id}
                    solicitud={solicitud}
                    deleteID={deleteID}
                    funcionSolicitud={funcionSolicitud}
                    arrSolicitud={arrSolicitud}
                    idUser={idUser}
                    eliminaSoli={eliminaSoli}
                    setEliminaSoli={setEliminaSoli}
                  />
                );
              })}  */}
            </Tbody>
          </Table>
        </TableContainer>
        {eliminaSoli ? (
          <Box
            w={"98%"}
            display="flex"
            justifyContent={"end"}
            height="100px"
            alignItems={"center"}
          >
            <Alert
              status="success"
              variant="solid"
              top={"10px"}
              height={10}
              w={"auto"}
            >
              <AlertIcon />
              Solicitud eliminada con exito!
            </Alert>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};

export default TablaEnvUser;
