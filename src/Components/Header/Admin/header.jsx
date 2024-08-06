// libraries
import { faBell, faCaretDown, faClock, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// services
import { DataContext } from '../../../Hooks/context';
import { Dropdown, Menu, message, Space } from 'antd';

export default function HeaderAdmin() {
    const [barMobile, setBarMobile] = useState('');
    const [countBar, setCountBar] = useState(0);
    const [showNotification, setShowNotification] = useState(true);
    const handleClick = () => {
        if (countBar === 0) {
            setBarMobile('translate-x-[5px]');
            setCountBar(1);
        } else {
            setBarMobile('');
            setCountBar(0);
        }
    };

    const { pathname } = useLocation()
    console.log(pathname);
    
    const navigate = useNavigate()

    const handleLogout = () => {
        if (pathname.includes("admin-company")) {
            navigate('/login/company')
        }
        else if(pathname.includes("app-driver")) {
            navigate("/login/driver")
        }
        else {
            navigate("/login")
        }

        localStorage.removeItem('tokenCompany');
        message.success('Logout Successfully!');
        
    };

    const items = [
        {
            key: '1',
            label: 'Logout',
            onClick: handleLogout,
        },
    ];

    const menu = <Menu items={items} />;

    const { breadcrumb, companyName, driver, user, setIsLogout } = useContext(DataContext);

    return (
        // <!-- Navbar -->
        <nav className="relative flex md:flex-wrap items-center md:justify-between p-[.5rem_0] mx-[1.5rem] rounded-[1rem] transition-all ease-in shadow-none duration-250 flex-nowrap justify-start">
            <div className="flex items-center justify-between w-full p-[.25rem_1rem] mx-auto flex-wrap-inherit">
                <nav>
                    {/* <!-- breadcrumb --> */}
                    <ol className="flex flex-wrap pt-[.25rem] mr-[3rem] bg-transparent rounded-[.5rem] xs:mr-[4rem]">
                        <li className="leading-normal">
                            <Link className="text-white opacity-50" to="">
                                Pages
                            </Link>
                        </li>
                        <li className="pl-[.5rem] font-medium capitalize leading-normal text-white before:float-left before:pr-[.5rem] before:text-white before:content-['/']">
                            {breadcrumb !== null && breadcrumb !== undefined && breadcrumb}
                        </li>
                    </ol>
                    <h6 className="mb-0 font-bold text-white capitalize">
                        {breadcrumb !== null && breadcrumb !== undefined && breadcrumb}
                    </h6>
                </nav>

                <div className="flex items-center mt-[.5rem] grow xs:mt-0 sm:mr-[1.5rem] mr-0 lg:basis-auto">
                    <div className="flex items-center md:ml-auto md:pr-[1rem]">
                        <div className="relative flex flex-wrap items-stretch w-full transition-all rounded-[.5rem] ease">
                            <span className="ease leading-[1.4rem] absolute z-50 -ml-px flex h-full items-center whitespace-nowrap rounded-[.5rem] rounded-tr-none rounded-br-none border border-r-0 border-transparent bg-transparent p-[.5rem_.625rem] text-center font-normal text-[rgb(103,116,142)] transition-all">
                                <FontAwesomeIcon icon={faMagnifyingGlass} />
                            </span>
                            <input
                                type="text"
                                className="p-[.5rem_.75rem_.5rem_2.25rem] focus:shadow-primary-outline ease w-1/100 leading-[1.5] relative -ml-px block min-w-0 flex-auto rounded-[.5rem] border border-solid border-[rgb(210,214,218)]] bg-white bg-clip-padding text-[rgb(73,80,87)] transition-all placeholder:opacity-[.6] placeholder:font-semibold placeholder:tracking-[.1rem] focus:border-blue-500 focus:outline-none focus:transition-shadow"
                                placeholder="Type here..."
                            />
                        </div>
                    </div>

                    <ul className="flex flex-row justify-end pl-0 mb-0 list-none md-max:w-full">
                        <li className="flex items-center pr-[.5rem] xl:hidden">
                            <button
                                className="w-[1.56rem] h-[1.56rem] p-[.125rem] overflow-hidden"
                                onClick={handleClick}
                            >
                                <span
                                    className={`block w-full h-[.125rem] rounded-[.125rem] bg-white transition-all duration-400 relative ${barMobile}`}
                                ></span>
                                <span className="block w-full h-[.125rem] rounded-[.125rem] bg-white transition-all duration-400 relative mt-[.375rem]"></span>
                                <span
                                    className={`block w-full h-[.2rem] rounded-[.2rem] bg-white transition-all duration-400 relative mt-[.375rem] ${barMobile}`}
                                ></span>
                            </button>
                        </li>

                        {/* <!-- notifications --> */}

                        <li className="relative flex items-center pr-[.5rem]">
                            <p className="hidden transform-dropdown-show"></p>
                            <button
                                to=""
                                className="block p-0 text-[.875rem] text-white transition-all leading-[1.5]"
                                onClick={() => setShowNotification(!showNotification)}
                            >
                                <FontAwesomeIcon icon={faBell} />
                            </button>

                            <ul
                                className={`transform-dropdown before:font-awesome before:leading-default before:duration-350 before:ease lg:shadow-3xl duration-250 min-w-[11rem] before:sm:right-8 before:text-5.5 absolute right-0 top-[60%] z-50 origin-top list-none rounded-[.5rem] border-solid border-transparent bg-white bg-clip-padding p-[1rem_.5rem] text-left text-[rgb(103,116,142)] transition-all before:absolute before:right-2 before:left-auto before:top-0 before:z-50 before:inline-block before:font-normal before:text-white before:antialiased before:transition-all before:content-['\f0d8'] sm:-mr-[1.5rem] lg:absolute lg:right-0 lg:left-auto lg:mt-[.5rem] lg:block lg:cursor-pointer ${
                                    showNotification && 'pointer-events-none opacity-0'
                                }`}
                            >
                                {/* <!-- add show className on dropdown open js --> */}
                                <li className="relative mb-[.5rem]">
                                    <Link
                                        className="ease py-[.3rem] clear-both block w-full whitespace-nowrap rounded-lg bg-transparent px-[1rem] duration-300 hover:bg-gray-200 hover:text-slate-700 lg:transition-colors"
                                        to=""
                                    >
                                        <div className="flex py-[.25rem]">
                                            <div className="my-auto">
                                                <img
                                                    src="../assets/img/team-2.jpg"
                                                    className="inline-flex items-center justify-center mr-4 text-sm text-white h-9 w-9 max-w-none rounded-xl"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h6 className="mb-1 text-sm font-normal leading-normal">
                                                    <span className="font-semibold">New message</span> from Laur
                                                </h6>
                                                <p className="mb-0 text-xs leading-tight text-slate-400">
                                                    <FontAwesomeIcon icon={faClock} className="mr-1" />
                                                    13 minutes ago
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>

                                <li className="relative mb-2">
                                    <Link
                                        className="ease py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700"
                                        to=""
                                    >
                                        <div className="flex py-1">
                                            <div className="my-auto">
                                                <img
                                                    src="../assets/img/small-logos/logo-spotify.svg"
                                                    className="inline-flex items-center justify-center mr-4 text-sm text-white bg-gradient-to-tl from-zinc-800 to-zinc-700 h-9 w-9 max-w-none rounded-xl"
                                                    alt=""
                                                />
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h6 className="mb-1 text-sm font-normal leading-normal">
                                                    <span className="font-semibold">New album</span> by Travis Scott
                                                </h6>
                                                <p className="mb-0 text-xs leading-tight text-slate-400">
                                                    <FontAwesomeIcon icon={faClock} className="mr-1" />1 day
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>

                                <li className="relative">
                                    <Link
                                        className="ease py-1.2 clear-both block w-full whitespace-nowrap rounded-lg px-4 transition-colors duration-300 hover:bg-gray-200 hover:text-slate-700"
                                        to=""
                                    >
                                        <div className="flex py-1">
                                            <div className="inline-flex items-center justify-center my-auto mr-4 text-sm text-white transition-all duration-200 ease-nav-brand bg-gradient-to-tl from-slate-600 to-slate-300 h-9 w-9 rounded-xl">
                                                <svg
                                                    width="12px"
                                                    height="12px"
                                                    viewBox="0 0 43 36"
                                                    version="1.1"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                                                >
                                                    <title>credit-card</title>
                                                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                        <g
                                                            transform="translate(-2169.000000, -745.000000)"
                                                            fill="#FFFFFF"
                                                            fill-rule="nonzero"
                                                        >
                                                            <g transform="translate(1716.000000, 291.000000)">
                                                                <g transform="translate(453.000000, 454.000000)">
                                                                    <path
                                                                        className="color-background"
                                                                        d="M43,10.7482083 L43,3.58333333 C43,1.60354167 41.3964583,0 39.4166667,0 L3.58333333,0 C1.60354167,0 0,1.60354167 0,3.58333333 L0,10.7482083 L43,10.7482083 Z"
                                                                        opacity="0.593633743"
                                                                    ></path>
                                                                    <path
                                                                        className="color-background"
                                                                        d="M0,16.125 L0,32.25 C0,34.2297917 1.60354167,35.8333333 3.58333333,35.8333333 L39.4166667,35.8333333 C41.3964583,35.8333333 43,34.2297917 43,32.25 L43,16.125 L0,16.125 Z M19.7083333,26.875 L7.16666667,26.875 L7.16666667,23.2916667 L19.7083333,23.2916667 L19.7083333,26.875 Z M35.8333333,26.875 L28.6666667,26.875 L28.6666667,23.2916667 L35.8333333,23.2916667 L35.8333333,26.875 Z"
                                                                    ></path>
                                                                </g>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="flex flex-col justify-center">
                                                <h6 className="mb-1 text-sm font-normal leading-normal">
                                                    Payment successfully completed
                                                </h6>
                                                <p className="mb-0 text-xs leading-tight text-slate-400">
                                                    <FontAwesomeIcon icon={faClock} className="mr-1" />2 days
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </li>
                            </ul>
                        </li>

                        <li className="flex items-center">
                            {/* <button className="block p-[.5rem_0] font-semibold text-white transition-all"> */}
                            <Dropdown overlay={menu} placement="bottomRight">
                                <Link onClick={(e) => e.preventDefault()}>
                                    <Space style={{ padding: '1rem .5rem' }}>
                                        {companyName !== null && companyName !== undefined && (
                                            <span className="hidden sm:inline text-white">{companyName}</span>
                                        )}

                                        {driver !== null && driver !== undefined && (
                                            <span className="hidden sm:inline text-white">{driver.driverFullName}</span>
                                        )}

                                        {user !== null && user !== undefined && (
                                            <span className="hidden sm:inline text-white">{user.fullName}</span>
                                        )}
                                        <FontAwesomeIcon icon={faCaretDown} className="sm:ml-[.25rem] text-white" />
                                    </Space>
                                </Link>
                            </Dropdown>
                            {/* </button> */}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        //   <!-- end Navbar -->
    );
}
