import FormElementView from '../../models/FormElemetView';
import KeyValue from '../../models/KeyValue';
import Button from '../button/button';
import Checkbox from '../checkbox/checkbox';
import Input from '../input/input';
import RadioButton from '../radioButton/radioButton';
import Select from '../select/select';
import TextArea from '../textarea/textarea';

interface InputGeneratorProps {
  formElement: FormElementView;
}

const InputGenerator = ({ formElement }: InputGeneratorProps) => {
  const optionsParser = () => {
    const options = formElement.form_element_options?.split(';');
    if (
      options &&
      options.length > 0 &&
      options[options.length - 1].length === 0
    ) {
      options.pop();
    }
    let result: KeyValue[] = [];
    if (options) {
      options.forEach((option, index) => {
        result.push({
          key: index,
          value: option,
        });
      });
    }
    console.log(result);

    return result;
  };

  const renderContent = () => {
    let element = undefined;
    switch (formElement.form_type_name) {
      case 'TextArea':
      case 'Paragraph':
        element = (
          <TextArea
            label={formElement.form_element_title}
            errorMessage={
              formElement.form_element_mandatory
                ? 'Please complete this field'
                : undefined
            }
          />
        );
        break;
      case 'Button':
        element = (
          <Button
            label={formElement.form_element_title ?? ''}
            type={
              formElement.form_element_options &&
              formElement.form_element_options === 'Save'
                ? 'submit'
                : 'button'
            }
          />
        );
        break;
      case 'Select':
        element = (
          <Select
            options={optionsParser()}
            selected={undefined}
            errorMessage={
              formElement.form_element_mandatory
                ? 'Please choose an option'
                : undefined
            }
            label={formElement.form_element_title}
          />
        );
        break;
      case 'Checkbox':
        element = (
          <Checkbox
            options={optionsParser()}
            errorMessage={
              formElement.form_element_mandatory
                ? 'Please choose an option'
                : undefined
            }
            label={formElement.form_element_title}
          />
        );
        break;
      case 'Radio Button':
        element = (
          <RadioButton
            options={optionsParser()}
            errorMessage={
              formElement.form_element_mandatory
                ? 'Please choose an option'
                : undefined
            }
            label={formElement.form_element_title}
          />
        );
        break;
      default:
        element = (
          <Input
            type="text"
            label={formElement.form_element_title}
            errorMessage={
              formElement.form_element_mandatory
                ? 'Please complete this field'
                : undefined
            }
          />
        );
    }
    return element;
  };

  return <>{renderContent()}</>;
};

export default InputGenerator;
