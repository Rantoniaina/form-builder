import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Card from '../components/card/card';
import { userStore } from '../stores/userStore';

const CreateForms = () => {
  const userName = userStore((state) => state.userName);
  const router = useRouter();

  useEffect(() => {
    if (userName === undefined || userName.length === 0) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class="flex flex-col items-center h-screen justify-center bg-blue-100">
      <Card content={<div>Create form</div>} />
    </div>
  );
};

export default CreateForms;
