export const TaskForm = ({ newTask, onClick, onChange, isDisabled }) => {
  return (
    <div className="d-flex w-50">
      <input
        type="text"
        name="text"
        className="form-control"
        placeholder="Create new task"
        value={newTask}
        onChange={onChange}
      />
      <button
        className="btn btn-primary"
        onClick={onClick}
        disabled={isDisabled}
      >
        Create
      </button>
    </div>
  );
};
