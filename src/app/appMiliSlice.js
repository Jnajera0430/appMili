import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const restApi = createApi({
    reducerPath: 'apiUser',

    baseQuery:fetchBaseQuery({
        baseUrl:'http://localhost:8000/api',
    }),

    tagTypes:['refreshUsers','refreshSolicitudes'],
    
    keepUnusedDataFor: 3,
    refetchOnMountOrArgChange:true,
    refetchOnFocus:true,
    refetchOnReconnect:true,
    endpoints: (builder)=>({
        getUser: builder.query({
            query:()=>({
                url:'/users'
            }),
            providesTags:['refreshUsers']
        }),
        getUserChecked: builder.query({
            query:(dataUser)=>({
                url:'/users',
                method:'PATCH',
                body: dataUser
            }),
            
        }),
        
        createUser: builder.mutation({
            query:(newUser)=>({
                url:'/users',
                method:'POST',
                body:newUser
            }),
            invalidatesTags:['refreshUsers']
        }),

        editUser: builder.mutation({
            query:(idUser,newDatosUser)=>({
                url:`/users/${idUser}`,
                method:'PUT',
                body:newDatosUser
            })
        }),

        getAllSolicitudes: builder.query({
            query:(token)=>({
                url:'unionU_S',
                method:'GET',
                headers:{"Content-Type":"application/json",token}
            }),
            providesTags:['refreshSolicitudes']
        })

    })
});

export const {useGetUserQuery,useGetUserCheckedQuery,useCreateUserMutation,useEditUserMutation,useGetAllSolicitudesQuery} = restApi;