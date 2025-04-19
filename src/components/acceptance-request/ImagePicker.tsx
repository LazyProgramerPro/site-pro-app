import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { changeImages } from "../../redux/slices/formAcceptanceRequestSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";

const ImagePickerComponent: React.FC = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(1)).current;
  const dispatch = useAppDispatch();

  const { images } = useAppSelector(
    (state: RootState) => state.acceptanceRequestSpecialForm.data || []
  );

  console.log("selectedImages", selectedImages);

  console.log("images", images);

  const MAX_IMAGES = 10;

  const pickImages = async () => {
    try {
      setIsLoading(true);

      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permissionResult.granted) {
        alert("Permission to access media library is required!");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
        console.log("updatedImages", updatedImages);
        setSelectedImages(updatedImages);

        // Dispatch the updated images to Redux
        dispatch(changeImages(updatedImages));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);

    // Dispatch the updated images to Redux
    dispatch(changeImages(updatedImages));
  };

  const clearImages = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setSelectedImages([]);
      dispatch(changeImages([])); // Clear images in Redux
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      {selectedImages.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="images-outline" size={60} color="#e0e0e0" />
          <Text style={styles.emptyStateText}>Chưa có hình ảnh nào</Text>
          <Text style={styles.emptyStateSubText}>
            Chọn tối đa {MAX_IMAGES} hình ảnh để đính kèm
          </Text>
        </View>
      ) : (
        <Animated.View style={[styles.imageScroll, { opacity: fadeAnim }]}>
          <ScrollView
            horizontal={false}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={styles.scrollContent}
          >
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
          </ScrollView>
        </Animated.View>
      )}

      <TouchableOpacity
        style={[
          styles.cameraButton,
          selectedImages.length >= MAX_IMAGES && styles.disabledButton,
        ]}
        onPress={pickImages}
        disabled={selectedImages.length >= MAX_IMAGES || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" size="small" />
        ) : (
          <>
            <Ionicons name="cloud-upload-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Chọn ảnh</Text>
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

// Get screen width to calculate image width dynamically
// const { width } = Dimensions.get("window");
// // Calculate item width for 3 items per row with margins
// // const itemWidth = (width - 32 - 16) / 3; // screen width - container padding - margins -  gap
// const itemWidth = (width - 32 - 2 * 2.5 * 3) / 3; // screen width - container padding - total margins

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
    fontSize: 18,
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
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: 100,
    height: 100,
    margin: 2.5,
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

export default ImagePickerComponent;
