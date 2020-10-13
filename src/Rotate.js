const TWO_PI = Math.PI * 2.0,
    HALF_PI = Math.PI / 2.0;

class RotateImage{

    /*
    * rotatePoint (Private)
    * 
    * This method takes a point and translate it to the given center,
    * rotates on the given angle and translates back from the center
    *
    */

    _rotatePoint(pointX, pointY, centerX, centerY, sinAngle, cosAngle){
        pointX -= centerX;
        pointY -= centerY;

        const rotatedX = (pointX * cosAngle) - (pointY * sinAngle),
            rotatedY = (pointY * cosAngle) + (pointX * sinAngle);

        pointX = rotatedX + centerX;
        pointY = rotatedY + centerY;

        return{x: Math.round(pointX), y: Math.round(pointY)};
    }

    /*
    * calculatedDimensions (Private)
    * 
    * This method calculates the new dimensions of the rectangle
    * after the image has been rotated.
    *
    */

    _calculatedDimensions(width, height, angle){
        const sinValueForAngle = Math.sin(angle),
            sinValueForAngleSupplement = Math.sin(HALF_PI - angle);

        const w = Math.round((width * Math.abs(sinValueForAngleSupplement)) + (height * Math.abs(sinValueForAngle)));
        const h = Math.round((height * Math.abs(sinValueForAngleSupplement)) + (width * Math.abs(sinValueForAngle)));

        return {width: w, height: h};
    }

    /*
    * rotate (Private)
    * 
    * This method takes an array of data, width and height of the image
    * and an angle of rotation to apply to the image.
    * 
    * Calculates the dimensions of the rotated image based on requested angle.
    * 
    * Sequentially reads the source image data, maps every 4 blocks to a pixel
    * location, rotates it and then maps the image data to the target location
    *
    */

    _rotate(data, width, height, angle){
        const targetDimensions = this._calculatedDimensions(width, height, angle),
            deltaX = Math.round((targetDimensions.width - width) / 2.0),
            deltaY = Math.round((targetDimensions.height - height) / 2.0),
            targetLineWidth = targetDimensions.width * 4,
            targetData = new Uint8ClampedArray(targetLineWidth * targetDimensions.height);

        const centerX = Math.trunc(width / 2),
            centerY = Math.trunc(height / 2),
            sinValueForAngle = Math.sin(angle),
            cosValueForAngle = Math.cos(angle);

        const sourceLineWidth = width * 4;

        let row = 0;

        for(let i = 0, l = sourceLineWidth * height; i < l;) {
            const x = Math.round((i % sourceLineWidth) / 4),
            y = row;

            const rotatedPoint = this._rotatePoint(x, y, centerX, centerY, sinValueForAngle, cosValueForAngle);
            rotatedPoint.x += deltaX;
            rotatedPoint.y += deltaY;

            if(rotatedPoint.x >= 0 && 
                rotatedPoint.x < targetDimensions.width && 
                rotatedPoint.y >= 0 &&
                rotatedPoint.y < targetDimensions.height) {
                    const target = (rotatedPoint.y * targetLineWidth) + (rotatedPoint.x * 4);

                    targetData[target] = data[i];
                    targetData[target + 1] = data[i + 1];
                    targetData[target + 2] = data[i + 2];
                    targetData[target + 3] = data[i + 3];
                }

            i += 4;

            if(i % sourceLineWidth === 0) {
                row++;
            }
        }

        return { data: targetData, width: targetDimensions.width, height: targetDimensions.height };
    }

    /*
    * RotateFunction (Public)
    * 
    * This method takes an Image object and an angle.
    * Verifies the arguments are valid.
    * If valid, calls internal method to rotate image.
    * Returns rotated image and dimensions as new Image object.
    *
    */

    rotateFunction(image, angle) {
        if(typeof image !== 'object' || 
            !image.data ||
            !image.width ||
            !image.height){
                throw new Error('Invalid Image provided');
        }

        const dataPixelCount = image.data.length / 4.0,
            pixelCount = image.width * image.height;

        if(dataPixelCount !== pixelCount){
            throw new Error('Image data and dimensions do not match');
        }

        if(typeof angle !== 'number'){
            throw new Error('Angle must be a number');
        }

        const roundAngleValue = parseFloat(angle.toFixed(2));

        if(Math.abs(roundAngleValue) % TWO_PI === 0.00){
            return image;
        }

        const {data, width, height} = image,
            result = this._rotate(data, width, height, angle);

        return new ImageData(Uint8ClampedArray.from(result.data), result.width, result.height);
    }
}
export default RotateImage;