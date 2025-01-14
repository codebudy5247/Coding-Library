import { useMemo, useRef, useState } from "react";

/*
Trello board
- List task by category
- Add task
- Remove task
- Edit task
- Change category
- Add category


Task Schema:
Single task
- id
- title
- category

Multiple task - task[]

*/

function App() {
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: "Task 1",
        category: "todo",
      },
    ],
    progress: [
      {
        id: 1,
        title: "Task 2",
        category: "progress",
      },
    ],
    completed: [
      {
        id: 1,
        title: "Task 3",
        category: "completed",
      },
    ],
  });

  const categories = useMemo(() => {
    return Object.keys(tasks);
  }, [tasks]);

  const addNewTaskHandler = (task) => {
    // const tempTaskList = tasks[task.category];
    // tempTaskList.push(task);
    // setTasks(prev => ({
    //   ...prev,
    //   [task.category]: tempTaskList
    // }))

    setTasks((prevTasks) => {
      return {
        ...prevTasks, // copy all the previous tasks
        [task.category]: [...prevTasks[task.category], task], // add new task to the category
      };
    });
  };

  return (
    <div
      style={{
        margin: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <h1 style={{ font: "bold", textAlign: "center" }}>Trello Board</h1>
      <AddTask addNewTaskHandler={addNewTaskHandler} />
      <div style={{ display: "flex", gap: "16px" }}>
        {categories.map((category, index) => (
          <TaskList key={index} name={category}>
            {tasks[category].map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </TaskList>
        ))}
      </div>
    </div>
  );
}

// Category Options
const CategoryOptions = [
  { value: "todo", label: "Todo" },
  { value: "progress", label: "Progress" },
  { value: "completed", label: "Completed" },
];

//Components
const AddTask = ({ addNewTaskHandler }) => {
  const titleRef = useRef(null);
  const optionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // when form is submitted, page will not reload,in order to prevent default behaviour we have to use preventDefault()
    const payload = {
      id: self.crypto.randomUUID(),
      title: titleRef.current.value,
      category: optionRef.current.value,
    };
    addNewTaskHandler(payload);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        <input ref={titleRef} type="text" placeholder="Enter task title" />
        <select ref={optionRef}>
          {CategoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

const TaskList = ({ name, children }) => {
  return (
    <div
      style={{
        minWidth: "240px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div>
        <p>{name.toUpperCase()}</p>
      </div>
      {children}
      {/* <div>
        <button>Add Task</button>
      </div> */}
    </div>
  );
};

const TaskCard = ({ task }) => {
  return (
    <div
      style={{
        padding: "8px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        backgroundColor: "#fff",
        cursor: "pointer",
      }}
    >
      {task.title}
    </div>
  );
};

export default App;
