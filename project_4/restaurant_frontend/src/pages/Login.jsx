import axios from "axios";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from 'yup'

function Login({ loginCurrentUser }) {
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname

    const [error, setError] = useState("")
    return (
        <Formik
            initialValues={{
                email: "",
                password: "",
            }}
            validationSchema={Yup.object({
                email: Yup.string().email("Please enter a valid email address").required('Required'),
                password: Yup.string().required("Please enter a password.")
            })}
            onSubmit={async (values) => {
                try {
                    const  response = await axios({
                        method: "POST",
                        url: "/api/accounts/login",
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
                            timeStamp: new Date().getTime()
                        }
                        localStorage.setItem("accessObject", JSON.stringify(accessObject))
                        loginCurrentUser(data.name)
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
                <label htmlFor="email">Email Address:</label>
                <Field name="email" type="email" className="form__input" placeholder="address@email.com"/> 

                <label htmlFor="password">Password:</label>
                <Field name="password" type="password" className="form__input" placeholder="Password"/>
                <div>
                    {error && <p>{error}</p>}
                    <button type="submit">Log In</button>
                </div>
                
            </Form>
        </Formik>
    )
}

export default Login