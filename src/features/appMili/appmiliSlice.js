import { createSlice } from "@reduxjs/toolkit";
import { users } from "../../db/db";


export const appMiliSlice = createSlice({
  name: "appMili",
  initialState: users,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },

    setUser: (state, action) => {
      localStorage.clear();
      const tokenUser = {
        email:action.payload.email,
        rol: action.payload.rol,
        token: action.payload.token
      }
      localStorage.setItem("user", JSON.stringify(tokenUser));
    },

    getUserIsAllowed: (state, action) => {
      const tokenUser = localStorage.getItem("user");
      const user = JSON.parse(tokenUser);
      action.payload = user;
      return user;
    },

    setLogoutUser:(state,action)=>{
      localStorage.clear();
      window.location.reload();
      return;
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

    getUser: async(state,action)=>{
      try {
        const typeUser = {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(action.payload),
        };
        const result= await fetch("http://localhost:8000/api/users",typeUser)  
                              .then(reponse => reponse.json())
                              .then(data => data);                              
        action.payload = result;
        return result 
      } catch (error) {
        console.log(error);
      }
    }


  },
});

export const { addTask, setUser, getUserIsAllowed,setSignUp,getUser,setLogoutUser } = appMiliSlice.actions;
export default appMiliSlice.reducer;
