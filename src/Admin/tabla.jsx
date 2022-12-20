import { Button, Input, Td, Tr } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdDelete, MdTaskAlt } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { VscError } from "react-icons/vsc";
export default function Tabla({ solicitud, deleteID, aprobarState ,Solicitud }) {
  const { user } = solicitud;
  const [formEdit, setFormEdit] = useState(false);
  const [datos, setDatos] = useState({})
  const handleButtonEdit = () => {
    setFormEdit(!formEdit);
  };
  const handleInputChange =(e)=>{
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }
  const handleEditSolicitud = async(solicitudId)=>{
    try {
      const solicitud = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
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
  }
  return (
    <Tr>
      {formEdit ? (
        <>
        <Td><Input disabled defaultValue={user.nombre} /></Td>
          <Td><Input disabled defaultValue={user.email}/></Td>
          <Td><Input disabled defaultValue={user.Apellidos}/></Td>
          <Td><Input disabled defaultValue={user.NumCedula}/></Td>
          <Td><Input disabled defaultValue={user.Telefono}/></Td>
          <Td><Input textAlign='center' disabled defaultValue={user.Edad}/></Td>
          <Td><Input textAlign='center' disabled defaultValue={user.sexo}/></Td>
          <Td><Input defaultValue={solicitud.NombreEmpresa} onChange={handleInputChange} name='NombreEmpresa'/></Td>
          <Td><Input defaultValue={solicitud.nitEmpresa} onChange={handleInputChange} name='nitEmpresa'/></Td>
          <Td><Input defaultValue={solicitud.EstadiaEnEmpresa} onChange={handleInputChange} name='EstadiaEnEmpresa'/></Td>
          <Td><Input defaultValue={solicitud.Monto} onChange={handleInputChange} name='Monto'/></Td>
          <Td color={solicitud.estado ? "green.300" : "red.300"}>
            {solicitud.estado ? <b>Aprobado</b> : <b> No aprobado</b>}
          </Td>
          <Td display={"flex"} gap={"10px"} justifyContent='center'>
            <Button
              type="submit"
              onClick={()=>handleEditSolicitud(solicitud.id)}
              title="Confirmar"
            >
              <FiEdit className="edit"/>
            </Button>
            <Button
              
              type="submit"
              onClick={()=>setFormEdit(false)}
              title="Cancelar"
            >
              <VscError className="delete" />
            </Button>
          </Td>
        </>
      ) : (
        <>
          <Td>{user.nombre}</Td>
          <Td>{user.email}</Td>
          <Td>{user.Apellidos}</Td>
          <Td>{user.NumCedula}</Td>
          <Td>{user.Telefono}</Td>
          <Td>{user.Edad}</Td>
          <Td>{user.sexo}</Td>
          <Td>{solicitud.NombreEmpresa}</Td>
          <Td>{solicitud.nitEmpresa}</Td>
          <Td>{solicitud.EstadiaEnEmpresa}</Td>
          <Td>{solicitud.Monto}</Td>
          <Td color={solicitud.estado ? "green.300" : "red.300"}>
            {solicitud.estado ? <b>Aprobado</b> : <b> No aprobado</b>}
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
