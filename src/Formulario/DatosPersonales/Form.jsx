import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserIsAllowed } from "../../features/appMili/appmiliSlice";
import { Solicitud } from "../DatosEmpresa/solicitud";

import TablaEnvUser from "../TablaDeEnvio/tabla-env-user";
import "./forms.css";
import { SingUp } from "../../components/SingUp";
import { AiOutlineCloudDownload } from "react-icons/ai";
const options = [{ value: "F", label: "F" }];

function Form() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const [solicitado, setSolicitado] = useState([]);
  const [user, setUser] = useState([]);
  const [datos, setdatos] = useState({});
  const [viculo, setVinculo] = useState({
    link: null,
  });
  const [fileUser, setFileUser] = useState({});
  const [validaDatos, setValidaDatos] = useState({
    Telefono: undefined,
    Edad: undefined,
    sexo: undefined,
    userFile: undefined
  });
  const handleChangeFile = (e) => {
    console.log(viculo);
    setFileUser(e.target.files[0])
    
      setValidaDatos({
        ...validaDatos,
        userFile: validaDatos.userFile !== undefined ? 'value is required':e.target.value.length == 0 ? 'value is required': ''
      });        

    
    
  };
  const handleChange = (e) => {
    setdatos({ ...datos, [e.target.name]: e.target.value });
    if (
      e.target.name == "Telefono" ||
      e.target.name == "Edad" ||
      e.target.name == "sexo" 
    ) {
      /* console.log(e.target.value == 0 ? "vacio " : "lleno"); */
      setValidaDatos({
        ...validaDatos,
        [e.target.name]: e.target.value.length > 0 ? "" : "value is required",
      });
    }
  };
  const downloadDocument = async () => {
    const requestDocument = {
      method: "GET",
    };

    await fetch(
      `http://localhost:8000/api/index/${user.idUser}`,
      requestDocument
    )
      .then((response) => response.json())
      .then((data) => setVinculo(data));
  };

  const solicitud = async (idUser) => {
    const request = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
    };
    let result = await fetch(
      `http://localhost:8000/api/solicitudes/${idUser}`,
      request
    )
      .then((response) => response.json())
      .then((data) => data);
    setSolicitado(result);
  };

  const handleSubmitUser = async(e) => {
    e.preventDefault();
    const users = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(datos),
    };
    fetch(`http://localhost:8000/api/users/${user.idUser}`, users);
    solicitud(user.idUser);
    const formdata = new FormData();
    formdata.append("file", fileUser);
    
    const requestFile = {
      method: "POST",
      body: formdata,
    };
    fetch(`http://localhost:8000/api/index/${user?.idUser}`, requestFile)
    .then((response) => response.json())
    .catch((err) => err.json);
    
    alert("datos guardados");
    e.target.reset();
  };
  const deleteID = async (deleteID) => {
    try {
      await fetch(`http://localhost:8000/api/solicitudes/${deleteID}`, {
        method: "DELETE",
      });
      alert("solicitud eliminada");
      solicitud(user.idUser);
    } catch (error) {
      console.log(error);
    }
  };
  

  useEffect(() => {
    
    solicitud(user.idUser);
    const objs = dispatch(getUserIsAllowed());
    const requesInit = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: objs.payload.email }),
    };
    fetch("http://localhost:8000/api/users", requesInit)
      .then((response) => response.json())
      .then((res) => setUser(res[0]))
      .catch((err) => err.json);
  }, []);

  useEffect(() => {
    downloadDocument();
    solicitud(user.idUser);
  }, [user]);
  return (
    <>
      <Box display={"flex"} w="80%" justifyContent={"flex-end"}>
        <Button onClick={onOpen} colorScheme="green">
          SOLICITAR PRESTAMO
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay max-width="none" display="flex" alignItems="center" />
        <ModalContent width="auto" maxWidth="none">
          <ModalBody>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              alignItems="center"
              p="15px"
            >
              <ModalHeader>SOLICITUD DE PRESTAMO</ModalHeader>
              <ModalCloseButton />
              <Box>
                <h1>
                  <b>DATOS PERSONALES</b>
                </h1>
                <form onSubmit={handleSubmitUser}>
                  <div className="form-group">
                    <div className="form-group-complet">
                      <div className="items">
                        <label>Nombre(s) </label>
                        <Input
                          name="NumCedula"
                          disabled
                          defaultValue={user.nombre}
                          borderColor="teal"
                          color="black"
                        />
                      </div>
                      <div className="items">
                        <label>Apellidos </label>
                        <Input
                          name="Apellidos"
                          disabled
                          defaultValue={user.Apellidos}
                          borderColor="teal"
                          color="black"
                        />
                      </div>
                      <div className="items">
                        <label>Cedula </label>
                        <Input
                          name="NumCedula"
                          disabled
                          defaultValue={user.NumCedula}
                          borderColor="teal"
                          color="black"
                        />
                      </div>
                      <div className="items">
                        <label>Email </label>
                        <Input
                          name="email"
                          disabled
                          defaultValue={user.email}
                          borderColor="teal"
                          color="black"
                        />
                      </div>
                    </div>
                    <div className="form-group-complet">
                      <div className="items">
                        <label>Tipo de documento </label>
                        <Input
                          name="email"
                          disabled
                          defaultValue={user.TipoDocumento}
                          borderColor="teal"
                          color="black"
                        />
                      </div>
                      <div className="items">
                        <label>Telefono </label>
                        <Input
                          name="Telefono"
                          type="number"
                          borderColor="teal"
                          color="teal"
                          placeholder="Telefono"
                          _placeholder={{ color: "inherit" }}
                          defaultValue={user.Telefono ? user.Telefono : ""}
                          disabled={user.Telefono ? true : false}
                          onChange={handleChange}
                        />
                        <span>{validaDatos.Telefono}</span>
                      </div>
                      <div className="items">
                        <label>Edad </label>
                        <Input
                          name="Edad"
                          type="number"
                          borderColor="teal"
                          color="teal"
                          placeholder="Edad"
                          _placeholder={{ color: "inherit" }}
                          defaultValue={user.Edad ? user.Edad : ""}
                          disabled={user.Edad ? true : false}
                          onChange={handleChange}
                        />
                        <span>{validaDatos.Edad}</span>
                      </div>
                      <div className="items">
                        <label>Sexo </label>
                        <Select
                          name="sexo"
                          borderColor="teal"
                          color="teal"
                          placeholder={user.sexo ? user.sexo : "Seleccionar"}
                          _placeholder={{ color: "inherit" }}
                          defaultValue={user.sexo ? user.sexo : ""}
                          disabled={user.sexo ? true : false}
                          options={options}
                          onChange={handleChange}
                        >
                          <option value="M">M</option>
                          <option value="F">F</option>
                        </Select>
                        <span>{validaDatos.sexo}</span>
                      </div>
                      <div className="items">
                        <label>Descarga tu documento</label>
                        {user.img ? (
                          <>
                            {viculo.link ? (
                              <>
                              <Box display={"flex"} justifyContent="center">

                                <Button>
                                  <a href={viculo.link}>
                                    <AiOutlineCloudDownload color="blue"></AiOutlineCloudDownload>{/*  hola */}
                                  </a>
                                </Button>
                              </Box>
                              </>
                            ) : (
                              <>
                                <Button onClick={() => downloadDocument()}>
                                  {user.img}
                                </Button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <label>Suber tu documento</label>
                            <Input
                              type="file"
                              borderColor="teal"
                              name="userFile"
                              onChange={(e) => handleChangeFile(e)}
                              accept="pdf/png"
                            />
                            <span role="alert"><b>{validaDatos.userFile}</b></span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </Box>
              <br />
              <Box>
                <Solicitud handleSubmitUser={handleSubmitUser} downloadDocument={downloadDocument}/>
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <TablaEnvUser
        solicitado={solicitado}
        deleteID={deleteID}
        funcionSolicitud={solicitud}
        idUser={user.idUser}
      />
    </>
  );
}

export default Form;
