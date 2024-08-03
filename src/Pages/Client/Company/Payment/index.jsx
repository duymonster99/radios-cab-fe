// libraries
import { CloseOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// services
import { useMutationHook } from '../../../../Hooks/useMutation';
import { postCompanyService } from '../../../../Services/apiService';
import Loading from '../../../../Helper/Loading';
import moment from 'moment/moment';

export default function Payment() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const membershipStorage = sessionStorage.getItem('pricingInfo');
    const membershipInfo = JSON.parse(membershipStorage);
    const [shouldFetchApi, setShouldFetchApi] = useState(false);

    // ? --------------------------------------------------- create payment info ---------------------------------------------
    const contentPayment = `Payment orders`;

    const QR = `https://img.vietqr.io/image/MB-01608373609999-qr_only.png?amount=5000&addInfo=Payment%20orders&accountName=Huynh%20Tuan%20Duy`;

    const mutationPayment = useMutationHook((props) => postCompanyService(props));

    const { isSuccess: paymentSuccess, isPending: paymentPending, isLoading: paymentLoading } = mutationPayment;

    const fetchApiBanking = async () => {
        const { data } = await axios.get(
            'https://script.google.com/macros/s/AKfycbxH6MQnW_0evcFEcw9knIH8gc2pMdeJT2QiPYFziF7eRnGthsuqMceTiU2MD3KSIpIDmw/exec',
        );
        const latestPayment = data.data[data.data.length - 1];

        console.log(latestPayment);

        const sessionSuccess = {
            paymentDate: latestPayment['Ngày diễn ra'],
            transactionValue: membershipInfo.amount,
            paymentTerm: membershipInfo.paymentTerm
        };

        const successStorage = JSON.stringify(sessionSuccess);

        if (latestPayment['Giá trị'] >= 5000 && latestPayment['Mô tả'].includes(contentPayment)) {
            // reset session
            sessionStorage.setItem('paymentInfo', successStorage);
            setShouldFetchApi(true);
        }
    };

    // ? handle datetime
    const dateNow = moment().format('YYYY-MM-DD')
    let dueDate

    if (membershipInfo.paymentTerm === 'Monthly') {
        dueDate = moment(dateNow).add(1, 'months').format('YYYY-MM-DD')       
    }
    else {
        dueDate = moment(dateNow).add(1, 'months').format('YYYY-MM-DD') 
    }

    useEffect(() => {
        if (shouldFetchApi) {
            const dataSubmitPayment = {
                id: membershipInfo.cid,
                amount: membershipInfo.amount,
                contentPayment: contentPayment,
                paymentTerm: membershipInfo.paymentTerm,
                paymentAt: dateNow,
                paymentDueDate: dueDate
            };
            // add db
            mutationPayment.mutate({ url: 'v1/Payment/company/payment', data: dataSubmitPayment });

            setShouldFetchApi(false);
        }
    }, [shouldFetchApi]);

    useEffect(() => {
        let intervalId
        const timeoutId = setTimeout(() => {
            intervalId = setInterval(fetchApiBanking, 1000);
            return () => clearInterval(intervalId); // Cleanup interval on component unmount
        }, 20000);

        return () => {
            clearTimeout(timeoutId)
            clearInterval(intervalId)
        }; // Cleanup timeout on component unmount
    }, []);

    useEffect(() => {
        if (paymentSuccess) {
            navigate('/company/register/payment/success');
        }

        if (paymentLoading || paymentPending) {
            setLoading(true);
        }
    }, [paymentSuccess, paymentLoading, paymentPending]);

    console.log(mutationPayment);

    return (
        <>
            <div className="w-full">
                <Loading isLoading={loading}>
                    <div className="w-[85%] flex mx-auto py-[3rem] justify-center">
                        <div className="md:w-[30%] w-full h-[370px] p-[1rem_1.5rem] bg-white shadow-[0_0px_10px_1.5px_#ececec] rounded-[10px]">
                            <h3 className='text-black font-bold font-["Open_Sans"] text-[1.25rem]'>
                                Transaction information
                            </h3>
                            <img alt="logo" />
                            <hr></hr>

                            <div className="flex justify-between mt-[.8rem]">
                                <p>Transaction value</p>
                                <span>$ {membershipInfo.amount}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <p>Payment amount</p>
                                <span className="font-bold text-[1.5rem]">$ {membershipInfo.amount}</span>
                            </div>

                            <hr />

                            <div className="my-[.8rem]">
                                <p>Payment Term</p>
                                <span className="font-bold">{membershipInfo.paymentTerm}</span>
                            </div>

                            <hr />

                            <div className="my-[.8rem]">
                                <p>Membership Type</p>
                                <span className="font-bold">{membershipInfo.membershipType}</span>
                            </div>

                            <hr />

                            <div className="mt-[.8rem]">
                                <p>Content</p>
                                <span className="font-bold">Payment orders #{membershipInfo.cid}</span>
                            </div>
                        </div>

                        <div className="md:w-[60%] w-full ml-[20px]">
                            <div className="bg-white p-[1.5rem] shadow-[0_0px_10px_1.5px_#ececec] rounded-[10px]">
                                <h3 className='text-black text-center text-[1.5rem] font-["Open_Sans"] mb-[2rem]'>
                                    Scan QR to pay
                                </h3>
                                <div className="bg-[#f2f8ff] w-[300px] flex mx-auto p-[1rem] rounded-[8px]">
                                    <img src={QR} width={300} className="mx-auto" />
                                </div>

                                <div className="mt-[2rem] text-center">
                                    <span className="text-center font-semibold">
                                        Open the application with VietQR to pay for the order
                                    </span>
                                </div>
                            </div>

                            <button className="mt-[2rem]">
                                <CloseOutlined />
                                <span className="ml-[10px] font-semibold">Cancel transaction</span>
                            </button>
                        </div>
                    </div>
                </Loading>
            </div>
        </>
    );
}
