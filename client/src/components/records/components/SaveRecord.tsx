import {useState, useEffect} from 'react';
import {Modal, Button, Form} from 'components/bootstrap';
import Flatpickr from 'react-flatpickr';

import config from 'config';
import validationHelper from 'helpers/validationHelper';

import NumberInput from 'components/common/NumberInput';
import TextAreaInput from 'components/common/TextAreaInput';
import SelectInput from 'components/common/SelectInput';

const dateOptions = {dateFormat: config.format.datePicker};

interface Props {
  record: any;
  categories: any[];
  save: () => void;
  close: () => void;
  onChange: OnChangeHandler;
  visible?: boolean;
}

function SaveRecord({record, categories, save, close, onChange, visible}: Props) {
  const [errors, setErrors] = useState({categoryId: '', cost: '', note: ''});

  useEffect(() => {
    setErrors({categoryId: '', cost: '', note: ''});
  }, [record]);

  function formIsValid() {
    const errors = {
      categoryId: '',
      cost: '',
      note: ''
    };

    if (!record.categoryId) {
      errors.categoryId = 'Category field is required.';
    }

    if (!record.cost) {
      errors.cost = 'Cost field is required.';
    }

    if (!record.note) {
      errors.note = 'Note field is required.';
    }

    setErrors(errors);

    return validationHelper.isEmptyErrorObject(errors);
  }

  function onSave() {
    if (!formIsValid()) return;

    save();
  }

  function onDateChange(date) {
    onChange('date', new Date(date));
  }

  function render() {
    if (!record) return null;

    const title = record.id ? 'Edit Record' : 'Add New Record';

    const cost = record.cost ? parseFloat(record.cost) : 0;

    const categoryOptions = categories.map(category => {
      return {value: category.id, label: category.title};
    });

    return (
      <Modal show={visible} backdrop="static" onHide={close}>
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Label>Date</Form.Label>

            <div>
              <Flatpickr value={record.date} options={dateOptions} onChange={onDateChange} />
            </div>
          </Form.Group>

          <NumberInput name="cost" label="Cost" value={cost} onChange={onChange} error={errors.cost} />

          <SelectInput
            name="categoryId"
            label="Category"
            value={record.categoryId}
            options={categoryOptions}
            onChange={onChange}
            error={errors.categoryId}
          />

          <TextAreaInput
            name="note"
            label="Note"
            value={record.note}
            onChange={onChange}
            placeholder="Note"
            error={errors.note}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={onSave}>
            Save
          </Button>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return render();
}

export default SaveRecord;
