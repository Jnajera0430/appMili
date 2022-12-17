import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../db/db";

const initialState = [
  {
    id: "1",
    title: "un titulo",
    description: "una describcion",
    estado: false,
  },
  {
    id: "2",
    title: "un titulo 2",
    description: "una descripcion 2",
    estado: false,
  },
  {
    id: "3",
    title: "un titulo",
    description: "una descripcion 3",
    estado: false,
  },
];

export const appMiliSlice = createSlice({
  name: "appMili",
  initialState: users,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },

    setUser: (state, action) => {
      localStorage.clear();
      localStorage.setItem("user", JSON.stringify(action.payload));
    },

    getUserIsAllowed: (state, action) => {
      const user = JSON.parse(localStorage.getItem("user"));
      action.payload = { email: user.email, rol: user.rol };
      return action.payload;
    },

    setSignUp: async (state, action) => {
        
        try {
          const users = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(action.payload),
          };
            const result= await fetch("http://localhost:8000/api/users",users);
            alert('datos guardados')  
            state.push(result);
               
        } catch (error) {
            console.log(error);        
        }
    },
  },
});

export const { addTask, setUser, getUserIsAllowed,setSignUp } = appMiliSlice.actions;
export default appMiliSlice.reducer;
