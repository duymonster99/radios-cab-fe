import ListDriverOfCompany from './components/ListDriver';
import FeedbackForCompany from './components/Feedback';

export default function CompanyDetail(props) {
    return (
        <div style={props.style}>
            <div className="p-[3rem_.75rem] m-[3rem_auto_0] w-full">
                <div className="p-[3rem_.75rem] w-[80%] mx-auto">
                    <div className="flex flex-wrap m-[calc(1.5rem*-1)_calc(1.5rem/-2)_0]">
                        <div className="w-full shrink-0 mt-[1.5rem] px-[.75rem] lg:w-[75%] lg:flex-[0_0_auto]">
                            <div className="flex flex-wrap m-[calc(1.5rem*-1)_calc(1.5rem/-2)">
                                <div className="w-full shrink-0 mt-[1.5rem] px-[.75rem] lg:w-[50%] lg:flex-[0_0_auto]">
                                    <div className="border border-[rgb(222,226,230)] rounded-[10px]">
                                        <img src="" className="h-auto rounded-[10px]" alt="company avatar" />
                                    </div>
                                </div>

                                <div className="w-full shrink-0 mt-[1.5rem] px-[.75rem] lg:w-[50%] lg:flex-[0_0_auto]">
                                    <h4 className="text-[calc(1.275rem+0.3vw)] mb-[1rem] xl:text-[1.5rem] mt-0 leading-[1.2]">
                                        Lorem Ipsum
                                    </h4>
                                    <h5 className="font-['Open_Sans'] mb-[1rem] text-[1.25rem] leading-[1.2]"></h5>
                                    <div className="flex mb-[1.5rem]"></div>
                                    <p className="mb-[1.5rem] mt-0"></p>
                                </div>

                                <div className="w-full shrink-0 mt-[1.5rem] px-[.75rem]">
                                    <nav>
                                        <div className="mb-[1px] flex flex-wrap pl-0 border-b border-[rgb(222,226,230)]">
                                            <button
                                                className={`mb-[-1px] p-[.5rem_1rem] transition-colors border-b-2 border-[#FFB524] text-[rgb(73,80,87)]`}
                                            >
                                                Description
                                            </button>
                                        </div>
                                    </nav>
                                    <div className="tab-pane">
                                        <p className="mt-0 mb-[1rem]">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quis
                                            explicabo facere ea quod architecto et facilis atque beatae exercitationem
                                            reiciendis, nobis minus similique. Illo excepturi sunt libero quod qui.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ListDriverOfCompany />

            <FeedbackForCompany />
        </div>
    );
}
