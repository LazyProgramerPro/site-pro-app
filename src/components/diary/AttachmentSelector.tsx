import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DocumentFile } from "../../types/common";
import DocumentPickerComponent from "./DocumentPickerComponent";
import ImagePickerComponent from "./ImagePickerComponent";

interface AttachmentSelectorProps {
  selectedImages?: string[];
  documents?: DocumentFile[];
  onImageSelected?: (uri: string[]) => void;
  onDocumentSelected?: (document: DocumentFile[]) => void;
}

export default function AttachmentSelector({
  selectedImages = [],
  documents = [],
  onImageSelected,
  onDocumentSelected,
}: AttachmentSelectorProps) {
  const handleImageSelected = (uris: string[]) => {
    onImageSelected?.(uris);
  };

  const handleDocumentSelected = (docs: DocumentFile[]) => {
    onDocumentSelected?.(docs);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Thông tin đính kèm:</Text>
      <ImagePickerComponent
        onImageSelected={handleImageSelected}
        selectedImages={selectedImages}
      />
      <DocumentPickerComponent
        onDocumentSelected={handleDocumentSelected}
        documents={documents}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 8,
    marginLeft: 4,
  },
});
