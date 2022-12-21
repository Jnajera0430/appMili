import { Button, Input, Td, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDelete, MdTaskAlt } from "react-icons/md";
import { VscError } from "react-icons/vsc";
import { FiEdit } from "react-icons/fi";
export default function Celdas({
  solicitud,
  deleteID,
  funcionSolicitud,
  idUser,
  arrSolicitud
}) {
  console.log();
  const [formEdit, setFormEdit] = useState(false);
  const [datos, setDatos] = useState({});
  const handleInputChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };
  const handleButtonEdit = () => {
    setFormEdit(!formEdit);
  };
  const handleEditSolicitud = async (idSolicitud) => {
    try {
      const solicitud = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      };
      await fetch(
        `http://localhost:8000/api/solicitudes/${idSolicitud}`,
        solicitud
      );
      alert("estado actualizado");
      funcionSolicitud(idUser);
    } catch (error) {
      console.log(error);
    }

    setFormEdit(false);
  };
  return (
    <Tr >
      {arrSolicitud ? (
        <>
          {formEdit ? (
            <>
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
              <Td >
                <Input
                  defaultValue={solicitud.Monto}
                  onChange={handleInputChange}
                  name="Monto"
                />
              </Td>
              <Td>{solicitud.estado ? <>Aprobado</> : <> No aprobado</>}</Td>
              <Td display={"flex"} gap={2} justifyContent="center" alignContent={"center"}>
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
              <Td textAlign="center">{solicitud.NombreEmpresa} </Td>
              <Td textAlign="center">{solicitud.nitEmpresa}</Td>
              <Td textAlign="center">{solicitud.EstadiaEnEmpresa}</Td>
              <Td textAlign="center">{solicitud.Monto}</Td>
              <Td textAlign="center">{solicitud.estado ? <>Aprobado</> : <> No aprobado</>}</Td>
              <Td display={"flex"} gap={2} justifyContent="center">
                <Button type="submit" onClick={handleButtonEdit}>
                  <FiEdit className="acceptar-solicitud" />
                </Button>
                <Button type="submit" onClick={() => deleteID(solicitud.id)}>
                  <MdDelete className="delete" />
                </Button>
              </Td>
            </>
          )}
        </>
      ) : (
        <>
          <Tr>
            <Span>NO HAY DATOS</Span>
          </Tr>
        </>
      )}
    </Tr>
  );
}
