import { useLocation } from "react-router-dom";
import Dishes from "../components/Dishes/Dishes";

const AdminDishes: React.FC = () => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <div>
            <Dishes isAdmin={isAdmin} />
        </div>
    );
};

export default AdminDishes;