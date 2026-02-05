import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function AppNavbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary position-fixed w-100 start-0 top-0 px-3 py-4 shadow-sm">
            <Container fluid className='d-flex justify-content-between'>
                <Navbar.Collapse id="navbarScroll">
                <Navbar.Brand href="/">Fyqqq</Navbar.Brand>
                    <Nav className="me-auto ms-5 my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                        <Nav.Link href="/">Feature</Nav.Link>
                        <NavDropdown href="#projects" title="Projects" id="navbarScrollingDropdown">
                            <NavDropdown.Item className='text-small' href="#project-a">Project A</NavDropdown.Item>
                            <NavDropdown.Item className='text-small' href="#project-b">Project B</NavDropdown.Item>
                            <NavDropdown.Item className='text-small' href="#project-c">Project C</NavDropdown.Item>
                            {/* <NavDropdown.Divider /> */}
                        </NavDropdown>
                        <Nav.Link href="/contact">Contact</Nav.Link>
                    </Nav>
                    <Form className="d-flex">
                        <Form.Control
                        type="search"
                        placeholder="Search Project..."
                        className="me-2"
                        aria-label="Search"
                        />
                        <Button variant="btn btn-info text-light">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default AppNavbar;