import React from 'react';
import cn from 'classnames';
import CSSModules from 'react-css-modules';

import Tab from './tab';
import styles from './toolbar.module.scss';

function Toolbar(props) {  
    const { styles, tabs } = props;

    const toolbar = tabs.map(tab => {        
        return (
            <Tab 
                key={tab.title} 
                title={tab.title}
                clicked={tab.clicked}
                onClick={tab.onClick} 
            />
        );
    });

    return (
        <nav className={cn(styles['Toolbar'])}>
            {toolbar}
        </nav>
    );
}

export default CSSModules(Toolbar, styles);