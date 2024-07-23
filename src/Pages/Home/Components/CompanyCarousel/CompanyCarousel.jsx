import React from 'react';

// Libraries
import { Col, Container, Row } from 'react-bootstrap';

// Components
import { fadeIn } from '../../../../Functions/GlobalAnimations';
import Clients from '../../../../Components/Clients/Clients';

// Data
import { ClientData01 } from '../../../../Components/Clients/ClientsData';

const ClientCarouselPage = () => {
    return (
        <section className="pb-40 overflow-hidden">
            <Container>
                <Row>
                    <Col className="relative">
                        <Clients
                            theme="client-logo-style-03"
                            className="swiper-navigation-04 swiper-navigation-light"
                            data={ClientData01}
                            animation={fadeIn}
                            carousel={true}
                            carouselOption={{
                                slidesPerView: 1,
                                loop: true,
                                spaceBetween: 20,
                                autoplay: { delay: 3000, disableOnInteraction: false },
                                navigation: true,
                                breakpoints: {
                                    1200: { slidesPerView: 4 },
                                    992: { slidesPerView: 3 },
                                    768: { slidesPerView: 3 },
                                },
                            }}
                        />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ClientCarouselPage;
