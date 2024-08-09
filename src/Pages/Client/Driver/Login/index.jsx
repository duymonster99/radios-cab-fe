// Libraries
import { useEffect, useState } from 'react';
import Loading from '../../../../Helper/Loading';
import { useMutationHook } from '../../../../Hooks/useMutation';
import { postDriverService } from '../../../../Services/apiService';
import { message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { jwtDecode } from 'jwt-decode';

export default function LoginDriver(props) {
    let navigate = useNavigate();
    const [isShowEye, setIsShowEye] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        identifier: '',
        password: '',
    });

    const [formLogin, setFormLogin] = useState({
        identifier: '',
        password: '',
    });

    // ? ======================================================== handle data login ======================================
    const handleChangeLogin = (e) => {
        setFormLogin({
            ...formLogin,
            [e.target.name]: e.target.value,
        });
        setErrorMessage({
            ...errorMessage,
            [e.target.name]: '',
        });
    };

    // ? ======================================================= login api ===============================================
    const mutation = useMutationHook((props) => postDriverService(props));

    const handleSubmit = () => {
        const errors = {};

        if (formLogin.identifier === '') {
            errors.identifier = 'Please enter your phone number';
        }

        if (formLogin.password === '') {
            errors.password = 'Please enter your password';
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessage({
                ...errorMessage,
                ...errors,
            });
        } else {
            mutation.mutate({ url: 'Driver/login', data: formLogin });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit()
        }
    }

    const { data, isSuccess, isLoading, isError, isPending } = mutation;

    // ? ====================================================== handle after submit form ====================================
    useEffect(() => {
        if (isSuccess) {
            const token = data?.token;
            
            if (token) {
                const access_token = jwtDecode(token)
                
                if (access_token?.role === 'Driver' && access_token?.unique_name !== '') {
                    if (data?.driver?.driverEmail === null) {
                        message.info('Please complete profile to continue');
                        const saveId = JSON.stringify(data.driver?.companyId)
                        sessionStorage.setItem('company', saveId)
                        navigate('/app-driver/additional-profile');
                    } 
                    else if(data?.driver?.isActive === true) {
                        localStorage.setItem('tokenDriver', token);
                        message.success('Login Successfully!');
                        navigate('/app-driver/dashboard');
                    }
                    else {
                        message.error("Error! Your account is unactivated!")
                        navigate("/404")
                    }
                }
                else {
                    navigate("/")
                }
            }
        } else if (isError) {
            message.error('Login failed!');
            let emailError = '';
            let passwordError = '';
            const errorMessage = mutation.error?.response?.data?.message;

            if (errorMessage?.includes('Email')) {
                emailError = errorMessage;
            } else {
                passwordError = errorMessage;
            }

            setErrorMessage({
                identifier: emailError,
                password: passwordError,
            });

            setLoadingPage(false);
        }

        if (isPending || isLoading) {
            setLoadingPage(true);
        }
    }, [isSuccess, isError, isLoading, mutation.error, data, navigate, isPending]);

    return (
        <div style={props.style}>
            <Loading isLoading={loadingPage}>
                <div className="flex w-full h-auto">
                    <div className="w-full flex items-center justify-center bg-gray-100 py-20">
                        <div className="bg-white px-10 py-20 w-1/3 rounded-3xl border-2 border-gray-100">
                            <h1 className="text-[3.3rem] font-semibold ">Hello Driver</h1>
                            <p className="text-lg mt-4">Please enter your information details</p>

                            <div className="mt-8">
                                <div className="w-full">
                                    <div className="flex flex-col">
                                        <label for="email">
                                            <span className="m-0 text-red-500">* </span>
                                            Phone Number
                                        </label>
                                        <input
                                            className={`border rounded-md mt-2 py-3 px-2 outline-none focus:shadow-[0_0_2.5px_2.5px_#bbe56e] duration-300 ${
                                                errorMessage.identifier !== '' && 'border-red-600'
                                            }`}
                                            id="email"
                                            placeholder={`Enter your phone number`}
                                            name="identifier"
                                            value={formLogin.identifier}
                                            onChange={handleChangeLogin}
                                        />
                                        {errorMessage.identifier !== '' && (
                                            <p className="ml-2 text-red-500">{errorMessage.identifier}</p>
                                        )}
                                    </div>

                                    <div className="flex flex-col mt-4">
                                        <div>
                                            <label for="pwd">
                                                <span className="text-red-500 m-0">* </span>
                                                Password
                                            </label>
                                        </div>

                                        <div className="relative w-full mt-2">
                                            <input
                                                type={isShowEye ? 'password' : 'text'}
                                                className={`w-full border rounded-md py-3 px-2 outline-none focus:shadow-[0_0_2.5px_2.5px_#bbe56e] duration-300 ${
                                                    errorMessage.password !== '' && 'border-red-600'
                                                }`}
                                                id="pwd"
                                                placeholder="Enter your password"
                                                name="password"
                                                value={formLogin.password}
                                                onChange={handleChangeLogin}
                                                onKeyDown={handleKeyDown}
                                            />
                                            <button onClick={() => setIsShowEye(!isShowEye)}>
                                                {isShowEye ? (
                                                    <EyeOutlined className="absolute top-[50%] translate-y-[-50%] right-4" />
                                                ) : (
                                                    <EyeInvisibleOutlined className="absolute top-[50%] translate-y-[-50%] right-4" />
                                                )}
                                            </button>
                                        </div>
                                        {errorMessage.password !== '' && (
                                            <p className="ml-2 text-red-500">{errorMessage.password}</p>
                                        )}
                                    </div>

                                    <div className="mt-4 text-end">
                                        <Link className="font-medium text-base text-blue-500">Forgot password?</Link>
                                    </div>

                                    <div className="flex justify-center mt-4">
                                        <button
                                            className="py-3 border border-[#ffb524] rounded-2xl w-full hover:bg-[#81c408] hover:text-white duration-300 text-lg font-semibold active:scale-[.98] active:duration-75 transition-all"
                                            onClick={handleSubmit}
                                        >
                                            Login
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className="hidden relative lg:flex w-1/2 h-auto items-center justify-center bg-gray-200">
                    <div className="w-60 h-60 bg-gradient-to-tr from-green-400 to-lime-500 rounded-full animate-bounce"></div>
                    
                    <div className="absolute bottom-0 w-full h-1/2 bg-white/10 backdrop-blur-lg"></div>
                    </div> */}
                </div>
            </Loading>
        </div>
    );
}
