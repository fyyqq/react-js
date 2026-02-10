import PageTitle from "../hook/usePageTitle";
// import { Helmet } from "react-helmet-async";
import myImage from '../../src/assets/images/todo-list.png';


function ShowProjects({ title }) {
    PageTitle(title);
    return(
        <>
            <h1>{title}</h1>
            <div className="row mt-5 row-gap-4">
                <div className="col-lg-4 col-sm-6 col-12">
                    <div className="card p-0" style={{ width: '100%' }}>
                        <img src={myImage} alt="" />
                        <div className="card-body p-5 pt-3">
                            <h4 className="card-title">Todo List App</h4>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                            <a href="/projects/todo-list-app" className="btn btn-primary px-4">See Project</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export { ShowProjects };