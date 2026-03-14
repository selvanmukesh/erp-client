import { useState } from "react";
import { get, post } from "../service/apiCall";

const Login = () => {

    const [email, setEmail] = useState("mukesh@gmail.com");
    const [password, setPassword] = useState("123456");

    const handleLogin = async () => {
        try {
            const apiUrl = import.meta.env.VITE_ERP_AUTH_SERVICE;

            const url = `${apiUrl}/auth/login`
            const payload = {
                email: email,
                password: password
            }

            const response = await post(url, payload);
            console.log("response--->", response);


            // assuming backend returns token
            const token = response.data.token;

            // save token in session storage
            sessionStorage.setItem("token", token);

            console.log("Login Success");

        } catch (error) {
            console.error("Login Error", error);
        }
    };

    return (
        <div>

            <h2>Login</h2>

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <br />

            <button onClick={handleLogin}>Login</button>

        </div>
    );
};

export default Login;