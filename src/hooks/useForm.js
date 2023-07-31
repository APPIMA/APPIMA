import { useState } from "react";

const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ name, value }) => {
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    formState,
    ...formState,
    onInputChange,
    onResetForm,
  };
};

export default useForm;
