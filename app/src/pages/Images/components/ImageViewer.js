const ImageViewer = ({ image }) => (
  <div id="image-container">
    <img
      class="rounded-t-lg min-h-450 select-none"
      draggable="false"
      src={process.env.REACT_APP_API_URL + image.url}
      alt={image.name}
    />
    {
      // draw exsisting annotations
      image.annotations?.map((annotation, id) => {
        const container = document.getElementById("image-container");
        const rect = container?.getBoundingClientRect() ?? {
          left: 288,
        }; // temp workaround to weird bug
        const style = {
          position: "absolute",
          left: (rect?.left || 0) + annotation.startX + "px",
          top: annotation.startY + "px", // (rect?.top || 0) + // not sure why this is too much?
          width: annotation.endX - annotation.startX,
          height: annotation.endY - annotation.startY,
          border: "2px solid red",
          overflow: "visible",
        };
        return (
          <div key={id} style={style}>
            <span>{annotation.type}</span>
          </div>
        );
      })
    }
  </div>
);

export default ImageViewer;
