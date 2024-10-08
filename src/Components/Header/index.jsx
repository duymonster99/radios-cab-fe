// Libraries
import { FileDoneOutlined, UserOutlined } from '@ant-design/icons';
import { faBars, faMagnifyingGlass, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Logout } from '@mui/icons-material';
import { Avatar, Dropdown, message, Space } from 'antd';
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

// images
import Logo from '../../Assets/img/Logo.jpg'
import { jwtDecode } from 'jwt-decode';
import { getAdminService } from '../../Services/apiService';
import { useQuery } from '@tanstack/react-query';

const NavBar = ({ title, slug }) => {
    const { pathname } = useLocation()

    return (
        <li className="group">
            <Link
                to={slug}
                className={`p-[10px_15px] transition-all duration-500 ease text-[#747d88] hover:text-[#81c408] ${
                    pathname === slug ? 'text-[#81c408]' : ''
                }`}
            >
                {title}
            </Link>
        </li>
    );
};

export default function HeaderLayout() {
    const [accountDetail, setAccountDetail] = useState(null);
    const tokenStorage = localStorage.getItem('tokenUser')
    let id

    if (tokenStorage) {
        const { unique_name } = jwtDecode(tokenStorage)
        id = unique_name
    }
    
    const navigate = useNavigate()

    // ? =================== GET USER ===================
    const getUserToken = () => getAdminService(`Admin/getUserById/${id}`)

    const { data, isSuccess } = useQuery({
        queryKey: ['queryUser'],
        queryFn: getUserToken,
        retry: false
    })

    useEffect(() => {
        if (isSuccess) {
            setAccountDetail(data.data)
        }
    }, [isSuccess, data])

    // ? ===================== HANDLE LOGOUT ====================
    const handleLogout = () => {
        localStorage.removeItem('tokenUser');
        message.success('Logout Successfully!');
        navigate("/login")
    };

    const items = [
        {
            label: (
                <Link target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    <p>Thông tin tài khoản</p>
                </Link>
            ),
            key: '0',
            icon: <UserOutlined size={16} />,
        },
        {
            type: 'divider',
        },
        {
            label: (
                <Link>
                    <p>Đăng xuất</p>
                </Link>
            ),
            key: '2',
            icon: <Logout />,
            onClick: handleLogout
        },
    ];

    return (
        <div className="w-full px-[.75rem] mx-auto transition-all duration-500 ease bg-[#fff] shadow-[0_0.5rem_1rem_rgba(0,0,0,.15)]">
            <div className="w-[90%] mx-auto px-0">
                <nav className="h-[100px] relative flex flex-wrap items-center justify-between py-[.5rem] border-b-[1px] border-[rgba(255,255,255,.1)] xl:flex-nowrap xl:justify-start">
                    <Link
                        to=""
                        className="text-[#81c408] font-bold py-[.3125rem] mr-[1rem] text-[calc(1.375rem+1.5vw)] xl:text-[2rem]"
                    >
                        <img width={80} src={Logo} alt='Logo' />
                    </Link>
                    <button
                        className="h-auto text-[rgba(0,0,0,.55)] border border-[rgba(0,0,0,.1)] text-[1.25rem] rounded-[10px] p-[.5rem_1rem] leading-[1] transition-all duration-[.15s] ease-in-out xl:hidden"
                        type="button"
                    >
                        <span className="text-[#81c408]">
                            <FontAwesomeIcon icon={faBars} />
                        </span>
                    </button>

                    <div className="hidden grow basis-full items-center xl:flex xl:basis-auto" id="navbarCollapse">
                        <ul className="relative flex flex-col pl-0 mx-auto xl:flex-row mb-0">
                            <NavBar slug="/" title="HOME" />
                            <NavBar slug="/driver" title="DRIVER" />
                            <NavBar slug="/company" title="COMPANY" />
                            <NavBar slug="/feedback" title="FEEDBACK" />
                        </ul>
                        <div className="flex m-[1rem] mr-0">
                            <button className="w-[44px] h-[44px] flex my-auto justify-center font-normal border border-[#ffb524] rounded-[50%] mr-[1.5rem] transition-all duration-500 ease leading-[1.5] hover:bg-[#ffb524]">
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    className="text-[#81c408] text-[1rem] font-black my-auto"
                                />
                            </button>
                            {accountDetail !== null && (
                                <div className="flex items-center">
                                    <Dropdown
                                        menu={{
                                            items,
                                        }}
                                        placement="bottomRight"
                                    >
                                        <Link onClick={(e) => e.preventDefault()}>
                                            <Space style={{ padding: '1rem .5rem' }}>
                                                <Avatar
                                                    style={{
                                                        backgroundColor: '#87d068',
                                                    }}
                                                    icon={<UserOutlined />}
                                                />
                                                <p>{accountDetail.fullName}</p>
                                            </Space>
                                        </Link>
                                    </Dropdown>
                                </div>
                            )}

                            {accountDetail === null && (
                                <Link to="/login" className="my-auto text-[#81c408]">
                                    <FontAwesomeIcon
                                        icon={faUser}
                                        className="text-[2rem] text-bold hover:text-[#ffb524] duration-500"
                                    />
                                </Link>
                            )}
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
}
