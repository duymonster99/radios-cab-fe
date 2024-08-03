import React, { useEffect, useRef, useState } from 'react';

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { SearchOutlined } from '@ant-design/icons';

// Components
import { fadeIn } from '../../../Functions/GlobalAnimations';
import ProcessStep from '../../../Components/ProcessStep/ProcessStep';
import Sidebar from '../../../Components/SidebarClient/SidebarClient';
import CardCompany from './CardCompany';

// Services
import Loading from '../../../Helper/Loading';

// Data
import { ProcessStepData01 } from '../../../Components/ProcessStep/ProcessStepData';
import FormRegisterCompany from './FormRegister';
import PricingComponent from './Components/Pricing/Pricing';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { DataContext } from '../../../Hooks/context';
import { getCompanyService } from '../../../Services/apiService';
import { useQuery } from '@tanstack/react-query';

const CompanyProvider = ({children}) => {
    const [companies, setCompanies] = useState([]);
    const [listLocationFilter, setListLocationFilter] = useState([])

    // ? ========================================================== get list company ==========================================
    const getCompany = () => getCompanyService('AdminReferenceAction/allCompaniesInfo');

    const {
        data: getData,
        isSuccess: getSuccess,
        isLoading: getLoading,
    } = useQuery({ queryKey: ['getCompany'], queryFn: getCompany, retry: false });

    useEffect(() => {
        if (getLoading) {
            // setLoadingPage(true);
        } else if (getSuccess) {
            const companyActive = getData.data.filter((data) => data.isActive === true)
            setListLocationFilter(companyActive);
        }
    }, [getData, getSuccess, getLoading]);

    return(
        <DataContext.Provider value={{ listLocationFilter, setListLocationFilter }}>{children}</DataContext.Provider>
    )
}

const CompanyClient = (props) => {
    const [openForm, setOpenForm] = useState(false);
    const [loadingPage, setLoadingPage] = useState(false);
    const pricingRef = useRef(null);

    const scrollToPricing = () => {
        if (pricingRef.current) {
            pricingRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={props.style}>
            <div className="w-full px-[.75rem] mx-auto py-[3rem]">
                <div className="w-[90%] py-[3rem] px-[.75rem] mx-auto">
                    <div className="flex justify-between">
                        <h1 className="mb-[1.5rem] text-[calc(1.375rem+1.5vw)] xl:text-[2.5rem] mt-0 font-bold leading-[1.2] text-[rgb(69,89,91)]">
                            List Company
                        </h1>
                        <button
                            className="border-[1px] border-[#ffb524] text-[#81c408] rounded-[50rem] p-[.5rem_1.5rem] transition-all duration-500 font-bold hover:bg-[#ffb524] hover:text-white"
                            onClick={scrollToPricing}
                        >
                            Register Now
                        </button>
                    </div>

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
                                    <CompanyProvider><Sidebar /></CompanyProvider>
                                </div>

                                <div className="shrink-0 w-full max-w-full px-[.75rem] mt-[1.5rem] lg:w-[75%]">
                                    <div className="flex justify-start">
                                        <div className="md:w-[50%] md:flex-[0_0_auto] w-[33.3333%] xl:flex-[0_0_auto] xl:w-full mt-[1.5rem] px-[.75rem] flex gap-5">
                                            <CompanyProvider><CardCompany setLoadingPage={setLoadingPage} /></CompanyProvider>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Section Policy */}
            <section className="py-[130px] bg-gray-100 lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden mb-28">
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
                            <button
                                onClick={scrollToPricing}
                                className="uppercase bg-white font-medium shadow-md text-[#232323] p-[.8rem_2rem] duration-300 hover:-translate-y-1 hover:shadow-xl"
                            >
                                Get Started now
                            </button>
                        </Col>
                    </Row>
                </Container>
            </section>
            {/* Section End */}

            <PricingComponent ref={pricingRef} />
        </div>
    );
};

export default CompanyClient;
