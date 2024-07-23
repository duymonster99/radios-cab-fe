import { DeleteFilled, EditOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from '@mui/material';
import { DataContext } from '~/Hooks/context';

export default function BodyTableAccount() {
    const { dataApi, columns } = useContext(DataContext);

    let rows = [];
    for (let i = 0; i < columns.length; i++) {
        rows.push(columns[i].accessorKey);
    }

    return (
        <>
            {dataApi.map((item, index) => (
                <motion.tr
                    key={index}
                    className="border-b-[1px] hover:bg-[#e8e8e9]"
                >
                    {rows.map((row) => (
                        <td className="py-[.8rem]">
                            {row !== 'isAdmin' && item[row]}
                            {row === 'isAdmin' && (item[row] ? 'Admin' : 'User')}
                        </td>
                    ))}

                    <td className="py-[.8rem]">
                        <Tooltip title="Edit" zIndex={1000}>
                            <button className="duration-500 rounded-[50%] leading-[1.5] p-[.4rem_.75rem] hover:bg-[#b5b5b5]">
                                <EditOutlined style={{ fontSize: '1.2rem' }} />
                            </button>
                        </Tooltip>

                        <Tooltip title="Delete" zIndex={1000}>
                            <button className="duration-500 rounded-[50%] leading-[1.5] p-[.4rem_.75rem] hover:bg-[#b5b5b5]">
                                <DeleteFilled style={{ color: '#dc3545', fontSize: '1.2rem' }} />
                            </button>
                        </Tooltip>
                    </td>
                </motion.tr>
            ))}
        </>
    );
}
