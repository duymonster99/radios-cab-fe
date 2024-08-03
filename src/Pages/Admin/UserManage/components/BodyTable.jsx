// libraries
import { CheckOutlined, DeleteFilled, EditOutlined, MailOutlined } from '@ant-design/icons';
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
import FormMail from './FormMail';

export default function BodyTableAccount() {
    const [dataApi, setDataApi] = useState([]);
    const { columns, setLoading } = useContext(DataContext);
    const [openForm, setOpenForm] = useState(false);
    const [editRole, setEditRole] = useState('');
    const [shouldFetchApi, setShouldFetchApi] = useState(true);
    const [openMail, setOpenMail] = useState(false);

    const getAccount = () => getApiService2('Admin/getUsers');
    const { data, isSuccess } = useQuery({
        queryKey: ['getApis'],
        queryFn: getAccount,
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

    // ? ============================================ handle edit account ==========================================
    const handleChange = (value) => {
        setEditRole(value);
    };

    const mutation = useMutationHook((props) => postApiService2(props));

    const { isSuccess: postSuccess, isLoading, isPending } = mutation;

    const handleSubmitEdit = (id) => {
        const dataSubmit = {
            id: id,
            fullName: 'Duy Huynh',
            email: 'monsterebay189@gmail.com',
            password: 'huynhtuanduy18',
            role: editRole,
            refreshToken: 'string',
            refreshTokenExpiryTime: '2024-07-24T07:09:56.082Z',
        };
        mutation.mutate({ url: `Admin/updateUser/${id}`, data: dataSubmit });
    };

    useEffect(() => {
        if (postSuccess) {
            message.success('Update account successfully!');
            setShouldFetchApi(true);
            setOpenForm(false);
        }
        if (isLoading || isPending) {
            setLoading(true);
        }
    }, [postSuccess, isLoading, isPending]);

    // ? ============================================ handle delete account ==================================
    const mutationDelete = useMutationHook((props) => deleteApiService2(props));

    const handleDelete = (id) => {
        mutationDelete.mutate({ url: `Admin/deleteUser/${id}` });
    };

    const { isSuccess: deleteSuccess, isLoading: deleteLoading } = mutationDelete;

    useEffect(() => {
        if (deleteSuccess) {
            message.success('Delete successfully!');
            setShouldFetchApi(true);
        }
        if (deleteLoading) {
            setLoading(true);
        }
    }, [deleteSuccess, deleteLoading]);

    // ? ========================================== handle send mail ========================================
    const [emailU, setEmailU] = useState({})
    const handleOpenMail = (id) => {
        const user = dataApi.find((acc) => acc.id === id)

        setEmailU(user)
        const recipient = emailU.email
        const mailtoLink = `mailto:${recipient}`;

        window.location.href = mailtoLink
    }

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
                            <Tooltip title="Send Mail">
                                <button
                                    className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                    onClick={() => handleOpenMail(item.id)}
                                >
                                    <MailOutlined style={{ fontSize: '1.2rem', color: '#e8b533' }} />
                                </button>
                            </Tooltip>

                            {!openForm ? (
                                <Tooltip title="Edit">
                                    <button
                                        className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                        onClick={() => setOpenForm(true)}
                                    >
                                        <EditOutlined style={{ fontSize: '1.2rem' }} />
                                    </button>
                                </Tooltip>
                            ) : (
                                <Tooltip title="Submit Edit">
                                    <button
                                        className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                        onClick={() => handleSubmitEdit(item.id)}
                                    >
                                        <CheckOutlined style={{ fontSize: '1.2rem' }} />
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
                    </motion.tr>
                ))}

            {dataApi.length === 0 && (
                <td colSpan={6} className="pt-5">
                    <Empty />
                </td>
            )}

            <FormMail openMail={openMail} setOpenMail={setOpenMail} email={emailU.email} />
        </>
    );
}
