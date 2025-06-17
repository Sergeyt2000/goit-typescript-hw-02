import { Image } from "../App/App.types";

export interface ImageGalleryProps {
  imagesData: Image[];
  openModal: () => void;
  updateModalData: (src: string, alt: string) => void;
}
