import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface Label {
  name: string;
  color: string;
}

interface LabelInputProps {
  onLabelCreate: (label: Label) => void;
}

const PRESET_COLORS = [
  "#FF6B6B", // Soft Red
  "#4ECDC4", // Turquoise
  "#45B7D1", // Sky Blue
  "#FFA07A", // Light Salmon
  "#98D8C8", // Mint
  "#F7DC6F", // Soft Yellow
  "#BB8FCE", // Light Purple
  "#82E0AA", // Light Green
];

const LabelInput: React.FC<LabelInputProps> = ({ onLabelCreate }) => {
  const [labelName, setLabelName] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>(PRESET_COLORS[0]);

  const handleCreateLabel = () => {
    if (labelName.trim() !== "") {
      onLabelCreate({ name: labelName, color: selectedColor });
      setLabelName("");
      setSelectedColor(PRESET_COLORS[0]);
    }
  };

  const renderColorItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.colorItem,
        { backgroundColor: item },
        item === selectedColor && styles.selectedColorItem,
      ]}
      onPress={() => setSelectedColor(item)}
    />
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter label name"
        value={labelName}
        onChangeText={setLabelName}
      />
      <FlatList
        data={PRESET_COLORS}
        renderItem={renderColorItem}
        keyExtractor={(item) => item}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.colorList}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreateLabel}>
        <Text style={styles.buttonText}>Create Label</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  colorList: {
    marginBottom: 10,
  },
  colorItem: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  selectedColorItem: {
    borderWidth: 2,
    borderColor: "#000",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default LabelInput;
