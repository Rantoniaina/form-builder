import create from 'zustand';
import FormElement from '../models/FormElement';

interface FormElementState {
  formElements: FormElement[] | undefined;
  addFormElement: (formElement: FormElement) => void;
  clearFormElements: () => void;
  deleleFormElement: (formElement: FormElement) => void;
}

export const formElementStore = create<FormElementState>((set) => ({
  formElements: undefined,
  addFormElement: (formElement: FormElement) =>
    set((state) => ({
      formElements:
        state.formElements === undefined
          ? [formElement]
          : [...state.formElements, formElement],
    })),
  clearFormElements: () => set({ formElements: undefined }),
  deleleFormElement: (formElementToDelete: FormElement) =>
    set((state) => ({
      formElements: state.formElements?.filter(
        (formElement) => formElement !== formElementToDelete
      ),
    })),
}));
