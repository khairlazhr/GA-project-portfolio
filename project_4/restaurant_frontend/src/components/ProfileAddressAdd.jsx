import axiosToken from "../utils/axios"
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup'

function ProfileAddressAdd() {
    const { id } = useParams()
    const navigate = useNavigate()

    return (
        <div>
            <Formik
            initialValues={{
                address: "",
                unitNo: "",
                postalCode: ""
            }}
            onSubmit={async(values) => {
                try {
                    const response = await axiosToken({
                        url: `/api/accounts/profile/${id}/addresses`,
                        method: "POST",
                        data: {
                            address: values.address,
                            unit_no: values.unitNo,
                            postal_code: values.postalCode
                        }
                    })
                    if (response.status === 201) {
                        navigate(`/profile/${id}/addresses`)
                    }
                } catch (error) {

                }
            }}
            validationSchema={Yup.object({
                address: Yup.string().required("Required"),
                unitNo: Yup.string().required("Required"),
                postalCode: Yup.string().required("Required")
            })}
            >
               {({ isSubmitting }) => (
                <Form>
                    <div className="register__container">
                        <label htmlFor="address">Delivery Address:</label>
                        <Field name="address" type="text" className="form__input" placeholder="Delivery Address"/> 
                        <ErrorMessage name="address" component="div" className="form__error"/>

                        <label htmlFor="unitNo">Unit No:</label>
                        <Field name="unitNo" type="text" className="form__input" placeholder="Unit No."/> 
                        <ErrorMessage name="unitNo" component="div" className="form__error"/>

                        <label htmlFor="postalCode">Postal Code:</label>
                        <Field name="postalCode" type="text" className="form__input" placeholder="Postal Code"/> 
                        <ErrorMessage name="postalCode" component="div" className="form__error"/>

                        <button className="button" type="submit" disabled={isSubmitting}>Add</button>
                    </div>
                </Form>
               )}
            </Formik>
        </div>
    )
}

export default ProfileAddressAdd