
import { useState } from "react";
import "./to-do.css";

function Todo() {

    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);

    // ADD TASK
    const addTasks = () => {

        if (task.trim() === "") return;

        const newTask = {
            id: Date.now(),
            text: task.trim(),
            completed: false,
            date: new Date().toLocaleDateString("en-US"),
            time: new Date().toLocaleTimeString("en-US")
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);

        setTask("");
    };

    // DELETE TASK
    const deleteTasks = (id) => {

        setTasks((prevTasks) =>
            prevTasks.filter((item) => item.id !== id)
        );

    };

    // CHECKBOX COMPLETION
    const toggleTask = (id) => {

        setTasks((prevTasks) => prevTasks.map((item) =>
                item.id === id ? { ...item, completed: !item.completed }
                    : item
            )
        );

    };

    // CLEAR ALL TASKS
    const clearTasks = () => {

        setTasks([]);
        setTask("");

    };

    return (
        <div className="Todo">

            <h1>My ToDo App</h1>

            {/* INPUT */}
            <input
                type="text"
                placeholder="Write your todo..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") addTasks();
                }}
            />

            <button onClick={addTasks}>
                Add
            </button>

            <button onClick={clearTasks}>
                Clear
            </button>

            {/* TASK LIST */}
            <ul>

                {tasks.map((item) => (

                    <li
                        key={item.id}
                        className={`task-item ${item.completed ? "completed" : ""}`}
                    >

                        {/* CHECKBOX */}
                        <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => toggleTask(item.id)}
                        />

                        {/* TASK NAME */}
                        <div className="task-name">
                            {item.text}
                        </div>

                        {/* DATE */}
                        <div className="task-date">

                            <span>Date</span>

                            <strong>{item.date}</strong>

                        </div>

                        {/* TIME */}
                        <div className="task-time">

                            <span>Time</span>

                            <strong>{item.time}</strong>

                        </div>

                        {/* DELETE */}
                        <button onClick={() => deleteTasks(item.id)}>
                            Delete
                        </button>

                    </li>

                ))}

            </ul>

        </div>
    );
}

export default Todo;
