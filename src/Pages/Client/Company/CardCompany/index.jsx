// Libraries
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { FileImageOutlined } from '@ant-design/icons';
import { Empty } from 'antd';

// css
import styled from './Card.module.scss';
import classNames from 'classnames/bind';
import { DataContext } from '../../../../Hooks/context';
const cn = classNames.bind(styled);

export default function CardCompany({ setLoadingPage }) {
    const { listLocationFilter } = useContext(DataContext)   
    console.log(listLocationFilter); 

    // ? ==================================== handle navigate detail ======================================
    const navigate = useNavigate()

    const handleNavigate = (id) => {
        navigate("/company-detail", { state: { id: `${id}` } })
    }

    return (
        <>
            {listLocationFilter.length > 0 &&
                listLocationFilter.map((item, index) => (
                    <button key={index} onClick={() => handleNavigate(item.id)}>
                        <div className={cn('flip-card')}>
                            <div className={cn('flip-card-inner')}>
                                <div className={cn('flip-card-front')}>
                                    <FileImageOutlined
                                        className="text-[white] text-center"
                                        style={{
                                            fontSize: '4rem',
                                            transition: 'all 0.6s cubic-bezier(0.23, 1, 0.320, 1)',
                                        }}
                                    />
                                </div>
                                <div className={cn('flip-card-back')}>
                                    <p className={cn('title')}>{item.companyName}</p>
                                    <p>Company Description</p>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <h4 className="text-black font-bold text-2xl">{item.companyName}</h4>
                            </div>
                        </div>
                    </button>
                ))}

            {listLocationFilter.length === 0 && (
                <div className='flex mx-auto'><Empty /></div>
            )}
        </>
    );
}
