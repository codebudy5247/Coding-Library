import { useState } from "react";
import { useAppDispatch } from "../redux/hook";
import { addTodo } from "../redux/slices/todoSlice";

const AddTodoForm = () => {
  const dispatch = useAppDispatch();
  const [todoDescription, setTodoDescription] = useState("");
  return (
    <div className="todoForm">
      <input
        className="formInput"
        type="text"
        name="todo"
        id="todo"
        placeholder="Write your next task"
        onChange={(e) => setTodoDescription(e.target.value)}
        value={todoDescription}
      />
      <button
        onClick={() => {
          dispatch(addTodo(todoDescription));
          setTodoDescription("");
        }}
      >
        <svg
          clipRule="evenodd"
          fillRule="evenodd"
          strokeLinejoin="round"
          strokeMiterlimit="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          width={32}
          height={32}
        >
          <path
            d="m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z"
            fillRule="nonzero"
          />
        </svg>
      </button>
    </div>
  );
};

export default AddTodoForm;
