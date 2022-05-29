import axiosToken from "../utils/axios"
import CartComponent from "../components/CartComponent"
import CartEmpty from "../components/CartEmpty"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field } from "formik";

function Cart({ cart, fetchCart }) {
    const navigate = useNavigate()
    const [addresses, setAddresses] = useState("")
    const accessObject = JSON.parse(localStorage.getItem("accessObject"))

    useEffect(() => {
        async function fetchAddresses() {
            try {

                const response = await axiosToken({
                    url: `/api/accounts/profile/${accessObject.userId}/addresses`,
                    method: "GET"
                })
                if (response.status === 200) {
                    setAddresses(response.data)
                }
            } catch(error) {
                if (error.request){
    
                }
            }
        }
        fetchAddresses()
    }, [])

    return (
        <div className="cart page-container">
            <div className="cart__list cart__list--spacing">
                {cart.cart_items
                    && cart.cart_items.length > 0 
                    ? <> 
                        <h2 className="cart__title">Cart</h2>
                        {cart.cart_items.map((cartItem) => (
                            <CartComponent key={cartItem.id} {...cartItem} fetchCart={fetchCart} />
                        ))}
                    </>
                    : <CartEmpty />
                }
            </div>
            <div className="cart__summary">
                <Formik
                initialValues={{
                    address: "",
                }}
                onSubmit={async(values) => {
                    try {
                        const response = await axiosToken({
                            url: `/api/delivery/checkout`,
                            method: "POST",
                            data: {
                                order_items: cart.cart_items,
                                total: cart.total,
                                address: values.address
                            }
                        })
                        if (response.status === 201) {
                            navigate(`/profile/${accessObject.userId}`)
                        }
                    } catch (error) {

                    }
                }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="cart__summary-container">
                                <h2 className="cart__title">Your Order Summary</h2>
                                <hr className="hr"/>
                                <div className="cart__summary-address">
                                    <label className="cart__summary-label" htmlFor="address">Deliver to:</label>
                                    <Field name="address" as="select" className="form__input form__input--select" placeholder="Delivery Address">
                                            {addresses && addresses.map((address, i) => {
                                                    const formatAddress = `${address.address} ${address.unit_no} S(${address.postal_code})`
                                                    return (<option key={i} value={formatAddress}>{formatAddress}</option>)
                                                })
                                            }
                                    </Field>
                                </div>
                            
                                <div className="cart__summary-price">
                                    <p>Total Cost: </p>
                                    <span className="span-bold cart__summary-span">${cart.total}</span>
                                </div>
                                

                                {cart.cart_items
                                    && cart.cart_items.length > 0 
                                ? <button className="button" type="submit" disabled={isSubmitting}>Check Out</button>
                                : null
                                }
                            </div>
                            
                        </Form>
                    )}
                    </Formik>
                </div>
        </div>
    )
}

export default Cart