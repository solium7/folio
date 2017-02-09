import React, {PropTypes} from 'react';

const TopPoints = ({validPoints}) => {
    return (
        <div className="points-block">
            <p className="invariant">Предварительные баллы инвариантной части: &nbsp;<span>{validPoints.invariant}</span></p>
            <p className="variant">Предварительные баллы вариативной части: &nbsp;<span>{validPoints.variant}</span></p>
        </div>)
};

TopPoints.propTypes = {
    validPoints: PropTypes.object.isRequired
};

export default TopPoints;