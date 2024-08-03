import React, { forwardRef, useEffect, useState } from 'react';

// Components
import FormRegisterCompany from '../../../Company/FormRegister';
import Loading from '../../../../../Helper/Loading';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

// Data
const pricingMonth = [{ amount: '15' }, { amount: '25' }, { amount: '40' }];

const pricingQuarterly = [{ amount: '40' }, { amount: '65' }, { amount: '105' }];

const PricingComponent = forwardRef((props, ref) => {
    const navigate = useNavigate()
    const [button, setButton] = useState('Monthly');

    const [pricingType, setPricingType] = useState({
        paymentTerm: '',
        membershipType: '',
        amount: ''
    })

    const handlePricingStandard = () => {
        if (button === 'Monthly') {
            setPricingType({
                paymentTerm: button,
                membershipType: 'Standard',
                amount: pricingMonth[0].amount
            })
        }
        else {
            setPricingType({
                paymentTerm: button,
                membershipType: 'Standard',
                amount: pricingQuarterly[0].amount
            })
        }
    }

    const handlePricingPlus = () => {
        if (button === 'Monthly') {
            setPricingType({
                paymentTerm: button,
                membershipType: 'Plus',
                amount: pricingMonth[1].amount
            })
        }
        else {
            setPricingType({
                paymentTerm: button,
                membershipType: 'Plus',
                amount: pricingQuarterly[1].amount
            })
        }
    }

    const handlePricingPremium = () => {
        if (button === 'Monthly') {
            setPricingType({
                paymentTerm: button,
                membershipType: 'Premium',
                amount: pricingMonth[2].amount
            })
        }
        else {
            setPricingType({
                paymentTerm: button,
                membershipType: 'Premium',
                amount: pricingQuarterly[2].amount
            })
        }
    }

    useEffect(() => {
        if (pricingType.paymentTerm && pricingType.membershipType && pricingType.amount) {
            const jsonPricing = JSON.stringify(pricingType);
            sessionStorage.setItem('pricingInfo', jsonPricing);
            navigate("/company/register");
        }
    }, [pricingType, navigate])

    return (
        <div className="mb-32" id='pricing' ref={ref}>
            <div className="w-full px-4 mb-8 lg:mb-0 mx-auto">
                <div className="w-[30%] flex flex-col items-center mx-auto mb-4">
                    <span className="font-serif font-semibold text-[#27ae60] text-xmd block mb-[20px] sm:mb-[10px]">
                        Dedicated Account Manager
                    </span>
                    <h2 className="heading-5 font-serif text-darkgray text-center inline-block font-semibold mb-28 tracking-[-1px] md:mb-16">
                        Upgrade your account and unlock premium features!
                    </h2>
                    <div className="flex gap-2">
                        <Button
                            type={`${button === 'Monthly' ? 'primary' : 'default'}`}
                            className="uppercase py-[1.5rem] px-[3rem]"
                            onClick={() => setButton('Monthly')}
                        >
                            monthly
                        </Button>
                        <Button
                            type={`${button === 'Quarterly' ? 'primary' : 'default'}`}
                            className="uppercase py-[1.5rem] px-[3rem]"
                            onClick={() => setButton('Quarterly')}
                        >
                            quarterly
                        </Button>
                    </div>
                </div>

                <div className="flex w-[70%] mx-auto gap-3 h-[650px] items-center">
                    <div className="w-[380px] h-[90%] mx-auto pt-10 px-10 pb-8 bg-gray-100 rounded-3xl">
                        <div className="text-center mb-6">
                            <h5 className="text-2xl font-semibold text-gray-800 mb-3">Standard</h5>
                            <span className="block text-5xl font-bold text-gray-800 mb-3">
                                ${button === 'Monthly' ? '15' : '40'}
                            </span>
                            <span className="block text-gray-600 font-medium mb-6">per company, per month</span>
                            <button
                                className="relative group inline-block w-full py-4 px-6 text-center text-gray-800 hover:text-gray-50 bg-yellow-300 font-semibold rounded-full overflow-hidden transition duration-200"
                                onClick={() => handlePricingStandard()}
                            >
                                <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                                <span className="relative">Register Now</span>
                            </button>
                        </div>
                        <ul>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <p className="ml-2 text-gray-800">Publish company information</p>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Support 24/7</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Freely Connect with End-Users</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-500 line-through">Connect Free Agent Driver</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-500"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-500 line-through">Manage Drivers Pool</span>
                            </li>
                            <li className="flex items-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-500 line-through">Unlimited bandwidth</span>
                            </li>
                            <li className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-500 line-through">Access Advertisements Page</span>
                            </li>
                        </ul>
                    </div>

                    <div className="w-[380px] max-h-full h-full mx-auto pt-10 px-10 pb-8 bg-gray-100 rounded-3xl">
                        <div className="text-center mb-6">
                            <h5 className="text-2xl font-semibold text-gray-800 mb-3">Plus</h5>
                            <span className="block text-5xl font-bold text-gray-800 mb-3">${button === 'Monthly' ? '25' : '65'}</span>
                            <span className="block text-gray-600 font-medium mb-6">per company, per month</span>
                            <button
                                className="relative group inline-block w-full py-4 px-6 text-center text-gray-800 hover:text-gray-50 bg-yellow-300 font-semibold rounded-full overflow-hidden transition duration-200"
                                onClick={() => handlePricingPlus()}
                            >
                                <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                                <span className="relative">Start 7-days Trial</span>
                            </button>
                        </div>
                        <ul>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <p className="ml-2 text-gray-800">Publish company information</p>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Support 24/7</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Freely Connect with End-Users</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Connect Free Agent Driver</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-500"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Manage Drivers Pool</span>
                            </li>
                            <li className="flex items-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Unlimited bandwidth</span>
                            </li>
                            <li className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-500 line-through">Access Advertisements Page</span>
                            </li>
                        </ul>
                    </div>

                    <div className="w-[380px] h-[90%] mx-auto pt-10 px-10 pb-8 bg-gray-100 rounded-3xl">
                        <div className="text-center mb-6">
                            <h5 className="text-2xl font-semibold text-gray-800 mb-3">Premium</h5>
                            <span className="block text-5xl font-bold text-gray-800 mb-3">${button === 'Monthly' ? '40' : '105'}</span>
                            <span className="block text-gray-600 font-medium mb-6">per company, per month</span>
                            <button
                                className="relative group inline-block w-full py-4 px-6 text-center text-gray-800 hover:text-gray-50 bg-yellow-300 font-semibold rounded-full overflow-hidden transition duration-200"
                                onClick={() => handlePricingPremium()}
                            >
                                <div className="absolute top-0 right-full w-full h-full bg-gray-900 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
                                <span className="relative">Start 7-days Trial</span>
                            </button>
                        </div>
                        <ul>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <p className="ml-2 text-gray-800">Publish company information</p>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Support 24/7</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Freely Connect with End-Users</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Connect Free Agent Driver</span>
                            </li>
                            <li className="flex mb-4 items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-500"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Manage Drivers Pool</span>
                            </li>
                            <li className="flex items-center mb-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Unlimited bandwidth</span>
                            </li>
                            <li className="flex items-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    className="w-6 h-6 fill-current text-gray-800"
                                >
                                    <path d="M7.293 13.293l-3-3a1 1 0 011.414-1.414L8 12.586l8.293-8.293a1 1 0 111.414 1.414l-9 9a1 1 0 01-1.414 0z"></path>
                                </svg>
                                <span className="ml-2 text-gray-800">Access Advertisements Page</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PricingComponent;
