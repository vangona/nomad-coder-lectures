import { createStore } from "redux";

const ADD = "ADD";
const DELETE = "DELETE";

const addToDo = (text) => {
  return {
    type: ADD,
    text,
  };
};

const deleteToDo = (id) => {
  return {
    type: DELETE,
    id: parseInt(id),
  };
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      const newState = [{ text: action.text, id: Date.now() }, ...state];
      localStorage.setItem("redux-todo", JSON.stringify(newState));
      return newState;

    case DELETE:
      const deletedState = state.filter((toDo) => toDo.id !== action.id);
      localStorage.setItem("redux-todo", JSON.stringify(deletedState));
      return deletedState;

    default:
      const data = JSON.parse(localStorage.getItem("redux-todo"));
      return data || state;
  }
};

const store = createStore(reducer);

export const actionCreators = {
  addToDo,
  deleteToDo,
};

export default store;
