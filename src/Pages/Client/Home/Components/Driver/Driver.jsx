import React from 'react';

// Components
import { fadeIn } from '../../../../../Functions/GlobalAnimations';
import Buttons from '../../../../../Components/Button/Buttons';
import Lists from '../../../../../Components/Lists/Lists';

// Libraries
import { Navigation } from 'swiper/modules';
import { Col, Container, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { m } from 'framer-motion';

// images
import Driver1 from '../../../../../Assets/img/Homepage/TaxiDriver1.jpg'
import Driver2 from '../../../../../Assets/img/Homepage/TaxiDriver2.jpg'
import Driver3 from '../../../../../Assets/img/Homepage/TaxiDriver3.jpg'
import Driver4 from '../../../../../Assets/img/Homepage/TaxiDriver4.jpg'

// Data
const TestimonialsCarouselData = [
    {
        img: Driver1,
        title: 'Unlimited power customization',
        number: '01',
        content: 'Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.',
    },
    {
        img: Driver2,
        title: 'Powerful creatives designer',
        number: '02',
        content: 'Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.',
    },
    {
        img: Driver3,
        title: 'Advanced customization options',
        number: '03',
        content: 'Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.',
    },
    {
        img: Driver4,
        title: 'Advanced customization options',
        number: '04',
        content: 'Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.',
    },
];

const ListData = [
    {
        icon: 'feather-arrow-right-circle',
        content: (
            <>
                <strong>Reliable Job Opportunities:</strong> Connect with SMEs transportation companies looking for
                drivers with local and intercity route experience.
            </>
        ),
    },
    {
        icon: 'feather-arrow-right-circle',
        content: (
            <>
                <strong>Flexible Work Arrangements:</strong> Find job offers that fit your schedule and preferences,
                from intercity trips to local tourism services.
            </>
        ),
    },
    {
        icon: 'feather-arrow-right-circle',
        content: (
            <>
                <strong>Expand Your Network:</strong> Join a platform that links you with business owners, managers, and
                transportation companies seeking experienced drivers.
            </>
        ),
    },
];

const Driver = (props) => {
    return (
        <div style={props.style}>
            <m.section className="py-[130px] lg:py-[90px] md:py-[75px] xs:py-[50px]" {...fadeIn}>
                <Container>
                    <Row className="items-center">
                        <Col
                            lg={6}
                            className="p-0 md:mb-[50px] border-white border-[12px] rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)]"
                        >
                            <div className="relative">
                                <Swiper
                                    className="white-move swiper-pagination-medium h-full swiper-navigation-01 swiper-navigation-light"
                                    modules={[Navigation]}
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    loop={true}
                                    autoplay={{
                                        delay: 3000,
                                        disableOnInteraction: false,
                                    }}
                                    navigation={true}
                                >
                                    {TestimonialsCarouselData.map((item, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <div className="h-full shadow-lg bg-[#fff]">
                                                    <img
                                                        src={item.img}
                                                        alt="business"
                                                        className="w-full"
                                                        width="531"
                                                        height="413"
                                                    />
                                                </div>
                                            </SwiperSlide>
                                        );
                                    })}
                                </Swiper>
                            </div>
                        </Col>
                        <Col lg={{ span: 5, offset: 1 }}>
                            <h5 className="font-serif text-darkgray font-medium">
                                Join Our Team and Drive Success.
                            </h5>
                            <p>
                                With the growing demand for reliable transportation services, Radio Cabs invites you to
                                be a part of our expanding network. We specialize in connecting skilled drivers with
                                SMEs transportation companies and business owners who need trustworthy drivers for
                                intercity and local travel. Join us to leverage your driving expertise and meet the
                                transportation needs of businesses and travelers across Vietnam.
                            </p>
                            <Lists
                                theme="list-style-02"
                                data={ListData}
                                className="mb-12 mt-8 text-darkgray font-serif"
                                animation={fadeIn}
                            />
                            <h5 className="font-serif text-darkgray font-medium">
                                Ready to Drive with Us? Click Below to Get Started!
                            </h5>
                            <Buttons
                                href="/page/contact-modern"
                                className="btn-fill font-medium font-serif rounded-[4px] uppercase md:mb-[15px]"
                                themeColor="#0038e3"
                                color="#fff"
                                size="md"
                                title="Get Started Now"
                            />
                        </Col>
                    </Row>
                </Container>
            </m.section>
        </div>
    );
};

export default Driver;
