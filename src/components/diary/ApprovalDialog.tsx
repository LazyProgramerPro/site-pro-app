import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { GlobalStyles } from "../../constants/styles";

interface ApprovalDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onApprove: (comment: string) => void;
}

export default function ApprovalDialog({
  visible,
  onDismiss,
  onApprove,
}: ApprovalDialogProps) {
  const [comment, setComment] = useState("");

  const handleApprove = () => {
    onApprove(comment);
    setComment("");
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>Nhập nội dung comment.</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Comment"
            value={comment}
            onChangeText={setComment}
            mode="outlined"
            style={styles.input}
            multiline
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={onDismiss}
            buttonColor="#f44336"
            style={styles.button}
            textColor="white"
          >
            Thoát
          </Button>
          <Button
            onPress={handleApprove}
            buttonColor={GlobalStyles.colors.primary500}
            style={styles.button}
            textColor="white"
          >
            Đồng ý
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
  },
  input: {
    marginBottom: 16,
  },
  button: {
    minWidth: 100,
    paddingHorizontal: 20,
  },
});
