import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
import {ImageGalleryProps } from "./ImageGallery.types";

export default function ImageGallery({ imagesData, openModal, updateModalData }:ImageGalleryProps)  {
  return (
    <ul className={css.gallery}>
      {imagesData.map((image) => (
        <li
          key={image.id}
          className={css.galleryItem}
          onClick={() => {
            updateModalData(image.urls.regular, image.alt_description);
            openModal();
          }}
        >
          <ImageCard image={image} />
        </li>
      ))}
    </ul>
  );
}
