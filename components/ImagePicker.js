import React, { useState } from "react";
import { Button, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImagePickerExample({ setImageUir }) {
  const [image, setImage] = useState(null);
  const [imageMsg, setImageMsg] = useState("Add a picture");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
      setImageUir(result.uri);
      setImageMsg("Picture added");
    }
  };

  return (
    <View>
      <Button title={imageMsg} onPress={pickImage} />
    </View>
  );
}
