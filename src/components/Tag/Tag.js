import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CSSModules from 'react-css-modules';
import cn from 'classnames';
import noop from 'lodash/noop';

import styles from './Tag.module.scss';

const BACKGROUND_COLOR = {
    RED: 'red',
    BLUE: 'blue',
    ORANGE: 'orange',
    GREEN: 'green',
    YELLOW: 'yellow',
    NEUTRAL: 'neutral'
}

const propTypes = {
    onMouseOver: PropTypes.func,
    onClick: PropTypes.func,
    clicked: PropTypes.bool,
    padding: PropTypes.number,
    backgroundColor: PropTypes.oneOf(Object.values(BACKGROUND_COLOR)),
    children: PropTypes.string.isRequired,
    styles: PropTypes.object
};

const defaultProps = {
    onMouseOver: noop,
    onClick: noop,
    clicked: false,
    backgroundColor: BACKGROUND_COLOR.NEUTRAL,
    padding: 0
};

class Tag extends Component {
    render() {
        const {
            onMouseOver,
            onClick,
            clicked,
            styles,
            padding,
            backgroundColor,
            children
        } = this.props;
        return (
            <div 
                onMouseOver={onMouseOver}
                onClick={onClick}
                className={cn(
                    styles['Tag'],
                    {
                        [styles['Clicked']]: clicked
                    }
                )}
                style={{ padding: padding, backgroundColor: backgroundColor }}
            >
                {children}
            </div>
        );
    }
}

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default CSSModules(Tag, styles);