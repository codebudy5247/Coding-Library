import { useAppSelector } from "../redux/hook";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  const todoList = useAppSelector((state) => state.todosState) as Todo[];

  let completedTask = todoList?.filter((todo) => todo.completed) as Todo[];
  console.log(completedTask);

  return (
    <div>
      <button
        style={{ backgroundColor: "white", color: "black" }}
        onClick={() => navigate("/")}
      >
        Go to home
      </button>
      <h1>Total task: {todoList.length}</h1>
      <h1>Completed task: {completedTask.length}</h1>
    </div>
  );
};

export default Dashboard;
