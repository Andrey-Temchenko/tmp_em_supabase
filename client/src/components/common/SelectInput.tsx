import {Form} from 'components/bootstrap';

interface Props {
  name: string;
  label: string;
  value: any;
  onChange: OnChangeHandler;
  options: any[];
  error?: string;
}

function SelectInput({name, label, value, onChange, options, error}: Props) {
  function inputOnChange(event) {
    onChange(name, event.target.value);
  }

  return (
    <Form.Group className="mb-4">
      <Form.Label>{label}</Form.Label>

      <Form.Control as="select" id={name} name={name} value={value} onChange={inputOnChange}>
        {!value && <option value="select">Select Category</option>}

        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Control>

      {error && <div className="alert alert-danger">{error}</div>}
    </Form.Group>
  );
}

export default SelectInput;
