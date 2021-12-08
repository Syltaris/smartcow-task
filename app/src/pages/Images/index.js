import { useState, useEffect } from "react";
import CsvDownloader from "react-csv-downloader";
import { Link, useParams } from "react-router-dom";
import { getImages } from "../../services/api";
import ImageAnnotator from "./components/ImageAnnotator";

import ImageViewer from "./components/ImageViewer";

const Images = () => {
  const [images, setImages] = useState([]);
  const [annotateMode, setAnnotateMode] = useState(false);

  async function fetchImages() {
    const response = await getImages();
    setImages(response);
  }
  useEffect(() => fetchImages(), []); // TODO: should depend on auth token, or user identifier

  const { id } = useParams();
  // TODO: should just fetch directly, but good enough for now
  const selectedImage = images.find((image) => {
    return image.id === Number(id);
  });

  return (
    <>
      <div class="relative bg-white dark:bg-gray-800">
        <div class="flex flex-col sm:flex-row ">
          {/* Sidebar */}
          <div class="w-72 h-screen">
            <nav class="mt-10 px-6 ">
              <h1 class="py-4 ml-3 text-xl">Images</h1>

              {images.map((image) => (
                <Link
                  key={image.id}
                  class="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg "
                  to={`/images/${image.id}`}
                >
                  <span class="mx-4 text-lg font-normal">{image.name}</span>
                  <span class="flex-grow text-right"></span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Image Viewer */}
          <div class="flex flex-col">
            {selectedImage && (
              <>
                <div>
                  {annotateMode ? (
                    <ImageAnnotator
                      image={selectedImage}
                      onAnnotationAdded={() => fetchImages()}
                    />
                  ) : (
                    <ImageViewer image={selectedImage} />
                  )}
                </div>
                <button
                  type="button"
                  class="py-2 px-4 m-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => {
                    setAnnotateMode(!annotateMode);
                  }}
                >
                  {annotateMode ? "Done" : "Annotate"}
                </button>
                <Link
                  class="py-2 px-4 m-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  to={`/projects/${selectedImage.projectId}`}
                >
                  <span class="mx-4 text-lg font-normal">Go to Project</span>
                  <span class="flex-grow text-right"></span>
                </Link>
                {!annotateMode && (
                  <CsvDownloader
                    class="py-2 px-4 m-2 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                    filename={`${selectedImage.name}.annotations`}
                    extension=".csv"
                    seperator=","
                    columns={[
                      "name",
                      "startX",
                      "startY",
                      "endX",
                      "endY",
                      "label",
                    ]}
                    datas={selectedImage.annotations.map((annotation) => {
                      return {
                        name: selectedImage.name,
                        startX: annotation.startX,
                        startY: annotation.startY,
                        endX: annotation.endX,
                        endY: annotation.endY,
                        label: annotation.type,
                      };
                    })}
                    text="Download CSV"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Images;
