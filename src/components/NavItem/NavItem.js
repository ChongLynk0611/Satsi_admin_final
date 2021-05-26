import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

import './NavItem.css';

function NavItem(props) {
    const{item, isFocus, onClick} = props;

    return (
        <Link to={item.href} className={isFocus?`NavItem isFocus` : `NavItem`} onClick={onClick}>
            {item.icon}
            <span>{item.content}</span>
        </Link>
    )
}

NavItem.propTypes = {
    item: PropTypes.shape({
        icon: PropTypes.func,
        content: PropTypes.string
    }),
    isFocus: PropTypes.bool,
    onClick: PropTypes.func
}

export default NavItem

