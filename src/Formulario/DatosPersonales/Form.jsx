import {
  Alert,
  AlertIcon,
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
import { Solicitud } from "../DatosEmpresa/solicitud";

import TablaEnvUser from "../TablaDeEnvio/tabla-env-user";
import "./forms.css";
import { AiOutlineCloudDownload } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import {
  useDeleteDocumentMutation,
  useDownLoadDocumentQuery,
  useGetSolicitudesByIdUserQuery,
  useGetUserMySelfQuery,
} from "../../app/appMiliSlice";

const userDatos = JSON.parse(localStorage.getItem("user"));
function Form() {
  const inputFile = document.getElementById("fileUser");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [alerSoliEnv, setAlerSoliEnv] = useState(false);
  const [docuElimi, setDocuElimi] = useState(false);
  const [solicitado, setSolicitado] = useState([]);
  const [user, setUser] = useState({});
  const [datos, setdatos] = useState({});
  const [viculo, setVinculo] = useState({
    link: null,
  });
  const [fileUser, setFileUser] = useState(null);
  const [validaDatos, setValidaDatos] = useState({
    Telefono: undefined,
    Edad: undefined,
    sexo: undefined,
    userFile: undefined,
  });
  const {
    data: dataMySelf,
    isError: isErrorMySelf,
    error: errorMySelf,
    isSuccess: isSuccessMySelf,
  } = useGetUserMySelfQuery(userDatos.token);
  if (isErrorMySelf) return console.log(errorMySelf);
  const {
    data: dataSolUser,
    isError: isErrorSolUser,
    error: errorSolUser,
    isSuccess: isSuccessSoliUser,
  } = useGetSolicitudesByIdUserQuery({
    idUser: user.idUser,
    token: userDatos.token,
  });
  if (isErrorSolUser) return console.log(errorSolUser);
  const {
    data: dataGetLink,
    isError: isErrorGetLink,
    error: errorGetLink,
    isSuccess: isSuccessGetLink,
  } = useDownLoadDocumentQuery({ idUser: user.idUser, token: userDatos.token });
  if (isErrorGetLink) console.log(errorGetLink);
  const[handleDeleteDocument,{isError:isErrorDeleteDoc,error:errorDeleteDoc}] = useDeleteDocumentMutation();
  if(isErrorDeleteDoc)return console.log(errorDeleteDoc);
  const handleChangeFile = (e) => {
    setFileUser(e.target.files[0]);

    setValidaDatos({
      ...validaDatos,
      userFile:
        validaDatos.userFile !== undefined
          ? "value is required"
          : e.target.value.length == 0
          ? "value is required"
          : "",
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

  useEffect(() => {
      if (isSuccessMySelf) {
        setUser(dataMySelf);
      }
  }, [dataMySelf]);
  useEffect(() => {
    if (isSuccessGetLink) {
      setVinculo(dataGetLink);
    }
  }, [dataGetLink]);
  useEffect(() => {
    if (isSuccessSoliUser) {
      setSolicitado(dataSolUser);
    }
  }, [dataSolUser]);
  return (
    <>
      <Box display={"flex"} w="80%" justifyContent={"flex-end"}>
        <Button onClick={onOpen} colorScheme="green">
          SOLICITAR PRESTAMO
        </Button>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay max-width="none" w={"100%"}>
          {docuElimi ? (
            <Box
              w={"98%"}
              display="flex"
              justifyContent={"end"}
              height="100px"
              alignItems={"center"}
            >
              <Alert status="error" top={"10px"} height={10} w={"auto"}>
                <AlertIcon />
                Documento eliminado
              </Alert>
            </Box>
          ) : null}
        </ModalOverlay>
        <ModalContent
          width="auto"
          maxWidth="none"
          boxShadow="0px 0px 20px #000"
        >
          <ModalBody>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent={"center"}
              p="15px"
            >
              <ModalHeader textAlign={"center"}>
                SOLICITUD DE PRESTAMO
              </ModalHeader>
              <ModalCloseButton />
              <Box>
                <h1>
                  <b>DATOS PERSONALES</b>
                </h1>
                <form>
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
                    </div>
                    <div className="form-group-complet">
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
                          _placeholder={{ color: "inherit" }}
                          placeholder="Edad"
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
                          onChange={handleChange}
                        >
                          <option value="M">M</option>
                          <option value="F">F</option>
                        </Select>
                        <span>{validaDatos.sexo}</span>
                      </div>
                      <div className="items">
                        {user.img ? (
                          <>
                            {viculo.link ? (
                              <>
                                <label>Descarga tu documento</label>
                                <Box
                                  display={"flex"}
                                  justifyContent="center"
                                  gap={"10px"}
                                >
                                    <a href={viculo.link}>
                                  <Button title={`Download ${user.img}`}>
                                      <AiOutlineCloudDownload color="blue"></AiOutlineCloudDownload>
                                  </Button>
                                    </a>
                                  <Button>
                                    <VscError
                                      color="red"
                                      onClick={() =>
                                        handleDeleteDocument({idUser:user.idUser,token:userDatos.token})
                                      }
                                      title='Eliminar documento'
                                    />
                                  </Button>
                                </Box>
                              </>
                            ) : (
                              <>
                                <Button onClick={() => algo()}>
                                  {user.img}
                                </Button>
                              </>
                            )}
                          </>
                        ) : (
                          <>
                            <Box
                              display={"flex"}
                              justifyContent="center"
                              alignItems="center"
                              gap={"10px"}
                            >
                              <Box>
                                <label>Añade tu documento</label>
                                <Input
                                  type="file"
                                  borderColor="teal"
                                  name="userFile"
                                  onChange={(e) => handleChangeFile(e)}
                                  accept="pdf/png"
                                  id="fileUser"
                                />
                              </Box>
                              {fileUser ? (
                                <Button
                                  top="10px"
                                  bg="transparent"
                                  borderRadius="100px"
                                  onClick={() => (inputFile.value = "")}
                                >
                                  <VscError color="red" fontSize={"22px"} />
                                </Button>
                              ) : (
                                ""
                              )}
                            </Box>
                            <span role="alert">
                              <>{validaDatos.userFile}</>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </form>
              </Box>
              <br />
              <Box>
                <Solicitud
                  datosUserEdit={datos}
                  datosUser={user}
                  fileUser={fileUser}
                />
              </Box>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
      <TablaEnvUser solicitado={solicitado} />
    </>
  );
}

export default Form;
