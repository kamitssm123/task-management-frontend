import _every from "lodash/every";
import _without from "lodash/without";
import { useCallback, useMemo, useState } from "react";

import { Task } from "../../../../types/types";
import Checkbox from "../../../../components/Checkbox";

const useSelection = (tasks: Task[]) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isSelected = useCallback((id: string) => selectedIds.includes(id), [selectedIds]);

  const onToggleSelectAll = useCallback(
    (checked: boolean) => {
      if (checked) {
        setSelectedIds(tasks.map((task) => task.id.toString()));
      }
      setSelectedIds([]);
    },
    [tasks]
  );

  const onToggle = useCallback((checked: boolean, id: string) => {
    setSelectedIds((prevState) => {
      if (!checked) {
        return _without(prevState, id);
      }
      return [...prevState, id];
    });
  }, []);

  const areAllSelected = useMemo(
    () => !!tasks.length && _every(tasks, (task) => selectedIds.includes(task.id.toString())),
    [selectedIds, tasks]
  );

  const renderSelectAll = useCallback(() => {
    return <Checkbox checked={areAllSelected} onToggle={onToggleSelectAll} offColor="#fff" onColor="#fff" />;
  }, [areAllSelected, onToggleSelectAll]);

  const renderCheckbox = useCallback(
    (id: string) => {
      return <Checkbox checked={isSelected(id)} onToggle={(checked) => onToggle(checked, id)} />;
    },
    [onToggle, isSelected]
  );

  return { renderSelectAll, renderCheckbox, selectedIds };
};

export default useSelection;
