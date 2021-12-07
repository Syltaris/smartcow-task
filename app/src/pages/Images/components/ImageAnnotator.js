import { useState } from "react";
import ImageViewer from "./ImageViewer";

const ImageAnnotator = ({ image }) => {
  const [startCoord, setStartCoord] = useState({ x: 0, y: 0 });
  const [endCoord, setEndCoord] = useState({ x: 0, y: 0 });

  const [currentBox, setCurrentBox] = useState(null); // div element

  return (
    <div>
      <div
        id="canvas"
        draggable="false"
        style={{
          width: image.width,
          height: image.height,
          border: "5px solid cyan",
          position: "absolute",
          zIndex: 1,
        }}
      />
      <div
        style={{
          width: image.width,
          height: image.height,
          border: "2px solid purple",
          position: "absolute",
          zIndex: 2,
        }}
        draggable="false"
        onMouseDown={(e) => {
          var rect = e.target.getBoundingClientRect();
          const startCoord = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          };
          setStartCoord(startCoord);

          const box = document.createElement("div");
          box.style.left = startCoord.x + "px";
          box.style.top = startCoord.y + "px";
          box.style.position = "absolute";
          box.style.border = "2px solid red";

          const canvas = document.getElementById("canvas");
          canvas.appendChild(box);

          setCurrentBox(box);
        }}
        onMouseMove={(e) => {
          if (currentBox) {
            var rect = e.target.getBoundingClientRect();
            currentBox.style.width =
              e.clientX - startCoord.x - rect.left + "px";
            currentBox.style.height =
              e.clientY - startCoord.y - rect.top + "px";
            console.log(currentBox.style.width, currentBox.style.height);
          }
        }}
        onMouseUp={(e) => {
          var rect = e.target.getBoundingClientRect();
          const endCoord = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          };
          setEndCoord(endCoord);

          console.log("up", startCoord, endCoord);
          setCurrentBox(null);
          // draw?
          //   const canvas = document.getElementById("canvas");
          //   const box = document.createElement("div");
          //   box.style.left = startCoord.x + "px";
          //   box.style.top = startCoord.y + "px";

          //   box.style.width = endCoord.x - startCoord.x + "px";
          //   box.style.height = endCoord.y - startCoord.y + "px";
        }}
      />

      <ImageViewer image={image} />
    </div>
  );
};
export default ImageAnnotator;
