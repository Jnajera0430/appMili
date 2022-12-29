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
export const TablaEnvUser = ({ solicitado }) => {
  const [datosSolicitud, setDatosSolicitud] = useState([]);
  const [eliminaSoli, setEliminaSoli] = useState(false);
  useEffect(() => {
    setDatosSolicitud(solicitado);
  }, [solicitado]);
  console.log();
  return (
    <>
    {eliminaSoli ? (
          <Box
            w={"98%"}
            display="flex"
            justifyContent={"end"}
            height="100px"
            alignItems={"center"}
            position="absolute"
            top={"10px"}
          >
            <Alert
              status="success"
              variant="solid"
              top={"70%"}
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
  
    <Box p="10px" justifyContent="center" alignItems="center">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <b>TUS SOLICITUDES</b>
        <TableContainer w={"80%"} boxShadow={"0px 0px 8px  #5a5a5a"}>
          <Table>
            <Thead bg="#93dbb4">
              <Tr>
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
                  Acciones
                </Th>
              </Tr>
            </Thead>
            <Thead width="100%" textAlign={"center"}>
              {datosSolicitud.length === 0 ? (
                <b>NO TIENES SOLICITUDES</b>
              ) : null}
            </Thead>
            <Tbody>
              {datosSolicitud === "token not foud" ? (
                <b>No hay datos</b>
              ) : (
                <>
                  {datosSolicitud.map((solicitud, _, arrSolicitud) => {
                    return (
                      <Celdas
                        key={solicitud.id}
                        solicitud={solicitud}
                        arrSolicitud={arrSolicitud}
                        eliminaSoli={eliminaSoli}
                        setEliminaSoli={setEliminaSoli}
                      />
                    );
                  })}
                </>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        
      </Box>
    </Box>
    </>
  );
};

export default TablaEnvUser;
