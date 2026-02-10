// import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import { HomePage } from './pages/Home';


import './App.css';

import AppNavbar, {
    ShowProjects,
    ContactPage,
    TodoListApp,
    WeatherApp
} from "./components/Navbar";

import { Routes, Route } from 'react-router-dom';


function App() {
    return (
        <>
        <div className="d-flex flex-column">
            <AppNavbar />
            <main className="flex-fill" id="container">
                {/* <Home /> */}
                <Routes>
                    <Route path='/' element={ <HomePage title="Home" /> }></Route>
                    <Route path='/projects' element={ <ShowProjects title="Projects" /> }></Route>
                            <Route path='/projects/todo-list-app' element={ <TodoListApp title="Todo List App" />}></Route>
                            <Route path='/projects/weather-app' element={ <WeatherApp title="Weather App" />}></Route>
                    <Route path='/contact' element={ <ContactPage title="Contact" /> }></Route>
                </Routes>
            </main>
            <Footer />
        </div>
        </>
    )
}

export default App;