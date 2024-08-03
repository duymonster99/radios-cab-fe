// libraries
import {
    faArrowUp,
    faCameraRetro,
    faCoins,
    faEarthEurope,
    faFileZipper,
    faShop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactApexChart from "react-apexcharts";

// components
import CardDashBoard from '../../../Components/CardDashboard/CardDashboard';
import carousel1 from '../../../Assets/img/carousel-1.jpg'
import { jwtDecode } from 'jwt-decode';

const Charts = () => {
    var charts = {
        series: [
            {
                name: 'series1',
                data: [31, 40, 28, 51, 42, 109, 100],
            },
            {
                name: 'series2',
                data: [11, 32, 45, 32, 34, 52, 41],
            },
        ],
        options: {
            chart: {
                height: 350,
                type: 'area',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: 'smooth',
            },
            xaxis: {
                type: 'datetime',
                categories: [
                    '2018-09-19T00:00:00.000Z',
                    '2018-09-19T01:30:00.000Z',
                    '2018-09-19T02:30:00.000Z',
                    '2018-09-19T03:30:00.000Z',
                    '2018-09-19T04:30:00.000Z',
                    '2018-09-19T05:30:00.000Z',
                    '2018-09-19T06:30:00.000Z',
                ],
            },
            tooltip: {
                x: {
                    format: 'dd/MM/yy HH:mm',
                },
            },
        },
    };

    return (
        <div id="chart">
            <ReactApexChart options={charts.options} series={charts.series} type="area" />
        </div>
    );
};

export default function Dashboard() {
    
    return (
        <div className="w-full p-[1.5rem] mx-auto">
            {/* <!-- row 1 --> */}
            <div className="flex flex-wrap -mx-[.75rem]">
                {/* <!-- card1 --> */}
                <CardDashBoard
                    title="Today's Money"
                    number="$53,000"
                    icon={faCoins}
                    colorIcon="bg-gradient-to-tl from-[#5e72e4] to-[#825ee4]"
                />

                <CardDashBoard
                    title="Today's Users"
                    number="2,300"
                    icon={faEarthEurope}
                    colorIcon="bg-gradient-to-tl from-[#f5365c] to-[#f56036]"
                />

                <CardDashBoard
                    title="New Clients"
                    number="+3,462"
                    icon={faFileZipper}
                    colorIcon="bg-gradient-to-tl from-[#2dce89] to-[#2dcecc]"
                />

                <CardDashBoard
                    title="Sales"
                    number="$103,430"
                    icon={faShop}
                    colorIcon="bg-gradient-to-tl from-[#fb6340] to-[#fbb140]"
                />
            </div>

            {/* <!-- cards row 2 --> */}
            <div className="flex flex-wrap mt-[1.5rem] -mx-[.75rem]">
                <div className="w-full max-w-full px-[.75rem] mt-0 lg:w-7/12 lg:flex-none">
                    <div className="border-black/12.5 shadow-xl relative z-20 flex min-w-0 flex-col break-words rounded-[1rem] border-0 border-solid bg-white bg-clip-border">
                        <div className="border-black/12.5 mb-0 rounded-t-[1rem] border-b-0 border-solid p-[1.5rem] pt-[1rem] pb-0">
                            <h6 className="capitalize text-[1.1rem] font-['Open_Sans'] font-semibold mt-0 mb-[.5rem] text-[rgb(52,71,103)]">
                                Sales overview
                            </h6>
                            <p className="mb-0 leading-normal">
                                <FontAwesomeIcon
                                    icon={faArrowUp}
                                    className="text-[rgb(45,206,137)] font-black mr-[.3rem]"
                                />
                                <span className="font-semibold">4% more</span> in 2021
                            </p>
                        </div>
                        <div className="flex-auto p-[1rem]">
                            <Charts />
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-full px-[1.2rem] lg:w-5/12 lg:flex-none">
                    <div className="relative w-full h-full overflow-hidden rounded-[1.6rem]">
                        {/* <!-- slide 1 --> */}
                        <div className="absolute w-full h-full transition-all duration-500">
                            <img className="object-cover h-full" src={carousel1} alt="" />
                            <div className="block text-start ml-[4.8rem] left-0 bottom-0 absolute right-[15%] py-[2rem] text-white">
                                <div className="inline-block w-[3.2rem] h-[3.2rem] mb-[1.6rem] text-center text-black bg-white bg-center rounded-[.8rem] fill-current stroke-none">
                                    <FontAwesomeIcon
                                        icon={faCameraRetro}
                                        className="text-[rgb(52,71,103)] text-[1.04rem] leading-[1.6rem] top-[.32rem] relative"
                                    />
                                </div>
                                <h5 className="mb-[.4rem] text-[2rem] leading-[2.2rem] font-bold text-white">
                                    Get started with Argon
                                </h5>
                                <p className="mb-[1.6rem] mt-0 font-medium leading-[2.6rem]">
                                    There’s nothing I really wanted to do in life that I wasn’t able to get good at.
                                </p>
                            </div>
                        </div>

                        {/* <!-- Control buttons --> */}
                        <button
                            btn-next
                            className="absolute z-10 w-10 h-10 p-2 text-lg text-white border-none opacity-50 cursor-pointer hover:opacity-100 far fa-chevron-right active:scale-110 top-6 right-4"
                        ></button>
                        <button
                            btn-prev
                            className="absolute z-10 w-10 h-10 p-2 text-lg text-white border-none opacity-50 cursor-pointer hover:opacity-100 far fa-chevron-left active:scale-110 top-6 right-16"
                        ></button>
                    </div>
                </div>
            </div>

        </div>
    );
}
