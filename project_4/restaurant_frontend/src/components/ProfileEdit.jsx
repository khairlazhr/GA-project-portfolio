import axiosToken from "../utils/axios"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import isEqual from 'react-fast-compare'
import * as Yup from 'yup'

function ProfileEdit() {
    const { id } = useParams()
    const navigate = useNavigate()
    const location = useLocation()

    function getChangedValues(values, initialValues) {
        let changedValues = {}

        for (const [key, value] of Object.entries(values)) {
            if (!isEqual(value, initialValues[key])) {
                changedValues[key] = value
            }
        }

        return changedValues
    } 

    const initialValues = {
        ...location.state
    }

    return (
        <div>
            <Formik
            initialValues={initialValues}
            onSubmit={async(values) => {
                try {
                    const formData = getChangedValues(values, initialValues)
                    const response = await axiosToken({
                        url: `https://cafenacoffee.herokuapp.com/api/accounts/profile/${id}`,
                        method: "PATCH",
                        data: {
                            first_name: formData.name,
                            email: formData.email,
                            mobile_number: formData.mobile_number
                        }
                    })
                    if (response.status === 200) {
                        navigate(`/profile/${id}`)
                    }
                } catch (error) {
                    
                }
            }}
            validationSchema={Yup.object({
                email: Yup.string()
                    .email("Please enter a valid email address")
                    .required('Required'),
                name: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),
                mobile_number: Yup.string().phone('SG', true ,"Must be a valid Singaporean number").required()
            })}    
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="profile-container profile-container--edit">
                            <label htmlFor="email">Email Address:</label>
                            <Field name="email" type="email" className="form__input" placeholder="address@email.com"/> 
                            <ErrorMessage name="email" component="div" className="form__error"/>

                            <label htmlFor="name">Name:</label>
                            <Field name="name" type="text" className="form__input" placeholder="Name"/> 
                            <ErrorMessage name="name" component="div" className="form__error"/>

                            <label htmlFor="mobile_number">Mobile Number:</label>
                            <Field name="mobile_number" type="text" className="form__input" placeholder="Mobile No."/> 
                            <ErrorMessage name="mobile_number" component="div" className="form__error"/>
                            
                            <button className="button" type="submit" disabled={isSubmitting}>Edit</button>
                        </div> 
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileEdit