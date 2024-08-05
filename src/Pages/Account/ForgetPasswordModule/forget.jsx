import { Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// services
import { useMutationHook } from '../../../Hooks/useMutation';
import { postAdminService } from '../../../Services/apiService';

// images
import vector from '../../../Assets/img/Account/forget/vector.jpg';
import verify1 from '../../../Assets/img/Account/forget/verify1.png';
import vector2 from '../../../Assets/img/Account/forget/vector2-PhotoRoom.png-PhotoRoom.png';
import vector3 from '../../../Assets/img/Account/forget/vector3-PhotoRoom.png-PhotoRoom.png';
import vector4 from '../../../Assets/img/Account/forget/vector4-PhotoRoom.png-PhotoRoom.png';
import vector5 from '../../../Assets/img/Account/forget/vector5-PhotoRoom.png-PhotoRoom.png';
import vector6 from '../../../Assets/img/Account/forget/vector6-PhotoRoom.png-PhotoRoom.png';
import Loading from '../../../Helper/Loading';

const ForgetPassword = (props) => {
    // ? ===================== DEPENDENCIES =======================
    const navigate = useNavigate();
    const [email, setEmail] = useState({
        email: '',
    });

    const [loading, setLoading] = useState(false);

    // ? ===================== HANDLE SUBMIT ======================
    const mutation = useMutationHook((props) => postAdminService(props));
    const mutationMail = useMutationHook((props) => postAdminService(props));

    const { isSuccess, data, isPending } = mutation;

    const handleSubmitEmail = () => {
        mutation.mutate({ url: 'Password/forgot-password', data: email });
    };

    // handle after submit
    useEffect(() => {
        if (isSuccess) {
            sessionStorage.setItem('otpCode', data.data);
            sessionStorage.setItem('emailForget', email.email);

            const formSendMail = {
                toMail: email.email,
                subject: 'Your OTP Code Reset Password is ready',
                htmlContent: `<div style="display: flex; justify-content: center;">
            <div
                style="width: 500px; height: auto; border: 1px dashed;
        border-radius: 20px; padding: 10px; text-align: center; display: block; justify-content: center; align-items: center"
            >
                <h2>Hello: ${data.users}</h2>
                <p
                    style="text-decoration: none; color: black;
            padding: 10px; background-color: #c9e6c0; border-radius: 8px; width: 50%; margin: 0 auto"
                >
                    Your OTP: ${data.data}
                </p>
                <p>If this is not you, please ignore this email. Best regards!</p>
                <br />
                <p style="font-style: italic;">---------- Radio Cabs ----------</p>
            </div>
        </div>`,
            };

            mutationMail.mutate({ url: 'Password/send-email', data: formSendMail });
        }

        if (isPending) {
            setLoading(true)
        }
    }, [isSuccess, data]);

    // ? ========================== HANDLE SEND MAIL OTP ========================
    const { isSuccess: mailSuccess, isPending: mailPending } = mutationMail;

    useEffect(() => {
        if (mailSuccess) {
            message.success('OTP was send to your email');
            setLoading(false);
            navigate('/account/verify-otp');
        }
        if (mailPending) {
            setLoading(true);
        }
    }, [mailSuccess, mailPending]);

    return (
        <div style={props.style}>
            <Loading isLoading={loading}>
                <div className="w-full h-full flex justify-center items-center text-[#9ca3af] my-24">
                    <div className="w-[30%] h-auto border border-[#9ca3af] rounded-[36px] p-[30px] relative">
                        <div className="w-[400px] h-[173.68px] m-auto">
                            <img
                                src={vector}
                                alt=""
                                className="w-[70%] h-[190px] absolute left-[50%] translate-x-[-50%]"
                            />
                            <img
                                src={verify1}
                                alt=""
                                className="w-[187px] h-[162px] absolute left-[50%] translate-x-[-50%]"
                            />
                            <img
                                src={vector2}
                                alt=""
                                className="w-[26.99px] h-[29.871px] absolute top-[15%] right-[12%]"
                            />
                            <img
                                src={vector3}
                                alt=""
                                className="w-[22.948px] h-[22.948px] absolute top-[33%] left-[18%]"
                            />
                            <img
                                src={vector4}
                                alt=""
                                className="w-[15.407px] h-[15.407px] absolute top-[10%] right-[30%]"
                            />
                            <img
                                src={vector5}
                                alt=""
                                className="w-[15.407px] h-[15.407px] absolute top-[30%] right-[33%]"
                            />
                            <img
                                src={vector6}
                                alt=""
                                className="w-[16.361px] h-[16.361px] absolute top-[10%] left-[30%]"
                            />
                        </div>

                        <div className="font-semibold mt-5">
                            <h3 className="text-black text-2xl">Forget Password</h3>
                            <span>Enter your registered email below</span>
                        </div>

                        <div>
                            <div className="forget_input--email mt-4">
                                <span>Email address</span>
                                <input
                                    type="text"
                                    name="email"
                                    className="form-control mt-1"
                                    placeholder="Enter your email"
                                    value={email.email}
                                    onChange={(e) => setEmail({ email: e.target.value })}
                                />
                            </div>

                            <div className="flex gap-1 mt-1">
                                <span>Remember the password?</span>
                                <Link to="/login" className="text-[blue]">
                                    Sign in
                                </Link>
                            </div>

                            <button
                                className="mt-4 w-[256px] h-[49px] py-[16px] px-[64px] bg-[#32b768] rounded-xl flex justify-center items-center gap-[10px] text-white font-bold"
                                onClick={handleSubmitEmail}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </Loading>
        </div>
    );
};

export default ForgetPassword;
