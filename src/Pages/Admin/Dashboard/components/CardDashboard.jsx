import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function CardDashBoard(props) {
    return (
        <div className="w-full max-w-full px-[1.2rem] mb-[1.5rem] sm:w-1/2 sm:flex-none xl:mb-0 xl:w-1/4">
            <div className="relative flex flex-col min-w-0 break-words bg-white shadow-xl rounded-[1rem] bg-clip-border">
                <div className="flex-auto p-[1rem]">
                    <div className="flex flex-row -mx-[.75rem]">
                        <div className="flex-none w-2/3 max-w-full px-[.75rem]">
                            <div>
                                <p className="mb-0 font-semibold leading-normal uppercase">{props.title}</p>
                                <h5 className="mb-[.5rem] text-[1.25rem] font-bold font-['Open_Sans']">{props.number}</h5>
                                <p className="mb-0">
                                    <span className="font-bold leading-normal text-[rgb(45,206,137)]">+55% </span>
                                    since yesterday
                                </p>
                            </div>
                        </div>
                        <div className="px-[.75rem] text-right basis-1/3">
                            <div className={`relative inline-block w-[3rem] h-[3rem] text-center rounded-[50%] ${props.colorIcon}`}>
                                <FontAwesomeIcon
                                    icon={props.icon}
                                    className="absolute leading-none left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
