// libraries
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'react-router-dom';

// components
import ListDriverOfCompany from './components/ListDriver';
import FeedbackForCompany from './components/Feedback';

// services
import { getOneCompanyService } from '../../../../Services/apiService';
import axios from 'axios';
import FormCreateDriver from './components/FormCreateDriver';

export default function CompanyDetail(props) {
    const [company, setCompany] = useState({});
    const [openForm, setOpenForm] = useState(false);
    const { state } = useLocation();

    // ? ====================================== handle get one company ==================================
    const getOneCompanyService = async (apiUrl) => {
        try {
            fetch(`http://localhost:5192/api/AdminReferenceAction/company/${state.id}`)
                .then((response) => response.json())
                .then((data) => setCompany(data))
                .catch((error) => console.error('Fetch error:', error));

            
        } catch (error) {
            console.error('Axios error:', error);
        }
    };

    useEffect(() => {
        getOneCompanyService();
    }, []);

    return (
        <div style={props.style}>
            <div className="p-[3rem_.75rem] m-[3rem_auto_0] w-full">
                <div className="p-[3rem_.75rem] w-[80%] mx-auto">
                    <div className="flex flex-wrap m-[calc(1.5rem*-1)_calc(1.5rem/-2)_0]">
                        <div className="w-[75%] shrink-0 mt-[1.5rem] px-[.75rem] lg:flex-[0_0_auto] mx-auto">
                            <div className="flex flex-wrap m-[calc(1.5rem*-1)_calc(1.5rem/-2)">
                                <div className="w-full shrink-0 mt-[1.5rem] px-[.75rem] lg:w-[50%] lg:flex-[0_0_auto]">
                                    <div className="border border-[rgb(222,226,230)] rounded-[10px]">
                                        <img
                                            src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                                            className="h-auto rounded-[10px]"
                                            alt="company avatar"
                                        />
                                    </div>
                                </div>

                                <div className="w-full shrink-0 mt-[1.5rem] px-[.75rem] lg:w-[50%] lg:flex-[0_0_auto]">
                                    <h4 className="text-[calc(1.275rem+0.3vw)] mb-[1rem] xl:text-[1.5rem] mt-0 leading-[1.2] text-black font-bold">
                                        Company Name: {company?.companyName}
                                    </h4>
                                    <h5 className="font-['Open_Sans'] mb-[1rem] text-[1.25rem] leading-[1.2]">
                                        Company Email: {company?.companyEmail}
                                    </h5>
                                    <div className="flex mb-[1.5rem]">Telephone Number: {company?.companyTelephone}</div>
                                    <p className="mb-[1.5rem] mt-0">Our Address: {company?.companyAddress}, {company?.companyWard}, {company?.companyDistrict}, {company?.companyCity}</p>
                                    <p className="mb-[1.5rem] mt-0">Contact Person Us: {company?.contactPerson}</p>
                                    <p className="mb-[1.5rem] mt-0">Contact Person Mobile: {company?.contactPersonMobile}</p>
                                    <p className="mb-[1.5rem] mt-0 uppercase text-black font-bold">
                                        Register now to become our driver
                                    </p>
                                    <p>
                                        <button
                                            className="border-t-[1px] border-b-[1px] border-[#ffb524] text-[#81c408] rounded-[50rem] p-[1rem_1.5rem] transition-all duration-500 font-bold hover:bg-[#ffb524] hover:text-white"
                                            onClick={() => setOpenForm(true)}
                                        >
                                            Register
                                        </button>
                                    </p>
                                </div>

                                <div className="w-full shrink-0 mt-[1.5rem] px-[.75rem]">
                                    <nav>
                                        <div className="mb-[1px] flex flex-wrap pl-0 border-b border-[rgb(222,226,230)]">
                                            <button
                                                className={`mb-[-1px] p-[.5rem_1rem] transition-colors border-b-2 border-[#FFB524] text-[rgb(73,80,87)]`}
                                            >
                                                Description
                                            </button>
                                        </div>
                                    </nav>
                                    <div className="tab-pane">
                                        <p className="mt-0 mb-[1rem]">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quis
                                            explicabo facere ea quod architecto et facilis atque beatae exercitationem
                                            reiciendis, nobis minus similique. Illo excepturi sunt libero quod qui.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ListDriverOfCompany />

            <FeedbackForCompany />

            <FormCreateDriver openForm={openForm} setOpenForm={setOpenForm} cid={state.id} />
        </div>
    );
}
