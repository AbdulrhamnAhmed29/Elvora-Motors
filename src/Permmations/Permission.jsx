import { Outlet, Navigate } from "react-router-dom"; // استورد Navigate
import Cookies from "js-cookie";

const RequireAdmin = () => {
    const userType = Cookies.get("type"); 
    const token = Cookies.get("token");   

    if (token && userType === "admin") {
        return <Outlet />; 
    }

    
    return <Navigate to="/" replace />;
};

export default RequireAdmin;