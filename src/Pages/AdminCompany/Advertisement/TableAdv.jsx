// libraries
import { useContext, useEffect, useState } from 'react';
import { CheckCircleOutlined, DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Empty, Input, message, Select } from 'antd';
import { Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

// components
import CreateAdvs from './FormCreate';

// services
import { DataContext } from '../../../Hooks/context';
import { deleteCompanyService, getCompanyService, putCompanyService } from '../../../Services/apiService';
import { useMutationHook } from '../../../Hooks/useMutation';
import Loading from '../../../Helper/Loading';


export default function TableAdv({ columns }) {
    const [loading, setLoading] = useState(false)
    const [advs, setAdvs] = useState([]);
    const [openForm, setOpenForm] = useState(null);
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
    const getCompanyInType = () => getCompanyService(`AdvertisementImage/company/${company.id}/images`);

    const { data, isSuccess, isLoading, isPending } = useQuery({
        queryKey: ['querytyoe'],
        queryFn: getCompanyInType,
        enabled: isCall,
    });

    useEffect(() => {
        if (isSuccess) {
            setAdvs(data);
            setIsCall(false);
            setLoading(false)
        }
        if (isLoading || isPending) {
            setLoading(true)
        }
    }, [isSuccess, data, isLoading, isPending]);

    let rows = [];
    for (let i = 0; i < columns.length; i++) {
        rows.push(columns[i].accessorKey);
    }


    // ? --------------------- handle submit EDIT ------------------------------
    const mutation = useMutationHook((props) => putCompanyService(props));
    const { isSuccess: putType } = mutation;

    const handleSubmit = (id) => {
        mutation.mutate({ url: `CompanyService/company/${company.id}/service/${id}`, data: values });
    };

    useEffect(() => {
        if (putType) {
            setOpenForm(null);
            setValues('');
            message.success('Updated Service Type Successfully!');
            setIsCall(true);
        }
    }, [putType]);

    // ? ------------------------------- HANDLE DELETE -------------------------
    const deleteMutation = useMutationHook((props) => deleteCompanyService(props));
    const { isSuccess: deleteType } = deleteMutation;

    const handleDelete = (id) => {
        deleteMutation.mutate({ url: `AdvertisementImage/delete/${id}` });
    };

    useEffect(() => {
        if (deleteType) {
            message.success('Deleted Advertisement Successfully!');
            setIsCall(true);
        }
    }, [deleteType]);

    return (
        <div className="w-full p-[2rem_.75rem] mx-auto bg-white z-[100] rounded-[1rem]">
            <Loading isLoading={loading}>
                <div className="w-[90%] p-[1rem_.75rem] mx-auto">
                    <div className="overflow-x-auto">
                        {advs.length < 2 && buttonAdd()}

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
                                {advs !== undefined &&
                                    advs.length > 0 &&
                                    advs.map((item, index) => (
                                        <tr key={index} className="border-b-[1px] hover:bg-[#e8e8e9] px-3">
                                            {rows.map((row) => (
                                                <td className="py-[.8rem] pl-3">
                                                    {row !== 'imageUrl' && item[row]}
                                                    {row === 'imageUrl' && (
                                                        <img className='w-[100px] h-[100px]' src={item[row]} alt='banner' />
                                                    )}
                                                </td>
                                            ))}

                                            <td className="py-[.8rem]">
                                                <Tooltip title="Delete" zIndex={1000}>
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

                                {advs !== undefined && advs.length === 0 && (
                                    <td colSpan={6} className="pt-5">
                                        <Empty />
                                    </td>
                                )}

                                <CreateAdvs
                                    openAdd={openAdd}
                                    setOpenAdd={setOpenAdd}
                                    cid={company?.id}
                                    setIsCall={setIsCall}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </Loading>
        </div>
    );
}
