import React from 'react';
import { Button, Flex, Segmented, Typography } from 'antd';
import { Filters } from '../../App';

interface FiltersPanelProps {
  onFilter: (filter: Filters) => void;
  todosCount: number;
  onRemoveCompletedTodos: () => void;
}

const FiltersPanel = ({
  onFilter,
  todosCount,
  onRemoveCompletedTodos,
}: FiltersPanelProps) => {
  return (
    <Flex
      justify={'space-between'}
      align={'center'}
    >
      <Typography.Text>
        {`${todosCount} ${todosCount === 1 ? 'Item' : 'Items'} left`}
      </Typography.Text>
      <Segmented
        options={[Filters.All, Filters.Active, Filters.Completed]}
        onChange={(value: Filters) => onFilter(value)}
        defaultValue={Filters.All}
      />
      <Button
        onClick={onRemoveCompletedTodos}
        type={'text'}
      >
        Clear completed
      </Button>
    </Flex>
  );
};

export default FiltersPanel;
