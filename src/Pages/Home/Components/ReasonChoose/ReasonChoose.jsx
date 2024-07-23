import React from 'react';

// Libraries
import { Col, Container, Row } from 'react-bootstrap';
import { m } from 'framer-motion';

// Components
import { fadeIn } from '../../../../Functions/GlobalAnimations';
import Counter from '../../../../Components/Counters/Counter';

// Data
const fancyTextBox = [
    {
        icon: { text: '2013' },
        title: 'Winning award',
        description: 'for creative design',
    },
    {
        icon: { text: '2014' },
        title: 'Nominee for jury',
        description: 'in awwwards.com',
    },
    {
        icon: { text: '2018' },
        title: 'Creative designer',
        description: 'in apple design',
    },
];

const AboutMePage = (props) => {
    return (
        <div style={props.style}>
            <m.section className="py-[130px] lg:py-[90px] md:py-[75px] sm:py-[50px] bg-lightgray" {...fadeIn}>
                <Container>
                    <Row className="items-center justify-center about-me-counter">
                        <Col lg={5} md={8} sm={10} className="md:mb-[5.5rem]">
                            <Row xs={1} className="gap-y-10 fancy-text-box-03">
                                {fancyTextBox.map((item, i) => {
                                    return (
                                        <Col key={i} className='bg-white shadow-[0_0_10px_3.5px_#dddddd] rounded-[10px]'>
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
                                        A smiling story{' '}
                                        <span className="font-semibold  underline underline-offset-8">about me</span>
                                    </h5>
                                </Col>
                            </Row>
                            <Row className="text-right">
                                <Col md={3} className="font-serif text-darkgray sm:text-center xs:mb-[5px]">
                                    about me
                                </Col>
                                <Col md={9} className="mb-[2.5rem] text-left sm:text-center">
                                    Hi there, I am a Brian Wilson creative developer and designer, I enjoy building
                                    beautiful and thoughtful experiences. I like to mix code surprising visuals and
                                    pleasing interactions.
                                    <div className="w-full h-[1px] bg-darkgray mt-[2.5rem] opacity-10"></div>
                                </Col>
                                <Col md={3} className="font-serif text-darkgray sm:text-center xs:mb-[5px]">
                                    current job
                                </Col>
                                <Col md={9} className=" mb-[2.5rem] text-left sm:text-center">
                                    Currently working with good people and pushing{' '}
                                    <a
                                        aria-label="envoto"
                                        className="text-darkgray underline"
                                        rel="noreferrer"
                                        href="https://envato.com"
                                        target="_blank"
                                    >
                                        envato studio
                                    </a>{' '}
                                    in beautiful King Street, Melbourne, Australia.
                                    <div className="w-full h-[1px] bg-darkgray mt-[2.5rem] opacity-10"></div>
                                </Col>
                                <Col md={3} className="font-serif text-darkgray sm:text-center xs:mb-[5px]">
                                    expertise
                                </Col>
                                <Col md={9} className="text-left sm:text-center">
                                    Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem
                                    ipsum has been the industry's standard dummy text ever since.
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
