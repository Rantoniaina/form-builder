import { ChangeEvent, useState } from 'react';
import EntryTypeEnum from '../../constants/EntryTypeEnum';
import FormType from '../../models/FormType';
import Button from '../button/button';
import Input from '../input/input';
import TextArea from '../textarea/textarea';

interface InputChoiceProps {
  inputs: FormType[] | undefined;
}

const InputChoice = ({ inputs }: InputChoiceProps) => {
  const [inputTitleHasError, setInputTitleHasError] = useState<boolean>(false);
  const [selectedInput, setSelectedInput] = useState<FormType | undefined>(
    undefined
  );
  const [choicesList, setChoicesList] = useState<string | undefined>(undefined);
  const [choicesListHasError, setChoicesListHasError] =
    useState<boolean>(false);

  const handleChangeInput = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedInputId = parseInt(e.target.value);
    setSelectedInput(
      inputs!.filter((input) => input.id === selectedInputId)![0]
    );
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
        // onChange={handleChangeTitle}
        label="Input title"
        error={inputTitleHasError}
        errorMessage="Please enter a title"
      />
      <select class="rounded p-2 mb-4" onChange={handleChangeInput}>
        <option value={undefined} selected={selectedInput === undefined}>
          -- Select input type --
        </option>
        {inputs.map((input: FormType, index: number) => (
          <option
            key={index}
            selected={input.id === selectedInput?.id}
            value={input.id!}
          >
            {input.name}
          </option>
        ))}
      </select>
      <div class="flex items-center justify-evenly mb-4">
        <span>Required : </span>
        <input type="radio" id="true" name="required" value="true" checked />
        <label for="true">Yes</label>
        <input type="radio" id="false" name="required" value="false" />
        <label for="false">No</label>
      </div>
      {selectedInput?.entry_type === EntryTypeEnum.MULTIPLE_VALUE && (
        <TextArea
          classStyle={`rounded p-2 ${
            choicesListHasError ? 'border-red-500 border-2 mb-0' : 'mb-4'
          }`}
          // onChange={handleChangeTitle}
          label="Options separated by semilicons"
          error={choicesListHasError}
          errorMessage="Please some options"
        />
      )}
      <Button label="Add" type="button" />
    </div>
  );
};

export default InputChoice;
