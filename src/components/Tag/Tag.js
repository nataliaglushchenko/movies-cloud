import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import noop from 'lodash/noop';
import { Button } from 'reactstrap';

import { RULE_COLORS } from '../../boundedContexts/app/models/ruleColors';
import COLORS_MAP from '../../boundedContexts/app/models/colorMappings';

const propTypes = {
    onHover: PropTypes.func,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool,
    padding: PropTypes.number,
    backgroundColor: PropTypes.string,
    title: PropTypes.string.isRequired
};

const defaultProps = {
    onHover: noop,
    active: false,
    backgroundColor: RULE_COLORS.NEUTRAL,
    padding: 0
};

function Tag (props) {
    const {
        onHover,
        onMouseOut,
        onClick,
        active,
        padding,
        backgroundColor,
        title
    } = props;

    const color = COLORS_MAP[backgroundColor];
    
    return (
        <Button 
            onMouseOver={() => onHover(title)}
            onMouseOut={onMouseOut}
            onClick={onClick}
            className={cn(
                'm-2'
            )}
            color={color}
            active={active}
            style={{ 
                padding: padding
            }}
        >
            {title}
        </Button>
    );
}

Tag.propTypes = propTypes;
Tag.defaultProps = defaultProps;

export default Tag;