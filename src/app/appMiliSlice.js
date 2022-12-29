import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const restApi = createApi({
  reducerPath: "apiUser",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api",
  }),

  tagTypes: [
    "refreshUsers",
    "refreshDatosMySelf",
    "refreshSolicitudes",
    "refreshSolicitudesForUser",
  ],

  keepUnusedDataFor: 3,
  refetchOnMountOrArgChange: true,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/users",
      }),
      providesTags: ["refreshUsers"],
    }),
    getUserChecked: builder.query({
      query: (dataUser) => ({
        url: "/users",
        method: "PATCH",
        body: dataUser,
      }),
    }),
    upDateUser: builder.mutation({
      query: ({ idUser, token, datos }) => ({
        url: `users/${idUser}`,
        headers: { "Content-Type": "application/json", token: token },
        method: "PUT",
        body: JSON.stringify(datos),
      }),
    }),
    getUserMySelf: builder.query({
      query: (token) => ({
        url: "users/myself",
        method: "PATCH",
        headers: { "Content-Type": "application/json", token },
      }),
      providesTags: ["refreshDatosMySelf", "refreshUsers"],
    }),

    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/users",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["refreshUsers"],
    }),

    editUser: builder.mutation({
      query: (idUser, newDatosUser) => ({
        url: `/users/${idUser}`,
        method: "PUT",
        body: newDatosUser,
      }),
    }),

    getAllSolicitudes: builder.query({
      query: (token) => ({
        url: "unionU_S",
        method: "GET",
        headers: { "Content-Type": "application/json", token },
      }),
      providesTags: ["refreshSolicitudes"],
    }),

    getSolicitudesByIdUser: builder.query({
      query: (dataSolicitud) => ({
        url: `solicitudes/${dataSolicitud.idUser}`,
        headers: {
          "Content-Type": "application/json",
          token: dataSolicitud.token,
        },
        method: "PATCH",
      }),
      providesTags: ["refreshSolicitudesForUser"],
    }),

    deleteSolicitudById: builder.mutation({
      query: (datosForDeleteSolicitud) => ({
        url: `solicitudes/${datosForDeleteSolicitud.id}`,
        headers: {
          "Content-Type": "application/json",
          token: datosForDeleteSolicitud.token,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["refreshSolicitudes"],
    }),

    upDateStateBySolicitud: builder.mutation({
      query: (DataForEditStateSolicitud) => ({
        url: `solicitudes/${DataForEditStateSolicitud.id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: DataForEditStateSolicitud.token,
        },
        body: JSON.stringify({
          estado: !DataForEditStateSolicitud.estado,
        }),
      }),
      invalidatesTags: ["refreshSolicitudes"],
    }),
    upDateSolicitudById: builder.mutation({
      query: (DataForEditSolicitud) => ({
        url: `solicitudes/${DataForEditSolicitud.id}`,
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token: DataForEditSolicitud.token,
        },
        body: JSON.stringify(DataForEditSolicitud.body),
      }),
      invalidatesTags: ["refreshSolicitudes", "refreshSolicitudesForUser"],
    }),

    deleteSolicitudByIdUser: builder.mutation({
      query: (DataDeleteSolicitud) => ({
        url: `solicitudes/${DataDeleteSolicitud.solicitudId}`,
        headers: {
          "Content-Type": "application/json",
          token: DataDeleteSolicitud.token,
        },
        method: "DELETE",
      }),
      invalidatesTags: ["refreshSolicitudesForUser"],
    }),

    createNewSolicitud: builder.mutation({
      query: ({ token, datosSolicitud }) => ({
        url: "solicitudes",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify(datosSolicitud),
      }),
      invalidatesTags: ["refreshSolicitudesForUser", "refreshSolicitudes"],
    }),
    sendDocumentFile: builder.mutation({
      query: ({ idUser, token, datosSolicitud }) => ({
        url: `index/${idUser}`,
        method: "POST",
        headers: {
          token,
        },
        body: datosSolicitud,
      }),
      invalidatesTags: [
        "refreshSolicitudesForUser",
        "refreshSolicitudes",
        "refreshDatosMySelf",
        "refreshUsers",
      ],
    }),
    downLoadDocument: builder.query({
      query:({idUser,token})=>({
        url:`index/${idUser}`,
        method:'GET',
        headers:{token},
      }),
      
    }),
    deleteDocument: builder.mutation({
      query:({idUser, token})=>({
        url:`index/${idUser}`,
        method:'DELETE',
        headers:{token}
      }),
      invalidatesTags:["refreshDatosMySelf","refreshSolicitudesForUser","refreshUsers","refreshSolicitudes"]
    })
  }),
});

export const {
  useGetUserQuery,
  useEditUserMutation,
  useGetUserMySelfQuery,
  useCreateUserMutation,
  useUpDateUserMutation,
  useGetUserCheckedQuery,
  useDownLoadDocumentQuery,
  useGetAllSolicitudesQuery,
  useDeleteDocumentMutation,
  useSendDocumentFileMutation,
  useCreateNewSolicitudMutation,
  useUpDateSolicitudByIdMutation,
  useDeleteSolicitudByIdMutation,
  useGetSolicitudesByIdUserQuery,
  useUpDateStateBySolicitudMutation,
  useDeleteSolicitudByIdUserMutation,
} = restApi;
