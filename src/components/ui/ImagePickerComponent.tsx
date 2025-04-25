import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface ImagePickerProps {
  onImageSelected: (uris: string[]) => void;
  selectedImages: string[];
}

export default function ImagePickerComponent({
  onImageSelected,
  selectedImages,
}: ImagePickerProps) {
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;

  const MAX_IMAGES = 10;
  const clearImages = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onImageSelected([]);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleChooseImage = async () => {
    try {
      setIsLoading(true);

      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 0.8,
        allowsMultipleSelection: true,
        selectionLimit: MAX_IMAGES - selectedImages.length,
      });

      if (!result.canceled && result.assets) {
        const newImageUris = result.assets.map((asset) => asset.uri);

        Animated.sequence([
          Animated.timing(fadeAnim, {
            toValue: 0.6,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();

        const updatedImages = [...selectedImages, ...newImageUris];
        onImageSelected(updatedImages);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    onImageSelected(updatedImages);
  };

  return (
    <View style={styles.container}>
      {selectedImages.length > 0 ? (
        <>
          {selectedImages.length > 0 && (
            <View style={styles.headerContainer}>
              <Text style={styles.sectionTitle}>
                Hình ảnh ({selectedImages.length}/{MAX_IMAGES})
              </Text>
              <View style={styles.headerActions}>
                {selectedImages.length > 0 && (
                  <TouchableOpacity
                    style={styles.clearButton}
                    onPress={clearImages}
                    disabled={isLoading}
                  >
                    <Ionicons name="trash-outline" size={16} color="#d32f2f" />
                    <Text style={styles.clearButtonText}>Xóa tất cả</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          <View style={styles.imageGrid}>
            {selectedImages.map((uri, index) => (
              <View key={index} style={styles.imageContainer}>
                <Image source={{ uri }} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                  <Ionicons name="close-circle" size={24} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="images-outline" size={60} color="#e0e0e0" />
          <Text style={styles.emptyStateText}>Chưa có hình ảnh nào</Text>
          <Text style={styles.emptyStateSubText}>
            Chọn tối đa {MAX_IMAGES} hình ảnh để đính kèm
          </Text>
        </View>
      )}
      <Button
        mode="contained"
        onPress={handleChooseImage}
        style={styles.attachmentButton}
        loading={isLoading}
        icon={() => (
          <MaterialCommunityIcons
            name="cloud-upload-outline"
            size={24}
            color="white"
          />
        )}
      >
        Chọn ảnh
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  attachmentButton: {
    borderRadius: 8,
    marginTop: 16,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  imageCount: {
    fontSize: 14,
    color: "#757575",
    fontWeight: "500",
  },
  cameraButton: {
    flexDirection: "row",
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: "#1a73e8",
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    gap: 8,
    marginTop: 16,
    width: "100%",
  },
  disabledButton: {
    backgroundColor: "#a0c3ff",
    elevation: 0,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  clearButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  clearButtonText: {
    color: "#d32f2f",
    fontSize: 14,
    fontWeight: "500",
  },
  emptyStateContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderStyle: "dashed",
    minHeight: 200,
    flex: 1,
  },
  emptyStateText: {
    marginTop: 16,
    fontSize: 16,
    fontWeight: "500",
    color: "#757575",
  },
  emptyStateSubText: {
    marginTop: 8,
    fontSize: 14,
    color: "#9e9e9e",
    textAlign: "center",
  },
  imageScroll: {
    width: "100%",
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 12,
  },
  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  imageContainer: {
    width: "31%",
    aspectRatio: 1,
    position: "relative",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
