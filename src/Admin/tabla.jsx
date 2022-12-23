import { Button, Input, Td, Tr } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdDelete, MdTaskAlt } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { VscError } from "react-icons/vsc";
import { AiOutlineCloudDownload } from "react-icons/ai";
export default function Tabla({
  solicitud,
  deleteID,
  aprobarState,
  Solicitud,
  token
}) {
  const { user } = solicitud;
  const [formEdit, setFormEdit] = useState(false);
  const [datos, setDatos] = useState({});
  const [vinculo, setVinculo] = useState({
    link: null,
  });
  const handleButtonEdit = () => {
    setFormEdit(!formEdit);
  };
  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditSolicitud = async (solicitudId) => {
    try {
      const solicitud = {
        method: "PUT",
        headers: { "Content-Type": "application/json","token": token },
        body: JSON.stringify(datos),
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
    setFormEdit(false);
  };

  const downloadDocument = async (idUser) => {
    const requestDocument = {
      method: "GET",
      headers:{token}
    };

    await fetch(`http://localhost:8000/api/index/${idUser}`, requestDocument)
      .then((response) => response.json())
      .then((data) => setVinculo(data));
  };

  return (
    <Tr>
      {formEdit ? (
        <>
          <Td>
            <Input disabled defaultValue={user.nombre} />
          </Td>
          <Td>
            <Input disabled defaultValue={user.email} />
          </Td>
          <Td>
            <Input disabled defaultValue={user.Apellidos} />
          </Td>
          <Td>
            <Input disabled defaultValue={user.NumCedula} />
          </Td>
          <Td>
            <Input disabled defaultValue={user.Telefono} />
          </Td>
          <Td>
            <Input textAlign="center" disabled defaultValue={user.Edad} />
          </Td>
          <Td>
            <Input textAlign="center" disabled defaultValue={user.sexo} />
          </Td>
          <Td>
            <Input
              defaultValue={solicitud.NombreEmpresa}
              onChange={handleInputChange}
              name="NombreEmpresa"
            />
          </Td>
          <Td>
            <Input
              defaultValue={solicitud.nitEmpresa}
              onChange={handleInputChange}
              name="nitEmpresa"
            />
          </Td>
          <Td>
            <Input
              defaultValue={solicitud.EstadiaEnEmpresa}
              onChange={handleInputChange}
              name="EstadiaEnEmpresa"
            />
          </Td>
          <Td>
            <Input
              defaultValue={solicitud.Monto}
              onChange={handleInputChange}
              name="Monto"
            />
          </Td>
          <Td color={solicitud.estado ? "green.300" : "red.300"}>
            {solicitud.estado ? <b>Aprobado</b> : <b> No aprobado</b>}
          </Td>
          <Td display={"flex"} gap={"10px"} justifyContent="center">
            <Button
              type="submit"
              onClick={() => handleEditSolicitud(solicitud.id)}
              title="Confirmar"
            >
              <FiEdit className="edit" />
            </Button>
            <Button
              type="submit"
              onClick={() => setFormEdit(false)}
              title="Cancelar"
            >
              <VscError className="delete" />
            </Button>
          </Td>
        </>
      ) : (
        <>
          <Td textAlign={"center"}>{user.nombre}</Td>
          <Td textAlign={"center"}>{user.email}</Td>
          <Td textAlign={"center"}>{user.Apellidos}</Td>
          <Td textAlign={"center"}>{user.NumCedula}</Td>
          <Td textAlign={"center"}>{user.Telefono}</Td>
          <Td textAlign={"center"}>{user.Edad}</Td>
          <Td textAlign={"center"}>{user.sexo}</Td>
          <Td textAlign={"center"}>{solicitud.NombreEmpresa}</Td>
          <Td textAlign={"center"}>{solicitud.nitEmpresa}</Td>
          <Td textAlign={"center"}>{solicitud.EstadiaEnEmpresa}</Td>
          <Td textAlign={"center"}>{solicitud.Monto}</Td>
          <Td color={solicitud.estado ? "green.300" : "red.300"}>
            {solicitud.estado ? <b>Aprobado</b> : <b> No aprobado</b>}
          </Td>
          <Td textAlign={"center"}>
            {vinculo.link ? (
              <>
              <Button type="submit">

                  <a href={vinculo.link}><AiOutlineCloudDownload color="blue"></AiOutlineCloudDownload></a>
              </Button>
                
              </>
            ) : (
              <>
                {user.img}
                <Button
                  onClick={() => downloadDocument(user.idUser)}
                  background="transparent"
                >
                  <AiOutlineCloudDownload color="blue"></AiOutlineCloudDownload>
                </Button>
              </>
            )}
          </Td>
          <Td display={"flex"} gap={"10px"}>
            <Button
              type="submit"
              onClick={() => aprobarState(solicitud.id, solicitud.estado)}
              title="Aprobar/Desaprobar Solicitud"
            >
              {solicitud.estado ? (
                <VscError className="error" />
              ) : (
                <MdTaskAlt className="acceptar-solicitud" />
              )}
            </Button>
            <Button
              className="edit"
              title="Editar Solicitud"
              onClick={handleButtonEdit}
            >
              <FiEdit />
            </Button>
            <Button
              type="submit"
              onClick={() => deleteID(solicitud.id)}
              title="Eliminar Solicitud"
            >
              <MdDelete className="delete" />
            </Button>
          </Td>
        </>
      )}
    </Tr>
  );
}
