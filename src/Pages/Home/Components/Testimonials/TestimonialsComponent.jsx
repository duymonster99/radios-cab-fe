import React from 'react';

// Libraries
import { Col, Container, Row } from 'react-bootstrap';

// Components
import { fadeIn } from '../../../../Functions/GlobalAnimations';
import Testimonials from '../../../../Components/Testimonials/Testimonials';

// Data
import { TestimonialsData02 } from '../../../../Components/Testimonials/TestimonialsData';

const TestimonialsComponent = (props) => {
    return (
        <div style={props.style}>
            <section className="bg-lightgray py-[130px] lg:pt-[90px] md:pb-[100px] sm:py-[75px] xs:py-[50px]">
                <Container>
                    <Row className="justify-center">
                        <Col md={6} className="text-center font-serif mb-20 sm:mb-12">
                            <span className="mb-[10px] inline-block uppercase font-medium text-gradient bg-gradient-to-r from-[#556fff] via-[#e05fc4] to-[#ff798e] tracking-[1px]">
                                What people say
                            </span>
                            <h5 className="text-darkgray font-semibold -tracking-[1px]">Client Testimonials</h5>
                        </Col>
                    </Row>
                    <Testimonials
                        grid="row-cols-1 row-cols-md-2 row-cols-lg-3 gap-y-10 justify-center mb-36 lg:mb-28 "
                        theme="testimonials-style-02"
                        data={TestimonialsData02}
                        animation={fadeIn}
                    />
                </Container>
            </section>
        </div>
    );
};

export default TestimonialsComponent;
