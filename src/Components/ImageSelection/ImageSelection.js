import React, { useState, useCallback} from 'react';

import './ImageSelection.css';

function ImageSelection({uploadedImage}){
    const [canvas, setCanvas] = useState(null),
        setCanvasReference = useCallback(canvas => {
            setCanvas(canvas);
        }, []);

    const imageUploaded = event => {
        if (event.target.files.length === 0){
            return;
        }

        const image = new Image();
        image.src = window.URL.createObjectURL(event.target.files[0])
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            canvas.getContext('2d').drawImage(image, 0, 0);
        }

        const imageData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);

        uploadedImage(imageData);
    }

    return (
        <div className="ImageSelectionContainer">
            <label>File: </label>
            <input type="file" name="image" accept="image/*" onChange={imageUploaded} />
            <canvas className="ImageSelectionCanvas" ref={setCanvasReference} />
        </div>

    )
}

export default ImageSelection;