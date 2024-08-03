// libraries
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircleOutlined, DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { getProvincesWithDetail } from 'vietnam-provinces';

// components

// services
import { DataContext } from '../../Hooks/context';
import { deleteCompanyService, getCompanyService, putCompanyService } from '../../Services/apiService';
import { useQuery } from '@tanstack/react-query';
import { useMutationHook } from '../../Hooks/useMutation';
import { Empty, message, Select } from 'antd';
import { Tooltip } from '@mui/material';
import AddLocation from '../../Pages/AdminCompany/LocationManage/FormCreate';

export default function TableAdminPage({ columns }) {
    const { pathname } = useLocation();
    const [locations, setLocations] = useState([]);
    const [provinces, setProvinces] = useState([]);
    const [openForm, setOpenForm] = useState(null);
    const [values, setValues] = useState({
        cityService: '',
    });
    const [isCall, setIsCall] = useState(true);
    const { company } = useContext(DataContext);
    const [openAdd, setOpenAdd] = useState(false);

    const buttonAdd = () => {
        return (
            <div
                className="w-[150px] h-[150px] flex-col border-2 border-dashed border-[#cacaca] group rounded-xl flex items-center justify-center mb-4 cursor-pointer bg-slate-200 hover:bg-slate-100 duration-200"
                onClick={() => setOpenAdd(true)}
            >
                <PlusOutlined className="text-3xl " />
                <span className="font-bold text-xl">CREATE</span>
            </div>
        );
    };

    // ? ----------------------------- when component mounted -------------------------
    const getCompanyInLocation = () => getCompanyService(`CompanyLocation/company/${company.id}/locations`);

    const { data, isSuccess } = useQuery({
        queryKey: ['queryLocation'],
        queryFn: getCompanyInLocation,
        enabled: isCall,
    });

    useEffect(() => {
        if (isSuccess) {
            setLocations(data);
            setIsCall(false);
        }
    }, [isSuccess, data]);

    let rows = [];
    for (let i = 0; i < columns.length; i++) {
        rows.push(columns[i].accessorKey);
    }

    // ? =========================================== handle provinces =========================================
    useEffect(() => {
        const apiProvinces = async () => {
            try {
                const data = await getProvincesWithDetail();
                const provinceArray = Object.values(data);
                setProvinces(provinceArray);
            } catch (error) {
                console.log(error);
            }
        };

        apiProvinces();
    }, []);

    // ? ----------------------------- handle data select -------------------------
    const handleChange = (value) => {
        setValues({
            cityService: value,
        });
    };

    // ? --------------------- handle submit EDIT ------------------------------
    const mutation = useMutationHook((props) => putCompanyService(props));
    const { isSuccess: putLocation } = mutation;

    const handleSubmit = (id) => {
        mutation.mutate({ url: `CompanyLocation/company/location/${id}`, data: values });
    };

    useEffect(() => {
        if (putLocation) {
            setOpenForm(null);
            setValues('');
            message.success('Updated Location Successfully!');
            setIsCall(true);
        }
    }, [putLocation]);

    // ? ------------------------------- HANDLE DELETE -------------------------
    const deleteMutation = useMutationHook((props) => deleteCompanyService(props));
    const { isSuccess: deleteLocation } = deleteMutation;

    const handleDelete = (id) => {
        deleteMutation.mutate({ url: `CompanyLocation/company/location/${id}` });
    };

    useEffect(() => {
        if (deleteLocation) {
            message.success('Deleted Location Successfully!');
            setIsCall(true);
        }
    }, [deleteLocation]);

    // ? ------------------------------ HANDLE PAGINATE ---------------------------
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 10;
    const lastItemIndex = currentPage * itemPerPage;
    const firstItemIndex = lastItemIndex - itemPerPage;

    const currentItemPage = locations.slice(firstItemIndex, lastItemIndex);

    // handle number paginate
    let pages = [];
    const totalItems = locations.length;
    for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
        pages.push(i);
    }

    const handlePrevPaginate = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextPaginate = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <div className="w-full p-[2rem_.75rem] mx-auto bg-white z-[100] rounded-[1rem]">
            <div className="w-[90%] p-[1rem_.75rem] mx-auto">
                <div className="overflow-x-auto">
                    {buttonAdd()}

                    <table className="w-full mb-[1rem] text-[rgb(116,125,136)] vertical-top text-left">
                        <thead className="vertical-bottom border-b-[1px] border-[#000] text-[#000]">
                            <tr>
                                {columns.map((item, index) => (
                                    <th key={index} className="py-[.5rem]" scope="col">
                                        {item.header}
                                    </th>
                                ))}

                                <th className="py-[.5rem]" scope="col">
                                    Action
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {locations !== undefined &&
                                locations.length > 0 &&
                                currentItemPage.map((item, index) => (
                                    <tr key={index} className="border-b-[1px] hover:bg-[#e8e8e9] px-3">
                                        {rows.map((row) => (
                                            <td className="py-[.8rem] pl-3">
                                                {row !== 'cityService' && item[row]}
                                                {openForm === index && row === 'cityService' && (
                                                    <Select
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                        defaultValue={item.cityService}
                                                        onChange={handleChange}
                                                    >
                                                        {provinces.map((province) => {
                                                            return (
                                                                <Select.Option
                                                                    key={province.code}
                                                                    value={province.name}
                                                                >
                                                                    {province.name}
                                                                </Select.Option>
                                                            );
                                                        })}
                                                    </Select>
                                                )}

                                                {openForm !== index && row === 'cityService' && item[row]}
                                            </td>
                                        ))}

                                        <td className="py-[.8rem]">
                                            {openForm !== index ? (
                                                <Tooltip title="Edit">
                                                    <button
                                                        className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                                        onClick={() => setOpenForm(index)}
                                                    >
                                                        <EditOutlined style={{ fontSize: '1.2rem' }} />
                                                    </button>
                                                </Tooltip>
                                            ) : (
                                                <Tooltip title="Submit Edit">
                                                    <button
                                                        className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                                        onClick={() => handleSubmit(item.id)}
                                                    >
                                                        <CheckCircleOutlined
                                                            className="text-green-500"
                                                            style={{ fontSize: '1.2rem' }}
                                                        />
                                                    </button>
                                                </Tooltip>
                                            )}

                                            <Tooltip title="Delete" zIndex={1000}>
                                                <button
                                                    className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <DeleteFilled style={{ color: '#dc3545', fontSize: '1.2rem' }} />
                                                </button>
                                            </Tooltip>
                                        </td>
                                    </tr>
                                ))}

                            {locations !== undefined && locations.length === 0 && (
                                <td colSpan={6} className="pt-5">
                                    <Empty />
                                </td>
                            )}

                            <AddLocation
                                openAdd={openAdd}
                                setOpenAdd={setOpenAdd}
                                provinces={provinces}
                                cid={company?.id}
                                setIsCall={setIsCall}
                            />
                        </tbody>
                    </table>

                    {totalItems > 1 && (
                        <div className="w-full flex-[0_0_auto] px-[calc(1.5rem/2)] mt-[1.5rem]">
                            <div className="mt-[3rem] flex justify-center pl-0">
                                {currentPage > 1 && (
                                    <button
                                        className={`text-gray-500 p-[10px_16px] transition-all duration-500 ease border mx-[4px] my-0 text-[1rem] rounded-[10px] border-blue-600`}
                                        onClick={handlePrevPaginate}
                                    >
                                        &laquo;
                                    </button>
                                )}

                                {pages.map((item, index) => (
                                    <button
                                        className={`p-[10px_16px] transition-all duration-500 ease border mx-[4px] rounded-[10px] ${
                                            currentPage === item ? 'bg-blue-500 text-white' : 'text-[#45595B]'
                                        }`}
                                        key={index}
                                        onClick={() => setCurrentPage(item)}
                                    >
                                        {item}
                                    </button>
                                ))}

                                {currentPage < totalItems / itemPerPage && (
                                    <button
                                        className={`p-[10px_16px] transition-all duration-500 ease border border-[#FFB524] mx-[4px] rounded-[10px] `}
                                        onClick={handleNextPaginate}
                                    >
                                        &raquo;
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
