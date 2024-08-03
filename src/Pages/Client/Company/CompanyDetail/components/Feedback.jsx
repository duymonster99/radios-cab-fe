export default function FeedbackForCompany() {
    return (
        <div className="mt-[1.5rem] w-[80%] mx-auto">
            <h4 className="mb-[3rem] text-[calc(1.375rem+0.3vw)] xl:text-[2.5rem] mt-0 leading-[1.2] text-[rgb(69,89,91)]">
                Your feedback about us services
            </h4>
            <div className="flex flex-wrap">
                <div className="lg:w-[50%] lg:flex-0">
                    <div className="rounded-[10px] border-b border-[rgb(222,226,230)] mr-[1.5rem]">
                        <input
                            type="text"
                            className="block w-full font-normal leading-[1.5] text-[rgb(116,125,136)] p-[6px_12px] rounded-[10px] focus:outline-none transition duration-[.15s] focus:shadow-[0_0_0_4px_#caea8f]"
                            placeholder="Your Name *"
                        />
                    </div>
                </div>

                <div className="lg:w-[50%] lg:flex-0">
                    <div className="rounded-[10px] border-b border-[rgb(222,226,230)]">
                        <input
                            type="email"
                            className="block w-full font-normal leading-[1.5] text-[rgb(116,125,136)] p-[6px_12px] rounded-[10px] focus:outline-none transition duration-[.15s] focus:shadow-[0_0_0_4px_#caea8f]"
                            placeholder="Your Email *"
                        />
                    </div>
                </div>

                <div className="w-full my-[1.5rem]">
                    <div className="rounded-[10px] border-b border-[rgb(222,226,230)]">
                        <textarea
                            className="block w-full font-normal leading-[1.5] text-[rgb(116,125,136)] p-[6px_12px] rounded-[10px] focus:outline-none transition duration-[.15s] focus:shadow-[0_0_0_4px_#caea8f]"
                            cols="30"
                            rows="8"
                            placeholder="Your Review *"
                            spellcheck="false"
                        ></textarea>
                    </div>
                </div>

                <div className="w-full mt-[1.5rem]">
                    <div className="flex justify-between py-[1rem] mb-[3rem]">
                        <button className="border-t-[1px] border-b-[1px] border-[#ffb524] text-[#81c408] rounded-[50rem] p-[1rem_1.5rem] transition-all duration-500 font-bold hover:bg-[#ffb524] hover:text-white">
                            Send feedback
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}