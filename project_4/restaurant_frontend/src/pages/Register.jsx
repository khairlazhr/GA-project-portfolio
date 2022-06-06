import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { Children, useState, useRef, useEffect} from "react";
import * as Yup from 'yup'
import "yup-phone"
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import isEqual from 'react-fast-compare'
import axios from "axios";

function FormikStepper({ children, ...props}) {
    const childrenArray = Children.toArray(children)
    const navigate = useNavigate()
    const [page, setPage] = useState(0)
    const currentChild = childrenArray[page]

    function isLastPage() {
        return page === childrenArray.length -1
    }

    return (
        <Formik {...props} validationSchema={currentChild.props.validationSchema}
        onSubmit={async(values, {setErrors}) => {
            if (isLastPage()) {
                try {
                    const  response = await axios({
                        method: "POST",
                        url: "https://cafenacoffee.herokuapp.com/api/accounts/signup",
                        data: {
                            email: values.email,
                            password: values.password,
                            name: values.name,
                            mobile_number: values.mobile_number,
                            address: values.address,
                            unit_no: values.unitNo,
                            postal_code: values.postalCode
                        }
                    })
                    if (response.status === 201) {
                        navigate("/login")
                        return response.data
                    }
                } catch(error) {
                    if (error.response) {
                        setErrors(error.response.data)
                        setPage(0)
                    }
                }
            } else {
                setPage(p => p+1)
            }
        }}>
            {({ isSubmitting }) => (
                <Form>
                    <FormikPersist name="form_state" />
                    {currentChild}
                    <div className="register__button-container">
                        {page > 0 ? <button className="button register__button" type="button" onClick={() => setPage((p) => p - 1)}>Back</button> : <span></span>}
                        <p className="register__page-info">Page {page + 1} of 3</p>
                        <button className="button register__button" type="submit" disabled={isSubmitting}>{isLastPage() ? "Submit" : "Next"}</button>
                    </div>
                </Form>
            )}
            
        </Formik>  
    )
}

function FormikStep({ children  }) {
    return (
        <div className="register__container">
            <h1 className="register__title">Register</h1>
            {children}
        </div>
    )
}

function FormikPersist({ name }) {
    const {values, setValues } = useFormikContext()
    const preValuesRef = useRef()

    function onSave(values) {
        localStorage.setItem(name, JSON.stringify(values))
    }

    const debouncedOnSave = useDebouncedCallback(onSave, 300)

    useEffect(() => {
        const savedForm = window.localStorage.getItem(name);
    
        if (savedForm) {
          const parsedForm = JSON.parse(savedForm);
    
          preValuesRef.current = parsedForm;
          setValues(parsedForm);
        }
    }, [name, setValues]);

    useEffect(() => {
        if (!isEqual(preValuesRef.current, values)) {
          debouncedOnSave(values);
        }
    });
    
    useEffect(() => {
        preValuesRef.current = values;
    });
    
    return null
}

function Register() {
    return (
        <div className="register page-container">
            <FormikStepper 
            initialValues={{
                name: "",
                email: "",
                password: "",
                confirmpw: "",
                mobile_number: "",
                address: "",
                unitNo: "",
                postalCode: ""
            }}
            >
                <FormikStep 
                validationSchema={Yup.object({
                    email: Yup.string()
                        .email("Please enter a valid email address")
                        .required('Required'),
                    password: Yup.string()
                        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W\_])[A-Za-z\d\W\_]{8,}$/, "Password doesn't meet requirements")
                        .required("Please enter a password."),
                    confirmpw: Yup.string().required("Both passwords must match").when("password", {
                        is: val => (val && val.length > 0 ? true : false),
                        then: Yup.string().oneOf(
                        [Yup.ref("password")],
                        "Passwords must match"
                    )})
                })}>
                    <label htmlFor="email">Email Address:</label>
                    <Field name="email" type="email" className="form__input" placeholder="address@email.com"/> 
                    <ErrorMessage name="email" component="div" className="form__error"/>

                    <label htmlFor="password">Password: </label>
                    <Field name="password" type="password" className="form__input" placeholder="Password"/> 
                    <p className="form__message">*Password must be at least 8 characters long with one special character</p>
                    <ErrorMessage name="password" component="div" className="form__error"/>

                    <label htmlFor="confirmpw">Confirm Password:</label>
                    <Field name="confirmpw" type="password" className="form__input" placeholder="Confirm Password"/> 
                    <ErrorMessage name="confirmpw" component="div" className="form__error"/>
                </FormikStep>
                <FormikStep validationSchema={Yup.object({
                    name: Yup.string()
                    .max(20, "Must be 20 characters or less")
                    .required("Required"),
                    mobile_number: Yup.string().phone('SG', true ,"Must be a valid Singaporean number").required()
                })}>
                    <label htmlFor="name">Name:</label>
                    <Field name="name" type="text" className="form__input" placeholder="Name"/> 
                    <ErrorMessage name="name" component="div" className="form__error"/>

                    <label htmlFor="mobile_number">Mobile Number:</label>
                    <Field name="mobile_number" type="text" className="form__input" placeholder="Mobile No."/> 
                    <ErrorMessage name="mobile_number" component="div" className="form__error"/>
                </FormikStep>
                <FormikStep 
                validationSchema={Yup.object({
                    address: Yup.string().required("Required"),
                    unitNo: Yup.string().required("Required"),
                    postalCode: Yup.string().required("Required")
                })}>
                    <label htmlFor="address">Delivery Address:</label>
                    <Field name="address" type="text" className="form__input" placeholder="Delivery Address"/> 
                    <ErrorMessage name="address" component="div" className="form__error"/>

                    <label htmlFor="unitNo">Unit No:</label>
                    <Field name="unitNo" type="text" className="form__input" placeholder="Unit No."/> 
                    <ErrorMessage name="unitNo" component="div" className="form__error"/>

                    <label htmlFor="postalCode">Postal Code:</label>
                    <Field name="postalCode" type="text" className="form__input" placeholder="Postal Code"/> 
                    <ErrorMessage name="postalCode" component="div" className="form__error"/>
                </FormikStep>
            </FormikStepper>
        </div>
        
      )
}

export default Register