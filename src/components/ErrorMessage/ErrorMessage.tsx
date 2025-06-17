import toast from "react-hot-toast";

export default function ErrorMessage() {
  toast.error("Error fetching images. Please try again later.");
  return null;
}
