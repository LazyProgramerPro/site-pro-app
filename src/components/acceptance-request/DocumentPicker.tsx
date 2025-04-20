import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  DocumentFile,
  changeDocuments,
} from "../../redux/slices/formAcceptanceRequestSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";

interface DocumentPickerProps {
  onDocumentsSelected?: (documents: DocumentFile[]) => void;
}

const getFileIcon = (mimeType: string = "") => {
  if (mimeType.includes("pdf")) return "file-pdf-box";
  if (mimeType.includes("image")) return "file-image";
  if (mimeType.includes("word") || mimeType.includes("document"))
    return "file-word";
  if (mimeType.includes("excel") || mimeType.includes("sheet"))
    return "file-excel";
  if (mimeType.includes("powerpoint") || mimeType.includes("presentation"))
    return "file-powerpoint";
  if (mimeType.includes("zip") || mimeType.includes("compressed"))
    return "zip-box";
  return "file-document-outline";
};

const formatFileSize = (bytes: number = 0) => {
  if (bytes === 0) return "0 Bytes";
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
};

const DocumentPickerComponent: React.FC<DocumentPickerProps> = ({
  onDocumentsSelected,
}) => {
  const dispatch = useAppDispatch();
  const [documents, setDocuments] = useState<DocumentFile[]>([]);

  const { files } = useAppSelector(
    (state: RootState) => state.acceptanceRequestSpecialForm.data || []
  );

  console.log("files", files);

  const handleSelectDocuments = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newDocs = result.assets.map((asset) => ({
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          name: asset.name,
          uri: asset.uri,
          mimeType: asset.mimeType,
          size: asset.size,
        }));

        const updatedDocs = [...documents, ...newDocs];
        setDocuments(updatedDocs);

        // Dispatch to Redux store
        dispatch(changeDocuments(updatedDocs));

        if (onDocumentsSelected) {
          onDocumentsSelected(updatedDocs);
        }
      }
    } catch (error) {
      console.error("Error selecting document:", error);
      Alert.alert("Error", "Could not select documents. Please try again.");
    }
  };

  const removeDocument = (id: string) => {
    const updatedDocs = documents.filter((doc) => doc.id !== id);
    setDocuments(updatedDocs);

    // Dispatch to Redux store
    dispatch(changeDocuments(updatedDocs));

    if (onDocumentsSelected) {
      onDocumentsSelected(updatedDocs);
    }
  };

  const clearAllDocuments = () => {
    setDocuments([]);

    // Dispatch to Redux store
    dispatch(changeDocuments([]));

    if (onDocumentsSelected) {
      onDocumentsSelected([]);
    }
  };

  return (
    <View style={styles.container}>
      {documents.length > 0 ? (
        <>
          <View style={styles.headerRow}>
            <Text style={styles.title}>
              Tài liệu đã chọn ({documents.length})
            </Text>
            <TouchableOpacity
              onPress={clearAllDocuments}
              style={styles.clearAllButton}
            >
              <Text style={styles.clearAllText}>Xóa tất cả</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.documentList}>
            {documents.map((item) => (
              <View key={item.id} style={styles.documentItem}>
                <View style={styles.iconContainer}>
                  <MaterialCommunityIcons
                    name={getFileIcon(item.mimeType)}
                    size={24}
                    color="#4285F4"
                  />
                </View>
                <View style={styles.documentInfo}>
                  <Text style={styles.documentName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.documentSize}>
                    {formatFileSize(item.size)}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => removeDocument(item.id)}
                  style={styles.removeButton}
                >
                  <FontAwesome name="times-circle" size={20} color="#F44336" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      ) : (
        <View style={styles.emptyState}>
          <MaterialCommunityIcons
            name="file-document-outline"
            size={48}
            color="#CCCCCC"
          />
          <Text style={styles.emptyText}>Chưa có tài liệu được chọn</Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleSelectDocuments}
      >
        <MaterialCommunityIcons
          name="file-upload-outline"
          size={20}
          color="white"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Chọn tài liệu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
  },
  clearAllButton: {
    padding: 6,
  },
  clearAllText: {
    fontSize: 14,
    color: "#F44336",
    fontWeight: "500",
  },
  documentList: {
    marginBottom: 16,
    maxHeight: 300,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E3F2FD",
    borderRadius: 8,
    marginRight: 12,
  },
  documentInfo: {
    flex: 1,
  },
  documentName: {
    color: "#333333",
    fontSize: 14,
    fontWeight: "500",
  },
  documentSize: {
    fontSize: 12,
    color: "#757575",
    marginTop: 2,
  },
  removeButton: {
    padding: 8,
  },
  uploadButton: {
    backgroundColor: "#2196F3",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "row",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginBottom: 16,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: "#757575",
  },
});

export default DocumentPickerComponent;
