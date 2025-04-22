import React from "react";
import { StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";

interface Capability {
  code: string;
  quantity: string;
  type: string;
  workforceQuantity: string;
}

interface CapabilityDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onSave: (capability: Capability) => void;
  initialCapability?: Capability;
}

export default function CapabilityDialog({
  visible,
  onDismiss,
  onSave,
  initialCapability = {
    code: "",
    quantity: "",
    type: "",
    workforceQuantity: "",
  },
}: CapabilityDialogProps) {
  const [capability, setCapability] =
    React.useState<Capability>(initialCapability);

  const handleSave = () => {
    if (
      capability.code &&
      capability.quantity &&
      capability.type &&
      capability.workforceQuantity
    ) {
      onSave(capability);
      setCapability(initialCapability);
    }
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss} style={styles.dialog}>
        <Dialog.Title>Thêm năng lực</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Mã năng lực"
            value={capability.code}
            onChangeText={(text) =>
              setCapability({ ...capability, code: text })
            }
            mode="outlined"
            style={styles.dialogInput}
          />
          <TextInput
            label="Số lượng"
            value={capability.quantity}
            onChangeText={(text) =>
              setCapability({ ...capability, quantity: text })
            }
            mode="outlined"
            style={styles.dialogInput}
            keyboardType="numeric"
          />
          <TextInput
            label="Máy móc"
            value={capability.type}
            onChangeText={(text) =>
              setCapability({ ...capability, type: text })
            }
            mode="outlined"
            style={styles.dialogInput}
          />
          <TextInput
            label="Số lượng nhân lực"
            value={capability.workforceQuantity}
            onChangeText={(text) =>
              setCapability({ ...capability, workforceQuantity: text })
            }
            mode="outlined"
            style={styles.dialogInput}
            keyboardType="numeric"
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Thoát</Button>
          <Button onPress={handleSave}>Tạo mới</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

const styles = StyleSheet.create({
  dialog: {
    backgroundColor: "white",
  },
  dialogInput: {
    marginBottom: 16,
  },
});
