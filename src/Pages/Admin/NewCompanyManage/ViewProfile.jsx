// libraries
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// services
import Loading from '../../../Helper/Loading';
import { getCompanyService } from '../../../Services/apiService';

export default function ViewCompanyProfile({ openView, setOpenView, id }) {
    const [company, setCompany] = useState({});
    const [loading, setLoading] = useState(false);
    const [isCall, setIsCall] = useState(false)

    useEffect(() => {
        if (id) {
            setIsCall(true)
        }
    }, [id])

    // ? -------------------------- GET ONE DRIVER  DETAILS ------------------------
    const getCompanyDetails = () => getCompanyService(`AdminReferenceAction/company/${id}`);

    const query = useQuery({
        queryKey: ['getDriverDetails'],
        queryFn: getCompanyDetails,
        retry: false,
        enabled: isCall
    });

    // ? ------------------------- HANDLE AFTER CALL API ---------------------------
    useEffect(() => {
        if (query.isSuccess) {
            setCompany(query.data);
            setLoading(false)
        }

        if (query.isLoading || query.isPending) {
            setLoading(true)
        }
    }, [query]); 

    return (
        <Modal title="DETAILS INFORMATION COMPANY" open={openView} onCancel={() => setOpenView(false)} footer={null}>
            <Loading isLoading={loading}>
                <hr />
                <div className="">
                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Name:</label>
                        <div>{company?.companyName}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Email:</label>
                        <div>{company?.companyEmail}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Mobile:</label>
                        <div>{company?.companyTelephone}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Contact Person:</label>
                        <div>{company?.contactPerson}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Designation:</label>
                        <div>{company?.designation}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Contact Person Mobile:</label>
                        <div>{company?.contactPersonMobile}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Address:</label>
                        <div>
                            {company?.companyAddress}, {company?.companyWard}, {company?.companyDistrict},
                            {company?.companyCity}
                        </div>
                    </div>
                </div>
            </Loading>
        </Modal>
    );
}
