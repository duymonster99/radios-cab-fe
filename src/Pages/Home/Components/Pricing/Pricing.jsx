import React, { lazy } from 'react';

// Libraries
import { Col, Container, Row, Tab, Tabs } from 'react-bootstrap';

// Components
import InViewPort from '../../../../Components/InViewPort';

// Data
import { pricingTable03MonthData, pricingTable03YearData } from '../../../../Components/PricingTable/PricingTableData';
const PricingTable03 = lazy(() => import('../../../../Components/PricingTable/PricingTable03'));

const PricingComponent = (props) => {
    return (
        <div style={props.style}>
            {/* Lazy Load HTML */}
            <InViewPort>
                <section className="pb-[105px] pt-[40px] lg:pb-[90px] md:pb-[75px] md:pt-0 sm:py-[50px] text-center">
                    <Container>
                        <Row className="justify-center">
                            <Col xl={5} lg={6} sm={7}>
                                <span className="font-serif font-semibold text-[#27ae60] text-xmd block mb-[20px] sm:mb-[10px]">
                                    Simple pricing packages
                                </span>
                                <h2 className="heading-5 font-serif text-darkgray text-center inline-block font-semibold mb-28 tracking-[-1px] md:mb-16">
                                    Choose one of our plans get access to plugins for free
                                </h2>
                            </Col>
                        </Row>
                        <Container fluid className="switch-tab">
                            <Tabs defaultActiveKey="monthly">
                                <Tab eventKey="monthly" title="MONTHLY" className="mr-[-2px]">
                                    <Container fluid>
                                        <Row className="justify-center">
                                            <Col className="col-12 col-xl-10 col-lg-11 tab-style-04">
                                                <PricingTable03
                                                    grid="row row-cols-1 gap-y-10 row-cols-md-3 items-center"
                                                    theme="pricing-table-style-03"
                                                    className="pb-[15px]"
                                                    data={pricingTable03MonthData}
                                                />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Tab>
                                <Tab eventKey="yearly" title="QUARTERLY">
                                    <Container fluid>
                                        <Row className="justify-center">
                                            <Col className="col-12 col-xl-10 col-lg-11 tab-style-04">
                                                <PricingTable03
                                                    grid="row row-cols-1 row-cols-md-3 gap-y-10 items-center"
                                                    theme="pricing-table-style-03"
                                                    className="pb-[15px]"
                                                    data={pricingTable03YearData}
                                                />
                                            </Col>
                                        </Row>
                                    </Container>
                                </Tab>
                            </Tabs>
                        </Container>
                    </Container>
                </section>
            </InViewPort>
        </div>
    );
};

export default PricingComponent;
