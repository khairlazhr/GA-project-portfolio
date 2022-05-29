import axiosToken from "../utils/axios"
import {useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'

function ProfileChangePw() {
    const { id } = useParams()
    const navigate = useNavigate()

    const [error, setError] = useState("")

    return (
        <div>
            <Formik
            initialValues={{
                oldPassword: "",
                password: "",
                confirmpw: ""
            }}
            onSubmit={async(values) => {
                try {
                    const response = await axiosToken({
                        url: `https://cafenacoffee.herokuapp.com/api/accounts/profile/${id}/changepw`,
                        method: "PATCH",
                        data: {
                            old_password: values.oldPassword,
                            password: values.password
                        }
                    })
                    if (response.status === 200) {
                        navigate(`/profile/${id}`)
                    }
                } catch (error) {
                    if (error.response) {
                        setError(error.response.data.detail)
                    }

                }
            }}
            validationSchema={Yup.object({
                password: Yup.string()
                    .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/, "Password doesn't meet requirements")
                    .required("Please enter a password."),
                confirmpw: Yup.string().required("Both passwords must match").when("password", {
                    is: val => (val && val.length > 0 ? true : false),
                    then: Yup.string().oneOf(
                    [Yup.ref("password")],
                    "Passwords must match"
                )})
            })}
            >
               {({ isSubmitting }) => (
                <Form>
                    <div className="register__container">
                        <label htmlFor="oldPassword">Old Password:</label>
                        <Field name="oldPassword" type="password" className="form__input" placeholder="Password"/> 
                        <ErrorMessage name="oldPassword" component="div" className="form__error"/>

                        <label htmlFor="password">New Password:</label>
                        <Field name="password" type="password" className="form__input" placeholder="Password"/> 
                        <ErrorMessage name="password" component="div" className="form__error"/>

                        <label htmlFor="confirmpw">Confirm New Password:</label>
                        <Field name="confirmpw" type="password" className="form__input" placeholder="Confirm Password"/> 
                        <ErrorMessage name="confirmpw" component="div" className="form__error"/>

                        {error && <p className="form__error form__error--login">{error}</p>}
                        <button className="button" type="submit" disabled={isSubmitting}>Change Password</button>
                    </div>
                </Form>
               )}
            </Formik>
        </div>
    )
}

export default ProfileChangePw