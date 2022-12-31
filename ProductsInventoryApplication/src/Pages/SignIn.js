import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Prompt, useHistory } from 'react-router-dom'
import { Signedin } from '../Store/Actions'
import { Get_User_Action, Get_Users_Action, getUsers } from '../Store/Actions';
import React from 'react'
function Signin() {
    const error = useRef(null)
    const uname = useRef(null)
    const Password = useRef(null)
    const userdata = useSelector((udata) => udata.userDetails)
    const dispatcher = useDispatch()
    let history = useHistory();
    const formik = useFormik({
        initialValues: {
            user: "",
            password: ""

        },
        validationSchema: Yup.object({
            user: Yup.string().required("username is required"),
            password: Yup.string().required("password is required")
        }),
        onSubmit(values) {
            console.log(userdata)
            userdata.map((data) => {
                if ((data.Email_Id == values.user) && (data.Password == values.password)) {
                    dispatcher(Signedin())
                    dispatcher(Get_User_Action(data))
                    history.replace({ pathname: "/products" })
                }
            })
            error.current.style.visibility = 'visible'
            uname.current.value = "";
            Password.current.value = "";
        }
    }
    )
    function Error() {
        error.current.style.visibility = 'hidden'

    }
    return (
        <div className='Form'>
            <h2>SIGN IN</h2>
            <Prompt when={true} message={"Do you want to leave this page?"} />
            <form className='valid' onSubmit={formik.handleSubmit} noValidate>
                <input type='text' name='user' placeholder='username'
                    className={formik.touched.user && formik.errors.user ? 'errortext' : 'text'}
                    {...formik.getFieldProps('user')} ref={uname} onClick={Error} />
                {formik.touched.user && formik.errors.user && <span style={{ color: 'red', fontStyle: 'italic' }}>
                    {formik.errors.user}</span>}
                <input type='password' name='password' placeholder='password'
                    className={formik.touched.password && formik.errors.password ? 'errortext' : 'text'}
                    {...formik.getFieldProps('password')} ref={Password} />
                {formik.touched.password && formik.errors.password && <span style={{ color: 'red', fontStyle: 'italic' }}>
                    {formik.errors.password}</span>}
                <div className='submit'>
                    <button type='submit' className='button'>Log In</button>
                    <h4 ref={error}>Please Enter Valid Inputs</h4>
                </div>


            </form>
            <div className='register'>
                <p>Not a member?<Link to='/register'>Register</Link></p>
            </div>

        </div>
    )

}

export default Signin;