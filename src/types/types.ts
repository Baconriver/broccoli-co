export type ModalContentProps = {
  handleClose: () => void;
};

export type ErrorMessageProps = {
  message: string;
};

export type FormErrors = {
  fullName: string;
  email: string;
  confirmEmail: string;
};

export type FormValues = {
  fullName: string;
  email: string;
  confirmEmail: string;
};
