import { loadUserGallery} from "../../firebase.js";
import { useAuth } from "../../AuthContext.jsx";
import { useEffect, useState } from "react";

const Gallery = () => {
  //Get user details
  const { user } = useAuth();

  //Stores list of images taken by user
  const [galleryData, setGalleryData] = useState([]);

  // Gets the list of images
  useEffect(() => {
    async function loadAllImages() {
      const result = await loadUserGallery(user);
      if (result) {
        setGalleryData(result);
      }
    }
    loadAllImages();
  }, [user]);

  // Defines the image size displayed on the gallery, for design purposes
  let counter = 0;

  return (
    <section>
        <div className="text-4xl text-white font-black mb-5 mt-20 flex items-center">
          <p>My</p>
          <p className="bg-orange pt-1 pb-2 px-2 rounded-xl ml-2">Gallery</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-2 lg:my-7">
          {galleryData.map((image, index) => {
              if (counter === 2) {
              counter = 0;
              return (
                  <div key={index} className="col-span-2 row-span-2">
                  <img className="rounded-xl object-cover w-full h-full" src={image} alt="gallery" />
                  </div>
              );
              } else {
              counter++;
              return (
                  <div key={index} className="col-span-1 row-span-1">
                  <img className="rounded-xl object-cover w-full h-full" src={image} alt="gallery" />
                  </div>
              );
              }
          })}
        </div>
    </section>
  );
};

export default Gallery;
