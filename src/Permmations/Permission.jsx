import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

const RequireAdmin = () => {
    const userType = Cookies.get("type");
    const token = Cookies.get("token");
    const navigate = useNavigate();

    const isAdmin = token && userType === "admin";

    useEffect(() => {
        if (!isAdmin) {
            Swal.fire({
                title: 'ACCESS DENIED',
                text: ' You do not have the required permissions to access this terminal.',
                icon: 'error',
                background: "#000",
                color: "#fff",
                confirmButtonColor: "#fff",
                confirmButtonText: "<span style='color:black; font-weight:bold'>RETURN HOME</span>",
                allowOutsideClick: false, 
            }).then((result) => {
                if (result.isConfirmed || result.isDismissed) {
                    navigate("/", { replace: true });
                }
            });
        }
    }, [isAdmin, navigate]);

    return isAdmin ? <Outlet /> : null;
};

export default RequireAdmin;