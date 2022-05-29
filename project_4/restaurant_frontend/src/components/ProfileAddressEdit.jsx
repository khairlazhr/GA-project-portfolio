import axiosToken from "../utils/axios"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import isEqual from 'react-fast-compare'
import * as Yup from 'yup'

function ProfileAddressEdit() {
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
                        url: `https://cafenacoffee.herokuapp.com/api/accounts/profile/${id}/addresses`,
                        method: "PATCH",
                        data: {
                            id: location.state.id,
                            ...formData
                        }
                    })
                    if (response.status === 200) {
                        navigate(`/profile/${id}/addresses`)
                    }
                } catch (error) {
                    
                }
            }}
            validationSchema={Yup.object({
                address: Yup.string().required("Required"),
                unit_no: Yup.string().required("Required"),
                postal_code: Yup.string().required("Required")
            })}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <div className="profile-container profile-container--edit">
                            <label htmlFor="address">Delivery Address:</label>
                            <Field name="address" type="text" className="form__input" placeholder="Delivery Address"/> 
                            <ErrorMessage name="address" component="div" className="form__error"/>

                            <label htmlFor="unit_no">Unit No:</label>
                            <Field name="unit_no" type="text" className="form__input" placeholder="Unit No."/> 
                            <ErrorMessage name="unit_no" component="div" className="form__error"/>

                            <label htmlFor="postal_code">Postal Code:</label>
                            <Field name="postal_code" type="text" className="form__input" placeholder="Postal Code"/> 
                            <ErrorMessage name="postal_code" component="div" className="form__error"/>
                            
                            <button className="button" type="submit" disabled={isSubmitting}>Edit</button>
                        </div> 
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileAddressEdit