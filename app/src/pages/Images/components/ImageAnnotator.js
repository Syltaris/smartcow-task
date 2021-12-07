import { useState } from "react";
import ImageViewer from "./ImageViewer";

const SelectInput = (props) => {
  return (
    <select
      class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      {...props}
    >
      <option>Car</option>
      <option>Bus</option>
      <option>Auto-rickshaw</option>
      <option>Bike</option>
    </select>
  );
};

const ImageAnnotator = ({ image }) => {
  const [startCoord, setStartCoord] = useState({ x: 0, y: 0 });
  const [endCoord, setEndCoord] = useState({ x: 0, y: 0 });

  const [currentBox, setCurrentBox] = useState(null); // div element

  const [isDrawing, setIsDrawing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
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
          if (!showOptions) {
            setIsDrawing(true);
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
          }
        }}
        onMouseMove={(e) => {
          if (currentBox && isDrawing) {
            var rect = e.target.getBoundingClientRect();
            currentBox.style.width =
              e.clientX - startCoord.x - rect.left + "px";
            currentBox.style.height =
              e.clientY - startCoord.y - rect.top + "px";
          }
        }}
        onMouseUp={(e) => {
          setIsDrawing(false);
          var rect = e.target.getBoundingClientRect();
          const endCoord = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          };
          setEndCoord(endCoord);

          setShowOptions(true);
        }}
      >
        {showOptions && (
          <div
            id="annotations"
            hidden={!showOptions}
            class="flex flex-row"
            style={{
              display: showOptions ? "block" : "none",
              left: startCoord.x + "px",
              top:
                startCoord.y +
                Number(currentBox.style.height.slice(0, -2)) +
                5 + // offset
                "px",
              position: "absolute",
              zIndex: 4,
            }}
          >
            <SelectInput style={{ marginRight: 15 }} />
            <button
              type="button"
              class="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                // add annotation to image
                // clean up boxes
                // refactor this into shared cleanup
                setShowOptions(false);
                const canvas = document.getElementById("canvas");
                canvas.removeChild(currentBox);
                setCurrentBox(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
            <button
              type="button"
              class="text-white bg-red-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                // refactor this into shared cleanup
                setShowOptions(false);
                const canvas = document.getElementById("canvas");
                canvas.removeChild(currentBox);
                setCurrentBox(null);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
      </div>

      <ImageViewer image={image} />
    </div>
  );
};
export default ImageAnnotator;
