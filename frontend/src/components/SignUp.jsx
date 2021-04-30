import React, { useEffect, useRef, useState } from 'react'
import '../css/SignUp.css'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import { registerUserApiCall } from '../redux/users/usersAction'
import { useHistory } from 'react-router'

const SignUp = ({registerUser}) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    let history = useHistory()
    const onSubmit = data => {
        delete data.password2
        registerUser(data)
        history.push('/')
    }
    
    const password = useRef({});
    password.current = watch("password", "");

    return (
        <>
            <h1 id="title">Login</h1>
            <div className="form">
                <form id="form-signup" onSubmit={e => e.preventDefault()}>
                    <div>
                        <p className='input-fields'>
                            <input type="text" name="username" id="username" placeholder="*Username" {...register("username", { required: "You must specify an username", maxLength: 20 })} />
                            <span className="field-error"><small>{errors.username && errors.username.message}</small></span>
                        </p>
                        <p className='input-fields'>
                            <input type="text" name="first_name" id="first_name" placeholder="First name" {...register("first_name")} />
                        </p>
                        <p className='input-fields'>
                            <input type="text" name="last_name" id="last_name" placeholder="Last name" {...register('last_name')} />
                        </p>
                    </div>
                    <div>
                        <p className='input-fields'>
                            <input type="text" name="email" id="email" placeholder="*Email" {...register("email", { pattern: {
                                value: /^[\w-]+(\.?[\w-]+)?@\w+\.[a-z]+$/i,
                                message: "Entered value does not match email format"
                                }
                                })
                            } />
                            <span className="field-error"><small>{errors.email && errors.email.message}</small></span>
                        </p>
                        <p className='input-fields'>
                            <input type="password" name="password" id="password" placeholder="*Password"
                            {...register('password', {
                                required: "You must specify a password",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                    message: "Password must contain uppercase, lowercase, number and special character and must be at least 8 characters"
                                }
                                })}
                              />
                             <span className="field-error"><small>{errors.password && errors.password.message}</small></span>
                        </p>
                        <p className='input-fields'>
                            <input type="password" name="password2" id="password2" placeholder="*Confirm password" 
                            {...register('password2', {
                            validate: value =>
                                value === password.current || "The passwords do not match"
                            })}

                            />
                            <span className="field-error"><small>{errors.password2 && <p>{errors.password2.message}</p>}</small></span>
                        </p>
                    </div>
                    <button type="submit" onClick={handleSubmit(onSubmit)}>Register</button>
                </form>
            </div>
        </>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        registerUser: (body) => dispatch(registerUserApiCall(body))
    }
}

export default connect(null, mapDispatchToProps)(SignUp)
