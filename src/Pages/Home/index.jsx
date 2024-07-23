import React from 'react';

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { m } from 'framer-motion';
import { fadeIn, fadeInLeft } from '../../Functions/GlobalAnimations';
import { Parallax } from 'react-scroll-parallax';
import { Link as ScrollTo } from 'react-scroll';

// Components
import Buttons from '../../Components/Button/Buttons';
import ClientCarouselPage from './Components/CompanyCarousel/CompanyCarousel';
import AboutMePage from './Components/ReasonChoose/ReasonChoose';
import Driver from './Components/Driver/Driver';
import TestimonialsComponent from './Components/Testimonials/TestimonialsComponent';
import PricingComponent from './Components/Pricing/Pricing';

// Images
import Banner from '../../Assets/img/Homepage/Gemini_Generated_Image_joev3ljoev3ljoev.jpg'
import Business1 from '../../Assets/img/Homepage/business1.jpg'
import Business2 from '../../Assets/img/Homepage/business2.jpg'

const HomePage = (props) => {
    return (
        <>
            {/* Section Start */}
            <section className="cover-background overflow-hidden">
                <div className="absolute h-full w-full top-0 left-0 opacity-60 bg-[#262b35]"></div>
                <img
                    src={Banner}
                    alt="Background"
                    className="absolute top-0 left-0 w-full h-full object-cover opacity-70 z-[-1]"
                />
                <Container className="full-screen text-center justify-center px-0 landscape:md:h-[600px]">
                    <Row className="h-full my-0 mx-auto justify-center">
                        <Col
                            lg={6}
                            md={8}
                            sm={8}
                            xs={8}
                            className="col-11 h-full justify-center text-center flex-col relative flex"
                        >
                            <h1 className="font-serif font-bold text-[100px] leading-[95px] text-white text-shadow-extra-large uppercase tracking-[-3px] mb-[55px] lg:text-[90px] lg:leading-[90px] md:text-[70px] md:leading-[65px] md:tracking-[-2px] sm:text-[45px] sm:leading-[43px] sm:tracking-[-1px] xs:mb-[30px] xs:w-[90%] xs:mx-auto">
                                Crossfit exercises
                            </h1>
                            <ScrollTo href="#" to="start" offset={0} delay={0} spy={true} smooth={true} duration={800}>
                                <Buttons
                                    type="submit"
                                    ariaLabel="link for start"
                                    className="btn-fancy btn-fill font-medium font-serif rounded-[4px] tracking-[1px] uppercase"
                                    themeColor="#ff7a56"
                                    color="#fff"
                                    size="lg"
                                    title="Get started now"
                                />
                            </ScrollTo>
                        </Col>
                    </Row>
                </Container>
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
                                    <img
                                        alt=""
                                        src={Business1}
                                        className="w-full"
                                        width="385.34"
                                        height="565.34"
                                    />
                                </Parallax>
                                <Parallax
                                    className="lg-no-parallax flex justify-center items-center w-[55%] bg-no-repeat absolute bottom-0 right-[15px] lg:ml-auto lg:!top-[130px]"
                                    speed={20}
                                >
                                    <img
                                        className="w-full"
                                        alt=""
                                        src={Business2}
                                        width="317"
                                        height="477"
                                    />
                                </Parallax>
                            </m.div>
                        </Col>
                        <m.div className="md:mt-[5%] col-xl-4 col-lg-5 offset-xl-1 offset-lg-1" {...fadeInLeft}>
                            <span className="font-serif block mb-[30px] font-semibold tracking-[2px] uppercase text-basecolor xs:mb-[20px]">
                                {' '}
                                20 years experience{' '}
                            </span>
                            <h2 className="heading-4 font-serif uppercase mb-10 font-bold tracking-[-1px] text-[#262b35] md:mb-[35px]">
                                {' '}
                                We have center of fitness more than 20 years{' '}
                            </h2>
                            <p className="mb-[25px] md:mb-[20px] sm:w-[90%] sm:mb-[15px] xs:w-full">
                                {' '}
                                Lorem ipsum dolor amet consectetur adipiscing do eiusmod tempor incididunt abore dolore
                                magna ut enim ad minim veniam utexercitation ullamco commodo consequat incididunt.{' '}
                            </p>
                            <Buttons
                                ariaLabel="discover litho"
                                className="btn-fill rounded-none font-medium font-serif uppercase hover:text-black mt-[20px]"
                                themeColor="#262b35"
                                size="lg"
                                color="#fff"
                                icon="feather-arrow-right"
                                iconPosition="after"
                                title="discover litho"
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

            {/* Pricing */}
            <PricingComponent />
        </>
    );
};

export default HomePage;
