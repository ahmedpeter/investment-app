import React from 'react'
import { Link } from "react-router-dom";
import './builder.css'

function SidebarRow({Icon, title, path}) {
    return (
        <Link to={path} style={{ textDecoration: 'none' }}>
            <div className="sidebarRow">
                {Icon && <Icon />}
                <p className="sidebar__title"> {title} </p>
            </div>
        </Link>
        
    )
}

export default SidebarRow
