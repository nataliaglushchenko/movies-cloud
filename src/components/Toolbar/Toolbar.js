import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Button } from 'reactstrap';

const propTypes = {
};

const defaultProps = {
};

function Toolbar(props) {  
    const {
        history
    } = props;
    

    const handleGoHomeClick = () => {
        history.push('/');
    };

    return (
        <div
            className={cn(
                'd-flex',
                'flex-row',
                'justify-content-start',
                'align-content-baseline',
            )}
        >
            <Button
                className={cn(
                    'text-left',
                    'col-2'
                )} 
                onClick={handleGoHomeClick}
                color="link"
            >
                HOME
            </Button>
        </div>
        
    );
}

Toolbar.propTypes = propTypes;
Toolbar.defaultProps = defaultProps;

export default Toolbar;