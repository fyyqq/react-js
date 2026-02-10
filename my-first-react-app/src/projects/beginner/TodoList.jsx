import { ListGroup } from "react-bootstrap";
import PageTitle from "../../hook/usePageTitle";
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// import { Helmet } from "react-helmet-async";

function TodoListApp({ title }) {
    PageTitle(title);
    const [isOpen, setIsOpen] = useState(false);

    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    // save to localStorage
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const [text, setText] = useState("");

    const AddTodoList = (e) => {
        e.preventDefault();

        if (!text.trim()) {
            alert("Please enter a todo item.");
            return;
        };

        setTodos([...todos, { id: Date.now(), text, completed: false, deleted: false }]);

        setText("");
    }

    const ToggleRemoveList = element => {
        const todo_element = $(element).closest('li');
        const todo_id = todo_element.attr('id');
        const todos_deleted = todos.filter(todo => todo.id == todo_id);
        todos_deleted.deleted = true;

        setTodos(todos.map(todo => todo.id === parseInt(todo_id) ? { ...todo, deleted: true } : todo));
    };

    const TodoEditable = (element, toggleIcon) => {
        const todo_id = $(element).closest('li').attr('id');
        const todo_new_value = $(element).closest('li').find('input').val();
        
        if (toggleIcon) {
            let selected_todo = todos.filter(todo => todo.id === parseInt(todo_id))[0];
            selected_todo.text = todo_new_value;
        }

        setTodos(todos.map((todo) => todo.id === parseInt(todo_id) ? { ...todo, completed: todo.completed, deleted: false } : todo));
    }
    
    const TodoCompleted = (element) => {
        const todo_id = $(element).closest('li').attr('id');
        let selected_todo = todos.filter(todo => todo.id === parseInt(todo_id))[0];
        selected_todo.completed = true;

        setTodos(todos.map((todo) => todo.id === parseInt(todo_id) ? { ...todo, completed: true } : todo));
    }

    const DeleteAllTodo = () => {
        setTodos(todos.filter(todo => !todo.deleted));
        setIsOpen(false);
    }


    return(
        <>
            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <div className="">
                    <h4 className="mb-2" style={{ color: '#333', margin: '0px' }}><i className="text-danger me-3 bi bi-exclamation-circle-fill"></i>Confirm Delete</h4>
                    <small style={{ color: '#333' }}>If you confirm, it will not recover the deleted todo list</small>
                </div>
                <button className="btn btn-danger" onClick={() => DeleteAllTodo()}>Confirm Delete</button>
            </Modal>
            <h1>{title}</h1> 
            <div className="todolist-container mt-5 d-flex align-items-center justify-content-center">
                <div className="border p-3 border rounded-3" style={{ width: '500px' }}>
                    <form onSubmit={ e => AddTodoList(e) } action="">
                        <div className="input-group mb-3 column-gap-0">
                            <input onChange={ e => setText(e.target.value) } value={ text } type="text" className="form-control border border-secondary" placeholder="What your target ?"></input>
                            <div className="input-group-append">
                                <button className="btn btn-secondary" type="submit" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="bi bi-arrow-down-circle-fill"></i></button>
                            </div>
                        </div>
                    </form>
                    <p className="text-start fst-italic"><small>Current Todo's</small></p>
                    { isNoTodo(todos.filter(todo => !todo.completed && !todo.deleted), 'Active Todo') }
                    <ul className="list-group todoLists row-gap-2 flex-column-reverse justify-content-end" >
                        {todos.filter(todo => !todo.completed && !todo.deleted).map(todo => <TodoItems data={todo} key={todo.id} id={todo.id} todo={todo.text} onDelete={ToggleRemoveList} onUpdate={TodoEditable} onCompleted={TodoCompleted} />)}
                    </ul>
                    <hr />
                    <p className="text-start fst-italic"><small>Completed Todo's</small></p>
                    { isNoTodo(todos.filter(todo => todo.completed && !todo.deleted), 'Completed Todo') }
                    <ul className="list-group todoLists completed row-gap-2 flex-column-reverse">
                        {todos.filter(todo => todo.completed && !todo.deleted).map(todo => <TodoItems data={todo} key={todo.id} id={todo.id} todo={todo.text} onDelete={ToggleRemoveList} onUpdate={TodoEditable} onCompleted={TodoCompleted} />)}
                    </ul>
                    <hr />
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <p className="text-start fst-italic mb-0"><small>Deleted Todo's</small></p>
                        <button className={`btn btn-danger btn-sm ${todos.filter(todo => todo.deleted).length === 0 ? 'd-none' : ''}`} style={{ fontSize: '11px' }} onClick={(e) => setIsOpen(true)}>Delete All</button>
                    </div>
                    { isNoTodo(todos.filter(todo => todo.deleted), 'Deleted Todo') }
                    <ul className="list-group todoLists completed row-gap-2 flex-column-reverse">
                        {todos.filter(todo => todo.deleted).map(todo => <TodoItems data={todo} key={todo.id} id={todo.id} todo={todo.text} onDelete={ToggleRemoveList} onUpdate={TodoEditable} onCompleted={TodoCompleted} />)}
                    </ul>
                </div>
            </div>
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
                width: '25em',
                padding: '30px 20px 20px 20px',
                zIndex: '990'
            }} className="shadow rounded-2 d-flex flex-column justify-content-between row-gap-4">
            {children}
            <button className='bg-transparent text-dark border-0' onClick={onClose} style={{ position: 'absolute', top: '0px', right: '0px' }}><i className="bi bi-x fs-4"></i></button>
        </div>,
        document.body
    );
}


