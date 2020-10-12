import React, {useState} from 'react';

import DisplayImage from './Components/DisplayImage/DisplayImage';
import ImageSelection from './Components/ImageSelection/ImageSelection';

import './App.css';

function App() {
  const [selecetedImage, setSelectedImage] = useState(null);

  const uploadedImage = (imageData) => {
    setSelectedImage(imageData);
    };

  return (
    <div className="App">
      <h1>Image Rotate UI</h1>
      <ImageSelection uploadedImage={uploadedImage} />
      <DisplayImage title="Uploaded Image" displayImage={selecetedImage} />
    </div>
  );
}

export default App;
