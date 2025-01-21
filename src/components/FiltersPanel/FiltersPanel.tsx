import React from 'react';
import {Button, Flex, Segmented} from "antd";
import {Filters} from "../../App";

interface FiltersPanelProps {
  onFilter: (filter: Filters) => void;
  todosCount: number;
  onRemoveCompletedTodos: () => void
}

const FiltersPanel = ({onFilter, todosCount, onRemoveCompletedTodos}: FiltersPanelProps) => {

  return (
    <Flex justify={'space-between'} align={'center'}>
      <div> {todosCount} {todosCount === 1 ? 'item' : 'items'} left</div>
      <Segmented options={[Filters.All, Filters.Active, Filters.Completed]} onChange={(value: Filters) => onFilter(value)} defaultValue={Filters.All} />
      <Button onClick={onRemoveCompletedTodos} type={"text"}>clear completed</Button>
    </Flex>
  );
};

export default FiltersPanel;