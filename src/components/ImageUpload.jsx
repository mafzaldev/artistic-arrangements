import React, { useRef, useState, useEffect } from "react";

import "./ImageUpload.css";

const ImageUpload = (props) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;

    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div
        className="image-upload__preview"
        style={{
          border: !isValid ? "2.5px dashed #ccc" : "none",
        }}
        onClick={pickImageHandler}
      >
        {previewUrl && <img src={previewUrl} alt="Preview" />}
        {!previewUrl && (
          <p>
            <span className="add-sign">+</span>
            Click here to pick an image from your computer.
          </p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
