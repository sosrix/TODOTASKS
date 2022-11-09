import React, { useState } from "react";
import { Provider } from "react-redux";

import { store } from "./components/store/store";
import TasksContainer from "./components/TasksContainer";
import Auth from "./components/Auth";
import BottomBar from "./components/BottomBar";
import Addtask from "./components/Addtask";

export default function App() {
  const [logged, setLogged] = useState(false);
  const [openTab, setOpenTab] = useState(0);
  const [itemToEdit, setItemToEdit] = useState(null);

  function onTabPress(route) {
    setOpenTab(route);
  }

  if (logged) {
    return (
      <Provider store={store}>
        {openTab === 0 && (
          <TasksContainer onDelete={onTabPress} editItem={setItemToEdit} />
        )}
        {openTab === 1 && (
          <Addtask onSave={onTabPress} itemToEdit={itemToEdit} />
        )}
        <BottomBar onTab={onTabPress} />
      </Provider>
    );
  } else {
    return <Auth setLogged={setLogged} />;
  }
}
