import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import moment from "moment";

const Task = ({ textobj, completeTask }) => {
  const colorsMap = { High: "#CD6155", Medium: "#F9E79F", Low: "#A9CCE3" };
  const dataLoad = textobj.load;
  const taskID = textobj.id;
  const isDone = textobj.completed;
  const prio = colorsMap[dataLoad[1]];

  return (
    <View style={[styles.item, { backgroundColor: prio }]}>
      <View style={styles.marks}>
        <TouchableOpacity onPress={() => completeTask(taskID, "done")}>
          <Image
            style={styles.tinymark}
            source={
              isDone
                ? require(`../assets/check-box.png`)
                : require(`../assets/blank-box.png`)
            }
          />
          <Text>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => completeTask(taskID, "edit", textobj)}>
          <Image
            style={styles.tinymark}
            source={require("../assets/edit.png")}
          />
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => completeTask(taskID, "delete")}>
          <Image
            style={styles.tinymark}
            source={require("../assets/x-mark.png")}
          />
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.itemstack}>
        {dataLoad[4] && (
          <Image
            source={{ uri: dataLoad[4] }}
            style={{ width: "100%", height: 190 }}
          />
        )}
      </View>
      <Text style={styles.time}>{moment(dataLoad[2]).fromNow()}</Text>
      <Text style={styles.itemText}>{dataLoad[0]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: "100%",
    padding: 5,
    borderRadius: 3,
    marginBottom: 20,
  },
  itemstack: {
    borderColor: "#082032",
    borderWidth: 2,
  },

  itemText: {
    color: "#fff",
    fontWeight: "bold",
    backgroundColor: "#082032",
    padding: 5,
    maxWidth: "100%",
  },
  marks: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    padding: 2,
  },
  time: {
    backgroundColor: "#000",
    position: "absolute",
    bottom: 37,
    right: 5,
    color: "#808080",
    fontWeight: "bold",
    textAlign: "right",
    paddingRight: 5,
    paddingLeft: 7,
    borderTopLeftRadius: 5,
  },
  tinymark: {
    width: 20,
    height: 20,
    marginTop: 5,
  },
});

export default Task;
