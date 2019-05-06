import React from 'react';
import cn from 'classnames';
import CSSModules from 'react-css-modules';

import styles from './Tab.module.scss';

function Tab(props) {
    const { 
        styles, 
        title, 
        onClick,
        clicked
    } = props;

    return (
        <div className={cn(
            styles['Tab'],
            {
                [styles['Clicked']]: clicked
            }
        )} onClick={onClick}>
            {title}
        </div>
    );
}

export default CSSModules(Tab, styles);
