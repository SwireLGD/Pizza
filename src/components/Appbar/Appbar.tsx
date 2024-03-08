import { NavLink, useLocation } from "react-router-dom";

const Appbar: React.FC = () => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith('/admin');

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand">
                    <NavLink to={isAdmin ? "/admin" : "/"} className="nav-link">
                        {isAdmin ? "Turtle Pizza Admin" : "Turtle Pizza"}
                    </NavLink>
                </span>
                {isAdmin && (
                    <ul className="navbar-nav mr-auto flex-row flex-nowrap gap-3">
                        <li className="nav-item">
                            <NavLink to="/admin/dishes" className="nav-link">Dishes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/admin/orders" className="nav-link">Orders</NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
  };
  
  export default Appbar;