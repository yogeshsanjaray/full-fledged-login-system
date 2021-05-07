import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import Logout from "./logout";

export default function Members() {
    const [tokenValue,setTokenValue] = useState({})

    useEffect(()=>{
		axios.get("/users/restrictedPage",{
			headers:{
				'token':localStorage.getItem('usertoken')
			}
		})
		.then((res)=>{
            var decoded = jwt_decode(localStorage.getItem('usertoken'))
            console.log(decoded.user)
			setTokenValue(decoded.user)
		})
        .catch((err)=>{
			console.log(err)
		})
	},[])

    return(
        <div>
            <h1>Members</h1>
            <table border="|">
                <th>Id</th><th>Email</th>
                <tr><td>{tokenValue.id}</td><td>{tokenValue.email}</td></tr>
            </table>
		    <Logout />
        </div>
    )
}   