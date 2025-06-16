import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../../galery-api";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ImageModal from "../ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [altDescription, setAltDescription] = useState("");
  
  const onLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  }

  const onSearchResetImages = () => {
    setImages([]);
    setCurrentPage(1);
  }

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  
   const updateModalData = (src, alt) => {
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
        const data = await fetchImages(searchQuery, currentPage);
        // console.log("data", data);
        setTotalPages(data.total_pages);
        
        if (data.results.length === 0) {
          toast.error("No images found. Please try a different search term.");
          setLoading(false);
          return;
        }
        setImages((prevImages) => [...prevImages, ...data.results]);       
      } catch (error){
        setError(error);
        setSearchQuery("");        
        // toast.error("Error fetching images. Please try again later.");        
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // console.log("searchQuery", searchQuery);
    // console.log("currentPage", currentPage);
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
