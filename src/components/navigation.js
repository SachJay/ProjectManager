import React from 'react';
import { Link } from "react-router-dom";

const Navigation = () => {
    return ( 
        <nav>
            <Link to="/backlog">Backlog   </Link>
            <Link to="/sprint">Sprint   </Link>
        </nav>
     );
}
 
export default Navigation;