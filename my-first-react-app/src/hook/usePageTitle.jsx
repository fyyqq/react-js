import { useEffect } from "react";


function PageTitle(title) {
    useEffect(() => {
        if (title) {
            document.title = title + " - ReactJS";
        }
    });
}

export default PageTitle;