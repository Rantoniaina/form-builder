import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import Card from '../components/card/card';
import Input from '../components/input/input';
import InputChoice from '../components/inputChoice/inputChoice';
import TextArea from '../components/textarea/textarea';
import { userStore } from '../stores/userStore';
import axios from 'axios';
import FormType from '../models/FormType';
import Button from '../components/button/button';

const CreateForms = () => {
  const userName = userStore((state) => state.userName);
  const router = useRouter();

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [titleHasError, setTitleHasError] = useState<boolean>(false);
  const [inputs, setInputs] = useState<FormType[] | undefined>(undefined);
  const [openInputChoice, setOpenInputChoice] = useState<boolean>(false);

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
    setOpenInputChoice(true);
  };

  const handleCloseInputChoice = () => {
    setOpenInputChoice(false);
  };

  useEffect(() => {
    if (userName === undefined || userName.length === 0) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            <form>
              <Input
                type="text"
                classStyle={`rounded p-2 ${
                  titleHasError ? 'border-red-500 border-2 mb-0' : 'mb-4'
                }`}
                onChange={handleChangeTitle}
                label="Title"
                error={titleHasError}
                errorMessage="Please enter a title"
              />
              <TextArea
                classStyle="rounded p-2 mb-4"
                onChange={handleChangeDescription}
                label="Description"
              />
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
              <div class="flex justify-evenly mt-4">
                <Button label="Create" type="submit" />
                <Button label="Cancel" type="button" />
              </div>
            </form>
          </div>
        }
      />
    </div>
  );
};

export default CreateForms;
