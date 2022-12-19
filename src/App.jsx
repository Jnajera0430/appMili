import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Form from './Formulario/DatosPersonales/Form'
import Admin from './Admin/admin'
import { Login } from './components/Login'
import { SingUp } from './components/SingUp'
import {ProtectedRoute} from './RouteProtected'
import {RouteProtectedIsLogin} from './RouteProtectedIsLogin'
import { useDispatch } from 'react-redux'
import {getUserIsAllowed} from './features/appMili/appmiliSlice'
import {Navegation} from './components/NavBar'
import { Box } from '@chakra-ui/react'

function App() {
  const dispatch = useDispatch();
  
  
  const [user, setUser] = useState({
    email:null,
    rol:null
  });

  useEffect(()=>{
    const {payload} = dispatch(getUserIsAllowed());
    const tokenUser = payload;
    if(tokenUser){
      setUser(tokenUser);
    }else{
      setUser({
        email: null,
        rol:null
      })
    }
  },[])  
  return (
    <BrowserRouter>
      <Box height='10vh'>
        <Navegation user={user}/>
      </Box>
      <Box height='90vh'>
        <Routes >
          <Route element={<RouteProtectedIsLogin isAllowed={!!user.email }  redirectTo={user.rol =='EMPLOYE'?'/user':'/admin'} />}>
              <Route index element={<Login />}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/signup' element={<SingUp/>}/>
          </Route> 
            <Route  element={<ProtectedRoute isAllowed={!!user.email && user.rol =='EMPLOYE'} redirectTo='/'/>}  >
              <Route path='/user' element={<Form/>}/>
            </Route>
            <Route element={<ProtectedRoute isAllowed={!!user.email  && user.rol =='ADMIN'} redirectTo='/'/>}  >
              <Route path='/admin' element={<Admin/>}/>
            </Route>
        </Routes>
      </Box>
    </BrowserRouter>
  )
}

export default App
