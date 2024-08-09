import React, { useContext, useEffect, useRef, useState } from 'react';

// Libraries
import { SearchOutlined } from '@ant-design/icons';
import { getProvincesWithDetail } from 'vietnam-provinces';
import { Radio, Space } from 'antd';

// Components
import CardCompany from './CardCompany';
import PricingComponent from './Components/Pricing/Pricing';

// Services
import Loading from '../../../Helper/Loading';

// Data

const FilterLocation = ({ setSelectLocation }) => {
    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState(null);

    // ? =========================================== handle provinces =========================================
    useEffect(() => {
        const apiProvinces = async () => {
            try {
                const data = await getProvincesWithDetail();
                const provinceArray = Object.values(data);
                setLocations(provinceArray);
            } catch (error) {
                console.log(error);
            }
        };

        apiProvinces();
    }, []);

    // ? ================== HANDLE CHANGE FILTER ===============
    const onChange = (e) => {
        setLocation(e.target.value);
    };

    useEffect(() => {
        if (location !== 0) {
            setSelectLocation(location);
        } else {
            setSelectLocation(location);
        }
    }, [location]);

    return (
        <div className="w-full row-child">
            <div className="mb-[1rem]">
                <h4 className="text-[calc(1.275rem+0.3vw)] xl:text-[1.5rem] text-black">Filter By Location</h4>
                <div
                    id="scrollableDiv"
                    style={{
                        height: 400,
                        overflowY: 'auto',
                    }}
                    className="flex flex-col text-left"
                >
                    <Radio.Group onChange={onChange} value={location}>
                        <Space direction="vertical">
                            <Radio value={null}>Select All</Radio>
                            {locations !== null &&
                                locations !== undefined &&
                                locations.map((item, index) => <Radio value={item.name}>{item.name}</Radio>)}
                        </Space>
                    </Radio.Group>
                </div>
            </div>
        </div>
    );
};

const CompanyClient = (props) => {
    const [selectLocation, setSelectLocation] = useState(null);
    const [loadingPage, setLoadingPage] = useState(false);
    const pricingRef = useRef(null);

    const scrollToPricing = () => {
        if (pricingRef.current) {
            pricingRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div style={props.style}>
            <Loading isLoading={loadingPage}>
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
                                        <FilterLocation
                                            selectLocation={selectLocation}
                                            setSelectLocation={setSelectLocation}
                                        />
                                    </div>

                                    <div className="shrink-0 w-full max-w-full px-[.75rem] mt-[1.5rem] lg:w-[75%]">
                                        <div className="flex justify-start">
                                            <div className="md:w-[50%] md:flex-[0_0_auto] w-[33.3333%] xl:flex-[0_0_auto] xl:w-full mt-[1.5rem] px-[.75rem] flex gap-5">
                                                <CardCompany
                                                    setLoadingPage={setLoadingPage}
                                                    selectLocation={selectLocation}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <PricingComponent ref={pricingRef} />
            </Loading>
        </div>
    );
};

export default CompanyClient;
