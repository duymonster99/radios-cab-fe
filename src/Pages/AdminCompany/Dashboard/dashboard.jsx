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

            {/* <!-- cards row 3 --> */}

            <div className="flex flex-wrap mt-6 -mx-3">
                <div className="w-full max-w-full px-3 mt-0 mb-6 lg:mb-0 lg:w-7/12 lg:flex-none">
                    <div className="relative flex flex-col min-w-0 break-words bg-white border-0 border-solid shadow-xl border-black-125 rounded-2xl bg-clip-border">
                        <div className="p-4 pb-0 mb-0 rounded-t-4">
                            <div className="flex justify-between">
                                <h6 className="mb-2">Sales by Country</h6>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="items-center w-full mb-4 align-top border-collapse border-gray-200">
                                <tbody>
                                    <tr>
                                        <td className="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap">
                                            <div className="flex items-center px-2 py-1">
                                                <div>
                                                    <img src="../assets/img/icons/flags/US.png" alt="Country flag" />
                                                </div>
                                                <div className="ml-6">
                                                    <p className="mb-0 text-xs font-semibold leading-tight">Country:</p>
                                                    <h6 className="mb-0 text-sm leading-normal">United States</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                            <div className="text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Sales:</p>
                                                <h6 className="mb-0 text-sm leading-normal">2500</h6>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                            <div className="text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Value:</p>
                                                <h6 className="mb-0 text-sm leading-normal">$230,900</h6>
                                            </div>
                                        </td>
                                        <td className="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap">
                                            <div className="flex-1 text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Bounce:</p>
                                                <h6 className="mb-0 text-sm leading-normal">29.9%</h6>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap">
                                            <div className="flex items-center px-2 py-1">
                                                <div>
                                                    <img src="../assets/img/icons/flags/DE.png" alt="Country flag" />
                                                </div>
                                                <div className="ml-6">
                                                    <p className="mb-0 text-xs font-semibold leading-tight">Country:</p>
                                                    <h6 className="mb-0 text-sm leading-normal">Germany</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                            <div className="text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Sales:</p>
                                                <h6 className="mb-0 text-sm leading-normal">3.900</h6>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                            <div className="text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Value:</p>
                                                <h6 className="mb-0 text-sm leading-normal">$440,000</h6>
                                            </div>
                                        </td>
                                        <td className="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap">
                                            <div className="flex-1 text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Bounce:</p>
                                                <h6 className="mb-0 text-sm leading-normal">40.22%</h6>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 align-middle bg-transparent border-b w-3/10 whitespace-nowrap">
                                            <div className="flex items-center px-2 py-1">
                                                <div>
                                                    <img src="../assets/img/icons/flags/GB.png" alt="Country flag" />
                                                </div>
                                                <div className="ml-6">
                                                    <p className="mb-0 text-xs font-semibold leading-tight">Country:</p>
                                                    <h6 className="mb-0 text-sm leading-normal">Great Britain</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                            <div className="text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Sales:</p>
                                                <h6 className="mb-0 text-sm leading-normal">1.400</h6>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap">
                                            <div className="text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Value:</p>
                                                <h6 className="mb-0 text-sm leading-normal">$190,700</h6>
                                            </div>
                                        </td>
                                        <td className="p-2 text-sm leading-normal align-middle bg-transparent border-b whitespace-nowrap">
                                            <div className="flex-1 text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Bounce:</p>
                                                <h6 className="mb-0 text-sm leading-normal">23.44%</h6>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="p-2 align-middle bg-transparent border-0 w-3/10 whitespace-nowrap">
                                            <div className="flex items-center px-2 py-1">
                                                <div>
                                                    <img src="../assets/img/icons/flags/BR.png" alt="Country flag" />
                                                </div>
                                                <div className="ml-6">
                                                    <p className="mb-0 text-xs font-semibold leading-tight">Country:</p>
                                                    <h6 className="mb-0 text-sm leading-normal">Brasil</h6>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
                                            <div className="text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Sales:</p>
                                                <h6 className="mb-0 text-sm leading-normal">562</h6>
                                            </div>
                                        </td>
                                        <td className="p-2 align-middle bg-transparent border-0 whitespace-nowrap">
                                            <div className="text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Value:</p>
                                                <h6 className="mb-0 text-sm leading-normal">$143,960</h6>
                                            </div>
                                        </td>
                                        <td className="p-2 text-sm leading-normal align-middle bg-transparent border-0 whitespace-nowrap">
                                            <div className="flex-1 text-center">
                                                <p className="mb-0 text-xs font-semibold leading-tight">Bounce:</p>
                                                <h6 className="mb-0 text-sm leading-normal">32.14%</h6>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="w-full max-w-full px-3 mt-0 lg:w-5/12 lg:flex-none">
                    <div className="border-black/12.5 shadow-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
                        <div className="p-4 pb-0 rounded-t-4">
                            <h6 className="mb-0">Categories</h6>
                        </div>
                        <div className="flex-auto p-4">
                            <ul className="flex flex-col pl-0 mb-0 rounded-lg">
                                <li className="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-t-lg rounded-xl text-inherit">
                                    <div className="flex items-center">
                                        <div className="inline-block w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 rounded-xl">
                                            <i className="text-white ni ni-mobile-button relative top-0.75 text-xxs"></i>
                                        </div>
                                        <div className="flex flex-col">
                                            <h6 className="mb-1 text-sm leading-normal text-slate-700">Devices</h6>
                                            <span className="text-xs leading-tight">
                                                250 in stock, <span className="font-semibold">346+ sold</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button className="group ease-in leading-pro text-xs rounded-3.5xl p-1.2 h-6.5 w-6.5 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all">
                                            <i
                                                className="ni ease-bounce text-2xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-xl text-inherit">
                                    <div className="flex items-center">
                                        <div className="inline-block w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 rounded-xl">
                                            <i className="text-white ni ni-tag relative top-0.75 text-xxs"></i>
                                        </div>
                                        <div className="flex flex-col">
                                            <h6 className="mb-1 text-sm leading-normal text-slate-700">Tickets</h6>
                                            <span className="text-xs leading-tight">
                                                123 closed, <span className="font-semibold">15 open</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button className="group ease-in leading-pro text-xs rounded-3.5xl p-1.2 h-6.5 w-6.5 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all">
                                            <i
                                                className="ni ease-bounce text-2xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="relative flex justify-between py-2 pr-4 mb-2 border-0 rounded-b-lg rounded-xl text-inherit">
                                    <div className="flex items-center">
                                        <div className="inline-block w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 rounded-xl">
                                            <i className="text-white ni ni-box-2 relative top-0.75 text-xxs"></i>
                                        </div>
                                        <div className="flex flex-col">
                                            <h6 className="mb-1 text-sm leading-normal text-slate-700">Error logs</h6>
                                            <span className="text-xs leading-tight/80">
                                                1 is active, <span className="font-semibold">40 closed</span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button className="group ease-in leading-pro text-xs rounded-3.5xl p-1.2 h-6.5 w-6.5 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all">
                                            <i
                                                className="ni ease-bounce text-2xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200"
                                                aria-hidden="true"
                                            ></i>
                                        </button>
                                    </div>
                                </li>
                                <li className="relative flex justify-between py-2 pr-4 border-0 rounded-b-lg rounded-xl text-inherit">
                                    <div className="flex items-center">
                                        <div className="inline-block w-8 h-8 mr-4 text-center text-black bg-center shadow-sm fill-current stroke-none bg-gradient-to-tl from-zinc-800 to-zinc-700 rounded-xl">
                                            <i className="text-white ni ni-satisfied relative top-0.75 text-xxs"></i>
                                        </div>
                                        <div className="flex flex-col">
                                            <h6 className="mb-1 text-sm leading-normal text-slate-700">Happy users</h6>
                                            <span className="text-xs leading-tight">
                                                <span className="font-semibold">+ 430 </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <button className="group ease-in leading-pro text-xs rounded-3.5xl p-1.2 h-6.5 w-6.5 mx-0 my-auto inline-block cursor-pointer border-0 bg-transparent text-center align-middle font-bold text-slate-700 shadow-none transition-all">
                                            <i className="ni ease-bounce text-2xs group-hover:translate-x-1.25 ni-bold-right transition-all duration-200"></i>
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
