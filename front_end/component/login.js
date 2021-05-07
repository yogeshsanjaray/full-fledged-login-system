import axios from "axios"
import {useHistory} from "react-router-dom"

const UserLogin = () =>{

    let history =useHistory();
    const doLogin = (e) => {
        e.preventDefault()

        let userOb = {
            email:e.target.email.value,
            password:e.target.password.value,
        }
        axios.post("/users/login",userOb)
        .then((res) => {
            console.log(res.data)
            localStorage.setItem('usertoken',res.data.token)
            history.push('/members');
        })
    }

    return(
        <div>
            <h1>Login Form</h1>
            <form onSubmit={doLogin}>
                <input type="email" name="email" placeholder="Email" /><br/>
                <input type="password" name="password" placeholder="password" /><br/>

                <button>Submit</button>
            </form>
        </div>
    )
}

export default UserLogin;



