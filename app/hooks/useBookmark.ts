import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface IUseBookmark {
    listingId: string;
    currentUser?: SafeUser | null;
}

const useBookmark = ({
    listingId, currentUser
}: IUseBookmark) => {
    const router = useRouter();

    const loginModal = useLoginModal();
  
    const hasFavorited = useMemo(() => {
      const list = currentUser?.favoriteIds || [];
  
      return list.includes(listingId);
    }, [currentUser, listingId]);
  
    const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
  
      if (!currentUser) {
        return loginModal.onOpen();
      }
  
      try {
        let request;
  
        if (hasFavorited) {
          request = () => axios.delete(`/api/bookmark/${listingId}`);
        } else {
          request = () => axios.post(`/api/bookmark/${listingId}`);
        }
  
        await request();
        router.refresh();
        toast.success('Success');
      } catch (error) {
        toast.error('Something went wrong.');
      }
    }, 
    [
      currentUser, 
      hasFavorited, 
      listingId, 
      loginModal,
      router
    ]);
  
    return {
      hasFavorited,
      toggleFavorite,
    }
}
export default useBookmark