import { useEffect, useState } from 'react';
import { useMutationHook } from '../../../../Hooks/useMutation';
import { postAdminService, putAdminService } from '../../../../Services/apiService';
import { message, Rate } from 'antd';
import { roundDownToNearestHalf } from '../../../../Helper/RoundToDownNumber';

export default function FeedbackForDriver({ driverId, companyId, ratingDriver }) {
    const [loading, setLoading] = useState(false);
    const [isCall, setIsCall] = useState(false);
    const [rate, setRate] = useState(null);
    const [formSubmit, setFormSubmit] = useState({
        name: '',
        email: '',
        description: '',
        driverId: '',
        companyId: '',
        rating: null,
    });

    // ? ================ WHEN COMPONENT MOUNTED =====================
    useEffect(() => {
        if (driverId && companyId) {
            setFormSubmit({
                ...formSubmit,
                driverId,
                companyId,
            });

            setIsCall(true);
        }
    }, [driverId, companyId]);

    // ? ================ HANDLE INPUT DATA ====================
    const handleChange = (e) => {
        setFormSubmit({
            ...formSubmit,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (rate) {
            setFormSubmit({
                ...formSubmit,
                rating: rate,
            });
        }
    }, [rate]);

    // ? =============== HANDLE SUBMIT ========================
    const mutation = useMutationHook((props) => postAdminService(props));
    const mutationRate = useMutationHook((props) => putAdminService(props));
    const { isSuccess, isPending } = mutation;
    const { isSuccess: rateSuccess, isPending: ratePending } = mutationRate;

    const oldRating = (ratingDriver + rate) / 2;
    const newRate = roundDownToNearestHalf(oldRating);

    const handleSubmit = () => {
        if (isCall) {
            mutation.mutate({ url: 'Driver/driver/feedback/create', data: formSubmit });
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    // handle after submit
    useEffect(() => {
        if (isSuccess) {
            const dataSubmit = {
                rating: newRate,
            };

            mutationRate.mutate({ url: `Admin/updateDriver/${driverId}`, data: dataSubmit });
        }
        if (isPending) {
            setLoading(true);
        }
    }, [isPending, isSuccess]);

    useEffect(() => {
        if (rateSuccess) {
            message.success('Thanks for feedback!');
            setLoading(false);
            setIsCall(false);
            setFormSubmit({
                name: '',
                email: '',
                description: '',
                driverId: '',
                companyId: '',
                rating: null,
            });
        }
        if (ratePending) {
            setLoading(true);
        }
    }, [rateSuccess, ratePending]); 

    return (
        <div className="mt-[1.5rem] w-[80%] mx-auto">
            <h4 className="mb-[3rem] text-[calc(1.375rem+0.3vw)] xl:text-[2.5rem] mt-0 leading-[1.2] text-[rgb(69,89,91)]">
                Your feedback about my service
            </h4>
            <div className="flex flex-wrap">
                <div className="lg:w-[50%] lg:flex-0">
                    <div className="rounded-[10px] border-b border-[rgb(222,226,230)] mr-[1.5rem]">
                        <input
                            type="text"
                            name="name"
                            className="block w-full font-normal leading-[1.5] text-[rgb(116,125,136)] p-[6px_12px] rounded-[10px] focus:outline-none transition duration-[.15s] focus:shadow-[0_0_0_4px_#caea8f]"
                            placeholder="Your Name *"
                            value={formSubmit.name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="lg:w-[50%] lg:flex-0">
                    <div className="rounded-[10px] border-b border-[rgb(222,226,230)]">
                        <input
                            type="email"
                            className="block w-full font-normal leading-[1.5] text-[rgb(116,125,136)] p-[6px_12px] rounded-[10px] focus:outline-none transition duration-[.15s] focus:shadow-[0_0_0_4px_#caea8f]"
                            placeholder="Your Email *"
                            name="email"
                            value={formSubmit.email}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="w-full my-[1.5rem]">
                    <div className="rounded-[10px] border-b border-[rgb(222,226,230)]">
                        <textarea
                            className="block w-full font-normal leading-[1.5] text-[rgb(116,125,136)] p-[6px_12px] rounded-[10px] focus:outline-none transition duration-[.15s] focus:shadow-[0_0_0_4px_#caea8f]"
                            cols="30"
                            rows="8"
                            placeholder="Your Review *"
                            spellcheck="false"
                            name="description"
                            value={formSubmit.description}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                        ></textarea>
                    </div>
                </div>

                <div className="w-full mt-[1.5rem]">
                    <div className="flex justify-between py-[1rem] mb-[3rem]">
                        <div className="flex items-center">
                            <p className="mb-0 mr-[1rem] text-xl">Please rate:</p>
                            <div className="flex items-center" style={{ fontSize: '12px' }}>
                                <Rate
                                    allowHalf
                                    value={formSubmit.rating}
                                    onChange={(newValue) => setRate(newValue)}
                                    style={{ fontSize: '1.5rem' }}
                                />
                            </div>
                        </div>
                        <button
                            className="border-t-[1px] border-b-[1px] border-[#ffb524] text-[#81c408] rounded-[50rem] p-[1rem_1.5rem] transition-all duration-500 font-bold hover:bg-[#ffb524] hover:text-white"
                            onClick={handleSubmit}
                        >
                            Send feedback
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
