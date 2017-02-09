import $ from 'jquery';
import 'jquery-circle-progress';

import React, {PropTypes} from 'react';

const Loader = ({loaderId, loaderValue, changeSingleLoaderState}) => {
    const loaderEl = $(".loader" + loaderId);
    if (loaderEl.length) {
        if (loaderValue == -1) {
            loaderEl.circleProgress({
                startAngle: 4.75,
                // startAngle: -Math.PI / 4 * 3,
                value: 0.0,
                lineCap: 'round',
                size: 35,
                fill: {color: '#ffa500'}
            });
        }

        if (loaderValue == 101) {
            // alert("Mission accomplished!");
            // Значение - 100, пауза, мигание зеленым и следом:
            // TODO тут генерится и диспатчится какой-то экшн дабы обновить документы секции
            changeSingleLoaderState(loaderId, -1);
        }

        if ((loaderValue > -1) && (loaderValue < 101)) {
            loaderEl.circleProgress('value', loaderValue);
        }
    }
    return (
        <div style={{marginTop: "2px"}} className={"loader loader" + loaderId}/>
    )
};

Loader.propTypes = {
    loaderValue: PropTypes.number.isRequired,
    loaderId: PropTypes.number.isRequired,
    changeSingleLoaderState: PropTypes.func.isRequired
};

export default Loader;