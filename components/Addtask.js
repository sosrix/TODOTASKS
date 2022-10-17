import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, TextInput, Pressable, View } from "react-native";
import { useDispatch } from "react-redux";

import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { addaTask } from "./store/taskSlice";
import ImagePicker from "./ImagePicker";
import DateTimePicker from "./DateTimePicker";

const Addtask = ({ onSave, itemToEdit }) => {
  const [task, setTask] = useState("");
  const [prio, setPrio] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [recurring, setRecurring] = useState(null);

  const recurrs = ["Everyday", "Once a week", "Once a month"];
  const prioCases = ["High", "Medium", "Low"];
  const dropdownRef = useRef({});
  const dispatch = useDispatch();

  const appendTask = (text, prio) => {
    if (task && prio && date && image) {
      dispatch(addaTask([text, prio, date, recurring, image]));
      setTask("");
      setPrio("");
      setDate("");
      setImage("");
      setRecurring("");
      onSave(0);
      dropdownRef.current.reset();
    } else {
      // fields empty
      // push a reminder message to user, to fill fields
    }
  };
  const setDateTime = (dateTime) => {
    setDate(dateTime);
  };
  const setImageUir = (uri) => {
    setImage(uri);
  };

  useEffect(() => {
    if (itemToEdit) {
      setTask(itemToEdit.load[0]);
      setPrio(itemToEdit.load[1]);
      setDate(itemToEdit.load[2]);
      setImage(itemToEdit.load[4]);
    }
  }, [itemToEdit]);

  return (
    <View style={styles.centeredView}>
      <TextInput
        multiline
        numberOfLines={10}
        value={task}
        style={styles.input}
        placeholder={"Write a task..."}
        onChangeText={(text) => setTask(text)}
      />
      <View style={styles.btnWrapper}>
        <SelectDropdown
          disabled={!task}
          data={prioCases}
          ref={dropdownRef}
          onSelect={(selectedItem, index) => {
            setPrio(selectedItem);
          }}
          defaultButtonText={"Priority"}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            return item;
          }}
          buttonStyle={styles.dropdown2BtnStyle}
          buttonTextStyle={styles.dropdown2BtnTxtStyle}
          renderDropdownIcon={(isOpened) => {
            return (
              <FontAwesome
                name={isOpened ? "chevron-up" : "chevron-down"}
                color={"#f0fefe"}
                size={14}
              />
            );
          }}
          dropdownIconPosition={"right"}
          dropdownStyle={styles.dropdown2DropdownStyle}
          rowStyle={styles.dropdown2RowStyle}
          rowTextStyle={styles.dropdown2RowTxtStyle}
          selectedRowStyle={styles.dropdown2SelectedRowStyle}
        />

        <DateTimePicker setDateTime={setDateTime} />
        <ImagePicker setImageUir={setImageUir} />
      </View>
      <Pressable
        style={[styles.button, styles.buttonSave]}
        onPress={() => appendTask(task, prio)}
      >
        <Text style={styles.textStyle}>SAVE</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: "#3949ab",
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "100%",
    padding: 20,
    fontSize: 19,
    fontWeight: "bold",
    color: "#FFF",
  },
  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 30,
  },
  button: {
    backgroundColor: "#6f74dd",
    borderRadius: 2,
    padding: 8,
    elevation: 2,
  },

  buttonSave: {
    backgroundColor: "#6f74dd",
    width: 100,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  dropdown2BtnStyle: {
    width: "35%",
    height: 35,
    backgroundColor: "#039be5",
    borderRadius: 2,
  },
  dropdown2BtnTxtStyle: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "bold",
  },
  dropdown2DropdownStyle: {
    backgroundColor: "#039be5",
    borderRadius: 4,
  },
  dropdown2RowStyle: {
    backgroundColor: "#039be5",
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

export default Addtask;
