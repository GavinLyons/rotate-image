import React, {useState} from 'react';

import DisplayImage from './Components/DisplayImage/DisplayImage';
import ImageSelection from './Components/ImageSelection/ImageSelection';
import Rotation from './Components/Rotation/Rotation';

import './App.css';

function App() {
  const [selecetedImage, setSelectedImage] = useState(null),
    [rotatedImage, setRotatedImage] = useState(null),
    [rotationTime, setRotationTime]= useState(0);

  const uploadedImage = (imageData) => {
    setSelectedImage(imageData);
    };

  const rotate = (angle) => {
    if(!uploadedImage){
      return alert('Please upload an image first');
    }
    
    try {
      const radians = parseFloat((angle * (Math.PI / 180).toFixed(2)));
    
      const performanceStart = performance.now(),
        rotateFunction = new rotateFunction(),
        result = rotateFunction.rotate(uploadedImage, radians),
        performanceEnd = performance.now();
    
      setRotatedImage(result);
    
      imageRotationTime(performanceEnd - performanceStart);
    } catch(error) {
      alert(error.message);
    }
    }
    
    const imageRotationTime = (time) => {
    setRotationTime(parseInt(time));
    };

  return (
    <div className="App">
      <h1>Image Rotate UI</h1>
      <ImageSelection uploadedImage={uploadedImage} />
      <Rotation rotate={rotate}></Rotation>
      <DisplayImage title="Uploaded Image" displayImage={selecetedImage} />
      <DisplayImage title="Rotated Image" subtitle={rotationTime > 0 ? '(Completion Time $(rotationTime) ms)' : ""} displayImage={rotatedImage} />  
    </div>
  );
}

export default App;
