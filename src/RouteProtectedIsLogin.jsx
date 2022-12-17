import { Navigate,Outlet } from "react-router-dom";

export const RouteProtectedIsLogin =({isAllowed, children,redirectTo='/home'})=>{
    if (isAllowed) {
        return <Navigate to={redirectTo}/>
    }
    return children ? children : <Outlet/>;
}