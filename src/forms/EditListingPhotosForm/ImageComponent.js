import { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import React from 'react';

const EasyCrop = ({ image, setAllCropFeatures, others }) => {
  const [croppedImage, setCroppedImage] = useState(null);
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setAllCropFeatures(croppedAreaPixels, 'croppedAreaPixels');
  }, []);

  // const showCroppedImage = useCallback(async () => {
  //   try {
  //     const croppedImage = await getCroppedImg(
  //       image,
  //       croppedAreaPixels,
  //       rotation
  //     );
  //     console.log("donee", { croppedImage });
  //     setCroppedImage(croppedImage);
  //     onCropChange(croppedImage);
  //     console.log(croppedImage);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div>
      {/* <div
        className="container"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
      > */}
      {/* <div className="crop-container"> */}
      <Cropper
        image={image}
        crop={others?.crop || { x: 0, y: 0 }}
        rotation={others?.rotation || 0}
        zoom={others?.zoom || 1}
        zoomSpeed={4}
        maxZoom={3}
        zoomWithScroll={true}
        showGrid={true}
        aspect={4 / 3}
        onCropChange={data => setAllCropFeatures(data, 'crop')}
        onCropComplete={onCropComplete}
        onZoomChange={data => setAllCropFeatures(data, 'zoom')}
        onRotationChange={data => setAllCropFeatures(data, 'rotation')}
      />
      {/* </div> */}
      {/* </div> */}
      {/* <div className="cropped-image-container">
        {croppedImage && (
          <img className="cropped-image" src={croppedImage} alt="cropped" />
        )}
        {croppedImage && <button onClick={onClose}>close</button>}
      </div> */}
    </div>
  );
};

export default EasyCrop;
