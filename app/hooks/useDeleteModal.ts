import { create } from "zustand";

interface useDeleteModalProps  {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useDeleteModal = create<useDeleteModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false})
}));

export default useDeleteModal;