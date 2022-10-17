import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, TextInput, View, ScrollView } from "react-native";

import { useSelector, useDispatch } from "react-redux";
import SelectDropdown from "react-native-select-dropdown";
import moment from "moment";

import { markTaskDone, deleteTask } from "./store/taskSlice";
import Task from "./Task";

export default function TasksContainer({ onDelete, editItem }) {
  const [taskItems, setTaskItems] = useState([]);
  const [filter, setFilter] = useState("");
  const [query, setQuery] = useState("All");

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const queries = [
    "Today's",
    "Future",
    "Active",
    "Completed",
    "Overdue",
    "All",
  ];

  const searcheadData = useMemo(() =>
    taskItems.filter(
      (task) =>
        task.load[0].toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
      [filter]
    )
  );

  function endsWithAny(str, arr) {
    for (let i = 0; i < arr.length; i++) {
      if (str.endsWith(arr[i])) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    let taskByQuery;
    if (!todos.length) {
    } else {
      setTaskItems(todos);
    }
    if (query === "Today's") {
      const tdyKeysArr = [
        "second",
        "seconds",
        "minute",
        "minutes",
        "hour",
        "hours",
      ];
      taskByQuery = todos.filter(
        (task) =>
          moment(task.load[2]).fromNow().startsWith("in ") &&
          endsWithAny(moment(task.load[2]).fromNow(), tdyKeysArr),
        [query]
      );
      setTaskItems(taskByQuery);
    }
    if (query === "Future") {
      const ftrKeysArr = ["day", "days", "month", "months", "year", "years"];
      taskByQuery = todos.filter(
        (task) =>
          moment(task.load[2]).fromNow().startsWith("in ") &&
          endsWithAny(moment(task.load[2]).fromNow(), ftrKeysArr),
        [query]
      );
      setTaskItems(taskByQuery);
    }

    if (query === "Active") {
      taskByQuery = todos.filter((task) => task.completed === false, [query]);

      setTaskItems(taskByQuery);
    }
    if (query === "Completed") {
      taskByQuery = todos.filter((task) => task.completed === true, [query]);

      setTaskItems(taskByQuery);
    }
    if (query === "Overdue") {
      taskByQuery = todos.filter(
        (task) => moment(task.load[2]).fromNow().endsWith("ago"),
        [query]
      );
      setTaskItems(taskByQuery);
    }
    if (query === "All") {
      setTaskItems(todos);
    }
  }, [query, todos]);

  const completeTask = (index, action, taskObj) => {
    if (action === "done") {
      dispatch(markTaskDone(index));
    }
    if (action === "edit") {
      onDelete(1);
      editItem(taskObj);
      dispatch(deleteTask(index));
    }
    if (action === "delete") {
      dispatch(deleteTask(index));
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.tasksWrapper}>
          <TextInput
            multiline
            numberOfLines={10}
            value={filter}
            style={styles.input}
            placeholder={"Find a task"}
            onChangeText={(text) => setFilter(text)}
          />

          <SelectDropdown
            data={queries}
            onSelect={(selectedItem) => {
              setQuery(selectedItem);
            }}
            defaultButtonText={"ALL TASKS"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem + " TASKS";
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
            selectedRowStyle={styles.dropdown2SelectedRowStyle}
          />

          <View style={styles.items}>
            {searcheadData.map((item, idx) => {
              return (
                <Task
                  key={idx}
                  textobj={item}
                  index={idx}
                  completeTask={completeTask}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3949ab",
    color: "#FFF",
  },
  tasksWrapper: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  items: {
    marginTop: 10,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: "#6f74dd",
    borderRadius: 3,
    borderColor: "#000",
    borderWidth: 1,
    width: "100%",
    height: 45,
  },

  dropdown2BtnStyle: {
    width: "60%",
    height: 35,
    backgroundColor: "#6f74dd",
    borderRadius: 2,
    margin: 10,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: {
    backgroundColor: "#6f74dd",
    borderRadius: 4,
  },
  dropdown2RowStyle: {
    backgroundColor: "#6f74dd",
    borderBottomColor: "#000",
    height: 30,
  },
  dropdown2RowTxtStyle: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2SelectedRowStyle: { backgroundColor: "rgba(255,255,255,0.2)" },
});
