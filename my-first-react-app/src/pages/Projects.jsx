import PageTitle from "../hook/usePageTitle";
// import { Helmet } from "react-helmet-async";

function ShowProjects({ title }) {
    PageTitle(title);
    return(
        <>
            {/* <Helmet> */}
                {/* <title>{title}</title> */}
                <h1>{title}</h1>
            {/* </Helmet> */}
        </>
    );
}

export { ShowProjects };