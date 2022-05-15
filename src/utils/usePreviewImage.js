import { useState, useEffect } from "react";

export const usePreviewImage = (stateobj) => {
  const [previewImage, setPreviewImage] = useState();
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    const selectedFile = stateobj;
    if (!selectedFile) {
      setPreviewImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewImage(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [stateobj]);

  return previewImage;
};
