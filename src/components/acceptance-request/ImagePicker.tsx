import { Ionicons } from "@expo/vector-icons"; // Make sure to install @expo/vector-icons
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const ImagePickerComponent: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const pickImages = async () => {
    // Request permission to access media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    // Open image picker with multiple selection enabled
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      allowsMultipleSelection: true,
      selectionLimit: 10, // Set a reasonable limit (or 0 for unlimited)
    });

    if (!result.canceled && result.assets) {
      // Get URIs from all selected assets and add them to existing images
      const newImageUris = result.assets.map((asset) => asset.uri);
      setSelectedImages((prevImages) => [...prevImages, ...newImageUris]);
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const clearImages = () => {
    setSelectedImages([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Hình ảnh</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.cameraButton} onPress={pickImages}>
          <Ionicons name="camera" size={24} color="white" />
        </TouchableOpacity>

        {selectedImages.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearImages}>
            <Text style={styles.clearButtonText}>Xóa tất cả</Text>
          </TouchableOpacity>
        )}
      </View>

      {selectedImages.length > 0 && (
        <ScrollView
          contentContainerStyle={styles.imageScrollContainer}
          style={styles.imageScroll}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.imageGrid}>
            {selectedImages.map((uri, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 12,
    color: "#333333",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  cameraButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1a73e8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  clearButton: {
    marginLeft: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
  },
  clearButtonText: {
    color: "#d32f2f",
    fontSize: 14,
    fontWeight: "500",
  },
  imageScroll: {
    width: "100%",
  },
  imageScrollContainer: {
    paddingBottom: 16,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  imageContainer: {
    margin: 4,
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: -6,
    right: -6,
    backgroundColor: "rgba(0,0,0,0.6)",
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#ffffff",
  },
  removeButtonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default ImagePickerComponent;
