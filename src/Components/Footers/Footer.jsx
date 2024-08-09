import { Link } from 'react-router-dom';
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube } from 'react-icons/fa';

const NavFooter = (props) => {
    return (
        <Link
            className="leading-[35px] text-[rgba(255,255,255,.5)] transition-all duration-500 ease hover:text-[#ffb524]"
            href=""
        >
            {props.title}
        </Link>
    );
};
function Footer() {
    return (
        <footer className="w-full bg-[rgb(69,89,91)] text-[rgba(255,255,255,0.5)] px-[.75rem] mx-auto">
            <div className="w-[87%] mx-auto px-[.75rem]">
                <div className="pb-[1.5rem] mb-[1.5rem]" style={{ borderBottom: '1px solid rgba(226, 175, 24, 0.5)' }}>
                    <div className="flex flex-wrap">
                        <div className="lg:w-[25%] lg:flex-[0_0_auto] shrink-0 flex items-end w-full mt-[2rem]">
                            <Link href="#">
                                <h1 className="my-0 xl:text-[2.5rem] text-[calc(1.375rem+1.5vw)] text-[#81c408] font-bold leading-[1.2]">
                                    Radio Cabs
                                </h1>
                                <p className="text-[rgb(255,181,36)] mb-0 mt-0">Taxi</p>
                            </Link>
                        </div>

                        <div className="lg:w-[50%] lg:flex-[0_0_auto] flex items-end w-100% shrink-0 mt-[2rem]">
                            <div className="relative mx-auto w-full ">
                                <input
                                    className="rounded-[50rem] py-[1rem] px-[1.5rem] w-full block font-normal leading-[1.5] text-[rgb(116,125,136)] focus:outline-none focus:shadow-[0_0_0_2.5px_#92c82f] duration-300"
                                    type="text"
                                    placeholder="Your Email"
                                />
                                <button
                                    type="submit"
                                    className="transition-all duration-500 ease hover:bg-[rgb(255,181,36)] font-bold rounded-[50rem] py-[1rem] px-[1.5rem] leading-[1.5] absolute bg-[#81c408] text-white"
                                    style={{ top: 0, right: 0 }}
                                >
                                    Subscribe Now
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-[25%] lg:flex-[0_0_auto] flex justify-end items-end shrink-0 w-full mt-[2rem]">
                            <div className="flex pt-[1rem]">
                                <Link
                                    className="flex items-center justify-center w-[44px] h-[44px] transition-all duration-500 ease mr-[.5rem] border border-[#ffb524] rounded-[50%] text-[#ffb524] hover:text-black hover:bg-[#ffb524]"
                                    href=""
                                >
                                    <FaTwitter />
                                </Link>
                                <Link
                                    className="flex items-center justify-center w-[44px] h-[44px] transition-all duration-500 ease mr-[.5rem] border border-[#ffb524] rounded-[50%] text-[#ffb524] hover:text-black hover:bg-[#ffb524]"
                                    href=""
                                >
                                    <FaFacebookF />
                                </Link>
                                <Link
                                    className="flex items-center justify-center w-[44px] h-[44px] transition-all duration-500 ease mr-[.5rem] border border-[#ffb524] rounded-[50%] text-[#ffb524] hover:text-black hover:bg-[#ffb524]"
                                    href=""
                                >
                                    <FaYoutube />
                                </Link>
                                <Link
                                    className="flex items-center justify-center w-[44px] h-[44px] transition-all duration-500 ease mr-[.5rem] border border-[#ffb524] rounded-[50%] text-[#ffb524] hover:text-black hover:bg-[#ffb524]"
                                    href=""
                                >
                                    <FaLinkedinIn />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap">
                    <div className="lg:w-[25%] lg:flex-[0_0_auto] md:w-[50%] md:flex-[0_0_auto] shrink-0 w-full">
                        <div className="footer-item">
                            <h4 className="text-[#f4f6f8] mb-[1rem] mt-0 xl:text-[1.5rem] text-[calc(1.275rem+0.3vw)] font-bold leading-[1.2]">
                                Why People Like us!
                            </h4>
                            <p className="leading-[35px] mb-[1.5rem] mt-0 text-[rgba(255,255,255,.5)]">
                                typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
                                like Aldus PageMaker including of Lorem Ipsum.
                            </p>
                            <Link
                                href=""
                                className="transition-all duration-500 ease hover:bg-[#ffb524] hover:text-white font-bold rounded-[50rem] text-[#81c408] py-[.5rem] px-[1.5rem] border border-[#ffb524]"
                            >
                                Read More
                            </Link>
                        </div>
                    </div>

                    <div className="lg:w-[25%] lg:flex-[0_0_auto] md:w-[50%] md:flex-[0_0_auto] shrink-0 w-full">
                        <div className="flex flex-col text-left">
                            <h4 className="text-[#f4f6f8] mb-[1rem] mt-0 xl:text-[1.5rem] text-[calc(1.275rem+0.3vw)] font-bold leading-[1.2]">
                                Shop Info
                            </h4>
                            <NavFooter title="About Us" />
                            <NavFooter title="Contact Us" />
                            <NavFooter title="Privacy Policy" />
                            <NavFooter title="Terms & Condition" />
                            <NavFooter title="Return Policy" />
                            <NavFooter title="FAQs & Help" />
                        </div>
                    </div>

                    <div className="lg:w-[25%] lg:flex-[0_0_auto] md:w-[50%] md:flex-[0_0_auto] shrink-0 w-full">
                        <div className="flex flex-col text-left">
                            <h4 className="text-[#f4f6f8] mb-[1rem] mt-0 xl:text-[1.5rem] text-[calc(1.275rem+0.3vw)] font-bold leading-[1.2]">Account</h4>
                            <NavFooter title="My Account" />
                            <NavFooter title="Shop details" />
                            <NavFooter title="Shopping Cart" />
                            <NavFooter title="Wishlist" />
                            <NavFooter title="Order History" />
                            <NavFooter title="International Orders" />
                        </div>
                    </div>

                    <div className="lg:w-[25%] lg:flex-[0_0_auto] md:w-[50%] md:flex-[0_0_auto] shrink-0 w-full">
                        <div className="footer-item">
                            <h4 className="text-[#f4f6f8] mb-[1rem] mt-0 xl:text-[1.5rem] text-[calc(1.275rem+0.3vw)] font-bold leading-[1.2]">Contact</h4>
                            <p className='mt-0 mb-[1rem]'>Address: 1429 Netus Rd, NY 48247</p>
                            <p className='mt-0 mb-[1rem]'>Email: Example@gmail.com</p>
                            <p className='mt-0 mb-[1rem]'>Phone: +0123 4567 8910</p>
                            <p className='mt-0 mb-[1rem]'>Payment Accepted</p>
                            <img src="img/payment.png" className="img-fluid" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