function isNoTodo(data, text) {
    return(
        <>
        <div className="d-flex align-items-center flex-column justify-content-center" style={{ opacity: data.length ? '0' : '1', transition: 'all 0.3s ease-in-out', height: data.length ? '0px' : '10em' }}>
            <i className="bi bi-dash-circle-dotted fs-1 mb-3"></i>
            <p className="mb-0">No {text} yet</p>
        </div>
        </>
    );
}

function TodoItems({ data, id, todo, onDelete, onUpdate, onCompleted }) {
    const [toggleIcon, setToggleIcon] = useState(false);
    const [editable, setEditable] = useState(todo);

    const todoListsInput = {
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        color: '#333',
        borderRadius: '0px'
    };

    return(
        <>
        <li className={`list-group-item d-flex align-items-center justify-content-between p-0 border-0`} id={`${id}`}>
            <div className={`input-group column-gap-0 d-flex p-0 m-0`} style={{ borderRight: data.completed && !data.deleted ? '1px solid rgb(222, 226, 230)' : '', borderLeft: data.completed && !data.deleted ? '1px solid rgb(222, 226, 230)' : '' }}>
                <div className="input-group-append">
                    <button onClick={ (e) => onCompleted(e.currentTarget) } className={`btn btn-success ${data.deleted ? 'd-none': ''}`} type="button" style={{ borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }} disabled={ data.completed }><i className="bi bi-check-lg"></i></button>
                </div>
                <input onChange={ e => setEditable(e.target.value) } type="text" name="" value={ editable } 
                className={`form-control border-bottom
                    ${!toggleIcon ? `${!data.deleted ? 'border-0 border-top radius-0' : ''}` : `${!data.deleted ? 'border-1 border-top border-primary' : ''}`}` } placeholder="" style={ todoListsInput } disabled={ !toggleIcon } readOnly={ !toggleIcon } />
                <div className="input-group-append">
                    <button onClick={ e => {
                        setToggleIcon(!toggleIcon);
                        onUpdate(e.target, toggleIcon);
                    } } className={`btn btn-secondary ${ data.completed || data.deleted ? 'd-none' : '' }`} type="button" style={{ borderRadius: '0px' }}><i className={ !toggleIcon ? "bi bi-pencil": "bi bi-bookmark" }></i></button>
                    <button onClick={ (e) => onDelete(e.target) } className={`btn btn-danger ${ data.deleted ? 'd-none' : '' }`} type="button" style={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }}><i className="bi bi-trash"></i></button>
                </div>
            </div>
        </li>
        </>
    );
}

export { TodoListApp };