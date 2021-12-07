import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getImages } from "../../services/api";

const Images = () => {
  const [images, setImages] = useState([]);

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
          {selectedImage && (
            <div>
              <img
                class="rounded-t-lg min-h-450 select-none"
                draggable="false"
                src={selectedImage.url}
                alt={selectedImage.name}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Images;
