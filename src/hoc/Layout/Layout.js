import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import cn from 'classnames';

import styles from './layout.module.scss';

class Layout extends Component {
    render () {
        const { styles } = this.props;
        
        return (
            <main className={cn(styles['Content'])}>
                {this.props.children}
            </main>
        );
    };
}

export default CSSModules(Layout, styles);