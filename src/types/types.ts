export type ModalContentProps = {
  // success: boolean;
  // title: string;
  // bodyText?: string;
  handleClose: () => void;
  // handleSubmit?: () => void;
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
