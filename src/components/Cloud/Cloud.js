import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { noop, uniq } from 'lodash';

import Tag from '../tag';

import './cloud.css';

const propTypes = {
    tags: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        type: PropTypes.string.isRequired,
        color: PropTypes.string,
        quantity: PropTypes.number.isRequired
    })).isRequired,
    onSelectItem: PropTypes.func.isRequired,
    selectedItem: PropTypes.string,
    onHoverItem: PropTypes.func,
    onMousOutItem: PropTypes.func
};

const defaultProps = {
    onHoverItem: noop,
    onMousOutItem: noop,
    selectedItem: ''
};

const INDEX_VALUE = 30;

function Cloud (props) {
    const { 
        tags,
        onSelectItem,
        selectedItem,
        onHoverItem,
        onMousOutItem,
        className
    } = props;

    const quantities = uniq(tags.map(t => t.quantity));
    const coefficient = INDEX_VALUE / Math.max(...quantities);

    const filteredTags = tags.filter(tag => tag.quantity !== 0);
    
    const items = filteredTags.map(item => (
        <Tag
            key={item.type}
            onClick={() => onSelectItem(item)}
            onHover={onHoverItem}
            onMousOut={onMousOutItem}
            padding={item.quantity * coefficient}
            backgroundColor={item.color}
            title={item.type}
            active={item.type === selectedItem}
        />
    ));

    return (
        <div className={cn(
            className, 
            'cloud',
            'my-2',
            'mx-5',
            'd-flex',
            'flex-wrap',
            'align-content-center',
            'justify-content-center',
            'align-items-center'
        )}>
            {items}
        </div>
    );
}

Cloud.propTypes = propTypes;
Cloud.defaultProps = defaultProps;

export default Cloud;
