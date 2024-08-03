import React from 'react';

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { m } from 'framer-motion';
import { fadeIn, fadeInLeft } from '../../../Functions/GlobalAnimations';
import { Parallax } from 'react-scroll-parallax';
import { Link as ScrollTo } from 'react-scroll';

// Components
import Buttons from '../../../Components/Button/Buttons';
import ClientCarouselPage from './Components/CompanyCarousel/CompanyCarousel';
import AboutMePage from './Components/ReasonChoose/ReasonChoose';
import Driver from './Components/Driver/Driver';
import TestimonialsComponent from './Components/Testimonials/TestimonialsComponent';

// Images
import Banner from '../../../Assets/img/Homepage/Gemini_Generated_Image_joev3ljoev3ljoev.jpg';
import Business1 from '../../../Assets/img/Homepage/business1.jpg';
import Business2 from '../../../Assets/img/Homepage/business2.jpg';
import { Link } from 'react-router-dom';

const HomePage = (props) => {
    return (
        <>
            {/* Section Start */}
            <section className="relative w-full h-[600px]">
                <div className="absolute h-full w-full top-0 left-0 opacity-60 bg-[#262b35]"></div>
                <img
                    src={Banner}
                    alt="Background"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-70 z-[-1]"
                />
                <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]'>
                    <h1 className="font-serif font-bold text-[80px] text-center leading-[95px] text-white text-shadow-extra-large uppercase tracking-[-3px] mb-[55px] lg:text-[90px] lg:leading-[90px] md:text-[70px] md:leading-[65px] md:tracking-[-2px] sm:text-[45px] sm:leading-[43px] sm:tracking-[-1px] xs:mb-[30px] xs:w-[90%] xs:mx-auto">
                        Radio Cabs Business
                    </h1>
                    <Link to='/company'>
                        <button className='flex mx-auto bg-orange-400 px-[1rem] py-[.75rem] border-2 border-transparent text-white font-bold text-xl duration-200 hover:border-orange-400 hover:bg-transparent hover:-translate-y-1'>Get Started Now</button>
                    </Link>
                </div>
            </section>
            {/* Section End */}

            {/* Parallax Start */}
            <section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] overflow-hidden">
                <Container>
                    <Row className="items-center">
                        <Col xl={7} lg={6} className="relative">
                            <m.div className="relative" {...fadeIn}>
                                <Parallax className="lg-no-parallax w-[70%] mb-16" speed={0}>
                                    {' '}
                                    <img alt="" src={Business1} className="w-full" width="385.34" height="565.34" />
                                </Parallax>
                                <Parallax
                                    className="lg-no-parallax flex justify-center items-center w-[55%] bg-no-repeat absolute bottom-0 right-[15px] lg:ml-auto lg:!top-[130px]"
                                    speed={20}
                                >
                                    <img className="w-full" alt="" src={Business2} width="317" height="477" />
                                </Parallax>
                            </m.div>
                        </Col>
                        <m.div className="md:mt-[5%] col-xl-4 col-lg-5 offset-xl-1 offset-lg-1" {...fadeInLeft}>
                            <span className="font-serif block mb-[30px] font-semibold tracking-[2px] uppercase text-basecolor xs:mb-[20px]">
                                {' '}
                                20 YEARS OF INDUSTRY INSIGHT{' '}
                            </span>
                            <h2 className="heading-4 font-serif uppercase mb-10 font-bold tracking-[-1px] text-[#262b35] md:mb-[35px]">
                                {' '}
                                EXPAND YOUR TAXI BUSINESS WITH RADIO CABS{' '}
                            </h2>
                            <p className="mb-[25px] md:mb-[20px] sm:w-[90%] sm:mb-[15px] xs:w-full">
                                {' '}
                                Join Vietnam's premier platform connecting local taxi companies with a nationwide
                                customer base. Radio Cabs helps SMEs operators like you increase visibility, streamline
                                operations, and boost revenue. With our innovative technology and broad reach, we bring
                                passengers directly to your services, whether for inter-city travel or local tours.{' '}
                            </p>
                            <Buttons
                                ariaLabel="PARTNER WITH US"
                                className="btn-fill rounded-none font-medium font-serif uppercase hover:text-black mt-[20px]"
                                themeColor="#262b35"
                                size="lg"
                                color="#fff"
                                icon="feather-arrow-right"
                                iconPosition="after"
                                title="PARTNER WITH US"
                            />
                        </m.div>
                    </Row>
                </Container>
            </section>
            {/* Parallax End */}

            {/* Section List Company */}
            <ClientCarouselPage />
            {/* List End */}

            {/* Section Why Choose Us */}
            <AboutMePage />
            {/* End Why Choose Us */}

            {/* Driver */}
            <Driver />
            {/* End Driver */}

            {/* Testimonials */}
            <TestimonialsComponent />
            {/* End Testimonials */}
        </>
    );
};

export default HomePage;
