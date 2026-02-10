import Container from "react-bootstrap/Container";
import { useState, Suspense, useTransition, useEffect} from 'react'
import { createPortal } from 'react-dom';
import { Routes, Route, Link, Outlet } from 'react-router-dom';
// import { Helmet } from "react-helmet-async";
import PageTitle from "../hook/usePageTitle";

function Title({count, title}) {
    PageTitle(title);
    const library = 'React';
    return <h1>Welcome to {title} Page | {library} - {count}.2.4 App</h1>;
}
function EmployeeIntroduction({ name, position }) {
    return (
        <b>Hi, My name is {name}, and I am a {position}.</b>
    );
}
function Button({onIncrement}) {
    const buttonCss = {
        width: 'max-content',
    }

    return (
        <button style={buttonCss} onClick={onIncrement}>Count {'Me!'}</button>
    );
}

function SayHello() {
    alert('Hello, welcome to the React App!');
}

function Son(props) {
    return (
        <div>{ props.children }</div>
    );
}

function Daughter(props) {
    return(
        <div>{ props.children }</div>
    );
}
function Parent() {
    return (
        <div>
            <Son>
                This is for My Son.
            </Son>
            <Daughter>
                This is for My Daughter.
            </Daughter>
        </div>
    );
}

function MyForm() {
    const [input, setInput] = useState("");

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    }
    const inputStyle = {
        display: 'flex',
        flexDirection: 'row',
    }

    function handleSubmit(e) {
        e.preventDefault();
        alert(`You typed: ${input}`);
    }

    return (
        <>
        <form style={formStyle} onSubmit={handleSubmit}>
            {/* Input */}
            <div style={inputStyle}>
                <input type="text" className='rechangeColor' placeholder='type something' value={input} onChange={e => setInput(e.target.value)} />
                <button type="submit" style={{ color: 'white', border: 'none', padding: '5px 10px', borderRadius: '0px' }}>Submit</button>
            </div>
            <p>{input}</p>
        </form>
        </>
    );
}

function MyOption() {
    const [option, setOption] = useState("Option A");

    function handleOptionChange(e) {
        setOption(e.target.value);
        alert(`You selected: ${e.target.value}`);
    }

    return(
        <>
        <select value={option} onChange={handleOptionChange}>
            <option value="Option A">Option A</option>
            <option value="Option B">Option B</option>
            <option value="Option C">Option C</option>
        </select>
        </>
    );
}

function DarkLightModeSetup(toggle) {
    const inputs = document.querySelectorAll('.rechangeColor');
    if (toggle) {
        document.querySelector('footer').style.backgroundColor = 'var(--bs-body-bg)'
        document.querySelector('footer').style.color = 'var(--bs-body-color)'
    
        document.body.style.backgroundColor = 'var(--bs-body-bg)';
        document.body.style.color= 'var(--bs-body-color)';
    
        inputs.forEach(input => {
            input.style.backgroundColor = "var(--bs-body-bg)";
            input.style.color = 'var(--bs-body-color)';
        });
    } else {
        document.body.style.backgroundColor = 'var(--bs-body-color)';
        document.body.style.color= 'var(--bs-body-bg)';
    
        document.querySelector('footer').style.backgroundColor = 'var(--bs-body-bg)';
        document.querySelector('footer').style.color = 'var(--bs-body-color)';
    
        inputs.forEach(input => {
            input.style.backgroundColor = 'var(--bs-body-color)';
            input.style.color = 'var(--bs-body-bg)';
        });
    }
}

function MyToggle() {
    const [toggle, setToggle] = useState(true);
    
    // Use useEffect to update the body's background color
    useEffect(() => {
        DarkLightModeSetup(toggle);
    }, [toggle]);

    return(
        <>
            <button style={{backgroundColor: toggle ? 'var(--bs-body-color)' : 'var(--bs-body-bg)', color: toggle ? 'var(--bs-body-bg)' : 'var(--bs-body-color)'}} onClick={() => setToggle(!toggle)}>{toggle ? 'Dark Mode' : 'Light Mode'}</button>
        </>
    );
}

