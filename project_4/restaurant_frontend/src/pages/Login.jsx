import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import * as Yup from 'yup'

function Login({ loginCurrentUser, fetchCart }) {
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname

    const [error, setError] = useState("")
    return (
        <div className="login page-container">
            <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={Yup.object({
                email: Yup.string().email("Please enter a valid email address").required('Please enter an email address.'),
                password: Yup.string().required("Please enter a password.")
            })}
            onSubmit={async (values) => {
                try {
                    const  response = await axios({
                        method: "POST",
                        url: "https://cafenacoffee.herokuapp.com/api/accounts/login",
                        data: {
                            email: values.email,
                            password: values.password,
                        }
                    })
                    const data = response.data
                    if (response.status === 200) {
                        const accessObject = {
                            name: data.name,
                            access: data.access,
                            refresh: data.refresh,
                            userId: data.user_id,
                            timeStamp: new Date().getTime()
                        }
                        localStorage.setItem("accessObject", JSON.stringify(accessObject))
                        fetchCart()
                        loginCurrentUser(data.name, data.user_id)

                        if (from) {
                            navigate(from, { replace: true })
                        } else {
                            navigate(-1)
                        }
                    }
                } catch(error) {
                    if (error.response) {
                        setError(error.response.data.detail)
                    }
                }
            }}
        >
                <Form>
                    <div className="login__container">
                        <h1 className="login__title">Login</h1>

                        <label className="login__label" htmlFor="email">Email Address</label>
                        <Field name="email" type="email" className="form__input" placeholder="Type your email address" /> 
                        <ErrorMessage name="email" component="div" className="form__error"/>

                        <label className="login__label"  htmlFor="password">Password</label>
                        <Field name="password" type="password" className="form__input" placeholder="Type your password"/>
                        <ErrorMessage name="password" component="div" className="form__error"/>

                        {error && <p className="form__error form__error--login">{error}</p>}
                        <div className="login__button-container">
                            <p>Don't have an account yet? <Link className="login__link" to ="/register">Register here</Link></p>
                            <button className="button login__button" type="submit">Login</button>
                        </div> 
                    </div>
                </Form>
            </Formik>
        </div>
    )
}

export default Login