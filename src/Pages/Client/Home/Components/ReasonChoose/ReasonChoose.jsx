import React from 'react';

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { m } from 'framer-motion';

// Components
import { fadeIn } from '../../../../../Functions/GlobalAnimations';
import Counter from '../../../../../Components/Counters/Counter';

// Data
const fancyTextBox = [
    {
        icon: { text: '2021' },
        title: 'Launched',
        description: 'Radio Cabs platform',
    },
    {
        icon: { text: '2022' },
        title: 'Expanded',
        description: 'to 20 provinces',
    },
    {
        icon: { text: '2023' },
        title: 'Reached',
        description: '1000+ registered drivers',
    },
];

const AboutMePage = (props) => {
    return (
        <div style={props.style}>
            <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-lightgray" {...fadeIn}>
                <Container>
                    <Row className="items-center justify-between about-me-counter">
                        <Col lg={5} md={8} sm={10} className="md:mb-[5.5rem]">
                            <Row xs={1} className="gap-y-10 fancy-text-box-03">
                                {fancyTextBox.map((item, i) => {
                                    return (
                                        <Col
                                            key={i}
                                            className="bg-white shadow-[0_0_10px_3.5px_#dddddd] rounded-[10px]"
                                        >
                                            <div className="text-box-content">
                                                <div className="text-box flex justify-center items-center">
                                                    {item.icon && (
                                                        <Counter
                                                            as="h4"
                                                            theme="counter-style-01"
                                                            className="text-center md:text-start text-fastblue heading-4 mb-0 w-[110px] xs:w-full"
                                                            data={[
                                                                {
                                                                    number: {
                                                                        text: `${item.icon.text}`,
                                                                    },
                                                                },
                                                            ]}
                                                            duration={3}
                                                            animation={fadeIn}
                                                        />
                                                    )}
                                                    <div className="fancy-box-wrapper">
                                                        {item.title && (
                                                            <span className="font-serif font-medium text-darkgray">
                                                                {item.title}
                                                            </span>
                                                        )}
                                                        {item.description && <p>{item.description}</p>}
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Col>
                        <Col lg={7} xl={{ span: 6, offset: 1 }} className="text-center md:text-start">
                            <Row>
                                <Col md={{ span: 9, offset: 3 }}>
                                    <h5 className="font-serif mb-12 font-medium text-darkgray lg:text-start sm:text-center xs:w-full xs:m-[0_auto] xs:mb-12">
                                        A growing story{' '}
                                        <span className="font-semibold  underline underline-offset-8">about us</span>
                                    </h5>
                                </Col>
                            </Row>
                            <Row className="text-right">
                                <Col md={3} className="font-serif text-darkgray sm:text-center xs:mb-[5px]">
                                    About us
                                </Col>
                                <Col md={9} className="mb-[2.5rem] text-left sm:text-center">
                                    Hi there, Radio Cabs is a pioneering platform connecting transportation services
                                    across Vietnam. We bring together taxi companies, drivers, and passengers for
                                    seamless travel experiences.
                                    <div className="w-full h-[1px] bg-darkgray mt-[2.5rem] opacity-10"></div>
                                </Col>
                                <Col md={3} className="font-serif text-darkgray sm:text-center xs:mb-[5px]">
                                    Current focus
                                </Col>
                                <Col md={9} className=" mb-[2.5rem] text-left sm:text-center">
                                    Currently expanding our network of taxi companies and drivers across Vietnam, with a
                                    special focus on inter-city travel and local tourism services.
                                    <div className="w-full h-[1px] bg-darkgray mt-[2.5rem] opacity-10"></div>
                                </Col>
                                <Col md={3} className="font-serif text-darkgray sm:text-center xs:mb-[5px]">
                                    Expertise
                                </Col>
                                <Col md={9} className="text-left sm:text-center">
                                    We specialize in connecting diverse transportation services, facilitating
                                    long-distance trips, and providing local expertise for city tours. Our platform
                                    offers easy comparison and booking for end-users while supporting drivers and
                                    companies in expanding their reach.
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </m.section>
        </div>
    );
};

export default AboutMePage;
