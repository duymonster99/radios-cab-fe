// libraries
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// services
import Loading from '../../../../../Helper/Loading';
import { useMutationHook } from '../../../../../Hooks/useMutation';
import { postDriverService } from '../../../../../Services/apiService';

export default function FormCreateDriver({ openForm, setOpenForm, cid }) {
    const [isShowEye, setIsShowEye] = useState(true);
    const [isShowEyeConfirm, setIsShowEyeConfirm] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        driverFullName: '',
        driverMobile: '',
        password: '',
        passwordConfirm: '',
    });

    // ? ========================================================== handle form data ==========================================
    const [formRegister, setFormRegister] = useState({
        driverFullName: '',
        driverMobile: '',
        password: '',
        companyId: cid,
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
            driverFullName: '',
            driverMobile: '',
            password: '',
            companyId: cid,
        });

        setPasswordConfirm('');
    };

    // ? ========================================================= call api post =============================================
    const mutation = useMutationHook((props) => postDriverService(props));

    const handleSubmitRegister = () => {
        const errors = {};
        if (formRegister.driverFullName === '') {
            errors.driverFullName = 'Please enter your driver name';
        }

        if (formRegister.driverMobile === '') {
            errors.driverMobile = 'Please enter your driver mobile';
        }

        if (formRegister.password === '') {
            errors.password = 'Please enter your password';
        }
        // else if (formRegister.password.length < 8) {
        //     errors.password = 'Password must have at least 8 characters';
        // }

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
            mutation.mutate({ url: 'Driver/register', data: formRegister });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmitRegister();
        }
    };

    const { isSuccess, isLoading, isError, isPending, data } = mutation;

    // ? ======================================================== handle after post api =======================================
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            message.success('Register successfully! Please complete your profile to continue!');
            const driverId = JSON.stringify(data?.driver.id);
            sessionStorage.setItem('driverId', driverId);
            const saveId = JSON.stringify(data.driver?.companyId);
            sessionStorage.setItem('company', saveId);

            navigate('/app-driver/additional-profile');
        } else if (isError) {
            message.error('Registration failed! Please check your registration information again!');
            const errorMessage = mutation.error?.response?.data?.message;
            setErrorMessage({
                ...errorMessage,
                driverMobile: mutation.error?.response?.data?.message,
            });

            setLoadingPage(false);
        } else if (isLoading || isPending) {
            setLoadingPage(true);
        }
    }, [isSuccess, isError, isLoading, mutation.error, isPending]);

    return (
        <>
            <Modal title="REGISTER DRIVER" open={openForm} onCancel={() => setOpenForm(false)} footer={null}>
                <Loading isLoading={loadingPage}>
                    <div className="block w-full text-lg">
                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Driver Name
                            </label>
                            <Input
                                name="driverFullName"
                                value={formRegister.driverFullName}
                                onChange={handleChange}
                                placeholder="Driver Name"
                            />
                        </div>

                        <div className="block mt-4">
                            <label>
                                <span className="text-red-600">* </span>Driver Phone Number
                            </label>
                            <Input
                                type="number"
                                name="driverMobile"
                                value={formRegister.driverMobile}
                                onChange={handleChange}
                                placeholder="Driver Phone Number"
                            />
                        </div>

                        <div className="mt-4">
                            <label className="mb-1">
                                <span className="text-red-400">* </span>
                                Password
                            </label>
                            <div className="relative">
                                <Input
                                    type={isShowEye ? 'password' : 'text'}
                                    placeholder="Enter Password"
                                    name="password"
                                    className={`${errorMessage.password !== '' && 'border-red-600'}`}
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

                        <div className="mt-4">
                            <div>
                                <label className="mb-1">
                                    <span className="text-red-400">* </span>
                                    Confirm Password
                                </label>
                            </div>

                            <div className="relative">
                                <Input
                                    type={isShowEyeConfirm ? 'password' : 'text'}
                                    placeholder="Enter Confirm Password"
                                    className={`${errorMessage.passwordConfirm !== '' && 'border-red-600'}`}
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    onKeyDown={handleKeyDown}
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

                        <div className="mt-4 w-full flex gap-3">
                            <Button type="primary" size="large" onClick={handleSubmitRegister}>
                                Register
                            </Button>
                            <Button size="large" onClick={handleResetForm}>
                                Reset Form
                            </Button>
                        </div>
                    </div>
                </Loading>
            </Modal>
        </>
    );
}
