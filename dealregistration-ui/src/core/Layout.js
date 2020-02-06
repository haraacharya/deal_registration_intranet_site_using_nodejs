import React from "react";
import Menu from "./Menu";

const Layout = ({title = "Title", description= "Description", classname, children}) => {
    return (
        <div>
            <Menu />
            <div className="jumbotron">
                <h2>{ title }</h2>
                <p className="lead">{ description }</p>
            </div>
            <div className={classname}>{ children }</div>  
        </div>
    )
}

export default Layout;