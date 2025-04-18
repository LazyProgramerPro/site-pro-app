import { FontAwesome } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface DocumentFile {
  id: string;
  name: string;
  uri: string;
  mimeType?: string;
  size?: number;
}

interface DocumentPickerProps {
  onDocumentsSelected?: (documents: DocumentFile[]) => void;
}

const DocumentPickerComponent: React.FC<DocumentPickerProps> = ({
  onDocumentsSelected,
}) => {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);

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

        if (onDocumentsSelected) {
          onDocumentsSelected(updatedDocs);
        }
      }
    } catch (error) {
      console.error("Error selecting document:", error);
    }
  };

  const removeDocument = (id: string) => {
    const updatedDocs = documents.filter((doc) => doc.id !== id);
    setDocuments(updatedDocs);

    if (onDocumentsSelected) {
      onDocumentsSelected(updatedDocs);
    }
  };

  return (
    <View style={styles.container}>
      {documents.length > 0 && (
        <View style={styles.documentList}>
          <FlatList
            data={documents}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.documentItem}>
                <FontAwesome name="file-text-o" size={18} color="#4285F4" />
                <Text style={styles.documentName} numberOfLines={1}>
                  {item.name}
                </Text>
                <TouchableOpacity
                  onPress={() => removeDocument(item.id)}
                  style={styles.removeButton}
                >
                  <FontAwesome name="times-circle" size={18} color="#F44336" />
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.uploadButton}
        onPress={handleSelectDocuments}
      >
        <Text style={styles.buttonText}>Upload văn bản</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
    color: "#424242",
  },
  documentList: {
    marginVertical: 12,
    maxHeight: 200,
  },
  documentItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  documentName: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
    fontSize: 14,
  },
  removeButton: {
    padding: 5,
  },
  uploadButton: {
    backgroundColor: "#1976D2",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default DocumentPickerComponent;