function DoubleInput() {
    const [input, setInput] = useState({});
    const style = {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
    }

    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        
        setInput(values => ({...values, [name]: value}) );
    }

    return(
        <>
        <div style={style}>
            <label htmlFor="firstName">First Name:</label>
            <input type="text" className='rechangeColor' placeholder='first name' name="firstName" value={input.firstName} onChange={handleChange} />
            <label htmlFor="lastName">Last Name:</label>
            <input type="text" className='rechangeColor' placeholder='last name' name="lastName" value={input.lastName} onChange={handleChange} />
            <p>{input.firstName} {input.lastName}</p>
        </div>
        </>
    );
}

function TripleInput() {
    const [input, setInput] = useState({
        naming: 'Fyqq',
        drink: true,
        food: true,
    });

    const formOnChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const naming = target.name;

        setInput(values => ({ ...values, [naming]: value }));
    }

    const formOnSubmit = (e) => {
        e.preventDefault()

        let textFilling = '';

        alert(`I am ${input.naming ? input.naming : 'Unknown'}\n${input.drink ? 'I want a drink' : 'No, i dont want a drink'}\n${input.food ? 'I want food' : 'No, i don"t want food'}`);
    }

    return (
        <>
        <form onSubmit={formOnSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
            <input type="text" className='rechangeColor' name="naming" value={input.naming} onChange={formOnChange} placeholder='Your Name'/>
            <div style={{ display: 'flex', flexDirection: 'row', columnGap: '10px' }}>
                <label style={{ display: 'flex', flexDirection: 'row-reverse', columnGap: '5px' }}>Drink
                    <input type="checkbox" name="drink" checked={input.drink} onChange={formOnChange} />
                </label>
                <label style={{ display: 'flex', flexDirection: 'row-reverse', columnGap: '5px' }}>Food
                    <input type="checkbox" name="food" checked={input.food} onChange={formOnChange} />
                </label>
            </div>
            <button type="submit">Submit</button>
        </form>
        </>
    );
}

function CheckedRadio() {
    const [selectedOption, setSelectedOption] = useState('B');

    return(
        <>
        <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', border: '1px solid gray', padding: '10px', borderRadius: '5px' }} onSubmit={e => { e.preventDefault(); alert(`You selected: ${selectedOption}`); }}>
            <label>
                <input type="radio" name="options" value="A" checked={selectedOption === 'A'} onChange={e => setSelectedOption(e.target.value)} />
                Option A
            </label>
            <label>
                <input type="radio" name="options" value="B" checked={selectedOption === 'B'} onChange={e => setSelectedOption(e.target.value)} />
                Option B
            </label>
            <label>
                <input type="radio" name="options" value="C" checked={selectedOption === 'C'} onChange={e => setSelectedOption(e.target.value)} />
                Option C
            </label>
            <button type="submit">Submit</button>
        </form>
        </>
    );
}


function ButtonShowModal() {
    const [isOpen, setIsOpen] = useState(false);

return(
    <>
    <button onClick={() => setIsOpen(true)}>Open Modal</button>


    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h3 style={{ color: '#333', margin: '0px' }}>Modal Content</h3>
        <p style={{ color: '#333' }}>This content is rendered outside the App component!</p>
    </Modal>
    </>
);
}

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return createPortal(
        <div style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: '#fff',
                height: 'max-content',
                width: '30vh',
                padding: '20px'
            }}>
            {children}
            <button onClick={onClose}>Close</button>
        </div>,
        document.body
    );
}

function UseSuspense() {
    return(
        <>
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <p>This is Suspense Component</p>
            </Suspense>
        </div>
        </>
    );
}

function FetchData({ query }) {
    const items = [];

    if (query) {
        for (let i = 0; i < 10; i++) {
            items.push(<li key={i}>Item {i + 1} for query {query}</li>);
        }
    }

    return <ul>{items}</ul>
}

function DataTransitionDemo() {
    const [input, setInput] = useState(''); // urgent state
    const [results, setResults] = useState(''); // non-urgent state
    const [isPending, startTransition] = useTransition();   

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        
        setInput(value);

        startTransition(() => setResults(value));
    }

    return(
        <>
        <input className='rechangeColor' type="text" placeholder='Type something' name='searching' value={input} onChange={handleChange} />
        {isPending && <p style={{ color: 'red' }}>LOADING RESULTS...............</p>}
        <FetchData query={results} />
        </> 
    );
}

