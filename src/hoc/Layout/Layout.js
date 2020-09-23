import React from 'react';
import cn from 'classnames';

import Toolbar from '../../components/toolbar';

function Layout(props) {
    const { children } = props;

    return (
        <main 
            className={cn(
                'px-5',
                'py-3'
            )}
        >
            <Toolbar />
            {children}
        </main>
    );
}

export default Layout;