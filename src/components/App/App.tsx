import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../../galery-api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "./App.types";
import { FetchDataResponse } from "./App.types";
import { string } from "yup";

export default function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [altDescription, setAltDescription] = useState<string>("");
  
  const onLoadMore = (): void => {
    setCurrentPage((prevPage: number) => prevPage + 1);
  }

  const onSearchResetImages = (): void => {
    setImages([]);
    setCurrentPage(1);
  }

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };
  
   const updateModalData = (src: string, alt: string): void => {
     setModalImage(src);
     setAltDescription(alt);
   };

  useEffect(() => {
    async function fetchData() {
      if (searchQuery === "") {
        return;
      }
      try {
        setError(null);
        setLoading(true);
        const data: FetchDataResponse = await fetchImages(searchQuery, currentPage);
        setTotalPages(data.total_pages);
        
        if (data.results.length === 0) {
          toast.error("No images found. Please try a different search term.");
          setLoading(false);
          return;
        }
        setImages((prevImages) => [...prevImages, ...data.results]);       
      } catch {
        setError("Error fetching data");
        setSearchQuery("");     
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [searchQuery, currentPage]);
  return (
    <div>
      <SearchBar onSubmit={setSearchQuery} onNewSearch={onSearchResetImages} />
      {error && <ErrorMessage />}
      {images.length > 0 && (
        <ImageGallery
          imagesData={images}
          openModal={openModal}
          updateModalData={updateModalData}
        />
      )}
      {loading && <Loader />}
      <Toaster position="top-right" />
      {images.length > 0 && currentPage < totalPages && (
        <LoadMoreBtn onLoadMore={onLoadMore} />
      )}
      <ImageModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        modalImage={modalImage}
        altDescription={altDescription}
      />
    </div>
  );
}
