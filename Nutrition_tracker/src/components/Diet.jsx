import { useEffect, useRef, useState } from "react"
import { UserContext } from "../contexts/UserContext"
import { useContext } from "react"
import Header from './Header'

export default function Diet()
{

    let loggedData = useContext(UserContext)
    const [items,setItems] = useState([]);

    const [date,setDate] = useState(new Date())

    let [total,setTotal] = useState({
        totalCaloreis:0,
        totalProtein:0,
        totalCarbs:0,
        totalFats:0,
        totalFiber:0
    })


    useEffect(()=>{
        const apiUrl = import.meta.env.VITE_API_URL;
        fetch(`${apiUrl}/track/${loggedData.loggedUser.userid}/${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${loggedData.loggedUser.token}`
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            setItems(data);
        })
        .catch((err)=>{
            console.log(err);
        })

    },[date])


    useEffect(()=>{
        calculateTotal();
    },[items])


    function calculateTotal()
    {



        let totalCopy = {
            totalCaloreis:0,
            totalProtein:0,
            totalCarbs:0,
            totalFats:0,
            totalFiber:0
        };

        items.forEach((item)=>{
            totalCopy.totalCaloreis += item.details.calories;
            totalCopy.totalProtein += item.details.protein;
            totalCopy.totalCarbs += item.details.carbohydrates;
            totalCopy.totalFats += item.details.fat;
            totalCopy.totalFiber += item.details.fiber;

        })

        setTotal(totalCopy);


    }

    return (
        <section className="container diet-container" style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', gap: '32px'}}>

                <Header/>

                <div style={{width: '100%', maxWidth: 500, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '18px'}}>
                    <div style={{marginBottom: 12, display: 'flex', alignItems: 'center', gap: 12}}>
                        <label htmlFor="date" style={{fontWeight: 500}}>Select Date:</label>
                        <input
                            id="date"
                            type="date"
                            style={{padding: '8px 12px', borderRadius: 6, border: '1px solid #d1d5db', fontSize: '1rem'}}
                            onChange={(event)=>{
                                setDate(new Date(event.target.value));
                            }}/>
                    </div>

                    {
                        items.map((item)=>{

                            return (
                                <div
                                    className="item"
                                    key={item._id}
                                    style={{background: '#fff', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', padding: '18px 16px', marginBottom: 8}}
                                >
                                    <h3 style={{margin: 0, fontWeight: 600}}>
                                        {item.foodId.name} ( {item.details.calories} Kcal for {item.quantity}g )
                                    </h3>
                                    <p style={{margin: '8px 0 0 0', color: '#555'}}>Protein {item.details.protein}g, Carbs {item.details.carbohydrates}g, Fats {item.details.fat}g, Fiber {item.details.fiber}g</p>
                                </div>
                            )
                        })
                    }

                    <div
                        className="item"
                        style={{background: '#f7f9fb', borderRadius: 10, boxShadow: '0 2px 8px rgba(22,124,224,0.06)', padding: '18px 16px', marginTop: 18, border: '1.5px solid #167ce0'}}
                    >
                        <h3 style={{margin: 0, fontWeight: 700, color: '#167ce0'}}>
                            {total.totalCaloreis} Kcal
                        </h3>
                        <p style={{margin: '8px 0 0 0', color: '#167ce0'}}>Protein {total.totalProtein}g, Carbs {total.totalCarbs}g, Fats {total.totalFats}g, Fiber {total.totalFiber}g</p>
                    </div>
                </div>

        </section>
    )

}
