// css
import { Rate } from 'antd';
import styled from './CardDriver.module.scss'
import classNames from 'classnames/bind';
const cn = classNames.bind(styled)

export default function CardDriver() {
    return (
        <div className={cn('card-container')}>
            <div className={cn("card")}>
                <div className={cn("img-content")}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke-miterlimit="2"
                        stroke-linejoin="round"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                    >
                        <path
                            fill-rule="nonzero"
                            d="m2 19v-14c0-.552.447-1 1-1 .542 0 4.418 2.028 9 2.028 4.593 0 8.456-2.028 9-2.028.55 0 1 .447 1 1v14c0 .553-.45 1-1 1-.544 0-4.407-2.028-9-2.028-4.582 0-8.458 2.028-9 2.028-.553 0-1-.448-1-1zm1.5-.791 6.449-7.691c.289-.344.879-.338 1.16.012 0 0 1.954 2.434 1.954 2.434l1.704-1.283c.319-.24.816-.168 1.054.154l4.679 6.335v-12.44c-1.58.58-4.819 1.798-8.5 1.798-3.672 0-6.918-1.218-8.5-1.799zm2.657-.834c1.623-.471 3.657-.903 5.843-.903 2.309 0 4.444.479 6.105.98l-3.041-4.117-1.065.802.275.344c.259.323.206.796-.117 1.054-.323.259-.795.207-1.054-.117l-2.591-3.236zm.698-9.534c-1.051 0-1.905.854-1.905 1.905s.854 1.904 1.905 1.904 1.904-.853 1.904-1.904-.853-1.905-1.904-1.905zm0 1.3c.333 0 .604.271.604.605 0 .333-.271.604-.604.604-.334 0-.605-.271-.605-.604 0-.334.271-.605.605-.605z"
                        ></path>
                    </svg>
                </div>
                <div className={cn("content")}>
                    <p className={cn("heading")}>Driver Name</p>
                    <p>
                        Driver Description
                    </p>
                </div>
            </div>

            <div className='mt-4'>
                <h4 className='text-3xl text-black font-bold'>Driver Name</h4>
                <p className='mt-3'><Rate disabled defaultValue={4.5} allowHalf/></p>
            </div>
        </div>
    );
}
