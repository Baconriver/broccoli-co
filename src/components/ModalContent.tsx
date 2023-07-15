import { FormErrors, FormValues, ModalContentProps } from "../types/types";
import { Input, Spinner } from "@material-tailwind/react";
import ErrorMessage from "./ErrorMessage";
import { useState } from "react";
import { useFormik } from "formik";
import { API_URL } from "../constants/constants";

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values: FormValues) => {
  const errors = {} as FormErrors;
  if (!values.fullName) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.length > 35) {
    errors.fullName = "Must be 35 characters or less";
  } else if (values.fullName.length < 3) {
    errors.fullName = "Must be at least 3 characters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.confirmEmail) {
    errors.confirmEmail = "Confirm email is required";
  } else if (values.email !== values.confirmEmail) {
    errors.confirmEmail = "Confirm email is not the same";
  }

  return errors;
};

// ModalContent Component
const ModalContent = ({ handleClose }: ModalContentProps) => {
  const [serverError, setServerError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const title = success ? " All done!" : "Request an invite";

  // Register via API
  const registerInvites = async (values: FormValues) => {
    const data = {
      name: values.fullName,
      email: values.email,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };

    const response = await fetch(API_URL, options);

    return response;
  };

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      confirmEmail: "",
    },
    validate,
    onSubmit: async (values: FormValues) => {
      setIsProcessing(true);

      try {
        const response = await registerInvites(values);

        if (response.status === 200) {
          setSuccess(true);
          setIsProcessing(false);
        } else if (response.status === 400) {
          const message = await response.json();
          setIsProcessing(false);
          setServerError(message.errorMessage);
        }
      } catch (err) {
        setServerError("Something is going wrong!");
        throw new Error("Something is going wrong!");
      }
    },
  });

  const closeModal = () => {
    handleClose();
    setSuccess(false);
  };

  return (
    <div className="flex flex-col text-stone-500">
      <span className="text-center text-2xl italic font-bold mb-4">
        {title}
      </span>
      <hr className="w-10 mx-auto border-stone-500 border-t-2" />
      {success ? (
        <>
          <span className="text-center my-10">
            You will be one of the first to experience Broccoli & Co. when we
            launch.
          </span>
          <button
            className="p-1 border-2 border-stone-500 w-full mx-auto text-sm md:text-lg transition ease-in-out delay-75 hover:bg-stone-500 hover:text-white duration-300 rounded font-bold"
            onClick={closeModal}
          >
            OK
          </button>
        </>
      ) : (
        <>
          <form className="w-full mb-4" onSubmit={formik.handleSubmit}>
            <div className="my-10 flex flex-col gap-4">
              <Input
                id="fullName"
                size="lg"
                label="Full Name"
                color="brown"
                {...formik.getFieldProps("fullName")}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <ErrorMessage message={formik.errors.fullName} />
              ) : null}
              <Input
                id="email"
                type="email"
                size="lg"
                label="Email"
                color="brown"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <ErrorMessage message={formik.errors.email} />
              ) : null}
              <Input
                id="confirmEmail"
                type="email"
                size="lg"
                label="Confirm Email"
                color="brown"
                {...formik.getFieldProps("confirmEmail")}
              />
              {formik.touched.confirmEmail && formik.errors.confirmEmail ? (
                <ErrorMessage message={formik.errors.confirmEmail} />
              ) : null}
            </div>
            <button
              className="p-1 border-2 border-stone-500 w-full mx-auto text-lg transition ease-in-out delay-75 hover:bg-stone-500 hover:text-white duration-300 rounded-md font-bold"
              type="submit"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex flex-row items-center align-middle justify-center gap-x-2">
                  <Spinner
                    className="text-stone-200 hover:text-white"
                    color="brown"
                  />
                  Processing...
                </div>
              ) : (
                <span>Register</span>
              )}
            </button>
          </form>
          {serverError && <ErrorMessage message={serverError} />}
        </>
      )}
    </div>
  );
};

export default ModalContent;
