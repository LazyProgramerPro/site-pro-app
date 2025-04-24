import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DocumentFile } from "../../types/common";
import ImagePickerComponent from "./ImagePickerComponent";
import DocumentPickerComponent from "./DocumentPickerComponent";

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
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
  },
  label: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 8,
    marginLeft: 4,
  },
});
