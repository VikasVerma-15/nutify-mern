import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {

    const [userDetails,setUserDetails] = useState({
        name:"",
        email:"",
        password:"",
        age:""
    })

    const [message,setMessage] = useState({
        type:"invisible-msg",
        text:"Dummy Msg"
    })


    function handleInput(event)
    {
        
        setUserDetails((prevState)=>{

            return {...prevState,[event.target.name]:event.target.value};

        })
       
    }
    function handleSubmit(event){
            event.preventDefault();
            const apiUrl = import.meta.env.VITE_API_URL;
            fetch(`${apiUrl}/register`,{
                method:"POST",
                body:JSON.stringify(userDetails),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            .then((response)=>response.json())
            .then((data)=>{
               
                setMessage({type:"success",text:data.message});

                setUserDetails({
                    name:"",
                    email:"",
                    password:"",
                    age:""
                })

                setTimeout(()=>{
                    setMessage({type:"invisible-msg",text:"Dummy sg"});
                },5000)

            })
            .catch((err)=>{
                console.log(err);
            })
    }

  return (
    <section className="container">

            <form className="form" onSubmit={handleSubmit}>

                <h1 style={{marginBottom: 0}}>Create Account</h1>
                <p style={{marginTop: 0, color: '#888', fontSize: '1rem', marginBottom: '18px'}}>Join Nutrify and start your fitness journey</p>

                <input className="inp" type="text" required onChange={handleInput}
                placeholder="Enter Name" name="name" value={userDetails.name}/>

                <input className="inp" type="email" required onChange={handleInput} 
                placeholder="Enter Email" name="email" value={userDetails.email}/>

                <input className="inp" type="password" required maxLength={32} onChange={handleInput} 
                placeholder="Enter Password" name="password" value={userDetails.password}/>

                <input className="inp" max={100} min={12} type="number" onChange={handleInput}
                placeholder="Enter Age" name="age" value={userDetails.age}/>

                <button className="btn" type="submit">Join</button>

                <p style={{fontSize: '0.97rem', margin: '8px 0 0 0'}}>Already registered? <Link to="/login">Login</Link></p>

                <p className={message.type} style={{margin: 0}}>{message.text}</p>

            </form>


          

           

        </section>
  )
}
export default Register
