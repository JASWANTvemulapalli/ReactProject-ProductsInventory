import { useFormik } from 'formik'
import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Prompt, useHistory } from 'react-router-dom'
import * as  Yup from 'yup'
import { Add_User_Action, Get_Users_Action, Signedin, getUsers } from '../Store/Actions'
import { Store } from '../Store/Store'

function Register() {

    const error = useRef(null)
    const userdata = useSelector((udata) => udata.userDetails)
    let history = useHistory();
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            user: "",
            password: "",
            fname: "",
            lname: "",
            location: "",
            phonenumber: "",


        },
        validationSchema: Yup.object({
            user: Yup.string().email().required("Userid is Required"),
            password: Yup.string().required("Password is Required").min(6, "password too short"),
            fname: Yup.string().required("FirstName is Required"),
            lname: Yup.string().required("LastName is Required"),
            location: Yup.string().required("Location is Required"),
            phonenumber: Yup.number().required("PhoneNumber is Required"),

        }),
        onSubmit(values) {

            let flag = true;
            console.log(flag)
            for (let i = 0; i < userdata.length; i++) {
                console.log(userdata)
                if (userdata[i].Email_Id == values.user) {
                    flag = false;
                    console.log(flag)
                    error.current.style.visibility = 'visible'
                    break;
                }
            }
            if (flag) {
                const RequiredOptions = {
                    method: 'POST',
                    headers: { "Content-Type": "application/json ; charset=UTF-8 " },
                    body: JSON.stringify({
                        "Email_Id": values.user,
                        "Password": values.password,
                        "First_Name": values.fname,
                        "Last_Name": values.lname,
                        "Location": values.location,
                        "MobileNumber": values.phonenumber
                    })
                }
                fetch(" http://localhost:3211/userdata", RequiredOptions).then(res => res.json())
                    .then(users => {
                        console.log(users)
                        dispatch(Add_User_Action(users))
                    })

                history.replace('/')

            }
        }
    }
    )
    function Error() {
        error.current.style.visibility = "hidden"
    }


    return (
        <div className='rregisterform'>
            <h2>REGISTER</h2>
            <Prompt when={true} message={"Do you want to leave this page?"} />
            <form className='rvalid' onSubmit={formik.handleSubmit} noValidate>
                <div className='rformdiv'>
                    <div className='rinput'>

                        <input type='email' name='user' placeholder='Mailid' onClick={Error}
                            className={formik.touched.user && formik.errors.user ? 'rerror' : 'rtext'} id='email'
                            {...formik.getFieldProps('user')} />
                        {formik.touched.user && formik.errors.user && <span style={{ color: 'red', fontStyle: 'italic' }}>
                            {formik.errors.user}</span>}
                    </div>


                    <div className='rinput'>

                        <input type='password' name='password' placeholder='password'
                            className={formik.touched.password && formik.errors.password ? 'rerror' : 'rtext'}
                            {...formik.getFieldProps('password')} />
                        {formik.touched.password && formik.errors.password && (<span style={{ color: 'red', fontStyle: 'italic' }}>
                            {formik.errors.password}</span>)}
                    </div>
                    <div className='rinput'>

                        <input type='text' name='fname' placeholder='First Name'
                            className={formik.touched.fname && formik.errors.fname ? 'rerror' : 'rtext'}
                            {...formik.getFieldProps('fname')} />
                        {formik.touched.fname && formik.errors.fname && <span style={{ color: 'red', fontStyle: 'italic' }}>
                            {formik.errors.fname}</span>}
                    </div>
                    <div className='rinput'>

                        <input type='text' name='lname' placeholder='Last Name'
                            className={formik.touched.lname && formik.errors.lname ? 'rerror' : 'rtext'}
                            {...formik.getFieldProps('lname')} />
                        {formik.touched.lname && formik.errors.lname && <span style={{ color: 'red', fontStyle: 'italic' }}>
                            {formik.errors.lname}</span>}
                    </div>
                    <div className='rinput'>

                        <textarea name='location' placeholder='Address'
                            className={formik.touched.location && formik.errors.location ? 'rerror' : 'rtext'}
                            {...formik.getFieldProps('location')} />
                        {formik.touched.location && formik.errors.location && <span style={{ color: 'red', fontStyle: 'italic' }}>
                            {formik.errors.location}</span>}
                    </div>
                    <div className='rinput'>

                        <input type='number' name='phonenumber' placeholder='Phone No:'
                            className={formik.touched.phonenumber && formik.errors.phonenumber ? 'rerror' : 'rtext'}
                            {...formik.getFieldProps('phonenumber')} />
                        {formik.touched.phonenumber && formik.errors.phonenumber && <span style={{ color: 'red', fontStyle: 'italic' }}>
                            {formik.errors.phonenumber}</span>}
                    </div>
                </div>
                <div className='rsubmit'>
                    <button type='submit' className='rbutton'>Register</button>
                    <p ref={error} id='reg'>User already exists</p>
                </div>
            </form>

            <div className='rregister'>
                <p>Already a  Member?<Link to='/signin'>Signin</Link></p></div>


        </div>
    )

}
export default Register;