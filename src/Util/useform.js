import { useState, useEffect } from 'react';
export const useForm = ( 
  callback?: () => void,
validate?: any,
initialValues?: any,) => {
  const [inputValues, setInputValues] = useState(initialValues || {});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      if (callback) {
        callback();
      } else {
        return;
      }
    }
  }, [errors]);

  const onSubmitHandler = (event) => {
    if (event) {
      event.preventDefault();
    }
    setErrors(validate(inputValues));
    setIsSubmitting(true);
  };

  const onChangeHandler = (event) => {
    if (!event?.persist) {
      setInputValues((inputValues) => ({
        ...inputValues,
        [event?.name]: event?.value,
      }));
    } else {
      event?.persist();
      const target = event?.target;
      if (target?.name) {
        setInputValues((inputValues) => ({
          ...inputValues,
          [target.name]: target.value,
        }));
      }
    }
  };

  return {
    onChangeHandler,
    onSubmitHandler,
    inputValues,
    errors,
  };
};
