import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";

interface ImageAttachmentProps {
  onImageSelected?: (uri: string) => void;
}

export default function ImageAttachment({
  onImageSelected,
}: ImageAttachmentProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleChooseImage = async () => {
    try {
      // Request permission
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert("Bạn cần cấp quyền truy cập thư viện ảnh!");
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
        onImageSelected?.(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
      alert("Có lỗi khi chọn ảnh. Vui lòng thử lại!");
    }
  };

  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        onPress={handleChooseImage}
        style={styles.button}
      >
        Chọn ảnh
      </Button>
      {selectedImage && (
        <View style={styles.imagePreviewContainer}>
          <Image
            source={{ uri: selectedImage }}
            style={styles.imagePreview}
            resizeMode="cover"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  button: {
    borderRadius: 8,
  },
  imagePreviewContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
});
