import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CSSModules from 'react-css-modules';
import cn from 'classnames';

import CloudStyles from './cloud.module.scss';

const propTypes = {
    children: PropTypes.arrayOf(PropTypes.node),
    styles: PropTypes.object
};

const defaultProps = {
    children: []
};

class Cloud extends Component {
    render() {
        const { children, styles } = this.props;

        return (
            <div className={cn(styles['Cloud'])}>
                {children}
            </div>
        );
    }
}

Cloud.propTypes = propTypes;
Cloud.defaultProps = defaultProps;

export default CSSModules(Cloud, CloudStyles);
