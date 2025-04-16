import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Card,
  Chip,
  Dialog,
  IconButton,
  Menu,
  Portal,
  Text,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

interface RequestItem {
  id: string;
  title: string;
  category: string;
  status?: string;
  updatedBy: string;
  createdBy: string;
  date?: string;
}

export default function AcceptanceRequestScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [selectedItem, setSelectedItem] = useState<RequestItem | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [visibleItemMenu, setVisibleItemMenu] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Simulate loading data
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const requestItems: RequestItem[] = [
    {
      id: "1",
      title: "Xây dựng tuyến đường 01",
      category: "Thi Công xây lắp",
      updatedBy: "tuvanthietke",
      createdBy: "nhathauthicong",
      date: "12/04/2025",
    },
    {
      id: "2",
      title: "Duc test2",
      category: "",
      status: "Không đúng ý nghiệm thu",
      updatedBy: "nhathauthicong",
      createdBy: "nhathauthicong",
      date: "10/04/2025",
    },
    {
      id: "3",
      title: "Ductest1",
      category: "",
      status: "Không đúng ý nghiệm thu",
      updatedBy: "tuvangiamsat",
      createdBy: "nhathauthicong",
      date: "08/04/2025",
    },
    {
      id: "4",
      title: "Đường cao tốc Bắc Nam",
      category: "Thi Công xây lắp",
      updatedBy: "tuvanthietke",
      createdBy: "nhathauthicong",
      date: "05/04/2025",
    },
  ];

  const filteredItems = requestItems.filter(
    (item) => !filterStatus || item.status === filterStatus
  );

  const clearSelection = () => setSelectedItem(null);

  const renderItem = ({ item }: { item: RequestItem }) => (
    <Card
      style={[styles.card, item.id === selectedItem?.id && styles.selectedCard]}
      onPress={() => setSelectedItem(item)}
    >
      <Card.Content>
        <View style={styles.itemHeader}>
          <View style={styles.itemHeaderLeft}>
            <Icon
              name="file-document-outline"
              size={20}
              color={
                item.id === selectedItem?.id ? theme.colors.primary : "#757575"
              }
            />
            <Text
              variant="titleMedium"
              style={item.id === selectedItem?.id ? styles.selectedText : {}}
            >
              {item.title}
            </Text>
          </View>
          <Menu
            visible={visibleItemMenu === item.id}
            onDismiss={() => setVisibleItemMenu(null)}
            anchor={
              <IconButton
                icon="dots-vertical"
                onPress={() => setVisibleItemMenu(item.id)}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                setVisibleItemMenu(null);
                setSelectedItem(item);
                console.log("View item");
              }}
              title="Xem chi tiết"
              leadingIcon="eye"
            />
            <Menu.Item
              onPress={() => {
                setVisibleItemMenu(null);
                setSelectedItem(item);
                console.log("Edit item");
              }}
              title="Chỉnh sửa"
              leadingIcon="pencil"
            />
            <Menu.Item
              onPress={() => {
                setVisibleItemMenu(null);
                setSelectedItem(item);
                setConfirmDelete(true);
              }}
              title="Xoá"
              leadingIcon="delete"
            />
          </Menu>
        </View>

        <View style={styles.contentSection}>
          {item.category ? (
            <View style={styles.categoryRow}>
              <Icon name="folder-outline" size={18} color="#757575" />
              <Text variant="bodyMedium">{item.category}</Text>
            </View>
          ) : null}

          {item.status ? (
            <Chip
              icon="alert-circle"
              style={styles.statusChip}
              textStyle={styles.statusText}
            >
              {item.status}
            </Chip>
          ) : null}

          {item.date && (
            <View style={styles.infoRow}>
              <Icon
                name="calendar"
                size={16}
                color="#757575"
                style={styles.infoIcon}
              />
              <Text variant="bodySmall">{item.date}</Text>
            </View>
          )}

          <View style={styles.infoRow}>
            <Icon
              name="account-edit"
              size={16}
              color="#757575"
              style={styles.infoIcon}
            />
            <Text variant="bodySmall">
              Cập nhật: <Text style={styles.userText}>{item.updatedBy}</Text>
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Icon
              name="account"
              size={16}
              color="#757575"
              style={styles.infoIcon}
            />
            <Text variant="bodySmall">
              Tạo bởi: <Text style={styles.userText}>{item.createdBy}</Text>
            </Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );

  const renderListHeader = () => (
    <View style={styles.listHeader}>
      <Text variant="titleMedium" style={styles.listTitle}>
        {filteredItems.length} yêu cầu nghiệm thu
      </Text>
      <View style={styles.filterContainer}>
        <Chip
          selected={filterStatus === null}
          onPress={() => setFilterStatus(null)}
          style={styles.filterChip}
        >
          Tất cả
        </Chip>
        <Chip
          selected={filterStatus === "Không đúng ý nghiệm thu"}
          onPress={() => setFilterStatus("Không đúng ý nghiệm thu")}
          style={styles.filterChip}
          icon="alert-circle"
        >
          Có vấn đề
        </Chip>
      </View>
    </View>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Icon name="file-search-outline" size={70} color="#bdbdbd" />
      <Text variant="titleMedium" style={styles.emptyText}>
        Không tìm thấy yêu cầu nào
      </Text>
      <Text variant="bodyMedium" style={styles.emptySubText}>
        Thử lọc khác
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />

      <Appbar.Header style={styles.appbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Yêu cầu nghiệm thu" />
        <Appbar.Action
          icon="plus"
          onPress={() => console.log("Add new request")}
        />
      </Appbar.Header>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyList}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      )}

      {selectedItem && (
        <View style={styles.buttonContainer}>
          <Button
            icon="eye"
            mode="contained"
            style={styles.button}
            onPress={() => console.log("View")}
          >
            Xem chi tiết
          </Button>
          <Button
            icon="send"
            mode="contained"
            style={styles.button}
            onPress={() => console.log("Update and send")}
          >
            Cập nhật và gửi yêu cầu
          </Button>
          <Button
            icon="close"
            mode="outlined"
            style={styles.cancelButton}
            onPress={clearSelection}
          >
            Huỷ chọn
          </Button>
        </View>
      )}

      <Portal>
        <Dialog
          visible={confirmDelete}
          onDismiss={() => setConfirmDelete(false)}
        >
          <Dialog.Title>Xác nhận xoá</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">
              Bạn có chắc chắn muốn xoá yêu cầu này không? Hành động này không
              thể hoàn tác.
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setConfirmDelete(false)}>Huỷ</Button>
            <Button
              mode="contained"
              buttonColor="#f44336"
              onPress={() => {
                console.log("Delete confirmed for item", selectedItem?.id);
                setConfirmDelete(false);
              }}
            >
              Xoá
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  appbar: {
    backgroundColor: "#fff",
    elevation: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
    flexGrow: 1,
  },
  listHeader: {
    marginBottom: 16,
  },
  listTitle: {
    marginBottom: 12,
    fontWeight: "500",
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  filterChip: {
    marginRight: 8,
  },
  card: {
    borderRadius: 12,
    elevation: 2,
  },
  selectedCard: {
    borderWidth: 2,
    borderColor: "#2196F3",
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  itemHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
  },
  selectedText: {
    fontWeight: "700",
    color: "#2196F3",
  },
  contentSection: {
    paddingLeft: 4,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  infoRow: {
    marginTop: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  infoIcon: {
    marginRight: 6,
  },
  userText: {
    fontWeight: "500",
  },
  statusChip: {
    alignSelf: "flex-start",
    backgroundColor: "#ffebee",
    marginVertical: 8,
  },
  statusText: {
    color: "#d32f2f",
    fontSize: 12,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    elevation: 8,
  },
  button: {
    marginBottom: 8,
    backgroundColor: "#2196F3",
  },
  cancelButton: {
    marginBottom: 8,
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 60,
  },
  emptyText: {
    marginTop: 16,
    color: "#757575",
  },
  emptySubText: {
    color: "#9e9e9e",
    marginTop: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    color: "#757575",
  },
});
