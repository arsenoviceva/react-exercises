import { RiDeleteBin6Line } from "react-icons/ri";
export const TaskCard = ({ task, onClickItem, deleteTask }) => {
  return (
    <li className="d-flex justify-content-center gap-3 align-items-center">
      <input
        type="checkbox"
        id={task.id}
        checked={task.isFinished}
        onClick={onClickItem}
      />
      {task.name} <RiDeleteBin6Line onClick={() => deleteTask(task.id)} />
    </li>
  );
};
