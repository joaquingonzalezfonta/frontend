import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useOrder } from "../../context/OrderContext";
import { useUser } from "../../context/UserContext";

export default function Header() {

    const { setToggleModal, count } = useOrder()

    const { user, logout } = useUser()

    return (
        <header className="header-principal">
            <input type="checkbox" id="responsive-menu" className="input-burger" />
            <label className="burger-menu" htmlFor="responsive-menu">
                <div className="burger-line" />
            </label>
            <div className="main-header-left">
                <a className="main-logo" href="/">
                    <img
                        className="main-logo-img"
                        src="https://static.vecteezy.com/system/resources/thumbnails/027/385/442/small/car-stainless-logo-png.png"
                        alt="logoImg"
                    />
                </a>
                <nav className="nav-principal">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link">
                                HOME
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/Register' className="nav-link">
                                REGISTER
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/Contact' className="nav-link">
                                CONTACT
                            </NavLink>
                        </li>

                        {
                            user?.role === "admin" &&
                        <li className="nav-item">
                            <NavLink to='/Adminproduct' className="nav-link">
                                ADMIN PRODUCT
                            </NavLink>
                        </li>
                        }

                        {                       
                            user?.role === "admin" &&
                        <li className="nav-item">
                            <NavLink to='/Adminuser' className="nav-link">
                                ADMIN USER
                            </NavLink>
                        </li>
                        }

                        { user ? ( <li className="nav-item">
                                    <NavLink onClick={logout} className="nav-link">
                                        LOGOUT
                                    </NavLink>
                                </li> 
                                ) : (
                                <li className="nav-item">
                                    <NavLink to='/Login' className="nav-link">
                                        LOGIN
                                    </NavLink>
                                </li>
                        )}
                        
                    </ul>
                </nav>
            </div>
            <div className="user-info">

                <a className="user-name" href="/Adminuser">
                    <div>
                        { user?.name || "NO USER" }
                    </div>
                </a>
                    

                <div className="carrito">
                    <div className="order-count">
                        {count}
                    </div>

                    <FontAwesomeIcon data-count="2" icon={faCartShopping} className="cart-icon" onClick={() => setToggleModal(estado => !estado)} />
                                    
                </div>

            </div>
        </header>
    )
}
