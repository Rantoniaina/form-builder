import { useRouter } from 'next/router';
import { ChangeEvent, useEffect, useState } from 'react';
import Card from '../components/card/card';
import Input from '../components/input/input';
import TextArea from '../components/textarea/textarea';
import { userStore } from '../stores/userStore';

const CreateForms = () => {
  const userName = userStore((state) => state.userName);
  const router = useRouter();

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [titleHasError, setTitleHasError] = useState<boolean>(false);

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (titleHasError) {
      setTitleHasError(false);
    }
    setTitle(e.target.value);
  };

  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  useEffect(() => {
    if (userName === undefined || userName.length === 0) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class="flex flex-col items-center h-screen justify-center bg-blue-100">
      <Card
        content={
          <div>
            <h1 class="mb-2">Create form</h1>
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
            </form>
          </div>
        }
      />
    </div>
  );
};

export default CreateForms;
