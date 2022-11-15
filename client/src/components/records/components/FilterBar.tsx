import {Row, Col, Button, Dropdown} from 'components/bootstrap';

import SORT_OPTIONS from 'constants/sortOptions';

import AppIcon from 'components/common/AppIcon';

const sortByOptions = [
  {key: SORT_OPTIONS.DATE, text: 'Date'},
  {key: SORT_OPTIONS.CATEGORY, text: 'Category'},
  {key: SORT_OPTIONS.COST, text: 'Cost'}
];

interface Props {
  sortBy: string;
  addRecordAction: () => void;
  onSortAction: (key: string) => void;
}

function FilterBar({sortBy, addRecordAction, onSortAction}: Props) {
  return (
    <Row>
      <Col xs={8}>
        <Dropdown>
          <Dropdown.Toggle id="dropdown-sort">Sort By</Dropdown.Toggle>
          <Dropdown.Menu>
            {sortByOptions.map(item => {
              return (
                <Dropdown.Item key={item.key} onClick={() => onSortAction(item.key)} active={sortBy === item.key}>
                  {item.text}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Col>

      <Col xs={4} className="text-end">
        <Button variant="success" onClick={addRecordAction}>
          <AppIcon icon="plus" />
        </Button>
      </Col>
    </Row>
  );
}

export default FilterBar;
