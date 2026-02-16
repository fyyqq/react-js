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
import { SearchSongApp } from '../projects/beginner/SearchSong';

function AppNavbar() {
    const [toggle, setToggle] = useState(true);

    useEffect(() => {
        DarkLightModeSetup(toggle);
    }, [toggle]);

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary position-fixed w-100 start-0 top-0 px-3 py-4 shadow-sm" style={{ zIndex: '999' }}>
                <Container fluid className='d-flex justify-content-between'>
                    <a className="navbar-brand" href="/">Fyqq</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <div className="nav-link active" aria-current="page">
                                    <Link className='fw-normal active text-muted' to="/">Feature</Link>
                                </div>
                            </li>
                            <li className="nav-item dropdown">
                                <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false"><Link className='fw-normal text-muted' to="/projects">Projects</Link></div>
                                <ul className="dropdown-menu w-lg-0 w-25 mx-lg-0 mx-auto">
                                    <Link className='fw-normal d-block py-1 ps-3 text-muted' to="/projects/todo-list-app">Todo List App</Link>
                                    <Link className='fw-normal d-block py-1 ps-3 text-muted' to="/projects/search-song-app">Search Song App</Link>
                                    <li><hr className="dropdown-divider"/></li>
                                    <Link className='fw-normal d-block py-1 ps-3 text-muted' to="/projects/search-song-app">Intermediate</Link>
                                    <li><hr className="dropdown-divider"/></li>
                                    <Link className='fw-normal d-block py-1 ps-3 text-muted' to="/projects/search-song-app">Advanced</Link>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <div className="nav-link" aria-disabled="true"><Link className='fw-normal text-muted' to="/projects">Contact</Link></div>
                            </li>
                        </ul>
                        <form className="d-flex mx-lg-0 mx-auto w-md-0 w-25" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <div className="mt-lg-0 mt-3"><button data-bs-toggle="tooltip" data-bs-placement="top" title={ toggle ? "Dark mode" : "Light mode" } className={ toggle ? 'btn btn-dark ms-2' : 'btn btn-warning ms-2'} onClick={() => setToggle(!toggle) }><i className={ toggle ? "bi bi-moon" : "bi bi-stars" }></i></button></div>
                    </div>
                </Container>
            </Navbar>
        </>
    );
}

export { ShowProjects, ContactPage, TodoListApp, SearchSongApp };
export default AppNavbar;