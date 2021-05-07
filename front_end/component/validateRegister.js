import axios from "axios";
import { constant } from "lodash";
import {useForm} from "react-hook-form"
import {useRef} from 'react';


export default function ValidateRegister() {
    const {handleSubmit,register,formState:{errors},watch} = useForm()
    const refPassword = useRef({});
    refPassword.current = watch("password","")

    const doRegistration = (formData) => {
        console.log(formData)

        axios.post("/users/register",formData)
        .then((res) => {
            console.log(res.data)
        })
    }

    return(
        <div>
            <h1>Register And Validate Form</h1>
            <form onSubmit={handleSubmit(doRegistration)}>
                <input 
                    type="text"
                    {...register("username",{
                        required:"Username required",
                    })}
                    placeholder="Username" 
                /><br/>
                {errors.username && <p style={{color:"red"}}>{errors.username.message}</p>}
                <input 
                    type="email" 
                    {...register("email", {
                        required: "Email is Required!!",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                    })}
                    placeholder="Email" 
                /><br/>
                {errors.email && <p style={{color:"red"}}>{errors.email.message}</p>}

                <input 
                    type="password"
                    name="password"
                    {...register("password",{
                        required: "Password is Required!!",
                        maxLength: {
                            value: 6,
                            message: "Password must have at least 6 characters"
                        },
                        pattern: {
                            value: /^(?=.*[A-Z])(?=.*[^a-zA-Z])(?!.*\s)/,
                            message: "Password contain One UpperCase."
                        }
                    })} 
                    placeholder="password" 
                /><br/>
                {errors.password && <p style={{color:"red"}}>{errors.password.message}</p>}

                <input 
                    type="password"
                    name="confirmpassword"
                    {...register("confirmpassword",{
                        required: "Re-enter Password!!",
                        validate:value => value === refPassword.current || "The password do not match"
                    })}
                    placeholder="Re-Enter password" 
                /><br/>
                {errors.confirmpassword && <p style={{color:"red"}}>{errors.confirmpassword.message}</p>}


                <button>Submit</button>
            </form>
        </div>
    )
}
