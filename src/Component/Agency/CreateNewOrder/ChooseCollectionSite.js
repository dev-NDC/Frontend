import React, { useEffect, useState, useContext} from "react";
import { Container, Row, Col, Card, Button, Pagination } from "react-bootstrap";

import CreateNewOrderContext from "../../../Context/Agency/CreateNewOrder/CreateNewOrderContext";

function ChooseCollectionSite() {
    const { currentPosition, maxPosition, setCurrentPosition, setMaxPosition } = useContext(CreateNewOrderContext);
    const [sites, setSites] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSiteId, setSelectedSiteId] = useState(null);

    const sitesPerPage = 5;

    useEffect(() => {
        const fetchData = () => {
            const simulatedData = [
                { id: 1, name: 'LABCORP - NEW YORK', address: '111 3rd Avenue, New York, NY 10003' },
                { id: 2, name: 'MEDRITE URGENT CARE - EAST VILLAGE', address: '123 3rd Avenue, New York, NY 10003' },
                { id: 3, name: 'QUEST DIAGNOSTICS NEW YORK', address: '268 3rd Avenue, New York, NY 10010' },
                { id: 4, name: 'QUEST DIAGNOSTICS - NEW YORK', address: '139 Centre St, New York, NY 10013' },
                { id: 5, name: 'CITYMD - NEW YORK', address: '156 William St, New York, NY 10038' },
                { id: 6, name: 'CITYMD - BROOKLYN', address: '81 Fleet Pl, Brooklyn, NY 11201' },
                { id: 7, name: 'MEDICAL CENTER - NEW YORK', address: '100 E 77th St, New York, NY 10075' },
                { id: 8, name: 'HOSPITAL - NEW YORK', address: '170 William St, New York, NY 10038' },
                { id: 9, name: 'HEALTH CENTER - NEW YORK', address: '450 Clarkson Ave, Brooklyn, NY 11203' },
                { id: 10, name: 'CLINIC - NEW YORK', address: '1470 Madison Ave, New York, NY 10029' },
            ];
            setSites(simulatedData);
        };

        fetchData();
    }, []);

    const indexOfLastSite = currentPage * sitesPerPage;
    const indexOfFirstSite = indexOfLastSite - sitesPerPage;
    const currentSites = sites.slice(indexOfFirstSite, indexOfLastSite);
    const totalPages = Math.ceil(sites.length / sitesPerPage);

    const handleSelectSite = (siteId) => {
        setSelectedSiteId(siteId);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePrevious = () => {
        setCurrentPosition(currentPosition - 1);
    };

    const handleContinue = () => {
        if (currentPosition === maxPosition) {
            setMaxPosition(maxPosition + 1);
        }
        setCurrentPosition(currentPosition + 1);
    };

    return (
        <Container className="my-4">
            <h4 className="fw-bold mb-4 text-center">Choose Collection Site</h4>
            <Row className="g-3">
                {currentSites.map((site) => (
                    <Col xs={12} md={6} key={site.id}>
                        <Card
                            className={`shadow-sm h-100 ${selectedSiteId === site.id ? "bg-success text-white" : ""}`}
                        >
                            <Card.Body>
                                <Card.Title className="fw-semibold text-uppercase mb-1" style={{ fontSize: "0.95rem" }}>
                                    {site.name}
                                </Card.Title>
                                <Card.Text className="mb-3" style={{ fontSize: "0.9rem" }}>
                                    {site.address}
                                </Card.Text>
                                <Button
                                    variant={selectedSiteId === site.id ? "light" : "dark"}
                                    size="sm"
                                    className="px-3"
                                    onClick={() => handleSelectSite(site.id)}
                                >
                                    {selectedSiteId === site.id ? "Selected" : "Select Site"}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {/* Pagination */}
            <div className="d-flex justify-content-center mt-4">
                <Pagination>
                    <Pagination.Prev
                        disabled={currentPage === 1}
                        onClick={() => handlePageChange(currentPage - 1)}
                    />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next
                        disabled={currentPage === totalPages}
                        onClick={() => handlePageChange(currentPage + 1)}
                    />
                </Pagination>
            </div>

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-between mt-4">
                <Button variant="secondary" onClick={handlePrevious}>
                    Previous
                </Button>
                <Button variant="primary" onClick={handleContinue} disabled={!selectedSiteId}>
                    Continue
                </Button>
            </div>
        </Container>
    );
}

export default ChooseCollectionSite;
