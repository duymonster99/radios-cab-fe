// libraries
import { useContext, useEffect, useState } from 'react';
import { CheckCircleOutlined, DeleteFilled, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Empty, Input, message, Rate, Select } from 'antd';
import { Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

// services
import Loading from '../../../../Helper/Loading';
import { getAdminService } from '../../../../Services/apiService';
import { DataContext } from '../../../../Hooks/context';

export default function TableFeedbackOfMyDriver({ columns }) {
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState([]);
    const [openForm, setOpenForm] = useState(null);
    const [isCall, setIsCall] = useState(true);
    const { company } = useContext(DataContext);

    // ? ----------------------------- when component mounted -------------------------
    const getFeedbackDriver = () => getAdminService(`Driver/company/${company.id}/drivers`);

    const { data, isSuccess, isLoading, isPending, isError } = useQuery({
        queryKey: ['querytyoe'],
        queryFn: getFeedbackDriver,
        enabled: isCall,
    });

    useEffect(() => {
        if (isSuccess) {
            setFeedback(data.drivers);
            setIsCall(false);
            setLoading(false);
        }
        if (isLoading || isPending) {
            setLoading(true);
        }
        if (isError) {
            setLoading(false);
        }
    }, [isSuccess, data, isLoading, isPending, isError]);

    let rows = [];
    for (let i = 0; i < columns.length; i++) {
        rows.push(columns[i].accessorKey);
    }

    console.log(data);

    return (
        <div className="w-full p-[2rem_.75rem] mx-auto bg-white z-[100] rounded-[1rem]">
            <Loading isLoading={loading}>
                <div className="w-[90%] p-[1rem_.75rem] mx-auto">
                    <div className="overflow-x-auto">
                        <table className="w-full mb-[1rem] text-[rgb(116,125,136)] vertical-top text-left">
                            <thead className="vertical-bottom border-b-[1px] border-[#000] text-[#000]">
                                <tr>
                                    {columns.map((item, index) => (
                                        <th key={index} className="py-[.5rem] pl-3" scope="col">
                                            {item.header}
                                        </th>
                                    ))}

                                    <th>Driver Name</th>

                                    <th className="py-[.5rem]" scope="col">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {feedback.length > 0 &&
                                    feedback.map((item, index) => (
                                        <>
                                            {item.feedbackDrivers?.map((feedback) => (
                                                <tr key={index} className="border-b-[1px] hover:bg-[#e8e8e9] px-3">
                                                    {rows.map((row) => (
                                                        <td className="py-[.8rem] pl-3">
                                                            {row !== 'rating' && feedback[row]}
                                                            {row === 'rating' && (
                                                                <Rate
                                                                    allowHalf
                                                                    disabled
                                                                    value={feedback[row]}
                                                                    style={{ fontSize: '1rem' }}
                                                                />
                                                            )}
                                                        </td>
                                                    ))}

                                                    <td>{item.driverFullName}</td>

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
                                        </>
                                    ))}

                                {feedback.length === 0 && feedback.every((item) => item.feedbackDrivers === null) && (
                                    <td colSpan={6} className="pt-5">
                                        <Empty />
                                    </td>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Loading>
        </div>
    );
}
