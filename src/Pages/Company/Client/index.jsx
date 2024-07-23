import React, { useEffect, useState } from 'react';

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { m } from 'framer-motion';
import { Button, Input } from 'antd';
import { EyeInvisibleOutlined, EyeOutlined, SearchOutlined } from '@ant-design/icons';

// Components
import { fadeIn } from '../../../Functions/GlobalAnimations';
import Buttons from '../../../Components/Button/Buttons';
import ProcessStep from '../../../Components/ProcessStep/ProcessStep';
import SidebarCompany from '../Components/SidebarCompany';
import CardCompany from './CardCompany';

// Services
import * as message from '../../../Helper/MessageToast';
import Loading from '../../../Helper/Loading';
import { useMutationHook } from '../../../Hooks/useMutation';
import { postApi } from '../../../Services/apiService';

// Data
import { ProcessStepData01 } from '../../../Components/ProcessStep/ProcessStepData';

const CompanyClient = (props) => {
    const [isShowEye, setIsShowEye] = useState(true);
    const [isShowEyeConfirm, setIsShowEyeConfirm] = useState(true);
    const [loadingPage, setLoadingPage] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        companyName: '',
        companyTaxCode: '',
        companyEmail: '',
        password: '',
        passwordConfirm: '',
    });

    // ? ========================================================== handle form data ==========================================
    const [formRegister, setFormRegister] = useState({
        companyName: '',
        companyTaxCode: '',
        contactPerson: 'Duy Huynh',
        designation: 'Manager',
        companyEmail: '',
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
            companyName: '',
            companyTaxCode: '',
            companyEmail: '',
            password: '',
        });

        setPasswordConfirm('');
    };

    // ? ========================================================= call api post =============================================
    const mutation = useMutationHook((props) => postApi(props));

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
        } else if (formRegister.companyEmail.includes('gmail')) {
            errors.companyEmail = 'Please use your company email to register. Example: example@yourcompany.com ';
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
            mutation.mutate({ url: 'CompanyAuth/register', data: formRegister });
        }
    };

    const { isSuccess, isLoading, isError } = mutation;

    // ? ======================================================== handle after post api =======================================
    useEffect(() => {
        if (isSuccess) {
            message.success('Register successfully');
        } else if (isError) {
            message.error('Registration failed! Please check your registration information again!');
            const errorMessage = mutation.error?.response?.data?.message;
            // setErrorMessage({
            //     ...errorMessage,
            //     email: mutation.error?.response?.data?.message
            // })
        } else if (isLoading) {
            setLoadingPage(true);
        }
    }, [isSuccess, isError, isLoading, mutation.error, errorMessage]);

    return (
        <div style={props.style}>
            <Loading isLoading={loadingPage}>
                <div className="w-full px-[.75rem] mx-auto py-[3rem]">
                    <div className="w-[90%] py-[3rem] px-[.75rem] mx-auto">
                        <h1 className="mb-[1.5rem] text-[calc(1.375rem+1.5vw)] xl:text-[2.5rem] mt-0 font-bold leading-[1.2] text-[rgb(69,89,91)]">
                            List Company
                        </h1>

                        <div className="flex flex-wrap m-[calc(1.5rem*-1)_calc(1.5rem/-2)_0]">
                            <div className="mt-[1.5rem] w-full px-[calc(1.5rem/2)]">
                                <div className="flex justify-between">
                                    <div className="lg:w-[25%] lg:flex-[0_0_auto] row-child w-full">
                                        <div className="w-full mx-auto flex relative flex-wrap items-stretch">
                                            <input
                                                type="search"
                                                className="relative flex-auto w-[1%] min-w-0 p-[1rem] block text-[1rem] font-normal leading-[1.5] text-[#747d88] bg-clip-padding border border-solid border-[#ced4da] rounded-r-none appearance-none rounded-[10px] transition duration-[.15s] focus:outline-none focus:shadow-[0_0.5px_1px_3.5px_#caea8f]"
                                                placeholder="keywords"
                                                aria-describedby="search-icon-1"
                                            />
                                            <button className="ml-[-1px] rounded-t-none p-[1rem] flex items-center font-normal leading-[1.5] text-[#747d88] text-center whitespace-nowrap bg-[#e9ecef] border border-[#ced4da] rounded-tr-[10px] rounded-br-[10px]">
                                                <SearchOutlined />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="shrink-0 w-full pl-[.75rem] mt-[1.5rem] lg:w-[25%] lg:flex-[0_0_auto]">
                                        <div className="rounded-[10px] bg-[#f4f6f8] p-[1rem_0_1rem_1rem] flex justify-between">
                                            <label for="fruits" className="text-[#747d88] m-[auto_0]">
                                                Default Sorting:
                                            </label>
                                            <select
                                                id="fruits"
                                                name="fruitlist"
                                                className="bg-[#f4f6f8] mr-[1rem] p-[.25rem_0_.25rem_.5rem] text-[.875rem]"
                                                form="fruitform"
                                            >
                                                <option value="volvo">Nothing</option>
                                                <option value="saab">Popularity</option>
                                                <option value="opel">Organic</option>
                                                <option value="audi">Fantastic</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt">
                                    <div className="w-full row-child lg:w-[25%] lg:flex-[0_0_auto]">
                                        <SidebarCompany />
                                    </div>

                                    <div className="shrink-0 w-full max-w-full px-[.75rem] mt-[1.5rem] lg:w-[75%]">
                                        <div className="flex justify-start">
                                            <div className="md:w-[50%] md:flex-[0_0_auto] w-[33.3333%] xl:flex-[0_0_auto] xl:w-full mt-[1.5rem] px-[.75rem]">
                                                <CardCompany setLoadingPage={setLoadingPage} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Section Policy */}
                <section className="py-[130px] bg-lightgray lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
                    <Container>
                        <Row className="justify-center">
                            <Col xl={5} sm={8} className="text-center mb-24 font-serif sm:mb-12">
                                <span className="text-xmd mb-[20px] block text-fastblue font-medium">
                                    Simple work process
                                </span>
                                <h5 className="text-darkgray font-medium inline-block">
                                    We provide high quality and cost effective services
                                </h5>
                            </Col>
                            <ProcessStep
                                grid="row-cols-1 row-cols-lg-4 row-cols-sm-2 gap-y-10"
                                theme="process-step-style-01"
                                className=""
                                data={ProcessStepData01}
                                animation={fadeIn}
                            />
                        </Row>
                        <Row>
                            <Col className="text-center mt-24 lg:mt-16 md:mt-[35px] xs:mt-[60px]">
                                <Buttons
                                    href="/page/contact-us-modern"
                                    className="btn-fill shadow-md font-medium font-serif uppercase rounded-none btn-shadow !tracking-[0px]"
                                    size="lg"
                                    themeColor="#fff"
                                    color="#232323"
                                    title="Get started now"
                                />
                            </Col>
                        </Row>
                    </Container>
                </section>
                {/* Section End */}

                {/* Section Start */}
                <m.section className="py-[130px] overflow-hidden lg:py-[90px] md:py-[75px] sm:py-[50px]" {...fadeIn}>
                    <Container>
                        <Row className="justify-center">
                            <Col xl={{ span: 5, offset: 1 }} md={6} className="lg:px-[30px] md:px-[15px]">
                                <h6 className="font-['Open_Sans'] text-[2rem] text-dark font-semibold">
                                    Register for businesses
                                </h6>
                                <p className="italic mt-2">
                                    (<span className="text-red-500">*</span>) Required fields
                                </p>

                                <div className="p-16 border border-mediumgray lg:mt-[35px] md:p-10">
                                    <div>
                                        <label className="mb-1">
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
                            </Col>
                        </Row>
                    </Container>
                </m.section>
                {/* Section End */}
            </Loading>
        </div>
    );
};

export default CompanyClient;
