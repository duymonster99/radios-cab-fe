// libraries
import { useContext, useEffect, useState } from 'react';
import { CheckCircleOutlined, DeleteFilled, EditOutlined, EyeTwoTone, MailFilled } from '@ant-design/icons';
import { Empty, message, Rate } from 'antd';
import { Tooltip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { jwtDecode } from 'jwt-decode';

// services
import { getOneDriverService, putAdminService } from '../../../Services/apiService';
import { useMutationHook } from '../../../Hooks/useMutation';
import Loading from '../../../Helper/Loading';
import { DataContext } from '../../../Hooks/context';

export default function TableFeedbackDriver({ columns }) {
    const [driverDetail, setDriverDetail] = useState([]);
    const [loading, setLoading] = useState(false);
    const { driver } = useContext(DataContext);

    // ? ----------------------------- when component mounted -------------------------
    useEffect(() => {
        if (driver) {
            setDriverDetail(driver.feedbackDrivers);
        }
    }, [driver]);

    let rows = [];
    for (let i = 0; i < columns.length; i++) {
        rows.push(columns[i].accessorKey);
    }

    // ? ----------------------- HANDLE SEND MAIL -----------------------------------
    const handleSendmail = (email) => {
        window.location.href = `mailto:${email}`;
    };

    console.log(driverDetail);

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
                                {driverDetail !== undefined &&
                                    driverDetail.length > 0 &&
                                    driverDetail.map((item, index) => (
                                        <tr key={index} className="border-b-[1px] hover:bg-[#e8e8e9] px-3">
                                            {rows.map((row) => (
                                                <td className="py-[.8rem] pl-3">
                                                    {row !== 'rating' && item[row]}
                                                    {row === 'rating' && (
                                                        <Rate
                                                            allowHalf
                                                            value={item[row]}
                                                            style={{ fontSize: '1rem' }}
                                                        />
                                                    )}
                                                </td>
                                            ))}

                                            <td className="py-[.8rem]">
                                                <Tooltip title="Send Mail">
                                                    <button
                                                        className="duration-500 rounded-[50%] p-[.5rem_.6rem] hover:bg-[#b5b5b5]"
                                                        onClick={() => handleSendmail(item.email)}
                                                    >
                                                        <MailFilled style={{ fontSize: '1.2rem' }} />
                                                    </button>
                                                </Tooltip>
                                            </td>
                                        </tr>
                                    ))}

                                {driverDetail !== undefined && driverDetail.length === 0 && (
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
