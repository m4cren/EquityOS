import { useState } from "react";

export type PopupControllerType = {
  isOpen: boolean;
  isClosing: boolean;
  handleOpen: () => void;
  handleClose: () => void;
};
export const usePopupController = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isClosing, setIsClosing] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      setIsOpen(false);
    }, 95);
  };

  return {
    isOpen,
    isClosing,
    handleClose,
    handleOpen,
  } as PopupControllerType;
};
