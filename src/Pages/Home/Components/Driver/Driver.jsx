import React from 'react';

// Components
import { fadeIn } from '../../../../Functions/GlobalAnimations';
import Buttons from '../../../../Components/Button/Buttons';
import Lists from '../../../../Components/Lists/Lists';

// Libraries
import { Navigation } from 'swiper/modules';
import { Col, Container, Row } from 'react-bootstrap';
import { Swiper, SwiperSlide } from 'swiper/react';
import { m } from 'framer-motion';

// Data
const TestimonialsCarouselData = [
    {
        img: 'https://via.placeholder.com/800x622',
        title: 'Unlimited power customization',
        number: '01',
        content: 'Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.',
    },
    {
        img: 'https://via.placeholder.com/800x622',
        title: 'Powerful creatives designer',
        number: '02',
        content: 'Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.',
    },
    {
        img: 'https://via.placeholder.com/800x622',
        title: 'Advanced customization options',
        number: '03',
        content: 'Lorem ipsum dolor sit amet consectetur do eiusmod tempor incididunt elit.',
    },
];

const ListData = [
    {
        icon: 'feather-arrow-right-circle',
        content: 'Beautiful and easy to understand animations',
    },
    {
        icon: 'feather-arrow-right-circle',
        content: 'Theme advantages are pixel perfect design',
    },
    {
        icon: 'feather-arrow-right-circle',
        content: 'Find more creative ideas for your projects',
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
                                It is teamwork that makes the dream work.
                            </h5>
                            <p>
                                With years of experience in the website design and development industry ThemeZaa pride
                                ourselves on creating unique, creative &amp; quality designs that are developed upon the
                                latest coding.
                            </p>
                            <Lists
                                theme="list-style-02"
                                data={ListData}
                                className="mb-12 mt-8 text-darkgray font-serif"
                                animation={fadeIn}
                            />
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
