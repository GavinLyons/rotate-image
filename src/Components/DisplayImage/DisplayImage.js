import React, { useCallback, useEffect, useState} from 'react';

import './DisplayImage.css';

function DisplayImage({title, subtitle, displayImage}){
    const [canvas, setCanvas] = useState(null),
        setCanvasReference = useCallback(canvas => {
            setCanvas(canvas);
        }, []);

    useEffect(() => {
        if(canvas !== null & displayImage !== null){
            canvas.getContext('2d').putImageData(displayImage, 0, 0)
        }
    }, [canvas, displayImage])

    return displayImage === undefined || displayImage === null ? null : (
        <div className="DisplayImageContainer">
            <h3>{title} <span>{subtitle}</span></h3>
            <p>{displayImage.width}px by {displayImage.height}px</p>
            <canvas className="DisplayImageCanvas" ref={setCanvasReference} width={displayImage.width} height={displayImage.height} />
        </div>
    );
}

export default DisplayImage;