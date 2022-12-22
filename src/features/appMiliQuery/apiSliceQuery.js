import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'


export const apiMiliSlice = createApi({
    reducerPath:'apiMili',
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8000/api'
    }),

    endpoints:(builder)=>({
        getUsers: builder.query({
            query:()=>({
                url:'/users',
                method:'GET',
                body:{}
            }),
            providesTags:['users'],
            transformResponse: response => response.sort((a,b)=>b.idUser - a.idUser)
        }),
        createUser: builder.mutation({
            query:(user)=>({
                url:'/users',
                method:'POST',
                headers:{"Content-Types": "application/json"},
                body: user
            })
        }),
        validUserLogin: builder.query({
            query:(datosUser)=>({
                url:'/users',
                method:'PACTH',
                headers:{"Content-Types": "application/json"},
                body:datosUser
            })
        })
    })
})

export const {useCreateUserMutation ,useValidUserLoginQuery} = apiMiliSlice;