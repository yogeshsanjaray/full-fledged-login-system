import {useHistory} from "react-router-dom"

export default function Logout() {
    let history =useHistory();
    
    function logout(){
		localStorage.removeItem("usertoken")
		history.push('/login');
		alert("loged out successfully!!")
	}

    return(
        <div>
            <button onClick={logout}>logout</button>
        </div>
    )
}