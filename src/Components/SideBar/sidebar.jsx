// libraries
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

// services
import { DataContext } from '../../Hooks/context';

const NavSidebar = () => {
    const { pathname } = useLocation()
    const { filteredNav } = useContext(DataContext)

    return (
        <>
            {filteredNav.map((item) => (
                <li key={item.id} className="mt-[0.125rem] w-full">
                    <NavLink
                        className={`transition-colors text-[rgb(52,71,103)] font-semibold leading-[1.5] px-[1rem] py-[.675rem] rounded-[.5rem] whitespace-nowrap flex items-center mx-[.5rem] my-0 ${pathname === item.slug && 'bg-[rgba(94,114,228,0.13)]'}`}
                        to={item.slug}
                    >
                        <div className="xl:p-[.625rem] text-center stroke-0 bg-[center_center] rounded-[.5rem] justify-center items-center flex w-[2rem] h-[2rem] mr-[.5rem]">
                            <FontAwesomeIcon
                                icon={item.icon}
                                className={`${item.iconColor} leading-[1.5] relative top-0`}
                            />
                        </div>
                        <span className="duration-300 opacity-100 ml-[.4rem] pointer-events-none ease">{item.title}</span>
                    </NavLink>
                </li>
            ))}
        </>
    );
};

export default function SideBar() {
    const { nameSidebar, company } = useContext(DataContext)

    return (
        <div
            className="overflow-hidden touch-auto xl:translate-x-0 xl:ml-[1.5rem] xl:left-0 duration-200 transition-transform shadow-xl antialiased p-0 bg-white rounded-[1rem] overflow-y-auto justify-between items-center flex-wrap -translate-x-full max-w-[18rem] w-full block my-[1rem] z-[990] inset-y-0 fixed"
        >
            <div className="h-[4.75rem]">
                <FontAwesomeIcon
                    icon={faXmark}
                    className="absolute top-0 right-0 p-[1rem] opacity-50 cursor-pointer text-slate-400 xl:hidden"
                />
                <Link
                    className="block px-[2rem] py-[1.5rem] m-0 leading-[1.5] whitespace-nowrap text-[rgb(52,71,103)]"
                    href=""
                    target="_blank"
                >
                    <img
                        src={company.companyImageUrl}
                        className="inline h-full max-w-full transition-all duration-200 max-h-[2rem] vertical-middle"
                        alt=""
                    />
                    <img
                        src=""
                        className="hidden h-full max-w-full transition-all duration-200 max-h-[2rem]"
                        alt=""
                    />
                    <span className="ml-[0.25rem] font-semibold transition-all duration-200">{nameSidebar}</span>
                </Link>
            </div>

            <hr className="h-px mt-0 bg-transparent bg-gradient-to-r from-transparent via-black/40 to-transparent opacity-[.25] mb-[1rem]" />

            <div className="items-center block w-auto max-h-screen overflow-y-auto touch-auto grow basis-full">
                <ul className="flex flex-col pl-0 mb-0">
                    <NavSidebar />
                </ul>
            </div>
        </div>
    );
}
