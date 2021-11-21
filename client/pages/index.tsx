import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import Button from '../components/button/button';
import Card from '../components/card/card';
import { userStore } from '../stores/userStore';
import { useRouter } from 'next/router';
import Input from '../components/input/input';

const Home = () => {
  const [name, setName] = useState<string | undefined>(undefined);
  const [nameHasError, setNameHasError] = useState<boolean>(false);

  const setUserName = userStore((state) => state.setUserName);
  const router = useRouter();

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    if (nameHasError) {
      setNameHasError(false);
    }
    setName(e.target.value);
  };

  const handleSubmit = (
    e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (name === undefined || name.length === 0) {
      setNameHasError(true);
    } else {
      setUserName(name);
      router.push('/create_form');
    }
  };

  return (
    <div class="flex flex-col items-center h-screen justify-center bg-blue-100">
      <Card
        content={
          <div class="flex flex-col items-center">
            <form
              class="flex flex-col items-center"
              noValidate
              onSubmit={handleSubmit}
            >
              <label class="font-sans">Enter your name:</label>
              <div class="flex flex-col">
                <Input
                  type="text"
                  classStyle={`rounded p-2 ${
                    nameHasError ? 'border-red-500 border-2 mb-0' : 'mb-4'
                  }`}
                  onChange={handleChangeName}
                />
                {nameHasError && (
                  <span class="text-xs text-red-500 mb-4">
                    Please enter your name
                  </span>
                )}
              </div>
              <Button
                type="submit"
                label="Create my form"
                onClick={handleSubmit}
              />
            </form>
            <a href="#" class="underline text-xs text-gray-400">
              Visit existing forms
            </a>
          </div>
        }
      />
    </div>
  );
};

export default Home;
