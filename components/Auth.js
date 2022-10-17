import React, { useState } from "react";
import { Text, Button, TextInput, View, StyleSheet } from "react-native";

export default function Auth({ setLogged }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visitorMessage, setVisitorMessage] = useState("");

  let regex = new RegExp("[a-z0-9]+@tychon.app");

  const onLogin = () => {
    if (regex.test(email)) {
      setLogged(true);
    } else {
      setVisitorMessage(
        "Please make sure your email is valid (use @tychon.app)"
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.visitormsg}>{visitorMessage}</Text>
      <TextInput
        value={email}
        onChangeText={(entry) => setEmail(entry)}
        placeholder={"EMAIL"}
        style={styles.input}
      />
      <TextInput
        value={password}
        onChangeText={(entry) => setPassword(entry)}
        placeholder={"PASSWORD"}
        secureTextEntry={true}
        style={styles.input}
      />

      <Button style={styles.btn} title={"Login"} onPress={onLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3949ab",
  },
  visitormsg: {
    color: "#f00",
    width: "70%",
    textAlign: "center",
    margin: 20,
  },
  input: {
    width: 230,
    height: 44,
    padding: 10,
    fontWeight: "bold",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#f9e9fb",
    borderColor: "black",
    marginBottom: 10,
  },
  btn: {
    color: "#6f74dd",
    backgroundColor: "#6f74dd",
  },
});
