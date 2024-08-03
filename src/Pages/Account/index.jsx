// Libraries
import { useState } from 'react';

// Components
import LoginForm from './Form/login';
import RegisterForm from './Form/register';

export default function Login(props) {
    const [showRegister, setShowRegister] = useState(false);
    return (
        <div style={props.style}>
            <div className="flex w-full h-auto">
                <div className="w-full flex items-center justify-center lg:w-1/2 bg-gray-100 py-20">
                    {!showRegister ? (
                        <LoginForm setShowRegister={setShowRegister} />
                    ) : (
                        <RegisterForm setShowRegister={setShowRegister} />
                    )}
                </div>

                <div className="hidden relative lg:flex w-1/2 h-auto items-center justify-center bg-gray-200">
                    <div className="w-60 h-60 bg-gradient-to-tr from-green-400 to-lime-500 rounded-full animate-bounce"></div>

                    <div className="absolute bottom-0 w-full h-1/2 bg-white/10 backdrop-blur-lg"></div>
                </div>
            </div>
        </div>
    );
}
