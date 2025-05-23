import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react"; // Thêm useState
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  List,
  ProgressBar,
  Text,
  useTheme,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import { Project } from "../../redux/slices/projectSlice"; // Vẫn giữ Project interface
import http from "../../utils/http"; // Import http client

// Định nghĩa kiểu cho route params
type ProjectDetailsScreenRouteProp = RouteProp<
  { ProjectDetails: { projectId: string } },
  "ProjectDetails"
>;

export default function ProjectDetailsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute<ProjectDetailsScreenRouteProp>();
  const { projectId } = route.params; // Lấy projectId từ route

  // Sử dụng state cục bộ thay vì Redux
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // State để lưu lỗi

  useEffect(() => {
    if (projectId) {
      const fetchProjectDetails = async () => {
        setLoading(true);
        setError(null); // Reset lỗi trước mỗi lần fetch
        try {
          // Giả sử API trả về trực tiếp đối tượng Project
          // Nếu API trả về cấu trúc { rc, data } thì cần điều chỉnh: response.data
          const { rc, item } = await http.get<{
            rc: { code: number; message: string };
            item: Project;
          }>(`/auth/duan/info/${projectId}`);

          console.log(
            "Dữ liệu dự án:",
            item,
            rc,
            `/auth/duan/info/${projectId}`
          ); // Debug log

          if (rc.code !== 0) {
            throw new Error("Lỗi khi lấy dữ liệu dự án");
          }

          // Bổ sung/enrich dữ liệu cho item dự án nếu thiếu trường
          const enrichedItem: Project = {
            ...item,
            progress: typeof item.progress === "number" ? item.progress : 0.7,
            status: item.status || "Pending",
            image:
              item.image ||
              `https://picsum.photos/400/600?random=${item.id || "default"}`,
            approvalDate: item.approvalDate || undefined,
            approvedBy: item.approvedBy || undefined,
          };

          setProject(enrichedItem);
        } catch (err: any) {
          console.error("Lỗi khi lấy chi tiết dự án trực tiếp:", err);
          setError(err.message || "Không thể tải dữ liệu dự án.");
          setProject(null); // Đảm bảo project là null khi có lỗi
        }
        setLoading(false);
      };

      fetchProjectDetails();
    }
  }, [projectId]); // Chỉ phụ thuộc vào projectId

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Chưa cập nhật";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={styles.centered}>
          <ActivityIndicator animating={true} size="large" />
          <Text style={{ marginTop: 16 }}>Đang tải dữ liệu dự án...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  // Cập nhật điều kiện hiển thị lỗi
  if (error) {
    return (
      <ScreenWrapper>
        <ScreenHeader title="Lỗi" onBackPress={() => navigation.goBack()} />
        <View style={styles.centered}>
          <Icon
            name="alert-circle-outline"
            size={80}
            color={theme.colors.error}
          />
          <Text variant="headlineSmall" style={styles.errorTitle}>
            Đã xảy ra lỗi
          </Text>
          <Text variant="bodyLarge" style={styles.errorSubtitle}>
            {error}
          </Text>
          <Button
            mode="contained"
            onPress={() => {
              if (projectId) {
                // Thử tải lại dữ liệu
                const fetchProjectDetails = async () => {
                  setLoading(true);
                  setError(null);
                  try {
                    const responseData = await http.get<Project>(
                      `/auth/duan/info/${projectId}`
                    );
                    setProject(responseData);
                  } catch (err: any) {
                    console.error("Lỗi khi thử lại:", err);
                    setError(err.message || "Không thể tải dữ liệu dự án.");
                    setProject(null);
                  }
                  setLoading(false);
                };
                fetchProjectDetails();
              }
            }}
            style={{ marginTop: 24, marginRight: 8 }}
            icon="refresh"
          >
            Thử lại
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 24 }}
            icon="arrow-left"
          >
            Quay lại
          </Button>
        </View>
      </ScreenWrapper>
    );
  }

  if (!project) {
    // Nếu không loading, không error, mà project vẫn null (trường hợp hiếm)
    return (
      <ScreenWrapper>
        <ScreenHeader
          title="Không tìm thấy dự án"
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centered}>
          <Icon
            name="alert-circle-outline"
            size={80}
            color={theme.colors.error}
          />
          <Text variant="headlineSmall" style={styles.errorTitle}>
            Không tìm thấy thông tin dự án
          </Text>
          <Text variant="bodyLarge" style={styles.errorSubtitle}>
            Dự án bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 24 }}
            icon="arrow-left"
          >
            Quay lại danh sách
          </Button>
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <ScreenHeader
        title="Chi tiết dự án"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {project.image && (
          <Card.Cover source={{ uri: project.image }} style={styles.cover} />
        )}

        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.projectName}>
              {project.name}
            </Text>
            <View style={styles.metaContainer}>
              <Chip
                icon="information-outline"
                style={styles.chip}
                textStyle={styles.chipText}
                mode="outlined"
              >
                {project.code}
              </Chip>
              {/* XÓA Chip trạng thái ở đây */}
            </View>

            {project.description && (
              <Text variant="bodyMedium" style={styles.description}>
                {project.description}
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* THÊM MỚI: Card hiển thị Trạng thái dự án */}
        {project.status && (
          <Card style={styles.card}>
            <Card.Title
              title="Trạng thái dự án"
              titleVariant="titleLarge"
              titleStyle={{ fontWeight: "bold" }}
            />
            <Divider />
            <Card.Content style={styles.statusCardContent}>
              <Chip
                icon={
                  project.status === "Đang tiến hành"
                    ? "progress-wrench"
                    : project.status === "Hoàn thành"
                    ? "check-circle-outline"
                    : "information-outline"
                }
                style={[
                  styles.statusChip, // Kiểu dáng mới cho Chip trạng thái
                  {
                    backgroundColor:
                      project.status === "Hoàn thành"
                        ? theme.colors.primaryContainer
                        : project.status === "Đang tiến hành"
                        ? theme.colors.tertiaryContainer
                        : theme.colors.surfaceVariant,
                  },
                ]}
                textStyle={[
                  styles.statusChipText, // Kiểu chữ mới cho Chip trạng thái
                  {
                    color:
                      project.status === "Hoàn thành"
                        ? theme.colors.onPrimaryContainer
                        : project.status === "Đang tiến hành"
                        ? theme.colors.onTertiaryContainer
                        : theme.colors.onSurfaceVariant,
                  },
                ]}
              >
                {project.status}
              </Chip>
            </Card.Content>
          </Card>
        )}

        {/* Card hiển thị Tiến độ dự án */}
        {typeof project.progress === "number" && (
          <Card style={styles.card}>
            <Card.Title
              title="Tiến độ dự án"
              titleVariant="titleLarge"
              titleStyle={{ fontWeight: "bold" }}
            />
            <Divider />
            <Card.Content>
              <View style={styles.progressContainer}>
                <Text
                  variant="labelLarge"
                  style={{ marginBottom: 4, marginTop: 8 }} // Thêm marginTop để có khoảng cách với Divider
                >
                  Tiến độ tổng thể: {Math.round(project.progress * 100)}%
                </Text>
                <ProgressBar
                  progress={project.progress}
                  color={theme.colors.primary}
                  style={styles.progressBar}
                />
              </View>
            </Card.Content>
          </Card>
        )}

        <Card style={styles.card}>
          <Card.Title
            title="Thông tin chung"
            titleVariant="titleLarge"
            titleStyle={{ fontWeight: "bold" }}
          />
          <Divider />
          <List.Item
            title="Ngày bắt đầu"
            description={formatDate(project.start_at)}
            left={(props) => <List.Icon {...props} icon="calendar-start" />}
            titleStyle={{ fontWeight: "bold" }}
          />
          <List.Item
            title="Ngày kết thúc (dự kiến)"
            description={formatDate(project.finish_at)}
            left={(props) => <List.Icon {...props} icon="calendar-end" />}
            titleStyle={{ fontWeight: "bold" }}
          />
          {project.approvalDate && (
            <List.Item
              title="Ngày phê duyệt"
              description={formatDate(project.approvalDate)}
              left={(props) => <List.Icon {...props} icon="calendar-check" />}
              titleStyle={{ fontWeight: "bold" }}
            />
          )}
          {project.approvedBy && (
            <List.Item
              title="Người phê duyệt"
              description={project.approvedBy}
              left={(props) => <List.Icon {...props} icon="account-check" />}
              titleStyle={{ fontWeight: "bold" }}
            />
          )}
          <List.Item
            title="Người tạo"
            description={project.creator_id} // Có thể cần map ID sang tên người dùng
            left={(props) => <List.Icon {...props} icon="account-edit" />}
            titleStyle={{ fontWeight: "bold" }}
          />
        </Card>

        <Card style={styles.card}>
          <Card.Title
            title="Các bên liên quan"
            titleVariant="titleLarge"
            titleStyle={{ fontWeight: "bold" }}
          />
          <Divider />
          <List.Item
            title="Nhà thầu thi công"
            description={project.nha_thau_thi_cong_name || "Chưa cập nhật"}
            left={(props) => <List.Icon {...props} icon="office-building" />}
            titleStyle={{ fontWeight: "bold" }}
          />
          <List.Item
            title="Tư vấn giám sát"
            description={project.tu_van_giam_sat_name || "Chưa cập nhật"}
            left={(props) => <List.Icon {...props} icon="account-hard-hat" />}
            titleStyle={{ fontWeight: "bold" }}
          />
          <List.Item
            title="Tư vấn thiết kế"
            description={project.tu_van_thiet_ke_name || "Chưa cập nhật"}
            left={(props) => <List.Icon {...props} icon="pencil-ruler" />}
            titleStyle={{ fontWeight: "bold" }}
          />
        </Card>

        {/* Nút quay lại có thể đặt ở đây hoặc chỉ dùng header */}
        {/* <Button
          mode="outlined"
          onPress={() => navigation.goBack()}
          style={styles.backButton}
          icon="arrow-left"
        >
          Quay lại danh sách
        </Button> */}
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5", // Màu nền nhẹ nhàng
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  errorTitle: {
    marginTop: 16,
    marginBottom: 8,
    textAlign: "center",
    fontWeight: "bold",
  },
  errorSubtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 24,
  },
  cover: {
    height: 200,
    marginBottom: 16,
    borderRadius: 12, // Bo góc cho ảnh
  },
  card: {
    marginBottom: 16,
    borderRadius: 12, // Bo góc cho card
    elevation: 2, // Độ nổi nhẹ
  },
  projectName: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginBottom: 12,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 12, // Kích thước chữ nhỏ hơn cho chip
  },
  description: {
    marginBottom: 16,
    lineHeight: 22, // Giãn dòng cho dễ đọc
    color: "#424242", // Màu chữ tối hơn một chút
  },
  // THÊM MỚI: Styles cho Card Trạng thái
  statusCardContent: {
    paddingVertical: 16,
    alignItems: "center", // Căn giữa Chip trạng thái
  },
  statusChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    height: "auto", // Chiều cao tự động theo nội dung
  },
  statusChipText: {
    fontSize: 16, // Kích thước chữ lớn hơn
    fontWeight: "600", // Hơi đậm hơn
  },
  progressContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
  // backButton: { // Nếu bạn muốn có nút quay lại ở cuối
  //   marginTop: 16,
  //   marginBottom: 32,
  // },
});
