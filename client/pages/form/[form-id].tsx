import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Card from '../../components/card/card';
import InputGenerator from '../../components/inputGenerator/inputGenerator';
import FormDetails from '../../models/FormDetails';

const Form = () => {
  const { query } = useRouter();
  const [formDetails, setFormDetails] = useState<FormDetails | undefined>(
    undefined
  );

  useEffect(() => {
    const parameter = query['form-id'];
    if (parameter && process.env.BACKEND_URL) {
      axios
        .get(`${process.env.BACKEND_URL}/forms/${parameter}`)
        .then((response) => {
          if (response && response.data && response.data.form_details) {
            setFormDetails(response.data.form_details);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!formDetails) {
    return (
      <div class="flex flex-col items-center h-screen justify-center bg-blue-100">
        <Card
          content={
            <div class="flex flex-col items-center">
              <h1>Form not found!</h1>
            </div>
          }
        />
      </div>
    );
  }

  return (
    <div class="flex flex-col items-center h-screen justify-center bg-blue-100">
      <Card
        content={
          <div class="flex flex-col items-center">
            <h1 class="mb-2">{formDetails.form_title?.toUpperCase()}</h1>
            {formDetails.form_description && (
              <p class='text-xs text-gray-400"'>
                {formDetails.form_description}
              </p>
            )}
            <p class='text-xs text-gray-400"'>By {formDetails.username}</p>
            {formDetails.form_elements?.map((form_element, index) => (
              <InputGenerator key={index} formElement={form_element} />
            ))}
          </div>
        }
      />
    </div>
  );
};

export default Form;
