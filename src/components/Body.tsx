import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Input, Spinner } from "@material-tailwind/react";
import { useFormik } from "formik";
import { FormErrors, FormValues } from "../constant/types";
import { API_URL } from "../constant/constants";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

// A custom validation function. This must return an object
// which keys are symmetrical to our values/initialValues
const validate = (values: FormValues) => {
  const errors = {} as FormErrors;
  if (!values.fullName) {
    errors.fullName = "Full name is required";
  } else if (values.fullName.length > 35) {
    errors.fullName = "Must be 35 characters or less";
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

const Body = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSuccess(false);
  };
  const [serverError, setServerError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

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
      try {
        setIsProcessing(true);
        const message = await registerInvites(values);
        if (message === "Registered") {
          setSuccess(true);
          setIsProcessing(false);
        }
      } catch (err: any) {
        setServerError(err);
      }
    },
  });

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

    return response.json();
  };

  return (
    <>
      <div className="w-1/2 h-full flex flex-col justify-center align-middle mx-auto text-stone-500 gap-y-4">
        <span className="text-center text-xl md:text-6xl font-bold">
          A better way to enjoy every day.
        </span>
        <span className="text-center text-sm md:text-xl">
          Be the first to know when we launch.
        </span>
        <button
          className="p-2 border-2 border-stone-500 w-32 md:w-48 mx-auto text-sm md:text-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:bg-stone-500 hover:text-white duration-500 rounded"
          onClick={handleOpen}
        >
          Request an invite
        </button>
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {success ? (
            <div className="flex flex-col text-stone-500">
              <span className="text-center text-2xl italic font-bold pb-2 border-b-2">
                All done!
              </span>
              <span className="text-center my-10">
                You will be one of the first to experience Broccoli & Co. when
                we launch.
              </span>
              <button
                className="p-1 border-2 border-stone-500 w-full mx-auto text-sm md:text-lg transition ease-in-out delay-75 hover:bg-stone-500 hover:text-white duration-300 rounded font-bold"
                onClick={handleClose}
              >
                OK
              </button>
            </div>
          ) : (
            <div className="flex flex-col text-stone-500">
              <span className="text-center text-2xl italic font-bold pb-2 border-b-2">
                Request an invite
              </span>
              <form className="w-full mb-4" onSubmit={formik.handleSubmit}>
                <div className="my-10 flex flex-col gap-4">
                  <Input
                    id="fullName"
                    name="fullName"
                    size="lg"
                    label="Full Name"
                    color="brown"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fullName}
                  />
                  {formik.touched.fullName && formik.errors.fullName ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.fullName}
                    </div>
                  ) : null}
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    size="lg"
                    label="Email"
                    color="brown"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.email}
                    </div>
                  ) : null}
                  <Input
                    id="confirmEmail"
                    name="confirmEmail"
                    type="email"
                    size="lg"
                    label="Confirm Email"
                    color="brown"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmEmail}
                  />
                  {formik.touched.confirmEmail && formik.errors.confirmEmail ? (
                    <div className="text-red-500 text-xs">
                      {formik.errors.confirmEmail}
                    </div>
                  ) : null}
                </div>
                <button
                  className="p-1 border-2 border-stone-500 w-full mx-auto text-sm md:text-lg transition ease-in-out delay-75 hover:bg-stone-500 hover:text-white duration-300 rounded-md font-bold"
                  type="submit"
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
              {serverError && (
                <div className="text-red-500 text-xs text-center">
                  {serverError}
                </div>
              )}
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default Body;
