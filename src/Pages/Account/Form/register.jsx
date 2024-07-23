import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { useMutationHook } from '~/Hooks/useMutation';
import { postApi } from '~/Services/apiService.js';
import * as message from '~/Helper/MessageToast.js';
import Loading from '~/Helper/Loading.jsx';

export default function RegisterForm({ setShowRegister }) {
    // dependencies
    const [isShowEye, setIsShowEye] = useState(true);
    const [isShowEyeConfirm, setIsShowEyeConfirm] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        fullName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });

    // ? ========================================================== handle form data ==========================================
    const [formRegister, setFormRegister] = useState({
        fullName: '',
        email: '',
        password: '',
    });
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const handleChange = (e) => {
        setFormRegister({
            ...formRegister,
            [e.target.name]: e.target.value,
        });
        setErrorMessage({
            ...errorMessage,
            [e.target.name]: '',
        });
    };

    const handleResetForm = () => {
        setFormRegister({
            fullName: '',
            email: '',
            password: '',
        });

        setPasswordConfirm('')
    };

    // ? ========================================================= call api post =============================================
    const mutation = useMutationHook((props) => postApi(props));

    const handleSubmitRegister = () => {
        const errors = {};
        if (formRegister.fullName === '') {
            errors.fullName = 'Please enter your name';
        }

        if (formRegister.email === '') {
            errors.email = 'Please enter your email';
        } else if (!formRegister.email.includes('@gmail.com')) {
            errors.email = 'Email invalid format';
        }

        if (formRegister.password === '') {
            errors.password = 'Please enter your password';
        } else if (formRegister.password.length < 8) {
            errors.password = 'Password must have at least 8 characters';
        }

        if (passwordConfirm === '') {
            errors.passwordConfirm = 'Please enter repeat your password';
        } else if (passwordConfirm !== formRegister.password) {
            errors.passwordConfirm = 'Password incorrect. Please re-enter!';
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessage({
                ...errorMessage,
                ...errors,
            });
        } else {
            mutation.mutate({ url: 'UserAuth/register', data: formRegister });
        }
    };

    const { isSuccess, isLoading, isError } = mutation;

    // ? ======================================================== handle after post api =======================================
    useEffect(() => {
        if (isSuccess) {
            message.success('Register successfully');
            setShowRegister(false);
        } else if (isError) {
            message.error('Registration failed! Please check your registration information again!');
            const errorMessage = mutation.error?.response?.data?.message;
            console.log(errorMessage);
            // setErrorMessage({
            //     ...errorMessage,
            //     email: mutation.error?.response?.data?.message
            // })
        } else if (isLoading) {
            setLoadingPage(true);
        }
    }, [isSuccess, isError, isLoading, mutation, errorMessage, setShowRegister]);

    console.log(mutation);

    return (
        <div className="bg-white px-10 py-20 rounded-3xl border-2 border-gray-100 w-[80%]">
            <Loading isLoading={loadingPage}>
                <h1 className="text-[3.3rem] font-semibold ">Register Now</h1>
                <p className="text-lg mt-4">Please enter your information</p>
                <p className="italic mt-2">
                    (<span className="text-red-500">*</span>) Required fields
                </p>

                <div className="mt-8">
                    <div className="w-full">
                        <div className="flex flex-col">
                            <label for="name">
                                <span className="m-0 text-red-500">* </span>
                                Your Full Name
                            </label>
                            <input
                                className={`border rounded-md mt-2 py-3 px-2 outline-none focus:shadow-[0_0_2.5px_2.5px_#bbe56e] duration-300 ${
                                    errorMessage.fullName !== '' && 'border-red-600'
                                }`}
                                id="name"
                                placeholder="Enter your name"
                                name="fullName"
                                value={formRegister.fullName}
                                onChange={handleChange}
                            />
                            {errorMessage.fullName !== '' && (
                                <p className="ml-2 text-red-500">{errorMessage.fullName}</p>
                            )}
                        </div>

                        <div className="flex flex-col mt-4">
                            <label for="email">
                                <span className="m-0 text-red-500">* </span>
                                Email
                            </label>
                            <input
                                className={`border rounded-md mt-2 py-3 px-2 outline-none focus:shadow-[0_0_2.5px_2.5px_#bbe56e] duration-300 ${
                                    errorMessage.email !== '' && 'border-red-600'
                                }`}
                                id="email"
                                placeholder="Enter your email"
                                name="email"
                                value={formRegister.email}
                                onChange={handleChange}
                            />
                            {errorMessage.email !== '' && <p className="ml-2 text-red-500">{errorMessage.email}</p>}
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
                                    value={formRegister.password}
                                    onChange={handleChange}
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

                        <div className="flex flex-col mt-4">
                            <div>
                                <label for="pwdC">
                                    <span className="text-red-500 m-0">* </span>
                                    Confirm Password
                                </label>
                            </div>

                            <div className="relative w-full mt-2">
                                <input
                                    type={isShowEyeConfirm ? 'password' : 'text'}
                                    className={`w-full border rounded-md py-3 px-2 outline-none focus:shadow-[0_0_2.5px_2.5px_#bbe56e] duration-300 ${
                                        errorMessage.passwordConfirm !== '' && 'border-red-600'
                                    }`}
                                    id="pwdC"
                                    placeholder="Enter repeat your password"
                                    name="passwordConfirm"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                />
                                <button onClick={() => setIsShowEyeConfirm(!isShowEyeConfirm)}>
                                    {isShowEyeConfirm ? (
                                        <EyeOutlined className="absolute top-[50%] translate-y-[-50%] right-4" />
                                    ) : (
                                        <EyeInvisibleOutlined className="absolute top-[50%] translate-y-[-50%] right-4" />
                                    )}
                                </button>
                            </div>
                            {errorMessage.passwordConfirm !== '' && (
                                <p className="ml-2 text-red-500">{errorMessage.passwordConfirm}</p>
                            )}
                        </div>

                        <div className="flex justify-center mt-6 gap-2">
                            <button
                                className="py-3 border border-[#ffb524] rounded-2xl w-full hover:bg-[#81c408] hover:text-white duration-300 text-lg font-semibold active:scale-[.98] active:duration-75 transition-all"
                                onClick={handleSubmitRegister}
                            >
                                Register
                            </button>
                            <button
                                className="py-3 border border-[#ffb524] rounded-2xl w-full hover:bg-[#81c408] hover:text-white duration-300 text-lg font-semibold active:scale-[.98] active:duration-75 transition-all"
                                onClick={handleResetForm}
                            >
                                Reset Form
                            </button>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-center gap-2">
                                <p>Do you already have an account?</p>
                                <button onClick={() => setShowRegister(false)} className="text-blue-600">
                                    Login now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Loading>
        </div>
    );
}
