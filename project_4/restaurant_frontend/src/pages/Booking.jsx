import { useState } from "react"
import BookingComponent from "../components/BookingComponent"
import { useNavigate } from "react-router-dom"
import picture from "../images/about-img.jpeg"

function Booking({ currentUser }) {
    const navigate = useNavigate()
    const [showBooking, setShowBooking] = useState(false)

    function showBookingComponent() {
        setShowBooking(true)
    }

    function redirect() {
        navigate("/login")
    }

    return (
        <div className="booking page-container">
            <h1 className="booking__title">Booking</h1>
            <img className="booking__image" src={picture} alt="booking hero"/>
            <div className="booking__info">
                <h2>Reserve a slot now!</h2>
                <p>Tired of waiting in line for a queue? Want to be shown right in?</p>
                {!showBooking && <button type="button" className="button booking__button" onClick={currentUser ? showBookingComponent : redirect}>Book Now</button>}
                {showBooking && <BookingComponent /> }
            </div>
            
        </div>
    )
}


export default Booking