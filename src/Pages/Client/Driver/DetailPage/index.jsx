import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Components
import FormBookingDriver from './ModalBookDriver';
import { getAdminService } from '../../../../Services/apiService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../../Helper/Loading';
import FeedbackForDriver from './Feedback';

export default function DriverDetail(props) {
    const [driver, setDriver] = useState({});
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const { state } = useLocation();

    // ? ====================================== handle get one company ==================================
    const getOneDriver = () => getAdminService(`Admin/getDriverById/${state.id}`);
    const { data, isSuccess, isLoading } = useQuery({
        queryKey: ['getDriverById'],
        queryFn: getOneDriver,
        retry: false,
    });

    useEffect(() => {
        if (isSuccess) {
            setDriver(data.data);
            setLoading(false);
        }
        if (isLoading) {
            setLoading(true);
        }
    }, [data, isLoading, isSuccess]);

    const handleOpenForm = () => {
        setIsOpen(true);
    };

    return (
        <div style={props.style}>
            <Loading isLoading={loading}>
                <section className="w-full overflow-hidden mb-40">
                    <div className="flex flex-col">
                        <img
                            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw5fHxjb3ZlcnxlbnwwfDB8fHwxNzEwNzQxNzY0fDA&ixlib=rb-4.0.3&q=80&w=1080"
                            alt="User Cover"
                            className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
                        />

                        <div className="xl:w-[80%] xxs:w-[90%] mx-auto flex">
                            <img
                                src={driver?.driverInfo?.driverPersonalImage}
                                alt="User Profile"
                                className="rounded-md xl:w-[12rem] xl:h-[12rem] md:w-[10rem] md:h-[10rem] sm:w-[8rem] sm:h-[8rem] xs:w-[7rem] xs:h-[7rem] outline outline-2 outline-offset-2 outline-blue-500 relative xl:bottom-[5rem] md:bottom-[4rem] xs:bottom-[3rem]"
                            />

                            <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 xl:text-4xl md:text-3xl sm:text-3xl xs:text-xl font-serif ml-4">
                                {driver?.driverFullName}
                            </h1>
                        </div>

                        <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4">
                            <div className="w-full my-auto py-6 flex flex-col justify-center gap-2">
                                <div className="w-full flex sm:flex-row xs:flex-col gap-2 justify-center">
                                    <div className="w-full">
                                        <dl className="text-gray-900 divide-y divide-gray-200 ">
                                            <div className="flex flex-col pb-3">
                                                <dt className="mb-1 text-gray-500 md:text-lg">Full Name</dt>
                                                <dd className="text-lg font-semibold">{driver?.driverFullName}</dd>
                                            </div>
                                            <div className="flex flex-col py-3">
                                                <dt className="mb-1 text-gray-500 md:text-lg">Status</dt>
                                                <dd className={`text-lg font-semibold ${driver?.isOnline ? 'text-green-500' : 'text-red-500'}`}>
                                                    {driver?.isOnline ? 'Online' : 'Offline'}
                                                </dd>
                                            </div>
                                            <div className="flex flex-col py-3">
                                                <dt className="mb-1 text-gray-500 md:text-lg">Vehicle</dt>
                                                <dd className="text-lg font-semibold">{driver?.driverInfo?.registrationCar}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className="w-full">
                                        <dl className="text-gray-900 divide-y divide-gray-200 ">
                                            <div className="flex flex-col pb-3">
                                                <dt className="mb-1 text-gray-500 md:text-lg">Location</dt>
                                                <dd className="text-lg font-semibold">
                                                    {driver?.driverInfo?.address}, {driver?.driverInfo?.street}, {' '}
                                                    {driver?.driverInfo?.ward}, {driver?.driverInfo?.city}
                                                </dd>
                                            </div>

                                            <div className="flex flex-col pt-3">
                                                <dt className="mb-1 text-gray-500 md:text-lg">Phone Number</dt>
                                                <dd className="text-lg font-semibold">{driver?.driverMobile}</dd>
                                            </div>
                                            <div className="flex flex-col pt-3">
                                                <dt className="mb-1 text-gray-500 md:text-lg">Email</dt>
                                                <dd className="text-lg font-semibold">{driver?.driverEmail}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                </div>

                                <div className="flex flex-col pt-3 w-[30%]">
                                    <Button type="primary" size="large" onClick={handleOpenForm} disabled={!driver?.isOnline && true}>
                                        {!driver?.isOnline ? 'The driver is not working' : 'Booking Now'}
                                    </Button>
                                    <FormBookingDriver isOpen={isOpen} setIsOpen={setIsOpen} driver={driver} />
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                <FeedbackForDriver driverId={driver?.id} companyId={driver?.companyId} ratingDriver={driver?.rating} />
            </Loading>
        </div>
    );
}
