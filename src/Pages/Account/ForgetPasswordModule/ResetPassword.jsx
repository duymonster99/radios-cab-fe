import bg from '../../../Assets/img/Account/forget/bg-PhotoRoom.png-PhotoRoom.png';
import relax from '../../../Assets/img/Account/forget/relax-PhotoRoom.png-PhotoRoom.png';
import vector1 from '../../../Assets/img/Account/forget/vector1-PhotoRoom.png-PhotoRoom.png';
import vector3 from '../../../Assets/img/Account/forget/vector3-PhotoRoom.png-PhotoRoom.png';
import vector2 from '../../../Assets/img/Account/forget/vector2-PhotoRoom.png-PhotoRoom.png';
import { useEffect, useState } from 'react';
import { useMutationHook } from '../../../Hooks/useMutation';
import { postAdminService } from '../../../Services/apiService';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const emailStorage = sessionStorage.getItem('emailForget')
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState({
        newPassword: '',
        confirmPassword: '',
    });
    const [dataReset, setDataReset] = useState({
        email: emailStorage ?? '',
        newPassword: '',
    });

    const [confirmPassword, setConfirmPassword] = useState('');

    // useEffect(() => {
    //     if (emailStorage) {
    //         setDataReset({
    //             ...dataReset,
    //             email: emailStorage
    //         })
    //     }
    // }, [emailStorage])

    // ? =========================== HANDLE CHANGE PASSWORD =======================
    const handleChange = (e) => {
        setDataReset({
            ...dataReset,
            newPassword: e.target.value,
        });
    };

    // ? =========================== HANDLE SUBMIT RESET ==========================
    const mutation = useMutationHook((props) => postAdminService(props));
    const {isSuccess} = mutation

    const handleSubmit = () => {
        const errors = {};

        if (dataReset.newPassword === '') {
            errors.newPassword = 'Please enter new Password';
        }

        if (confirmPassword === '') {
            errors.confirmPassword = 'Please repeat password';
        } else if (confirmPassword !== dataReset.newPassword) {
            errors.confirmPassword = 'Password incorrect. Please re-enter!';
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessage({
                ...errorMessage,
                ...errors,
            });
        } else {
            mutation.mutate({ url: 'Password/reset-password', data: dataReset });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    // handle after reset
    useEffect(() => {
        if (isSuccess) {
            sessionStorage.clear()
            message.success("Reset Password Success! Login again!")
            navigate("/login")
        }
    }, [isSuccess])

    console.log(mutation);
    

    return (
        <div>
            <div className="w-full flex justify-center items-center text-[#9CA3AF] my-28">
                <div className="w-[30%] h-auto border border-[#9CA3AF] rounded-[36px] p-[30px]">
                    <div className="flex justify-center relative mt-5">
                        <img className="w-[270.464px] h-[165.047px]" src={bg} alt="" />
                        <img className="w-[205px] h-[209px] absolute top-[-21%]" src={relax} alt="" />
                        <img
                            className="w-[27.834px] h-[27.834px] absolute -top-[20%] right-[20%]"
                            src={vector1}
                            alt=""
                        />
                        <img
                            className="absolute w-[20.331px] h-[20.331px] top-[57%] right-[16%]"
                            src={vector2}
                            alt=""
                        />
                        <img className="absolute w-[25.399px] h-[25.396px] top-[40%] left-[13%]" src={vector3} alt="" />
                    </div>

                    <div className="reset-pass_title mt-4">
                        <h2 className="text-black font-semibold text-2xl">Change New Password</h2>
                        <span>Enter a different password with the previous</span>
                    </div>

                    <div>
                        <input type="hidden" name="email" value="{{ $email }}" />
                        <input type="hidden" name="token" value="{{ $token }}" />
                        <div className="reset-pass_input mt-4">
                            <label for="">New Password</label>
                            <input
                                type="password"
                                placeholder="Enter new password"
                                className={`form-control ${errorMessage.newPassword !== '' && 'border-red-500'}`}
                                value={dataReset.newPassword}
                                onChange={handleChange}
                            />
                            {errorMessage.newPassword !== '' && (
                                <p className="text-red-500">{errorMessage.newPassword}</p>
                            )}
                        </div>

                        <div className="reset-pass-confirm_input mt-2">
                            <label for="">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Enter confirm password"
                                className={`form-control ${errorMessage.confirmPassword !== '' && 'border-red-500'}`}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                            {errorMessage.confirmPassword !== '' && (
                                <p className="text-red-500">{errorMessage.confirmPassword}</p>
                            )}
                        </div>

                        <button
                            className="mt-5 w-[256px] h-[49px] py-[16px] px-[64px] bg-[#32B768] rounded-xl justify-center items-center gap-[10px] flex text-white outline-none font-bold active:scale-[.98] active:duration-75 transition-all"
                            onClick={handleSubmit}
                        >
                            Reset Password
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
