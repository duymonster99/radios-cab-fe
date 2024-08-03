// libraries
import { DeleteFilled, EditOutlined, MailOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@mui/material';
import { Empty, Select } from 'antd';
import { useQuery } from '@tanstack/react-query';

// services
import { deleteApiService2, getApiService2, postApiService2 } from '../../../../Services/apiService';
import { DataContext } from '../../../../Hooks/context';
import { useMutationHook } from '../../../../Hooks/useMutation';
import * as message from '../../../../Helper/MessageToast';

export default function BodyTableDriver() {
    const [dataApi, setDataApi] = useState([]);
    const { columns, setLoading } = useContext(DataContext);
    const [openForm, setOpenForm] = useState(false);
    const [editRole, setEditRole] = useState('');
    const [shouldFetchApi, setShouldFetchApi] = useState(true);
    const [openFormEdit, setOpenFormEdit] = useState(false);
    const [driver, setDriver] = useState({})

    const getDrivers = () => getApiService2('Admin/getDrivers');
    const { data, isSuccess } = useQuery({
        queryKey: ['getDrivers'],
        queryFn: getDrivers,
        enabled: shouldFetchApi,
    });

    useEffect(() => {
        if (isSuccess) {
            setDataApi(data);
            setShouldFetchApi(false);
        }
    }, [data, isSuccess]);

    let rows = [];
    for (let i = 0; i < columns.length; i++) {
        rows.push(columns[i].accessorKey);
    }

    // ? ============================================ handle delete account ==================================
    const mutationDelete = useMutationHook((props) => deleteApiService2(props));

    const handleDelete = (id) => {
        mutationDelete.mutate({ url: `Admin/deleteDriver/${id}` });
    };

    const { isSuccess: deleteSuccess, isLoading: deleteLoading, isPending: deletePending } = mutationDelete;

    useEffect(() => {
        if (deleteSuccess) {
            message.success('Delete successfully!');
            setShouldFetchApi(true);
        }
        if (deleteLoading || deletePending) {
            setLoading(true);
        }
    }, [deleteSuccess, deleteLoading, deletePending]);

    return (
        <>
            {dataApi.length > 0 &&
                dataApi.map((item, index) => (
                    <motion.tr key={index} className="border-b-[1px] hover:bg-[#e8e8e9]">
                        {rows.map((row) => (
                            <td className="py-[.8rem]">
                                {row !== 'role' && item[row]}
                                {openForm && row === 'role' && (
                                    <Select
                                        defaultValue={item[row].toLowerCase()}
                                        style={{
                                            width: 120,
                                        }}
                                        onChange={handleChange}
                                        options={[
                                            {
                                                value: 'user',
                                                label: 'User',
                                            },
                                            {
                                                value: 'admin',
                                                label: 'Admin',
                                            },
                                        ]}
                                    />
                                )}
                                {!openForm && row === 'role' && item[row]}
                            </td>
                        ))}

                        <td className="py-[.8rem]">
                            <Tooltip title="Edit">
                                <button
                                    className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                    onClick={() => handleEditDriver(item)}
                                >
                                    <EditOutlined style={{ fontSize: '1.2rem' }} />
                                </button>
                            </Tooltip>

                            <Tooltip title="Delete" zIndex={1000}>
                                <button
                                    className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                    onClick={() => handleDelete(item.id)}
                                >
                                    <DeleteFilled style={{ color: '#dc3545', fontSize: '1.2rem' }} />
                                </button>
                            </Tooltip>
                        </td>
                    </motion.tr>
                ))}

            {dataApi.length === 0 && (
                <td colSpan={6} className="pt-5">
                    <Empty />
                </td>
            )}
        </>
    );
}
