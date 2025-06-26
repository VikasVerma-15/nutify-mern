import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
import Food from "./Food";
import Header from './Header'

export default function Track()
{
    const loggedData = useContext(UserContext);

    const [foodItems,setFoodItems] = useState([]);

    const [food,setFood] = useState(null);

    function searchFood(event)
    {
        const apiUrl = import.meta.env.VITE_API_URL;
        if(event.target.value.length!==0)
        {
            fetch(`${apiUrl}/foods/${event.target.value}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${loggedData.loggedUser.token}`
                }
            })
            .then((response)=>response.json())
            .then((data)=>{
                if(data.message===undefined)
                {
                    setFoodItems(data);
                }
                else 
                {
                    setFoodItems([]);
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
        else 
        {
            setFoodItems([]);
        }
    }

    return (
        <section className="container track-container" style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '32px'}}>
            <Header/>
            <div style={{width: '100%', maxWidth: 500, margin: '0 auto'}}>
                <div className="search" style={{position: 'relative', width: '100%'}}>
                    <input className="search-inp" onChange={searchFood}
                    type="search" placeholder="Search Food Item"
                    style={{marginBottom: 0}}/>

                    {foodItems.length!==0?(
                        <div className="search-results" style={{background: '#fff', borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', zIndex: 10}}>
                            {foodItems.map((item)=>{
                                return (
                                    <p className="item" style={{margin: 0, padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid #f0f0f0', transition: 'background 0.2s'}}
                                    onClick={()=>{
                                        setFood(item);
                                    }} key={item._id}
                                    onMouseOver={e => e.currentTarget.style.background = '#f7f9fb'}
                                    onMouseOut={e => e.currentTarget.style.background = '#fff'}>
                                        {item.name}
                                    </p>
                                )
                            })}
                        </div> 
                    ):null}
                </div>
            </div>
            <div style={{width: '100%', maxWidth: 700, margin: '0 auto'}}>
                {food!==null?(
                    <Food food = {food}/>
                ):null}  
            </div>
        </section>
    )
}
