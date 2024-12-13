import { useState } from "react";
import { motion } from "framer-motion";
import { BiEdit } from "react-icons/bi";
import { CgRemove } from "react-icons/cg";
import { PropTypes } from 'prop-types';

export default function ToDo({ passedmode }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editing, setEditing] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask) {
      if (editing !== null) {
        setTasks(
          tasks.map((task, i) => (i === editing ? newTask : task))
        );
        setEditing(null);
      } else {
        setTasks([...tasks, newTask]);
      }
      setNewTask("");
    }
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((task, i) => i !== index));
  };

  const handleEdit = (index) => {
    setEditing(index);
    setNewTask(tasks[index]);
  };

  const handleCancel = () => {
    setEditing(null);
    setNewTask("");
  };

  return (
    <div className={`p-20 ${passedmode ? "dark bg-white" : "light bg-gray-900"} h-screen`}>
      <h2 className="text-2xl font-bold mb-4 text-white dark:text-black">To-Do List</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border-2 border-gray-300 p-2 rounded-md w-full"
          placeholder="Add new task"
        />
      </form>
      <ul className="mt-4">
        {tasks.map((task, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between p-2 border-b-2 border-gray-300"
          >
            <span className="text-white dark:text-black">
              {task}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(index)}
                className="text-blue-500 hover:text-blue-700 transition-colors"
              >
                <BiEdit />
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <CgRemove />
              </button>
            </div>
          </motion.li>
        ))}
      </ul>
      {editing !== null && (
        <div className="mt-4">
          <button
            onClick={handleCancel}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

ToDo.propTypes = {
  passedmode: PropTypes.bool.isRequired,
}

