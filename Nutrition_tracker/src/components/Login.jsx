import { useState,useContext, useEffect } from "react"
import { UserContext } from "../contexts/UserContext";
import { Link,useNavigate } from "react-router-dom"
export default function Login()
{


    const loggedData = useContext(UserContext);

    


    const navigate = useNavigate();

    const [userCreds,setUserCreds] = useState({
        email:"",
        password:""
    })

    const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy Msg"
    })

    

    function handleInput(event)
    {
        setUserCreds((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value};
        })
    }

    function handleSubmit(event)
    {   
        event.preventDefault();
        const apiUrl = import.meta.env.VITE_API_URL;
        console.log(userCreds);

        fetch(`${apiUrl}/login`,{
            method:"POST",
            body:JSON.stringify(userCreds),
            headers:{
                "Content-Type":"application/json"
            }
        })
        .then((response)=>{

            if(response.status===404)
            {
                setMessage({type:"error",text:"Username or Email doesn't exist."});
            }
            else if(response.status===403) {
                setMessage({type:"error",text:"Incorrect password."});
            }
           

            setTimeout(()=>{
                setMessage({type:"invisible-msg",text:"Dummy Msg"})
            },5000)

            return response.json();
            
            
        })
        .then((data)=>{

           

            if(data.token!==undefined)
            {
                localStorage.setItem("nutrify-user",JSON.stringify(data));

                loggedData.setLoggedUser(data);

                navigate("/track");
            }

        })
        .catch((err)=>{
            console.log(err);
        })


    }


    return (
        <section className="container">

            <form className="form" onSubmit={handleSubmit}>

                <h1 style={{marginBottom: 0}}>Welcome Back</h1>
                <p style={{marginTop: 0, color: '#888', fontSize: '1rem', marginBottom: '18px'}}>Login to your Nutrify account</p>

                <input className="inp" required type="email" onChange={handleInput}
                placeholder="Enter Email" name="email" value={userCreds.email}/>

                <input className="inp" maxLength={32} type="password" onChange={handleInput} 
                placeholder="Enter Password" name="password" value={userCreds.password}/>
     

                <button className="btn" type="submit">Login</button>

                <p style={{fontSize: '0.97rem', margin: '8px 0 0 0'}}>Don't have an account? <Link to="/register">Register Now</Link></p>

                <p className={message.type} style={{margin: 0}}>{message.text}</p>

            </form>

        </section>
    )
}
