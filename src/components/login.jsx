import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {

        const response  = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({email, password})
        })

        const data = await response.json()    
        
        if (data.token) {
            localStorage.setItem("token", data.token)
            console.log(data)
            console.log("Logged in! token saved ")  
            navigate("/notes")
        }
        else {
            setError(data.error)
           
        }


  }

    return (
    <>
    <div className="min-h-screen flex flex-col justify-center items-center  bg-white rounded-lg p-8">
        <input
            type="email" 
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full "
        />

        <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full"
        />
        {error && (
            <p className="text-red-500 text-sm mb-3">{error}</p>
        )}

        <button 
            className="w-full bg-blue-500 text-white p-2 rounded"
            onClick={handleLogin}
        >
            Login
        </button>

        <button
            onClick={() => window.location.href = `${import.meta.env.VITE_API_URL}/auth/google`}
            className="w-full bg-red-500 text-white p-2 rounded mt-3"
            >
            Login with Google
        </button>

        <p> 
            No Account?{" "}
            <span  onClick={() => navigate("/register")} className="text-blue-500 cursor-pointer">Register</span>
        </p>

       
        
    </div>
    </>
    )
}


export default Login;