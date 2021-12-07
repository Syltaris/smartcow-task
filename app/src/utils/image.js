const getImageDimensions = (image) => {
  return new Promise((res, rej) => {
    let x, y;

    const imageUrl = window.URL.createObjectURL(image);
    const img = new Image();
    img.src = imageUrl;

    img.onload = async () => {
      x = img.naturalWidth;
      y = img.naturalHeight;
      res([x, y]);
    };
  });
};

export { getImageDimensions };
