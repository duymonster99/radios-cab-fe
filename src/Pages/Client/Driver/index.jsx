import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// Libraries
import { SearchOutlined } from '@ant-design/icons';

// Components
import CardDriver from './CardDriver';
import { getCompanyService } from '../../../Services/apiService';
import { Radio, Space } from 'antd';
import Loading from '../../../Helper/Loading';

// Data
const DataSidebarFilter = ({ selectCompany, setSelectCompany, setLoading }) => {
    const [companies, setCompanies] = useState([]);
    const [value, setValue] = useState(0);

    // ? ==================== GET API ====================
    const getCompanies = () => getCompanyService('AdminReferenceAction/allCompaniesInfo');

    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['queryCompanies'],
        queryFn: getCompanies,
        retry: false,
    });

    useEffect(() => {
        if (isSuccess) {
            setCompanies(data?.data);
            setLoading(false);
        }
        if (isLoading) {
            setLoading(true);
        }
    }, [isSuccess, isLoading]);

    // ? ================== HANDLE CHANGE FILTER ===============
    const onChange = (e) => {
        setValue(e.target.value);
    };

    useEffect(() => {
        if (value !== 0) {
            setSelectCompany(value);
        } else {
            setSelectCompany(null);
        }
    }, [value]);

    return (
        <div className="w-full row-child">
            <div className="mb-[1rem]">
                <h4 className="text-[calc(1.275rem+0.3vw)] xl:text-[1.5rem] text-black">Filter By Company</h4>
                <div
                    id="scrollableDiv"
                    style={{
                        height: 400,
                        overflowY: 'auto',
                    }}
                    className="flex flex-col text-left"
                >
                    <Radio.Group onChange={onChange} value={value}>
                        <Space direction="vertical">
                            <Radio value={0}>Select All</Radio>
                            {companies !== null &&
                                companies !== undefined &&
                                companies.map((item, index) => <Radio value={item.id}>{item.companyName}</Radio>)}
                        </Space>
                    </Radio.Group>
                </div>
            </div>
        </div>
    );
};

const DriverClient = (props) => {
    const [selectCompany, setSelectCompany] = useState(null);
    const [loading, setLoading] = useState(false);

    return (
        <div style={props.style}>
            <Loading isLoading={loading}>
                <div className="w-full px-[.75rem] mx-auto py-[3rem]">
                    <div className="w-[90%] py-[3rem] px-[.75rem] mx-auto">
                        <h1 className="mb-[1.5rem] text-[calc(1.375rem+1.5vw)] xl:text-[2.5rem] mt-0 font-bold leading-[1.2] text-[rgb(69,89,91)]">
                            List Drivers
                        </h1>

                        <div className="flex flex-wrap m-[calc(1.5rem*-1)_calc(1.5rem/-2)_0]">
                            <div className="mt-[1.5rem] w-full px-[calc(1.5rem/2)]">
                                <div className="row justify-between">
                                    <div className="xl:w-[25%] xl:flex-[0_0_auto] row-child w-full">
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

                                    <div className="shrink-0 w-full pl-[.75rem] mt-[1.5rem] xl:w-[25%] xl:flex-[0_0_auto]">
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

                                <div className="row mb-[100px]">
                                    <div className="w-full row-child lg:w-[25%] lg:flex-[0_0_auto]">
                                        <DataSidebarFilter
                                            selectCompany={selectCompany}
                                            setSelectCompany={setSelectCompany}
                                            setLoading={setLoading}
                                        />
                                    </div>

                                    <div className="shrink-0 w-full max-w-full px-[.75rem] mt-[1.5rem] lg:w-[75%]">
                                        <div className="flex justify-start">
                                            <div className="sm:w-[50%] sm:flex-[0_0_auto] lg:w-[33.3333%] lg:flex-[0_0_auto] w-full mt-[1.5rem] px-[.75rem] flex gap-5">
                                                <CardDriver selectCompany={selectCompany} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Loading>
        </div>
    );
};

export default DriverClient;
