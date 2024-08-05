import { useEffect, useRef, useState } from 'react';

// Images
import bg from '../../../Assets/img/Account/forget/bg-PhotoRoom.png-PhotoRoom.png';
import relax from '../../../Assets/img/Account/forget/relax-PhotoRoom.png-PhotoRoom.png';
import vector1 from '../../../Assets/img/Account/forget/vector1-PhotoRoom.png-PhotoRoom.png';
import vector3 from '../../../Assets/img/Account/forget/vector3-PhotoRoom.png-PhotoRoom.png';
import vector2 from '../../../Assets/img/Account/forget/vector2-PhotoRoom.png-PhotoRoom.png';
import vector6 from '../../../Assets/img/Account/forget/vector6-PhotoRoom.png-PhotoRoom.png';
import { useMutationHook } from '../../../Hooks/useMutation';
import { postAdminService } from '../../../Services/apiService';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
    const inputs = useRef([]);
    const navigate = useNavigate()
    const [otp, setOtp] = useState({
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',
    });

    const emailStorage = sessionStorage.getItem('emailForget')
    const otpStorage = sessionStorage.getItem('otpCode')
    const email = {
        email: emailStorage
    }

    // ? ============================== HANDLE DATA OTP INPUT ========================
    const handleChange = (e, index) => {
        if (e.target.value.length === 1 && index < inputs.current.length - 1) {
            inputs.current[index + 1].focus();
        }
        setOtp({
            ...otp,
            [e.target.name]: e.target.value,
        });
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
            inputs.current[index - 1].focus();
        }
    };

    const otpVerify = `${otp.otp1}${otp.otp2}${otp.otp3}${otp.otp4}${otp.otp5}${otp.otp6}`;

    // ? ========================== HANDLE RESUBMIT =============================
    const mutation = useMutationHook((props) => postAdminService(props))

    const { isSuccess, data } = mutation

    const handleReSubmit = () => {
        mutation.mutate({ url: 'Password/forgot-password', data: email })
    }

    // handle after submit
    useEffect(() => {
        if (isSuccess) {
            sessionStorage.setItem('otpCode', data.data)   
            sessionStorage.setItem('emailForget', email.email)  
            message.success("Resend OTP Successfully!")      
        }
    }, [isSuccess, data])

    // ? ======================== HANDLE VERIFY OTP ==============================
    const handleVerifyOTP = () => {
        if (otpVerify === otpStorage) {
            message.success("Verify OTP Successfully!")
            navigate('/account/reset-password')
        }
    }

    return (
        <div className="flex justify-center my-24 ">
            <div className=" w-[30%] bg-white rounded-[36px] p-[30px] border border-[#9ca3af] text-center relative">
                <div className="flex justify-center relative mt-5">
                    <img className="w-[270.464px] h-[165.047px]" src={bg} alt="" />
                    <img className="w-[205px] h-[209px] absolute top-[-21%]" src={relax} alt="" />
                    <img className="w-[27.834px] h-[27.834px] absolute -top-[20%] right-[20%]" src={vector1} alt="" />
                    <img className="absolute w-[20.331px] h-[20.331px] top-[57%] right-[16%]" src={vector2} alt="" />
                    <img className="absolute w-[25.399px] h-[25.396px] top-[40%] left-[13%]" src={vector3} alt="" />
                    <img className="absolute w-[23.444px] h-[23.444px] top-[-5%] left-[25%]" src={vector6} alt="" />
                </div>

                <div className='mt-4'>
                    <div className="text-[20px] font-bold text-black">OTP</div>
                    <span className="text-[20px] font-bold text-black">Verification Code</span>
                    <p className="text-[#a3a3a3] text-[14px] mt-[4px] text-center">
                        We have sent a verification code to your email
                    </p>{' '}
                </div>

                <div className="mt-[10px]">
                    {[...Array(6)].map((_, index) => (
                        <>
                            <input
                                key={index}
                                type="text"
                                name={`otp${index + 1}`}
                                maxLength="1"
                                ref={(el) => (inputs.current[index] = el)}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-[32px] h-[32px] text-center border-b-[1.5px] border-[#d2d2d2] mx-[10px] focus:outline-none focus:border-[royalblue]"
                            />{' '}
                        </>
                    ))}
                </div>

                <div className="font-bold mt-4">
                    <span className='text-[#6B7280]'>Can't get email?</span>
                    <button className='text-blue-500 ml-1' onClick={handleReSubmit}>
                        Resubmit
                    </button>
                </div>

                <button className="mt-5 mx-auto w-[256px] h-[49px] py-[16px] px-[64px] bg-[#32B768] rounded-xl justify-center items-center gap-[10px] flex text-white outline-none font-bold active:scale-[.98] active:duration-75 transition-all"
                    onClick={handleVerifyOTP}
                >
                    Verify Me
                </button>
            </div>
        </div>
    );
};

export default VerifyOtp;
