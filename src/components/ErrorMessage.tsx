import { ErrorMessageProps } from "../types/types";

// ErrorMessage Component
const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div data-testid="error-message" className="text-red-500 text-xs">
      {message}
    </div>
  );
};

export default ErrorMessage;
