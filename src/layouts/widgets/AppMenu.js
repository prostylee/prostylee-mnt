import React from 'react';
import {AppSubmenu} from './AppSubmenu';

export const AppMenu = (props) => {
    return (
        <div className="layout-menu-container">
            <AppSubmenu items={props.model} className="layout-menu" onMenuItemClick={props.onMenuItemClick} root={true} />
        </div>
    );
}
