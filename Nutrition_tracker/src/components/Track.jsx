import { UserContext } from "../contexts/UserContext"
import { useContext, useEffect, useState } from "react"
import Food from "./Food";
import Header from './Header'
export default function Track()
{

    const loggedData = useContext(UserContext);

    const [foodItems,setFoodItems] = useState([]);
    const [inputItem, setInputItem]=useState("");

    const [food,setFood] = useState(null);
    const [displayFood,setDisplayFood]=useState([]);

    // useEffect(() => {
    //     fetch('http://localhost:8000/foods',{
    //         method:"GET",
    //         headers:{
    //             "Authorization":`Bearer ${loggedData.loggedUser.token}`
    //         }

    //     })
    //     .then((response)=>response.json())
    //     .then((data)=>{
    //         // console.log(data);
    //         setDisplayFood(data);
    //     })
    //     .catch((err)=>{
    //         console.log(err);
    //     })
        
    // },[displayFood]);

   

    function searchFood(event)
    {
        setInputItem(event.target.value);
        if(event.target.value.length!==0)
        {

         fetch(`http://localhost:8000/foods/${event.target.value}`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${loggedData.loggedUser.token}`
                }

            })
            .then((response)=>response.json())
            .then((data)=>{

                console.log(data);
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
        <>
          {/* <div className="container"> */}
          

            <section className="container track-container">
            <Header/>
                

                <div className="search">

                    <input className="search-inp" onChange={searchFood}
                    type="search" value={inputItem} placeholder="Search Food Item"/>

                    {
                        foodItems.length!==0?(
                            <div className="search-results">

                                {
                                    foodItems.map((item)=>{
                                        return (
                                            <p className="item" onClick={()=>{
                                                setFood(item);
                                                setInputItem(item.name);
                                                setFoodItems([]);

                                            }} key={item._id}>{item.name}</p>
                                        )
                                    })
                                }

                            </div> 
                        ):null
                    
                            }

                        {/* // <div className="products">

                        //     {
                        //         displayFood.map((product,index)=>{

                        //             return (
                        //                 <div className="product" key={product._id}>
                        //                     <div className="image-wrapper">
                        //                         <img className="p-image" src={product.image_url} alt="product" onClick={()=>{
                        //                         // setFood(item);
                        //                         setInputItem(product.name);
                        //                         // setFoodItems([]);
                        //                         }}/>
                        //                     </div>
                        //                     <h1 className="p-title">{product.name}</h1>
                                            
                        //                 </div>
                        //             )

                        //         })
                        //     }
                        
                        // </div> */}
                    

                     

                </div>

                {
                    food!==null?(
                        <Food food = {food}/>
                    ):null
                }  
               



            </section>
            {/* </div> */}
            

        </>
    )
}