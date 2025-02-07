import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate,Link } from "react-router-dom";
export default function Header()
{

    const loggedData = useContext(UserContext);
    const navigate = useNavigate();

    function logout()
    {
        localStorage.removeItem("nutrify-user");
        loggedData.setLoggedUser(null);
        navigate("/login");

    }

    return (
        <div>

                <ul className="list">
                    {/* <li>Home</li> */}

                    <Link className="headerlist" to="/track"><li>Track</li></Link>
                    <Link className="headerlist" to="/diet"><li>Diet</li></Link>
                    <li className="headerlist " onClick={logout}>Logout</li>
                </ul>


        </div>
    )
}