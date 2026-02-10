import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { DarkLightModeSetup } from '../pages/Home';
import { ShowProjects } from '../pages/Projects';
import { ContactPage } from '../pages/Contact';
import { TodoListApp } from '../projects/beginner/TodoList';
import { WeatherApp } from '../projects/beginner/WeatherApp';

function AppNavbar() {
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        DarkLightModeSetup(toggle);
    }, [toggle]);

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary position-fixed w-100 start-0 top-0 px-3 py-4 shadow-sm" style={{ zIndex: '999' }}>
                <Container fluid className='d-flex justify-content-between'>
                    <Navbar.Collapse id="navbarScroll">
                    <Link to="/">Fyqqq</Link>
                        <Nav className="d-flex align-items-center justify-content-center column-gap-3 me-auto ms-5 my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                            <Link className='fw-normal' to="/">Feature</Link>
                            <li className="dropdown d-flex align-items-center justify-content-center">
                                <Link className='fw-normal' to="/projects">Projects</Link>
                                <button className='bg-transparent shadow-none border-0 p-0' id="dropdownMenuButton1" data-bs-toggle="dropdown">
                                    <i className="bi bi-arrow-down-short ms-1 text-dark"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end mt-3" aria-labelledby="dropdownMenuButton1">
                                    <Link className='fw-normal d-block py-1 ps-3' to="/projects/todo-list-app">Todo List App</Link>
                                    <Link className='fw-normal d-block py-1 ps-3' to="/projects/weather-app">Weather App</Link>
                                </ul>
                            </li>
                            <Link className='fw-normal' to="/contact">Contact</Link>
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
                        <div><button data-bs-toggle="tooltip" data-bs-placement="top" title={ toggle ? "Dark mode" : "Light mode" } className={ toggle ? 'btn btn-dark ms-2' : 'btn btn-warning ms-2'} onClick={() => setToggle(!toggle) }><i className={ toggle ? "bi bi-moon" : "bi bi-stars" }></i></button></div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export { ShowProjects, ContactPage, TodoListApp, WeatherApp };
export default AppNavbar;