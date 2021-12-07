const ImageViewer = ({ image }) => (
  <>
    <img
      class="rounded-t-lg min-h-450 select-none"
      draggable="false"
      src={image.url}
      alt={image.name}
    />
    {
      // draw exsisting annotations
      image.annotations?.map((annotation, id) => {
        console.log(annotation, "annotation");
        return (
          <div
            key={id}
            style={{
              position: "absolute",
              left: annotation.startX + "px",
              top: annotation.startY + "px",
              width: annotation.endX - annotation.startX + "px",
              height: annotation.endY - annotation.startY + "px",
              border: "2px solid red",
            }}
          >
            {annotation.type}
          </div>
        );
      })
    }
  </>
);

export default ImageViewer;
