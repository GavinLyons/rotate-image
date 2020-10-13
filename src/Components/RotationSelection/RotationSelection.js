import React, {useState} from 'react';

import './RotationSelection.css';

function RotationSelection({rotate}){
    const [angle, setAngle] = useState(0.0);

    const rotateImage = () => {
        rotate(angle);
    }

    return (
        <div className="RotationContainer">
            <div className="RotationAngle">
                <label>Angle: </label>
                <input type="number" name="angle" step="1" defaultValue="0" onChange={e => setAngle(e.target.value)} />
                <label> degrees</label>
            </div>
            <div className="RotationButton">
                <button onClick={rotateImage}>Apply Rotation</button>
            </div>
        </div>

    )
}

export default RotationSelection;