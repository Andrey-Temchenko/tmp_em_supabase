import {Row, Col, Form, Button} from 'components/bootstrap';

import dateHelper from 'helpers/dateHelper';

import AppIcon from 'components/common/AppIcon';

import * as styled from './RecordsList.styled';

interface Props {
  records: any[];
  categories: Category[];
  editRecordAction: (record: any) => void;
  deleteRecordAction: (recordId: number) => void;
}

function RecordsList({records, categories, editRecordAction, deleteRecordAction}: Props) {
  function anyRecords() {
    return records && records.length;
  }

  function renderRecord(record) {
    const category = categories.find(category => {
      return category.id === record.categoryId;
    });

    const categoryTitle = category ? category.title : '';

    const dateDisplay = dateHelper.displayDate(record.date);

    const SubItem = props => (
      <Col sm={12} className="d-md-none d-lg-none mb-3">
        <Row>
          <Col sm={12}>
            <Form.Label>{props.title}:</Form.Label>
          </Col>
          <Col sm={12} className="form-group">
            {props.value}
          </Col>
        </Row>
      </Col>
    );

    return (
      <Row key={record.id} className="list-item">
        <Col md={2} className="d-none d-md-block">
          {dateDisplay}
        </Col>

        <SubItem title="Date" value={dateDisplay} />

        <Col md={3} className="d-none d-md-block">
          {categoryTitle}
        </Col>

        <SubItem title="Category" value={categoryTitle} />

        <Col md={2} className="d-none d-md-block">
          {record.cost}
        </Col>

        <SubItem title="Cost" value={record.cost} />

        <Col md={3} className="d-none d-md-block">
          {record.note}
        </Col>

        <SubItem title="Note" value={record.note} />

        <Col md={1} xs={3}>
          <Button variant="link" className="list-action" onClick={() => editRecordAction(record)}>
            Edit
            <AppIcon icon="edit" />
          </Button>
        </Col>

        <Col md={1} xs={3}>
          <Button variant="link" className="list-action" onClick={() => deleteRecordAction(record.id)}>
            Delete
            <AppIcon icon="delete" />
          </Button>
        </Col>
      </Row>
    );
  }

  function render() {
    if (!anyRecords()) return <styled.list>No Records.</styled.list>;

    return (
      <styled.list>
        <Col>
          <Row className="list-item d-none d-md-flex">
            <Col md={2} className="d-none d-md-block">
              <Form.Label>Date</Form.Label>
            </Col>
            <Col md={3} className="d-none d-md-block">
              <Form.Label>Category</Form.Label>
            </Col>
            <Col md={2} className="d-none d-md-block">
              <Form.Label>Cost</Form.Label>
            </Col>
            <Col md={3} className="d-none d-md-block">
              <Form.Label>Note</Form.Label>
            </Col>
            <Col md={2} className="d-none d-md-block" />
          </Row>

          {records.map(record => renderRecord(record))}
        </Col>
      </styled.list>
    );
  }

  return render();
}

export default RecordsList;
