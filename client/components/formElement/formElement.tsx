import FormElement from '../../models/FormElement';
import { formElementStore } from '../../stores/formElementStore';
import Button from '../button/button';

interface FormElementProps {
  formElement: FormElement;
}

const FormElement = ({ formElement }: FormElementProps) => {
  const formElementDeleteFn = formElementStore(
    (state) => state.deleleFormElement
  );

  const handleDeleteFormElement = () => {
    formElementDeleteFn(formElement);
  };

  return (
    <div class="flex items-center justify-evenly p-4">
      <span>{formElement.title}</span>
      <Button
        label="Delete"
        type="button"
        noMargin
        onClick={handleDeleteFormElement}
      />
    </div>
  );
};

export default FormElement;
