import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import * as IntentLauncher from "expo-intent-launcher";
import * as WebBrowser from "expo-web-browser";
import React from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import { DocumentFile } from "../../types/common";

interface DocumentPickerProps {
  onDocumentSelected: (documents: DocumentFile[]) => void;
  documents: DocumentFile[];
}

export default function DocumentPickerComponent({
  onDocumentSelected,
  documents,
}: DocumentPickerProps) {
  const handleChooseDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        multiple: true,
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets.length > 0) {
        const newDocs = result.assets.map((asset) => {
          return {
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            name: asset.name,
            uri: asset.uri,
            mimeType: asset.mimeType,
            size: asset.size,
          };
        });

        const updatedDocs = [...documents, ...newDocs];
        onDocumentSelected(updatedDocs);
      }
    } catch (error) {
      console.error("Error selecting document:", error);
      Alert.alert("Error", "Could not select documents. Please try again.");
    }
  };

  const clearAllDocuments = () => {
    onDocumentSelected([]);
  };

  const removeDocument = (id: string) => {
    const updatedDocs = documents.filter((doc) => doc.id !== id);
    onDocumentSelected(updatedDocs);
  };

  const handleViewDocument = async (document: DocumentFile) => {
    try {
      if (Platform.OS === "android") {
        const fileInfo = await FileSystem.getInfoAsync(document.uri);
        if (!fileInfo.exists) {
          throw new Error("File does not exist");
        }

        // Get MIME type based on file extension
        const getMimeType = (filename: string) => {
          const extension = filename.split(".").pop()?.toLowerCase();
          switch (extension) {
            case "pdf":
              return "application/pdf";
            case "doc":
            case "docx":
              return "application/msword";
            case "xls":
            case "xlsx":
              return "application/vnd.ms-excel";
            case "ppt":
            case "pptx":
              return "application/vnd.ms-powerpoint";
            case "txt":
              return "text/plain";
            case "jpg":
            case "jpeg":
              return "image/jpeg";
            case "png":
              return "image/png";
            default:
              return "*/*";
          }
        };

        const mimeType = getMimeType(document.name);

        // First try to open with VIEW intent
        try {
          await IntentLauncher.startActivityAsync(
            "android.intent.action.VIEW",
            {
              data: document.uri,
              type: mimeType,
              flags: 1, // FLAG_GRANT_READ_URI_PERMISSION
            }
          );
        } catch (error) {
          console.log("VIEW intent failed, trying with content URI");
          // If VIEW intent fails, try with content URI
          const contentUri = await FileSystem.getContentUriAsync(document.uri);
          await IntentLauncher.startActivityAsync(
            "android.intent.action.VIEW",
            {
              data: contentUri,
              type: mimeType,
              flags: 1,
            }
          );
        }
      } else {
        // For iOS, use WebBrowser
        const fileInfo = await FileSystem.getInfoAsync(document.uri);
        if (!fileInfo.exists) {
          throw new Error("File does not exist");
        }
        await WebBrowser.openBrowserAsync(document.uri);
      }
    } catch (error) {
      console.error("Error opening document:", error);
      Alert.alert("Error", "Could not open the document. Please try again.");
    }
  };

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
                <TouchableOpacity
                  style={styles.documentInfo}
                  onPress={() => handleViewDocument(item)}
                >
                  <Text style={styles.documentName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.documentSize}>
                    {formatFileSize(item.size)}
                  </Text>
                </TouchableOpacity>
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
      <Button
        mode="contained"
        onPress={handleChooseDocument}
        style={styles.attachmentButton}
        icon={() => (
          <MaterialCommunityIcons
            name="cloud-upload-outline"
            size={24}
            color="white"
          />
        )}
      >
        Chọn văn bản
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    marginTop: 16,
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
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
  },
  documentSize: {
    fontSize: 12,
    color: "#757575",
    marginTop: 4,
  },
  removeButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    marginTop: 16,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 14,
    color: "#757575",
  },
});
