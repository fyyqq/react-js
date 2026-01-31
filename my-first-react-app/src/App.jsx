// import { createRoot, useState } from 'react-dom/client'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Title({count}) {
    const library = 'React';
    return <h1>Welcome to My First {library} - {count}.2.4 App</h1>;
}
function Description() {
    return <p>This is a simple React application.</p>;
}
function EmployeeIntroduction({ name, position }) {
    return (
        <b>Hi, My name is {name}, and I am a {position}.</b>
    );
}
function Button({onIncrement}) {
    const buttonCss = {
        width: 'max-content',
        marginTop: '50px',
    }

    return (
        <button style={buttonCss} onClick={onIncrement}>Click {'Me!'}</button>
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
  const [name, setName] = useState("");

    return (
        <form>
            <input type="text"  value={name} onChange={(e) => setName(e.target.value)} />
            <p>{name}</p>
        </form>
    )
}

function App() {
    const containerCss = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0px',
    }

    const [count, setCount] = useState(0);
    const setIncrement = () => setCount(count + 1);

    return (
        <div className="App" style={containerCss}>
            <Title count={count} />
            <Description />
            <EmployeeIntroduction name='afiq' position='web developer' />
            <Parent />
            <MyForm />
            <Button onIncrement={setIncrement} />
        </div>
    )
}

export default App;