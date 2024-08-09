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

    // ? ========================================================== get list company ==========================================
    const getCompany = () => getCompanyService('AdminReferenceAction/allCompaniesInfo');

    const {
        data: getData,
        isSuccess: getSuccess,
        isLoading: getLoading,
        isError
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

                setCompanies(companyFilterByLocation);
            }

            setLoadingPage(false)
        }

        if (getLoading) {
            setLoadingPage(true)
        }

        if (isError) {
            setLoadingPage(false)
        }
    }, [getData, getSuccess, selectLocation, getLoading, isError]);

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
                                    <img src={item.companyImageUrl} className='object-cover w-full h-full rounded-[15px]' alt='logo company' />
                                </div>
                                <div className={cn('flip-card-back')}>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                            <div className="text-center mt-4">
                                <h4 className="text-black font-bold text-2xl">{item.companyName}</h4>
                                <p>+84{item.companyTelephone}</p>
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
