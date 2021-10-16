import React from "react";
import Login from "./login";
import Signup from "./signup";
import './styles/home.css';

function Home() {
    return (

        <div className="container-home">
            <div className="container-login" id="container">
                <div className="form-container sign-up-container">
                    <Signup />
                </div>

                <div className="form-container sign-in-container">
                    <Login />
                </div>

                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>
                                To Keep connected with us please login with you personal info.
                            </p>
                            <button className="ghost" id="signIn" onClick={() => {
                                document.getElementById('container').classList.remove("right-panel-active");
                            }}>Incia sesion</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>
                                Enter your personal details and start journey with us.
                            </p>
                            <button className="ghost" id="signUp" onClick={() => {
                                document.getElementById('container').classList.add("right-panel-active");
                            }}>Registro</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;