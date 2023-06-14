import { useState } from "react";
import { useCreateTask } from "./reactQueryCustomHooks";

const Form = () => {
  const [newItemName, setNewItemName] = useState("");
  const { handleAddTask } = useCreateTask(setNewItemName);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddTask(newItemName);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Task Editor</h4>
      <div className="form-control">
        <input
          type="text "
          className="form-input"
          value={newItemName}
          onChange={(event) => setNewItemName(event.target.value)}
        />
        <button type="submit" className="btn">
          add task
        </button>
      </div>
    </form>
  );
};
export default Form;
