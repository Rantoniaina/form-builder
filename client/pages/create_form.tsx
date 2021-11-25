import { useRouter } from 'next/router';
import { ChangeEvent, FormEvent, useEffect, useState, MouseEvent } from 'react';
import Card from '../components/card/card';
import Input from '../components/input/input';
import InputChoice from '../components/inputChoice/inputChoice';
import TextArea from '../components/textarea/textarea';
import { userStore } from '../stores/userStore';
import axios from 'axios';
import FormType from '../models/FormType';
import Button from '../components/button/button';
import { formElementStore } from '../stores/formElementStore';
import FormElementCmp from '../components/formElement/formElement';

const CreateForms = () => {
  const router = useRouter();
  const formElements = formElementStore((state) => state.formElements);

  const userName = userStore((state) => state.userName);
  const userNameRemoveFn = userStore((state) => state.removeUserName);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [titleHasError, setTitleHasError] = useState<boolean>(false);
  const [inputs, setInputs] = useState<FormType[] | undefined>(undefined);
  const [openInputChoice, setOpenInputChoice] = useState<boolean>(false);
  const [inputsHasError, setInputsHasError] = useState<boolean>(false);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (titleHasError) {
      setTitleHasError(false);
    }
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const handleOpenInputChoice = () => {
    setInputsHasError(false);
    setOpenInputChoice(true);
  };

  const handleCloseInputChoice = () => {
    setOpenInputChoice(false);
  };

  const handleCancel = () => {
    userNameRemoveFn();
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    let hasError = false;
    if (title === undefined || title.length === 0) {
      hasError = true;
      setTitleHasError(true);
    }
    if (formElements === undefined || formElements.length === 0) {
      hasError = true;
      setInputsHasError(true);
    }
  };

  useEffect(() => {
    if (userName === undefined || userName.length === 0) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userName]);

  useEffect(() => {
    if (process.env.BACKEND_URL) {
      axios.get(`${process.env.BACKEND_URL}/form-types`).then((response) => {
        if (
          response &&
          response.data &&
          response.data.formTypes &&
          response.data.formTypes.length > 0
        ) {
          setInputs(response.data.formTypes);
        }
      });
    }
  }, []);

  return (
    <div class="flex flex-col items-center h-screen justify-center bg-blue-100">
      <Card
        content={
          <div class="flex flex-col items-center">
            <h1 class="mb-2">CREATE FORM</h1>
            <form noValidate onClick={handleSubmit}>
              <Input
                type="text"
                classStyle={`rounded p-2 ${
                  titleHasError ? 'border-red-500 border-2 mb-0' : 'mb-4'
                }`}
                onChange={handleChangeTitle}
                label="Title"
                error={titleHasError}
                errorMessage="Please enter a title"
                value={title}
              />
              <TextArea
                classStyle="rounded p-2 mb-4"
                onChange={handleChangeDescription}
                label="Description"
                value={description}
              />
              {formElements &&
                formElements.map((formElement, index) => (
                  <FormElementCmp formElement={formElement} key={index} />
                ))}
              {inputs && (
                <>
                  {openInputChoice && (
                    <InputChoice
                      inputs={inputs}
                      closeInputChoice={handleCloseInputChoice}
                    />
                  )}
                  {!openInputChoice && (
                    <div
                      class="flex flex-col items-center justify-center text-2xl border-indigo-900	p-2 rounded border-dashed border mt-4 hover:bg-gray-300 cursor-pointer"
                      onClick={handleOpenInputChoice}
                    >
                      +
                    </div>
                  )}
                </>
              )}
              {inputsHasError && (
                <span class="text-xs text-red-500 mb-4">
                  Please select an input
                </span>
              )}
              <div class="flex justify-evenly mt-4">
                <Button label="Create" type="submit" onClick={handleSubmit} />
                <Button label="Cancel" type="button" onClick={handleCancel} />
              </div>
            </form>
          </div>
        }
      />
    </div>
  );
};

export default CreateForms;
