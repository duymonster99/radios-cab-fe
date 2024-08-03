// libraries
import { useContext, useEffect, useState } from 'react';
import { CheckCircleOutlined, DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Empty, Input, message, Select } from 'antd';
import { Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

// components
import AddType from './FormCreate';

// services
import { DataContext } from '../../../Hooks/context';
import { deleteCompanyService, getCompanyService, putCompanyService } from '../../../Services/apiService';
import { useMutationHook } from '../../../Hooks/useMutation';

// Data
const options = [
    {
        label: 'Two Wheeler Service',
        value: 'Two Wheeler Service',
        desc: 'Two Wheeler Service',
    },
    {
        label: 'Four Seater Car Service',
        value: 'Four Seater Car Service',
        desc: 'Four Seater Car Service',
    },
    {
        label: 'Seven Seater Car Service',
        value: 'Seven Seater Car Service',
        desc: 'Seven Seater Car Service',
    },
];

export default function TableCompanyType({ columns }) {
    const [serviceType, setServiceType] = useState([]);
    const [openForm, setOpenForm] = useState(null);
    const [values, setValues] = useState({
        serviceType: '',
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
    const getCompanyInType = () => getCompanyService(`CompanyService/company/${company.id}/services`);

    const { data, isSuccess } = useQuery({
        queryKey: ['querytyoe'],
        queryFn: getCompanyInType,
        enabled: isCall,
    });

    useEffect(() => {
        if (isSuccess) {
            setServiceType(data.data);
            setIsCall(false);
        }
    }, [isSuccess, data]);

    let rows = [];
    for (let i = 0; i < columns.length; i++) {
        rows.push(columns[i].accessorKey);
    }

    // ? ----------------------------- handle data select -------------------------
    const handleChange = (value) => {
        setValues({
            serviceType: value,
        });
    };

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
        deleteMutation.mutate({ url: `CompanyService/delete/${id}` });
    };

    useEffect(() => {
        if (deleteType) {
            message.success('Deleted Service Type Successfully!');
            setIsCall(true);
        }
    }, [deleteType]);

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
                            {serviceType !== undefined &&
                                serviceType.length > 0 &&
                                serviceType.map((item, index) => (
                                    <tr key={index} className="border-b-[1px] hover:bg-[#e8e8e9] px-3">
                                        {rows.map((row) => (
                                            <td className="py-[.8rem] pl-3">
                                                {row !== 'serviceType' && item[row]}
                                                {openForm === index && row === 'serviceType' && (
                                                    <Select
                                                        style={{
                                                            width: '50%',
                                                        }}
                                                        defaultValue={item.serviceType}
                                                        onChange={handleChange}
                                                        options={options}
                                                    >
                                                    </Select>
                                                )}

                                                {openForm !== index && row === 'serviceType' && item[row]}
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

                            {serviceType !== undefined && serviceType.length === 0 && (
                                <td colSpan={6} className="pt-5">
                                    <Empty />
                                </td>
                            )}

                            <AddType
                                openAdd={openAdd}
                                setOpenAdd={setOpenAdd}
                                cid={company?.id}
                                setIsCall={setIsCall}
                            />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
