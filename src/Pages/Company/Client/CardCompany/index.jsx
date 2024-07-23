// Libraries
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// services
import { getApiService2 } from '../../../../Services/apiService';

// images
import { FileImageOutlined } from '@ant-design/icons';

// css
import styled from './Card.module.scss';
import classNames from 'classnames/bind';
import { Empty } from 'antd';
const cn = classNames.bind(styled);

export default function CardCompany({ setLoadingPage }) {
    const [companies, setCompanies] = useState([]);

    // ? ========================================================== get list company ==========================================
    const getCompany = () => getApiService2('/company');

    const {
        data: getData,
        isSuccess: getSuccess,
        isLoading: getLoading,
    } = useQuery({ queryKey: ['getCompany'], queryFn: getCompany });

    useEffect(() => {
        if (getLoading) {
            // setLoadingPage(true);
        } else if (getSuccess) {
            setCompanies(getData);
        }
    }, [getData, getSuccess, getLoading]);

    return (
        <>
            {companies.length > 0 &&
                companies.map((item, index) => (
                    <Link key={index}>
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
                                    <p className={cn('title')}>Name Company</p>
                                    <p>Company Description</p>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <h4 className="text-black font-bold text-2xl">Name Company</h4>
                            </div>
                        </div>
                    </Link>
                ))}

            {companies.length === 0 && (
                <div><Empty /></div>
            )}
        </>
    );
}
