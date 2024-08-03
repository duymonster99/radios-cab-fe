import { Button, Result } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SuccessPayment() {
    const navigate = useNavigate()
    const [count, setCount] = useState(5)

    // ? ------------------------------- get info from storage -------------------------------
    const sessionStore = sessionStorage.getItem('paymentInfo')
    const membershipInfo = JSON.parse(sessionStore)


    useEffect(() => {
        let timerId = setInterval(() => setCount(count - 1), 1000)

        if (count === 0) {
            sessionStorage.clear()
            navigate("/login/company")
        }

        return () => clearInterval(timerId)
    }, [count])

    return (
        <div className="py-[3rem]">
            <div className="w-[40%] mx-auto ">
                <Result
                    status="success"
                    title={[
                        <h3 className='text-black font-["Open_Sans"]'>Transaction Success</h3>
                    ]}
                    subTitle={[
                        <p className='mb-[1rem]'>We will redirect you to the login page after {count}s</p>,
                        <hr />,
                        <div className='mt-[1rem] w-[90%] flex'>
                            <div className='w-[50%] text-left'>
                                <p className='text-black font-semibold'>Payment Term</p>
                                <p className='text-black font-semibold'>Pament Date</p>    
                                <p className='text-black font-semibold'>Transaction Value</p>    
                            </div>
                            <div className='w-[50%] text-left'>
                                <p className='text-black font-semibold'>{membershipInfo.paymentTerm}</p>
                                <p className='text-black font-semibold'>{`${membershipInfo.paymentDate}`}</p>    
                                <p className='text-black font-semibold'>$ {membershipInfo.transactionValue}</p>    
                            </div>
                        </div>
                    ]}
                    extra={[
                        <Button type="primary" key="console">
                            <Link to="/login/company">Login Now</Link>
                        </Button>,
                        <Button key="buy">
                            <Link to="/company">Return Company Page</Link>
                        </Button>
                    ]}
                />
            </div>
        </div>
    );
}
