// libraries
import { useContext, useEffect, useState } from 'react';
import { CheckCircleOutlined, DeleteFilled, EditOutlined, EyeTwoTone, MailFilled } from '@ant-design/icons';
import { Empty, message, Select } from 'antd';
import { Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';
import {
    deleteCompanyService,
    getAdminService,
    getCompanyService,
    putCompanyService,
} from '../../../Services/apiService';
import Loading from '../../../Helper/Loading';
import { useMutationHook } from '../../../Hooks/useMutation';
import ViewCompanyProfile from './ViewProfile';

// components

// services

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

export default function TableNewCompanyAdmin({ columns }) {
    const [companies, setCompanies] = useState([]);
    const [openView, setOpenView] = useState(null);
    const [isCall, setIsCall] = useState(true);
    const [openAdd, setOpenAdd] = useState(false);
    const [loading, setLoading] = useState(false);

    // ? ----------------------------- when component mounted -------------------------
    const getAllCompany = () => getCompanyService(`AdminReferenceAction/allCompaniesInfo`);

    const { data, isSuccess, isLoading, isPending, isError } = useQuery({
        queryKey: ['queryCompanies'],
        queryFn: getAllCompany,
        enabled: isCall,
    });

    useEffect(() => {
        if (isSuccess) {
            const filterActive = data.data.filter((company) => company.isActive === false);
            setCompanies(filterActive);
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

    let rows = [];
    for (let i = 0; i < columns.length; i++) {
        rows.push(columns[i].accessorKey);
    }

    // ? ---------------------------------------- HANDLE OPEN VIEW ---------------------------------
    const [companyId, setCompanyId] = useState(null);

    const handleOpenView = (id) => {
        setCompanyId(id)
        setOpenView(true)
    };

    useEffect(() => {
        if (!openView) {
            setCompanyId(null);
        }
    }, [openView]);

    // ? ----------------------- HANDLE SEND MAIL -----------------------------------
    const handleSendmail = (email) => {
        window.location.href = `mailto:${email}`;
    };

    // ? ----------------------- HANDLE ACTIVE ACCOUNT ------------------------------
    const mutation = useMutationHook((props) => putCompanyService(props));

    const { isError: putError, isSuccess: putSuccess, isPending: putPending } = mutation;

    const handleActiveAccount = (id) => {
        const dataUpdate = {
            isActive: true,
        };

        mutation.mutate({ url: `CompanyInfoUpdate/company/${id}/update`, data: dataUpdate });
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
                                {companies !== undefined &&
                                    companies.length > 0 &&
                                    companies.map((item, index) => (
                                        <tr key={index} className="border-b-[1px] hover:bg-[#e8e8e9] px-3">
                                            {rows.map((row) => (
                                                <td className="py-[.8rem] pl-3">
                                                    {row !== 'isActive' && item[row]}
                                                    {row === 'isActive' && item[row] === true && 'Approved'}
                                                    {row === 'isActive' && item[row] === false && 'Pending approval'}
                                                </td>
                                            ))}

                                            <td className="py-[.8rem]">
                                                <Tooltip title="Submit Profile">
                                                    <button
                                                        className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                                        onClick={() => handleActiveAccount(item.id)}
                                                    >
                                                        <CheckCircleOutlined
                                                            style={{ color: 'green', fontSize: '1.2rem' }}
                                                        />
                                                    </button>
                                                </Tooltip>

                                                <Tooltip title="View Full Profile">
                                                    <button
                                                        className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                                        onClick={() => handleOpenView(item.id)}
                                                    >
                                                        <EyeTwoTone style={{ fontSize: '1.2rem' }} />
                                                    </button>
                                                </Tooltip>

                                                <Tooltip title="Send Mail">
                                                    <button
                                                        className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                                        onClick={() => handleSendmail(item.driverEmail)}
                                                    >
                                                        <MailFilled style={{ fontSize: '1.2rem', color: "red" }} />
                                                    </button>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))}

                                {companies !== undefined && companies.length === 0 && (
                                    <td colSpan={6} className="pt-5">
                                        <Empty />
                                    </td>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Loading>

            <ViewCompanyProfile openView={openView} setOpenView={setOpenView} id={openView ? companyId : null} />
        </div>
    );
}
