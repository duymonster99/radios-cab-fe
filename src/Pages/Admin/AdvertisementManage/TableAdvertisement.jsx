// libraries
import { useContext, useEffect, useState } from 'react';
import { CheckCircleOutlined, DeleteFilled, EditOutlined, EyeTwoTone, MailFilled } from '@ant-design/icons';
import { Empty, message, Select } from 'antd';
import { Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';

// components
// import ViewDriverProfile from './ViewProfileDriver';

// services
import { DataContext } from '../../../Hooks/context';
import {
    deleteCompanyService,
    deleteDriverService,
    getAdminService,
    getCompanyService,
    putCompanyService,
    putDriverService,
} from '../../../Services/apiService';
import { useMutationHook } from '../../../Hooks/useMutation';
import Loading from '../../../Helper/Loading';

// Data
const options = [
    {
        value: '10',
        label: '10 Items Per Page',
    },
    {
        value: '15',
        label: '15 Items Per Page',
    },
    {
        value: '20',
        label: '20 Items Per Page',
    },
    {
        value: '50',
        label: '50 Items Per Page',
    },
];

export default function TableAds({ columns }) {
    const [companies, setCompanies] = useState([]);
    const [ads, setAds] = useState([]);
    const [openView, setOpenView] = useState(null);
    const [isCall, setIsCall] = useState(true);
    const [loading, setLoading] = useState(false);

    // ? ----------------------------- when component mounted -------------------------
    const getAllDriverInAdminCompany = () => getCompanyService(`AdminReferenceAction/allCompaniesInfo`);
    const getAllCompanies = () => getCompanyService(`AdminReferenceAction/allCompaniesInfo`);

    const { data, isSuccess, isLoading, isPending, isError } = useQuery({
        queryKey: ['queryDrivers'],
        queryFn: getAllDriverInAdminCompany,
        enabled: isCall,
    });

    const {
        data: getCompanies,
        isSuccess: getSuccess,
        isLoading: getLoading,
        isPending: getPending,
        isError: getError,
    } = useQuery({
        queryKey: ['queryCompanies'],
        queryFn: getAllCompanies,
        enabled: isCall,
    });

    useEffect(() => {
        if (isSuccess) {
            // const filterDriverActive = data?.data?.filter((driver) => driver.isActive === true);
            setAds(data?.data);
            setIsCall(false);
            setLoading(false);
        }
        if (isLoading || isPending) {
            setLoading(true);
        }
        if (isError) {
            setLoading(false);
            setIsCall(false);
        }
    }, [isSuccess, data, isLoading, isPending, isError]);

    useEffect(() => {
        if (getSuccess) {
            // const filterCompanyActive = data?.data?.filter((driver) => driver.isActive === true);
            // console.log(filterCompanyActive);

            setAds(data?.data);
            setIsCall(false);
            setLoading(false);
        }
        if (getLoading || getPending) {
            setLoading(true);
        }
        if (getError) {
            setLoading(false);
            setIsCall(false);
        }
    }, [getSuccess, getCompanies, getLoading, getPending, getError]);

    let rows = [];
    for (let i = 0; i < columns.length; i++) {
        rows.push(columns[i].accessorKey);
    }

    // ? ------------------------------- HANDLE DELETE -------------------------
    const deleteMutation = useMutationHook((props) => deleteCompanyService(props));
    const { isSuccess: deleteAdv } = deleteMutation;

    const handleDelete = (id) => {
        deleteMutation.mutate({ url: `AdvertisementImage/delete/${id}` });
    };

    useEffect(() => {
        if (deleteAdv) {
            message.success('Deleted Advertisement Successfully!');
            setIsCall(true);
        }
    }, [deleteAdv]);

    // ? ------------------------------ HANDLE PAGINATE ---------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const [itemPerPage, setItemPerPage] = useState(10);
    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;

    const currentItemPage = ads?.slice(firstItemIndex, lastItemIndex) ?? [];

    // handle number paginate
    let pages = [];
    const totalItems = ads?.length;
    for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
        pages.push(i);
    }

    const handlePrevPaginate = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPaginate = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleSelectItem = (value) => {
        setItemPerPage(value);
    };

    // ? ----------------------- HANDLE ACTIVE ADV ------------------------------
    const mutation = useMutationHook((props) => putCompanyService(props));

    const { isError: putError, isSuccess: putSuccess, isPending: putPending } = mutation;

    const handleActiveAdv = (id) => {
        const dataUpdate = {
            isActive: true,
        };

        mutation.mutate({ url: `AdvertisementImage/update/${id}`, data: dataUpdate });
    };

    // handle after put
    useEffect(() => {
        if (putSuccess) {
            message.success('Updated Successfully!');
            setIsCall(true);
            setLoading(false);
        }

        if (putPending) {
            setLoading(true);
        }
    }, [putSuccess, putPending]);

    useEffect(() => {
        if (putError) {
            message.error('Updated Failed!');
        }
    }, [putError]);

    return (
        <div className="w-full p-[2rem_.75rem] mx-auto bg-white z-[100] rounded-[1rem]">
            <Loading isLoading={loading}>
                <div className="w-[90%] p-[1rem_.75rem] mx-auto">
                    <div className="overflow-x-auto">
                        <table className="w-full mb-[1rem] text-[rgb(116,125,136)] vertical-top text-left">
                            <thead className="vertical-bottom border-b-[1px] border-[#000] text-[#000]">
                                <tr className="">
                                    {columns.map((item, index) => (
                                        <th key={index} className="py-[.5rem] pl-3" scope="col">
                                            {item.header}
                                        </th>
                                    ))}

                                    <th className="py-[.5rem]" scope="col">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentItemPage.length > 0 &&
                                    currentItemPage.map((item, index) => (
                                        <>
                                            {item.advertisements?.map((image) => (
                                                <tr key={index} className="border-b-[1px] hover:bg-[#e8e8e9] px-3">
                                                    <td>{image.id}</td>

                                                    <td className="py-2">
                                                        <img className="w-[100px]" src={image.imageUrl} alt="" />
                                                    </td>

                                                    <td>{image.description}</td>

                                                    <td>{item.companyName}</td>

                                                    <td className="py-[.8rem]">
                                                        <Tooltip title="Disactive Driver">
                                                            <button
                                                                className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                                                onClick={() => handleActiveAdv(item.id)}
                                                            >
                                                                <CheckCircleOutlined
                                                                    style={{ color: 'green', fontSize: '1.2rem' }}
                                                                />
                                                            </button>
                                                        </Tooltip>

                                                        <Tooltip title="Send Mail">
                                                            <button
                                                                className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                                                onClick={() => handleSendmail(item.driverEmail)}
                                                            >
                                                                <MailFilled style={{ fontSize: '1.2rem' }} />
                                                            </button>
                                                        </Tooltip>

                                                        <Tooltip title="Delete">
                                                            <button
                                                                className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                                                onClick={() => handleDelete(item.id)}
                                                            >
                                                                <DeleteFilled
                                                                    style={{ color: '#dc3545', fontSize: '1.2rem' }}
                                                                />
                                                            </button>
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            ))}
                                        </>
                                    ))}

                                {currentItemPage.length > 0 &&
                                    currentItemPage.every((item) => item.advertisements === null) && (
                                        <tr>
                                            <td colSpan={6} className="pt-5">
                                                <Empty />
                                            </td>
                                        </tr>
                                    )}
                            </tbody>
                        </table>

                        {currentItemPage.length > 0 &&
                            currentItemPage.map((item, index) => (
                                <>
                                    {item.advertisements !== null && (
                                        <div className="w-full flex-[0_0_auto] px-[calc(1.5rem/2)] mt-[3rem] flex justify-center items-center">
                                            <div className="flex pl-0">
                                                <button
                                                    className={`text-gray-500 p-[10px_16px] transition-all duration-500 ease border mx-[4px] my-0 text-[1rem] rounded-[10px] text-lg disabled:cursor-not-allowed disabled:bg-gray-100 hover:bg-blue-500`}
                                                    disabled={currentPage === 1 && true}
                                                    onClick={handlePrevPaginate}
                                                >
                                                    &laquo;
                                                </button>

                                                {pages.map((item, index) => (
                                                    <button
                                                        className={`hover:bg-blue-500 text-lg p-[10px_16px] transition-all duration-500 ease border mx-[4px] rounded-[10px] ${
                                                            currentPage === item
                                                                ? 'bg-blue-500 text-white'
                                                                : 'text-[#45595B]'
                                                        }`}
                                                        key={index}
                                                        onClick={() => setCurrentPage(item)}
                                                    >
                                                        {item}
                                                    </button>
                                                ))}

                                                <button
                                                    className={`text-lg p-[10px_16px] transition-all duration-500 ease border mx-[4px] rounded-[10px] hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100`}
                                                    disabled={currentPage > totalItems / itemPerPage && true}
                                                    onClick={handleNextPaginate}
                                                >
                                                    &raquo;
                                                </button>
                                            </div>

                                            <div className="">
                                                <Select
                                                    style={{ width: '180px', marginLeft: '10px' }}
                                                    options={options}
                                                    value={`${itemPerPage}`}
                                                    onChange={handleSelectItem}
                                                />
                                            </div>
                                        </div>
                                    )}
                                </>
                            ))}
                    </div>
                </div>
            </Loading>

            {/* <ViewDriverProfile openView={openView} setOpenView={setOpenView} id={driver} /> */}
        </div>
    );
}
