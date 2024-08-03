// libraries
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import { Button, Input, message, Modal, Radio } from 'antd';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// services
import { useMutationHook } from '../../../../Hooks/useMutation';
import { postCompanyService } from '../../../../Services/apiService';
import Loading from '../../../../Helper/Loading';

export default function FormRegisterCompany() {
    // ? =============================================== dependencies ============================================
    const [loading, setLoading] = useState(false);
    const [isShowEye, setIsShowEye] = useState(true);
    const [isShowEyeConfirm, setIsShowEyeConfirm] = useState(true);
    const [errorMessage, setErrorMessage] = useState({
        companyName: '',
        companyTaxCode: '',
        companyEmail: '',
        companyPassword: '',
        passwordConfirm: '',
        membershipType: '',
    });
    const [isCallApi, setIsCallApi] = useState(false);

    const [pricingInfo, setPricingInfo] = useState(() => {
        const storagePricing = JSON.parse(sessionStorage.getItem('pricingInfo'));
        return storagePricing ?? {};
    });

    // ? ========================================================== handle form data ==========================================
    const [formRegister, setFormRegister] = useState({
        companyName: '',
        companyTaxCode: '',
        companyEmail: '',
        companyPassword: '',
        membershipType: pricingInfo?.membershipType ?? '',
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

    const handleChooseTerm = (e) => {
        setPricingInfo({
            ...pricingInfo,
            [e.target.name]: e.target.value,
        });
        setValue(e.target.value);
    };

    const handleResetForm = () => {
        setFormRegister({
            companyName: '',
            companyTaxCode: '',
            companyEmail: '',
            companyPassword: '',
        });

        setPasswordConfirm('');
    };

    useEffect(() => {
        const calculateAmount = () => {
            let newAmount = '';
            if (pricingInfo.paymentTerm === 'Monthly') {
                if (pricingInfo.membershipType === 'Standard') {
                    newAmount = '15';
                } else if (pricingInfo.membershipType === 'Plus') {
                    newAmount = '25';
                } else {
                    newAmount = '40';
                }
            } else {
                if (pricingInfo.membershipType === 'Standard') {
                    newAmount = '40';
                } else if (pricingInfo.membershipType === 'Plus') {
                    newAmount = '65';
                } else {
                    newAmount = '105';
                }
            }
            return newAmount;
        };

        const newAmount = calculateAmount();
        if (pricingInfo.amount !== newAmount) {
            setPricingInfo({
                ...pricingInfo,
                amount: newAmount,
            });
        }
    }, [pricingInfo.paymentTerm, pricingInfo.membershipType]);

    // ? ========================================================= call api register =============================================
    const mutation = useMutationHook((props) => postCompanyService(props));

    const handleSubmitRegister = () => {
        const errors = {};
        if (formRegister.companyName === '') {
            errors.companyName = 'Please enter your company name';
        }

        if (formRegister.companyTaxCode === '') {
            errors.companyTaxCode = 'Please enter your company tax code';
        }

        if (formRegister.companyEmail === '') {
            errors.companyEmail = 'Please enter your company tax code';
        }

        if (formRegister.companyPassword === '') {
            errors.companyPassword = 'Please enter your password';
        }
        // else if (formRegister.companyPassword.length < 8) {
        //     errors.companyPassword = 'Password must have at least 8 characters';
        // }

        if (passwordConfirm === '') {
            errors.passwordConfirm = 'Please enter repeat your password';
        } else if (passwordConfirm !== formRegister.companyPassword) {
            errors.passwordConfirm = 'Password incorrect. Please re-enter!';
        }

        if (Object.keys(errors).length > 0) {
            setErrorMessage({
                ...errorMessage,
                ...errors,
            });
        } else {
            mutation.mutate({ url: 'v1/CompanyAuth/company/register', data: formRegister });
        }
    };

    // useEffect(() => {
    //     if (isCallApi) {

    //     }
    //     setIsCallApi(false)
    // }, [isCallApi])

    const { isSuccess, isLoading, isError, isPending, data } = mutation;

    // ? ======================================================== handle after register =======================================
    const navigate = useNavigate();

    useEffect(() => {
        if (isSuccess) {
            const cid = data?.data;
            const paymentInfo = {
                cid: cid,
                membershipType: pricingInfo?.membershipType,
                amount: pricingInfo?.amount,
                paymentTerm: pricingInfo?.paymentTerm,
            };

            const paymentJson = JSON.stringify(paymentInfo);
            sessionStorage.setItem('pricingInfo', paymentJson);

            message.success('Register successfully');
            navigate('/company/register/payment');
        }

        if (isPending || isLoading) {
            setLoading(true);
        }
    }, [isSuccess, isError, isLoading, mutation, errorMessage, isPending, data]);

    useEffect(() => {
        if (isError) {
            message.error('Registration failed! Please check your registration information again!');
            const errorMessage = mutation.error?.response?.data?.message;
            const newErrorMessage = {};
    
            if (errorMessage && errorMessage.includes('Name')) {
                newErrorMessage.companyName = errorMessage;
            }
    
            if (errorMessage && errorMessage.includes('Company')) {
                newErrorMessage.companyTaxCode = errorMessage;
            }
    
            setErrorMessage((prev) => ({ ...prev, ...newErrorMessage }));
            setLoading(false)
        }
    }, [isError, mutation.error]);

    console.log(mutation);

    return (
        <Loading isLoading={loading}>
            <div className="flex w-full h-auto">
                <div className="w-full flex items-center justify-center bg-gray-100 py-20">
                    <div className="bg-white px-10 py-20 w-1/2 rounded-3xl border-2 border-gray-100">
                        <h1 className="text-[3.3rem] font-semibold ">Welcome Company!</h1>
                        <p className="text-lg mt-4">Please enter your information details</p>

                        <div className="mt-2">
                            <div className="w-full">
                                <div className="">
                                    <p className="italic mt-2">
                                        (<span className="text-red-500">*</span>) Required fields
                                    </p>
                                </div>

                                <div>
                                    <label className="mt-4">
                                        <span className="text-red-400">* </span>
                                        Company Name
                                    </label>
                                    <Input
                                        placeholder="Enter Company Name"
                                        name="companyName"
                                        className={`${errorMessage.companyName !== '' && 'border-red-600'}`}
                                        value={formRegister.companyName}
                                        onChange={handleChange}
                                    />
                                    {errorMessage.companyName !== '' && (
                                        <p className="ml-2 text-red-500">{errorMessage.companyName}</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label className="mb-1">
                                        <span className="text-red-400">* </span>
                                        Company Tax Code
                                    </label>
                                    <Input
                                        type="number"
                                        placeholder="Enter Tax Code"
                                        name="companyTaxCode"
                                        className={`${errorMessage.companyTaxCode !== '' && 'border-red-600'}`}
                                        value={formRegister.companyTaxCode}
                                        onChange={handleChange}
                                    />
                                    {errorMessage.companyTaxCode !== '' && (
                                        <p className="ml-2 text-red-500">{errorMessage.companyTaxCode}</p>
                                    )}
                                </div>

                                <div className="mt-4">
                                    <label className="mb-1">
                                        <span className="text-red-400">* </span>
                                        Company Email
                                    </label>
                                    <Input
                                        placeholder="Enter Email"
                                        name="companyEmail"
                                        className={`${errorMessage.companyEmail !== '' && 'border-red-600'}`}
                                        value={formRegister.companyEmail}
                                        onChange={handleChange}
                                    />
                                    {errorMessage.companyEmail !== '' && (
                                        <p className="ml-2 text-red-500">{errorMessage.companyEmail}</p>
                                    )}
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
                                            name="companyPassword"
                                            className={`${errorMessage.companyPassword !== '' && 'border-red-600'}`}
                                            value={formRegister.companyPassword}
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
                                    {errorMessage.companyPassword !== '' && (
                                        <p className="ml-2 text-red-500">{errorMessage.companyPassword}</p>
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

                                <div className="mt-4">
                                    <div>
                                        <label className="mb-1">
                                            <span className="text-red-400">* </span>
                                            Choose Payment Term
                                        </label>
                                    </div>
                                    <Radio.Group
                                        name="paymentTerm"
                                        onChange={handleChooseTerm}
                                        value={pricingInfo.paymentTerm}
                                    >
                                        <Radio value="Monthly">Monthly</Radio>
                                        <Radio value="Quarterly">Quarterly</Radio>
                                    </Radio.Group>
                                </div>

                                <div className="mt-4">
                                    <div>
                                        <label className="mb-1">
                                            <span className="text-red-400">* </span>
                                            Choose Membership Package
                                        </label>
                                    </div>
                                    <Radio.Group
                                        name="membershipType"
                                        onChange={handleChooseTerm}
                                        value={pricingInfo.membershipType}
                                    >
                                        <Radio value="Standard">Standard</Radio>
                                        <Radio value="Plus">Plus</Radio>
                                        <Radio value="Premium">Premium</Radio>
                                    </Radio.Group>
                                    <p className="mt-2 italic text-gray-500">
                                        Note: Please read the service package carefully before choosing.
                                    </p>
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
                        </div>
                    </div>
                </div>
            </div>
        </Loading>
    );
}
