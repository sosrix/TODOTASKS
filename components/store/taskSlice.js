import { createSlice } from "@reduxjs/toolkit";

let ID = 0;

const tasksSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addaTask(state, action) {
      state.unshift({ id: ID++, load: action.payload, completed: false });
    },
    markTaskDone(state, action) {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask(state, action) {
      const task = state.find((task) => task.id === action.payload);
      if (task) {
        let indx = state.indexOf(task);
        state.splice(indx, 1);
      }
    },
  },
});

export const { addaTask, markTaskDone, deleteTask } = tasksSlice.actions;

export default tasksSlice.reducer;
