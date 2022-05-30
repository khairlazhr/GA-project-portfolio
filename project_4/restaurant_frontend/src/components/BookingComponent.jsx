import { useState, useEffect } from "react"
import axiosToken from "../utils/axios"
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Alert from "@reach/alert";
import { useNavigate } from "react-router-dom"

function BookingComponent() {
    const navigate = useNavigate()
    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate() + 1)

    

    const [listDates, setListDates] = useState([])
    const [date, setDate] = useState(tomorrow)
    const [datesArray, setDatesArray] = useState([])
    const [submitData, setSubmitData] = useState([])
    const [alert, setAlert] = useState("")

    function changeDate(nextValue) {
        setDate(nextValue)
    }

    function formatDate(date) {
        const fDate = new Date(date)
        const year = fDate.getFullYear()
        let month = fDate.getMonth()+ 1 
        let day = fDate.getDate()

        if (month < 10) {
            month = `0${month}`
        }
        if (day < 10) {
            day = `0${day}`
        }

        return `${year}-${month}-${day}`
    }
    
    useEffect(() => {
        async function fetchListOfDates() {
            const response = await axiosToken({
                method: "GET",
                url: "https://cafenacoffee.herokuapp.com/api/bookings/reserve"
            })
            if (response.status === 200) {
                const data = response.data.filter((date) => date.available_tables !== 0)
                setDatesArray(data)
                const arrayOfDates = data.map((date) => date.date_slot)
                const removeDuplicates = [...new Set(arrayOfDates)]
                const convertedArray = removeDuplicates.map((date) => {
                    const year = date.slice(0,4)
                    const month = parseInt(date.slice(5,7))-1
                    const day = date.slice(8)
                    return new Date(year, month, day)
                })
                setListDates(convertedArray)
            }
        }
        fetchListOfDates()
    }, [])

    useEffect(() => {
        function selectOption() {
            setSubmitData(datesArray.filter((dateObject) => dateObject.date_slot === formatDate(date)))
        }
        selectOption()
    }, [date, datesArray])


    return (
        <div className="booking__slot">
            <p>Select a date: </p>
            <DatePicker 
            selected={date} 
            onChange={changeDate} 
            includeDates={listDates}
            dateFormat="dd-MM-yyyy"
            />
            {submitData.length > 0 &&
            <Formik
            initialValues={{
                timeSlot: "",
                tablesBooked: 1,
            }}
            onSubmit={async (values) => {
                try {
                    const accessObject = JSON.parse(localStorage.getItem("accessObject"))
                    const booked_slot = submitData.find(date => date.time_slot === values.timeSlot)
                    const  response = await axiosToken({
                        method: "POST",
                        url: "https://cafenacoffee.herokuapp.com/api/bookings/reserve",
                        data: {
                            ...booked_slot,
                            tables_booked: values.tablesBooked
                        }
                    })
                    if (response.status === 200) {
                        setAlert('You already have an active booking')
                    } else if (response.status === 201) {
                        navigate(`/profile/${accessObject.userId}`)
                    }
                } catch(error) {

                }
            }}
            >
                <Form>
                    <div className="booking__timeslot">
                        <label htmlFor="timeSlot">Time Slot:</label>
                        <Field name="timeSlot" as="select" className="form__input form__input--timeslot" >
                            <option>Select a timeslot</option>
                            {submitData.map((date, i) => <option key={i} className="form__input--option" value={date.time_slot}>{date.time_slot.slice(0,5)}</option>)}
                        </Field>
                        <label htmlFor="tablesBooked">No. of Tables: </label>
                        <Field name="tablesBooked" type="number" min="1" className="form__input--number" placeholder="No."></Field>
                        <button type="submit" className="button booking__button--booking">Book</button>
                        {alert && <Alert style={{background: "rgba(255, 0 , 0, 0.5)",padding: "10px", borderRadius: "5px"}}>{alert}</Alert>}
                    </div>
                </Form>
            </Formik>}
        </div>
        
    )   
}

export default BookingComponent