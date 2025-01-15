import { useAppSelector, useAppDispatch } from "../redux/hook";
import { removeTodo, setTodoStatus } from "../redux/slices/todoSlice";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const todoList = useAppSelector((state) => state.todosState) as Todo[];
  return (
    <ul className="allTodos">
      {todoList.map((todo) => (
        <li className="singleTodo" key={todo.id}>
          <span
            className="todoText"
            style={todo.completed ? { textDecoration: "line-through" } : {}}
          >
            {todo.description}
          </span>
          <button
            className="todo_items_left"
            onClick={() => {
              dispatch(
                setTodoStatus({ completed: !todo.completed, id: todo.id })
              );
            }}
          >
            <svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              width={34}
              height={34}
              stroke="#22C55E"
              fill={todo.completed ? "#22C55E" : "#0d0d0d"}
            >
              <circle cx="11.998" cy="11.998" fillRule="nonzero" r="9.998" />
            </svg>
          </button>
          <button
            onClick={() => {
              dispatch(removeTodo(todo.id));
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              width={32}
              height={34}
            >
              <path
                d="m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"
                fillRule="nonzero"
              />
            </svg>
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
