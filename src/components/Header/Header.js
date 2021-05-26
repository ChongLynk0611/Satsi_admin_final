import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';

import './Header.css';

function Header(props) {
    const {menu} = props;

    return (
        <div className="Header">
            <ul>
                <li>
                    {
                        menu.map((item, index) => (
                            <Button 
                                href={item.href}
                                style={{color:"#fff"}}
                            >{item.content}</Button>
                        ))
                    }
                </li>
            </ul>
        </div>
    )
}

Header.propTypes = {

}

export default Header