function BrowserRouterSPA() {
    return(
        <>
        {/* <BrowserRouter> */}
        {/* Navigation */}
        <nav>
            <Link to="/">Home</Link> | {" "}
            <Link to="/about">About</Link> | {" "}
            <Link to="/contact">Contact</Link>
        </nav>
            {/* Routes */}
            <Routes>
                <Route path='/' element={<HomeRouter />}></Route>
                <Route path='/about' element={<AboutRouter />}>
                    <Route path='/about/service-a' element={<ServiceARouter />}></Route>
                    <Route path='/about/service-b' element={<ServiceBRouter />}></Route>
                </Route>
                <Route path='/contact' element={<ContactRouter />}></Route>
            </Routes>
        {/* </BrowserRouter> */}
        </>
    );
}

function HomeRouter() {
    return <h4>Home</h4>
}
function AboutRouter() {
    return(
        <>
        <span style={{ margin: '0px' }}>↓</span>
        <h4 style={{ margin: '0px' }}>About</h4>
        <span style={{ margin: '0px' }}>↓</span>
        <nav style={{ marginBottom: '20px' }}>
            <Link to="/about/service-a">Service A</Link> |{" "}
            <Link to="/about/service-b">Service B</Link>
        </nav> 
        <span style={{ margin: '0px' }}>↓</span>
        <Outlet />
        </>
    );
}
function ServiceARouter() {
    return <h4>Service A</h4>
}
function ServiceBRouter() {
    return <h4>Service B</h4>
}
function ContactRouter() {
    return <h4>Contact</h4>
}

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [multiseconds, setMultiSeconds] = useState(0);

    useEffect(() => {
        setMultiSeconds(() => seconds * 2);
    }, [seconds]);

    return (
        <>
        <p>Second: {seconds}</p>
        <button onClick={() => setSeconds(s => s + 1) }>Multiply</button>
        <p>Multi Second: {multiseconds}</p>
        </>
    );
}

function FetchAPI() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json())
        .then(data => {
            setPosts(data);
            setLoading(false);
        }).catch(error => {
            console.error('Error fetching data:', error );
            setLoading(true);
        });
    }, []);

    if (loading) return <p>Loading...</p>

    return (
        <>
        <div className="d-flex flex-column row-gap-3">
            {posts.slice(0, 3).map(post => {
                return (
                    <div key={post.id} className="d-flex flex-column">
                        <b>{post.title}</b>
                        <small>{post.body}</small>
                    </div>
                );
            })}
        </div>
        </>
    );
}

function HomePage({ title }) {

    // <Helmet>
    //     <title>{title}</title>
    // </Helmet>

    const containerCss = {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: 'auto',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            gap: '40px 20px',
        }
    
        const sectionStyle = {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            rowGap: '20px',
            border: '1px solid gray',
            padding: '10px',
            borderRadius: '5px',
            height: '100%'
        }
    
        const [counter, setCounter] = useState(0);
        const setIncrement = () => setCounter(counter + 1);
    return (
        <Container className="py-5">
            <div className="App" style={containerCss}>
                <section style={{ gridColumn: '1 / -1', gridRow: '1' }}>
                    <Title count={counter} title={title} />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>useState(0)</h2>
                    <span>{counter}</span>
                    <Button onIncrement={setIncrement} />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>Function Variable</h2>
                    <EmployeeIntroduction name='afiq' position='web developer' />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>Parent props.children</h2>
                    <Parent />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>useState('')</h2>
                    <MyForm />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>useState(true)</h2>
                    <MyToggle />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>useState('Option A') #DefaultValue</h2>
                    <MyOption />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>useState({}) #DoubleInput</h2>
                    <DoubleInput />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>useState({}) #TripleInput #DefaultValue</h2>
                    <TripleInput />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>useState('B') #TripleInput #DefaultValue</h2>
                    <CheckedRadio />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>createPortal</h2>
                    <ButtonShowModal />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>Suspense (text before finish load)</h2>
                    <UseSuspense />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>useTransition</h2>
                    <DataTransitionDemo />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>useEffect()</h2>
                    <Timer />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>Browser Router (SPA)</h2>
                    <BrowserRouterSPA />
                </section>
                <section style={sectionStyle}>
                    <h2 className='sectionTitle'>Fetch API()</h2>
                    <FetchAPI />
                </section>
            </div>
        </Container>
    );
}

export { HomePage, DarkLightModeSetup };
// Home;