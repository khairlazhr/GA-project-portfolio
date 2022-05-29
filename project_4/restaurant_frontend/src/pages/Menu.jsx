import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"

function Menu() {
    const location = useLocation();

    const [menu, setMenu] = useState([])

    useEffect(() => {
        async function fetchMenu() {
            const response = await fetch("/api/restaurant/menu")
            const data = await response.json()
            
            setMenu(data)
        }

        fetchMenu()
    }, [])

    return (
        <div>
            <div className="menu page-container">
                <h1 className="menu__title">Menu</h1>
                {menu.map((item)=> (
                    <Link className="link" key={item.id} to={`${item.id}`} state= {{ background: location }}>
                        <div className="menu__item-card">
                            <img
                            className="menu__item-image"
                            src={item.imageURL}
                            alt={item.food_name}
                            />
                            <div className="menu__item-info">
                                <p className="menu__item-name">{item.food_name}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                            
                        </div>
                    </Link>
                ))}
            </div>
        </div>
        
    )
}

export default Menu