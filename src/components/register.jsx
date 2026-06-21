import { useState } from "react";
import { useNavigate } from "react-router-dom";
import.meta.env.VITE_API_URL

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleClick = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
            method : "POST",
            headers : {"Content-type": "application/json"},
            body : JSON.stringify({email, password})
        })

        const data = await response.json()
        console.log(data)

        if (data.message) {
            navigate("/notes")
        } else {
            setError(data.error)
        }

    }

    return (
        <>
        <div className="min-h-screen flex justify-center items-center bg-white rounded text-black p-8">

            <input
                type="email" 
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full rounded text-black m-2" 

            />

            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full rounded m-2"
            />

            {error && (
                <p className="text-red-500 text-sm mb-3">{error}</p>
            )}

            <button 
                className="w-full bg-blue-500 rounded my-2  text-white"
                onClick={handleClick}>
                Register 
            </button>

            <p>Already have an account?{" "}
                <span  className="text-blue-500 cursor-pointer" onClick={() => navigate("/login")}>
                    Login
                </span>
            </p>
        </div>
        </>
    )
}

export default Register