// Libraries
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FileImageOutlined } from '@ant-design/icons';
import { Empty } from 'antd';
import { useQuery } from '@tanstack/react-query';

// css
import styled from './Card.module.scss';
import classNames from 'classnames/bind';
import { getCompanyService } from '../../../../Services/apiService';
const cn = classNames.bind(styled);

export default function CardCompany({ setLoadingPage, selectLocation }) {
    const [companies, setCompanies] = useState([]);
    console.log(companies);

    // ? ========================================================== get list company ==========================================
    const getCompany = () => getCompanyService('AdminReferenceAction/allCompaniesInfo');

    const {
        data: getData,
        isSuccess: getSuccess,
        isLoading: getLoading,
    } = useQuery({ queryKey: ['getCompany'], queryFn: getCompany, retry: false });

    useEffect(() => {
        if (getSuccess) {
            if (selectLocation === null) {
                const companyActive = getData.data.filter((data) => data.isActive === true);
                setCompanies(companyActive);
            } else {
                const companyFilterByLocation = getData.data.filter((data) =>
                    data.companyLocationServices.some((service) => service.cityService === selectLocation),
                );
                // console.log(companyFilterByLocation);

                setCompanies(companyFilterByLocation);
            }
        }
    }, [getData, getSuccess, selectLocation]);

    // ? ==================================== handle navigate detail ======================================
    const navigate = useNavigate();

    const handleNavigate = (id) => {
        navigate('/company-detail', { state: { id: `${id}` } });
    };

    return (
        <>
            {companies.length > 0 &&
                companies.map((item, index) => (
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

            {companies.length === 0 && (
                <div className="flex mx-auto">
                    <Empty />
                </div>
            )}
        </>
    );
}
