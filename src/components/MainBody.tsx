import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import ModalContent from "./ModalContent";
import { MODAL_STYLES } from "../constants/constants";

// MainBody Component
const MainBody = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div
        data-testid="main-body"
        className="w-3/4 md:w-1/2 h-full flex flex-col justify-center align-middle mx-auto text-stone-500 gap-y-4 md:gap-y-8"
      >
        <span
          data-testid="main-body-title"
          className="text-center text-2xl md:text-6xl font-bold"
        >
          A better way to enjoy every day.
        </span>
        <span
          data-testid="main-body-subtitle"
          className="text-center text-sm md:text-xl"
        >
          Be the first to know when we launch.
        </span>
        <button
          data-testid="main-body-button"
          className="p-2 border-2 border-stone-500 w-40 md:w-48 mx-auto text-sm md:text-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-stone-500 hover:text-white duration-500 rounded"
          onClick={handleOpen}
        >
          Request an invite
        </button>
      </div>

      <Modal data-testid="register-modal" open={open} onClose={handleClose}>
        <Box sx={MODAL_STYLES}>
          <ModalContent handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
};

export default MainBody;
