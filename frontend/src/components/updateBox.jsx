import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function UpdateBox (props) {

    const location = useLocation();
    console.log(location.pathname);
    console.log(props.items);


    return (
        <div id='update-box'>
            <div id='update-box-header'>
                {props.title}
            </div>
            <div id='update-box-list'>
            {props.items && props.items.map((item, index) =>
                    <ul key={index}>
                        {item}
                    </ul>
            )}
            </div>
        </div>
    )

}

export default UpdateBox;