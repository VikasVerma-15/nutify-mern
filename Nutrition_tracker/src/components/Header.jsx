import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Header() {
  const loggedData = useContext(UserContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("nutrify-user");
    loggedData.setLoggedUser(null);
    navigate("/login");
  }

  return (
    <nav className="header">
      <div className="logo" style={{fontWeight:700, fontSize:'1.3rem', letterSpacing:'1px'}}>Nutrify</div>
      <ul className="list">
        <li>
          <Link className="headerlist" to="/track">Track</Link>
        </li>
        <li>
          <Link className="headerlist" to="/diet">Diet</Link>
        </li>
        <li className="headerlist" onClick={logout} style={{cursor:'pointer'}}>Logout</li>
      </ul>
    </nav>
  );
}
