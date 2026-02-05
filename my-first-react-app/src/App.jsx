import AppNavbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import './App.css'

function App() {
    return (
        <>
        <div className="d-flex flex-column">
            <AppNavbar />
            <main className="flex-fill" id="container">
                <Home />
            </main>
            <Footer />
        </div>
        </>
    )
}

export default App;