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
            <h1>This is the Menu</h1>
            <div className="menu">
                {menu.map((item)=> (
                    <Link key={item.id} to={`${item.id}`} state= {{ background: location }}>
                        <img
                        className="img"
                        src={item.imageURL}
                        alt={item.name}
                        />
                    </Link>
                ))}
            </div>
        </div>
        
    )
}

export default Menu