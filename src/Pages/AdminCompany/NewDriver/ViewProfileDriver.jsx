import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Helper/Loading';
import { getOneDriverService } from '../../../Services/apiService';

export default function ViewDriverProfile({ openView, setOpenView, id }) {
    const [driver, setDriver] = useState({});
    const [loading, setLoading] = useState(false);
    const [isCall, setIsCall] = useState(false)

    useEffect(() => {
        if (id) {
            setIsCall(true)
        }
    }, [id])

    // ? -------------------------- GET ONE DRIVER  DETAILS ------------------------
    const getDriverDetails = () => getOneDriverService(`Admin/getDriverById/${id}`);

    const { data, isSuccess, isLoading, isPending, isError } = useQuery({
        queryKey: ['getDriverDetails'],
        queryFn: getDriverDetails,
        retry: false,
        enabled: isCall
    });

    // ? ------------------------- HANDLE AFTER CALL API ---------------------------
    useEffect(() => {
        if (isSuccess) {
            setDriver(data.data);
            setLoading(false)
        }

        if (isLoading || isPending) {
            setLoading(true)
        }
    }, [data, isSuccess, isLoading, isPending]);

    // console.log(query);

    return (
        <Modal title="DETAILS INFORMATION DRIVER" open={openView} onCancel={() => setOpenView(false)} footer={null}>
            <Loading isLoading={loading}>
                <hr />
                <div className="">
                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Name:</label>
                        <div>{driver?.driverFullName}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Email:</label>
                        <div>{driver?.driverEmail}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Mobile:</label>
                        <div>{driver?.driverMobile}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Address:</label>
                        <div>
                            {driver?.driverInfo?.address}, {driver?.driverInfo?.ward}, {driver?.driverInfo?.street},{' '}
                            {driver?.driverInfo?.city}
                        </div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">Vehicle Registration:</label>
                        <div>{driver?.driverInfo?.registrationCar}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">License:</label>
                        <div>{driver?.driverInfo?.driverLicense}</div>
                    </div>

                    <div className="flex mt-4 gap-4">
                        <label className="font-bold">License Image:</label>
                        <img src={driver?.driverInfo?.driverLicenseImage} className='w-[100px] h-[100px]' alt="license picture" />
                    </div>
                </div>
            </Loading>
        </Modal>
    );
}
