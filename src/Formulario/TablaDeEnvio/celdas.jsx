import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Td,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDelete, MdTaskAlt } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
import { useDeleteSolicitudByIdUserMutation, useUpDateSolicitudByIdMutation } from "../../app/appMiliSlice";
export default function Celdas({
  solicitud = null,
  arrSolicitud,
  setEliminaSoli,
  eliminaSoli,
}) {
  const { token } = JSON.parse(localStorage.getItem("user"));
  const [formEdit, setFormEdit] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [datos, setDatos] = useState({});
  const [deleteID, { isError: isErrorDeleteIdUser, error: errorDeleteIdUser }] =
    useDeleteSolicitudByIdUserMutation();
  if (isErrorDeleteIdUser) return console.log(errorDeleteIdUser);
  const [handleEditSolicitud,{isError:isErrorEditSol,error:errorEditSol}]=useUpDateSolicitudByIdMutation();
  if(isErrorEditSol)return console.log(errorEditSol);
  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const handleButtonEdit = () => {
    setFormEdit(!formEdit);
  };

  return (
    <>
      <Tr bg="#f9f9f9">
        {arrSolicitud.length !== 0 ? (
          <>
            {formEdit ? (
              <>
                <Td>
                  <Input
                    defaultValue={solicitud.NombreEmpresa}
                    onChange={handleInputChange}
                    name="NombreEmpresa"
                    borderColor= "#93dbb4"
                    textAlign={"center"}
                  />
                </Td>
                <Td>
                  <Input
                    defaultValue={solicitud.nitEmpresa}
                    onChange={handleInputChange}
                    name="nitEmpresa"
                    borderColor= "#93dbb4"
                    textAlign={"center"}

                  />
                </Td>
                <Td >
                  <Input
                    defaultValue={solicitud.EstadiaEnEmpresa}
                    onChange={handleInputChange}
                    name="EstadiaEnEmpresa"
                    borderColor= "#93dbb4"
                    textAlign={"center"}

                  />
                </Td>
                <Td>
                  <Input
                    defaultValue={solicitud.Monto}
                    onChange={handleInputChange}
                    name="Monto"
                    borderColor= "#93dbb4"
                    textAlign={"center"}
                  />
                </Td>
                <Td
                  textAlign="center"
                  color={solicitud.estado ? "green.300" : "red.300"}
                >
                  {solicitud.estado ? <b>Aprobado</b> : <b> No aprobado</b>}
                </Td>
                <Td
                  display={"flex"}
                  gap={2}
                  justifyContent="center"
                  alignContent={"center"}
                >
                  <Button
                    type="submit"
                    onClick={() =>{
                      handleEditSolicitud({id:solicitud.id,token,body:datos});
                      setFormEdit(false);
                    }} 
                    title="Confirmar"
                    bg="transparent"
                  >
                    <FiEdit className="edit" />
                  </Button>
                  <Button
                    type="submit"
                    onClick={() => setFormEdit(false)}
                    title="Cancelar"
                    bg="transparent"
                  >
                    <VscError className="delete" />
                  </Button>
                </Td>
              </>
            ) : (
              <>
                <Td textAlign="center">{solicitud.NombreEmpresa}</Td>
                <Td textAlign="center">{solicitud.nitEmpresa}</Td>
                <Td textAlign="center">{solicitud.EstadiaEnEmpresa}</Td>
                <Td textAlign="center">{solicitud.Monto}</Td>
                <Td
                  textAlign="center"
                  color={solicitud.estado ? "green.300" : "red.300"}
                >
                  {solicitud.estado ? <b>Aprobado</b> : <b> No aprobado</b>}
                </Td>
                <Td display={"flex"} gap={2} justifyContent="center">
                  <Button
                    type="submit"
                    onClick={handleButtonEdit}
                    bg="transparent"
                  >
                    <FiEdit className="acceptar-solicitud" />
                  </Button>
                  <Button onClick={onOpen} bg="transparent">
                    <MdDelete className="delete" />
                  </Button>
                </Td>
              </>
            )}
          </>
        ) : (
          <>
            <Td textAlign="center">NO HAY DATOS</Td>
          </>
        )}
      </Tr>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>
            ¿Está seguro que desea eliminar?
          </ModalHeader>
          <ModalCloseButton />

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="red"
              color={"white"}
              type="submit"
              onClick={() => {
                deleteID({ solicitudId: solicitud.id, token });
                setTimeout(() => {
                  setEliminaSoli(!eliminaSoli);
                  setTimeout(() => {
                    setEliminaSoli(eliminaSoli);
                  }, 1000);
                }, 0);
              }}
            >
              ELIMINAR
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
