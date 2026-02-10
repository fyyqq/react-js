import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const AppFooter = () => {
    return (
        <footer className="mt-auto pt-5 bg-dark text-white">
            <Container>
                <Row>
                    <Col md={8} className="mb-3 d-flex align-items-start justify-content-center flex-column">
                        <h2>Fyqq</h2>
                        <p>ReactJS Project Portfolio.</p>
                        <ul className="list-unstyled mt-2 social-icons d-flex align-items-center justify-content-center column-gap-3">
                            <li><a href="#facebook" target='blank'><i className="bi bi-facebook text-light"></i></a></li>
                            <li><a href="#instagram" target='blank'><i className="bi bi-instagram text-light"></i></a></li>
                            <li><a href="#youtube" target='blank'><i className="bi bi-youtube text-light"></i></a></li>
                            <li><a href="#twitter" target='blank'><i className="bi bi-twitter text-light"></i></a></li>
                        </ul>
                    </Col>
                    <Col md={4} className="mb-3 d-flex align-items-center justify-content-center flex-column row-gap-2">
                        <h5>Projects</h5>
                        <ul className="list-unstyled  d-flex align-items-center justify-content-center flex-column row-gap-1">
                            <li><a href="#project-a" className="text-white"><small>Project A</small></a></li>
                            <li><a href="#project-b" className="text-white"><small>Project B</small></a></li>
                            <li><a href="#project-c" className="text-white"><small>Project C</small></a></li>
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center mt-3 border-top py-3 border-secondary">
                        <p className="mb-0"><small>&copy; {new Date().getFullYear()} Company, Inc. All rights reserved.</small></p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default AppFooter;
