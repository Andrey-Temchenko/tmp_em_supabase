import {useState, useEffect} from 'react';
import {Modal, Button} from 'components/bootstrap';

import validationHelper from 'helpers/validationHelper';

import TextInput from 'components/common/TextInput';
import TextAreaInput from 'components/common/TextAreaInput';

interface Props {
  category: any;
  save: () => void;
  close: () => void;
  onChange: OnChangeHandler;
  visible?: boolean;
}

function SaveCategory({category, save, close, onChange, visible}: Props) {
  const [errors, setErrors] = useState({title: '', description: ''});

  useEffect(() => {
    setErrors({title: '', description: ''});
  }, [category]);

  function formIsValid() {
    const formErrors = {
      title: '',
      description: ''
    };

    if (!category.title) {
      formErrors.title = 'Title field is required.';
    }

    if (!category.description) {
      formErrors.description = 'Description field is required.';
    }

    setErrors(formErrors);

    return validationHelper.isEmptyErrorObject(formErrors);
  }

  function onSave() {
    if (!formIsValid()) return;
    save();
  }

  function render() {
    if (!category) return null;

    const title = category.id ? 'Edit Category' : 'Add New Category';

    return (
      <Modal show={visible} backdrop="static" onHide={close}>
        <Modal.Header closeButton>{title}</Modal.Header>
        <Modal.Body>
          <TextInput
            name="title"
            label="Title"
            value={category.title}
            onChange={onChange}
            placeholder="Title"
            error={errors.title}
          />

          <TextAreaInput
            name="description"
            label="Description"
            value={category.description}
            onChange={onChange}
            placeholder="Description"
            error={errors.description}
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

export default SaveCategory;
