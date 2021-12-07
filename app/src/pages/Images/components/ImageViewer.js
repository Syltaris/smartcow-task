const ImageViewer = ({ image }) => (
  <img
    class="rounded-t-lg min-h-450 select-none"
    draggable="false"
    src={image.url}
    alt={image.name}
  />
);

export default ImageViewer;
