import { ChangeEvent, useState } from 'react';
import EntryTypeEnum from '../../constants/EntryTypeEnum';
import FormElement from '../../models/FormElement';
import FormType from '../../models/FormType';
import KeyValue from '../../models/KeyValue';
import { formElementStore } from '../../stores/formElementStore';
import Button from '../button/button';
import Input from '../input/input';
import Select from '../select/select';
import TextArea from '../textarea/textarea';

interface InputChoiceProps {
  inputs: FormType[] | undefined;
  closeInputChoice: () => void;
}

const InputChoice = ({ inputs, closeInputChoice }: InputChoiceProps) => {
  const buttonActions: KeyValue[] = [
    {
      key: undefined,
      value: '-- Select button action --',
    },
    {
      key: 'save',
      value: 'Save',
    },
    {
      key: 'cancel',
      value: 'Cancel',
    },
  ];
  const formElementAddFn = formElementStore((state) => state.addFormElement);

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [inputTitleHasError, setInputTitleHasError] = useState<boolean>(false);
  const [selectedInput, setSelectedInput] = useState<FormType | undefined>(
    undefined
  );
  const [selectedInputHasError, setSelectedInputHasError] =
    useState<boolean>(false);
  const [choicesList, setChoicesList] = useState<string | undefined>(undefined);
  const [choicesListHasError, setChoicesListHasError] =
    useState<boolean>(false);
  const [required, setRequired] = useState<boolean>(true);
  const [buttonAction, setButtonAction] = useState<string | undefined>(
    undefined
  );
  const [buttonActionHasError, setButtonActionHasError] =
    useState<boolean>(false);

  const handleChangeInput = (e: ChangeEvent<HTMLSelectElement>) => {
    if (selectedInputHasError) {
      setSelectedInputHasError(false);
    }
    if (choicesListHasError) {
      setChoicesListHasError(false);
    }
    setChoicesList(undefined);
    const selectedInputId = parseInt(e.target.value);
    setSelectedInput(
      inputs!.filter((input) => input.id === selectedInputId)![0]
    );
  };

  const handleAdd = () => {
    let hasError = false;
    if (title === undefined || title.length === 0) {
      hasError = true;
      setInputTitleHasError(true);
    }
    if (selectedInput === undefined) {
      hasError = true;
      setSelectedInputHasError(true);
    }
    if (
      selectedInput?.entry_type === EntryTypeEnum.MULTIPLE_VALUE &&
      (choicesList === undefined ||
        choicesList.split(';').length <= 1 ||
        (choicesList.split(';').length === 2 &&
          choicesList.split(';')[1].length === 0))
    ) {
      hasError = true;
      setChoicesListHasError(true);
    }
    if (
      selectedInput?.entry_type === EntryTypeEnum.ACTION &&
      buttonAction === undefined
    ) {
      hasError = true;
      setButtonActionHasError(true);
    }
    if (!hasError) {
      const formElement: FormElement = {
        for_id: selectedInput!.id,
        ismandatory: required,
        options:
          selectedInput?.entry_type === EntryTypeEnum.MULTIPLE_VALUE
            ? choicesList
            : selectedInput?.entry_type === EntryTypeEnum.ACTION
            ? buttonAction
            : undefined,
        title,
      };
      formElementAddFn(formElement);
      closeInputChoice();
    }
  };

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    if (inputTitleHasError) {
      setInputTitleHasError(false);
    }
    setTitle(e.target.value);
  };

  const handleOnRequiredChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value && e.target.value === 'true') {
      setRequired(true);
    } else {
      setRequired(false);
    }
  };

  const handleChangeChoicesList = (e: ChangeEvent<HTMLInputElement>) => {
    if (choicesListHasError) {
      setChoicesListHasError(false);
    }
    setChoicesList(e.target.value);
  };

  const inputsToKeyValue = () => {
    let result: KeyValue[] = [];
    result.push({
      key: undefined,
      value: '-- Select input type --',
    });
    inputs!.forEach((input: FormType) => {
      result.push({
        key: input.id,
        value: input.name,
      });
    });
    return result;
  };

  const handleChangeButtonAction = (e: ChangeEvent<HTMLSelectElement>) => {
    if (buttonActionHasError) {
      setButtonActionHasError(false);
    }
    setButtonAction(e.target.value);
  };

  if (!inputs) {
    return <span>No inputs available.</span>;
  }

  return (
    <div class="flex flex-col border-indigo-900	p-2 rounded border-dashed border">
      <Input
        type="text"
        classStyle={`rounded p-2 ${
          inputTitleHasError ? 'border-red-500 border-2 mb-0' : 'mb-4'
        }`}
        onChange={handleChangeTitle}
        label="Input title"
        error={inputTitleHasError}
        errorMessage="Please enter a title"
        value={title}
      />
      <Select
        error={selectedInputHasError}
        errorMessage="Please select a type"
        selected={
          selectedInput && selectedInput.id ? selectedInput.id : undefined
        }
        options={inputsToKeyValue()}
        onChange={handleChangeInput}
      />
      {selectedInput?.entry_type !== EntryTypeEnum.ACTION && (
        <div class="flex items-center justify-evenly mb-4">
          <span>Required : </span>
          <input
            type="radio"
            id="true"
            name="required"
            value="true"
            checked={required === true}
            onChange={handleOnRequiredChange}
          />
          <label for="true">Yes</label>
          <input
            type="radio"
            id="false"
            name="required"
            value="false"
            checked={required === false}
            onChange={handleOnRequiredChange}
          />
          <label for="false">No</label>
        </div>
      )}
      {selectedInput?.entry_type === EntryTypeEnum.MULTIPLE_VALUE && (
        <TextArea
          classStyle={`rounded p-2 ${
            choicesListHasError ? 'border-red-500 border-2 mb-0' : 'mb-4'
          }`}
          onChange={handleChangeChoicesList}
          label="Options separated by semilicons"
          error={choicesListHasError}
          errorMessage="Please add some options"
          value={choicesList}
        />
      )}
      {selectedInput?.entry_type === EntryTypeEnum.ACTION && (
        <Select
          error={buttonActionHasError}
          errorMessage="Please select a button action"
          selected={buttonAction}
          options={buttonActions}
          onChange={handleChangeButtonAction}
        />
      )}
      <Button label="Add" type="button" onClick={handleAdd} />
      <Button label="Cancel" type="button" onClick={closeInputChoice} />
    </div>
  );
};

export default InputChoice;
