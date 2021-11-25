import FormElementView from './FormElemetView';

interface FormDetails {
  form_id?: number;
  form_title?: string;
  form_description?: string | null;
  username?: string;
  form_elements?: FormElementView[];
}

export default FormDetails;
