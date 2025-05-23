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
  Avatar,
} from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import ScreenHeader from "../../components/ui/ScreenHeader";
import ScreenWrapper from "../../components/ui/ScreenWrapper";
import { Project } from "../../redux/slices/projectSlice";
import http from "../../utils/http";
import { ICONS_NAME } from "../../constants/icon";
import { PROJECT_TEXTS } from "../../constants/project";

// Định nghĩa kiểu cho route params
type ProjectDetailsScreenRouteProp = RouteProp<
  { ProjectDetails: { projectId: string } },
  "ProjectDetails"
>;

export default function ProjectDetailsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute<ProjectDetailsScreenRouteProp>();
  const { projectId } = route.params;

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      const fetchProjectDetails = async () => {
        setLoading(true);
        setError(null);
        try {
          const { rc, item } = await http.get<{
            rc: { code: number; message: string };
            item: Project;
          }>(`/auth/duan/info/${projectId}`);

          if (rc.code !== 0) {
            throw new Error(
              item?.name // API có thể trả về item với name dù lỗi
                ? `Lỗi khi lấy dữ liệu dự án "${
                    item.name
                  }" (ID: ${projectId}). ${rc.message || ""}`.trim()
                : `Lỗi khi lấy dữ liệu dự án (ID: ${projectId}). ${
                    rc.message || "Không có thông báo lỗi cụ thể."
                  }`.trim()
            );
          }

          // Bổ sung/enrich dữ liệu cho item dự án nếu thiếu trường
          const enrichedItem: Project = {
            ...item,
            // Đảm bảo progress là số và nằm trong khoảng 0-100
            progress:
              typeof item.progress === "number"
                ? Math.max(0, Math.min(100, item.progress))
                : 0, // Mặc định là 0 nếu không có hoặc sai định dạng
            status: item.status || PROJECT_TEXTS.STATUS_LABEL.UNKNOWN,
            image:
              item.image ||
              // `https://picsum.photos/seed/${item.id || "default"}/600/400`, // Dùng seed để ảnh ổn định hơn
              undefined, // Để trống nếu không có ảnh, sẽ dùng Avatar
            approvalDate: item.approvalDate || undefined,
            approvedBy: item.approvedBy || undefined,
            // Đảm bảo các trường tên không bị null/undefined
            nha_thau_thi_cong_name:
              item.nha_thau_thi_cong_name || PROJECT_TEXTS.COMMON.NOT_AVAILABLE,
            tu_van_giam_sat_name:
              item.tu_van_giam_sat_name || PROJECT_TEXTS.COMMON.NOT_AVAILABLE,
            tu_van_thiet_ke_name:
              item.tu_van_thiet_ke_name || PROJECT_TEXTS.COMMON.NOT_AVAILABLE,
            creator_id: item.creator_id || PROJECT_TEXTS.COMMON.NOT_AVAILABLE,
          };

          setProject(enrichedItem);
        } catch (err: any) {
          console.error("Lỗi khi lấy chi tiết dự án:", err);
          setError(err.message || "Không thể tải dữ liệu dự án.");
          setProject(null);
        }
        setLoading(false);
      };

      fetchProjectDetails();
    }
  }, [projectId]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return PROJECT_TEXTS.COMMON.NOT_AVAILABLE;
    try {
      return new Date(dateString).toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (e) {
      return PROJECT_TEXTS.COMMON.NOT_AVAILABLE;
    }
  };

  // Hàm getStatusStyle tương tự như trong ProjectItem.tsx
  const getStatusStyle = (status: string | undefined) => {
    switch (status) {
      case PROJECT_TEXTS.STATUS_LABEL.APPROVED:
      case PROJECT_TEXTS.STATUS_LABEL.COMPLETED:
        return {
          icon: ICONS_NAME.CHECK_CIRCLE_OUTLINE,
          backgroundColor: theme.colors.tertiaryContainer,
          textColor: theme.colors.onTertiaryContainer,
        };
      case PROJECT_TEXTS.STATUS_LABEL.IN_PROGRESS:
        return {
          icon: ICONS_NAME.PROGRESS_WRENCH,
          backgroundColor: theme.colors.secondaryContainer,
          textColor: theme.colors.onSecondaryContainer,
        };
      case PROJECT_TEXTS.STATUS_LABEL.PENDING:
        return {
          icon: ICONS_NAME.TIMER_SAND,
          backgroundColor: theme.colors.surfaceVariant,
          textColor: theme.colors.onSurfaceVariant,
        };
      case PROJECT_TEXTS.STATUS_LABEL.REJECTED:
      case PROJECT_TEXTS.STATUS_LABEL.CANCELLED:
        return {
          icon: ICONS_NAME.CLOSE_CIRCLE,
          backgroundColor: theme.colors.errorContainer,
          textColor: theme.colors.onErrorContainer,
        };
      default:
        return {
          icon: ICONS_NAME.HELP_CIRCLE,
          backgroundColor: theme.colors.surfaceDisabled,
          textColor: theme.colors.onSurfaceDisabled,
        };
    }
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
        <ScreenHeader
          title={PROJECT_TEXTS.COMMON.ERROR_TITLE}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centered}>
          <Icon
            name={ICONS_NAME.ALERT_CIRCLE_OUTLINE}
            size={80}
            color={theme.colors.error}
          />
          <Text
            variant="headlineSmall"
            style={[styles.errorTitle, { color: theme.colors.error }]}
          >
            {PROJECT_TEXTS.COMMON.ERROR_OCCURRED}
          </Text>
          <Text
            variant="bodyLarge"
            style={[
              styles.errorSubtitle,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {error}
          </Text>
          <Button
            mode="contained"
            onPress={() => {
              if (projectId) {
                const fetchProjectDetails = async () => {
                  setLoading(true);
                  setError(null);
                  try {
                    const { rc, item } = await http.get<{
                      rc: { code: number; message: string };
                      item: Project;
                    }>(`/auth/duan/info/${projectId}`);
                    if (rc.code !== 0)
                      throw new Error(rc.message || "Failed to fetch");
                    const enrichedItem: Project = {
                      ...item,
                      progress:
                        typeof item.progress === "number"
                          ? Math.max(0, Math.min(100, item.progress))
                          : 0,
                      status: item.status || PROJECT_TEXTS.STATUS_LABEL.UNKNOWN,
                      image: item.image || undefined,
                      approvalDate: item.approvalDate || undefined,
                      approvedBy: item.approvedBy || undefined,
                      nha_thau_thi_cong_name:
                        item.nha_thau_thi_cong_name ||
                        PROJECT_TEXTS.COMMON.NOT_AVAILABLE,
                      tu_van_giam_sat_name:
                        item.tu_van_giam_sat_name ||
                        PROJECT_TEXTS.COMMON.NOT_AVAILABLE,
                      tu_van_thiet_ke_name:
                        item.tu_van_thiet_ke_name ||
                        PROJECT_TEXTS.COMMON.NOT_AVAILABLE,
                      creator_id:
                        item.creator_id || PROJECT_TEXTS.COMMON.NOT_AVAILABLE,
                    };
                    setProject(enrichedItem);
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
            icon={ICONS_NAME.REFRESH}
          >
            {PROJECT_TEXTS.ACTIONS.RETRY}
          </Button>
          <Button
            mode="outlined"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 24 }}
            icon={ICONS_NAME.ARROW_LEFT}
          >
            {PROJECT_TEXTS.ACTIONS.BACK}
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
          title={PROJECT_TEXTS.COMMON.PROJECT_NOT_FOUND}
          onBackPress={() => navigation.goBack()}
        />
        <View style={styles.centered}>
          <Icon
            name={ICONS_NAME.ALERT_CIRCLE_OUTLINE}
            size={80}
            color={theme.colors.error}
          />
          <Text
            variant="headlineSmall"
            style={[styles.errorTitle, { color: theme.colors.error }]}
          >
            {PROJECT_TEXTS.COMMON.PROJECT_NOT_FOUND_DETAIL}
          </Text>
          <Text
            variant="bodyLarge"
            style={[
              styles.errorSubtitle,
              { color: theme.colors.onSurfaceVariant },
            ]}
          >
            {PROJECT_TEXTS.COMMON.PROJECT_NOT_FOUND_SUBTITLE}
          </Text>
          <Button
            mode="contained"
            onPress={() => navigation.goBack()}
            style={{ marginTop: 24 }}
            icon={ICONS_NAME.ARROW_LEFT}
          >
            {PROJECT_TEXTS.ACTIONS.BACK_TO_LIST}
          </Button>
        </View>
      </ScreenWrapper>
    );
  }

  const statusStyle = getStatusStyle(project.status);

  return (
    <ScreenWrapper>
      <ScreenHeader
        title={PROJECT_TEXTS.SCREEN_TITLE.PROJECT_DETAILS}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: theme.colors.background },
        ]}
      >
        {project.image ? (
          <Card.Cover
            source={{ uri: project.image }}
            style={styles.coverImage}
          />
        ) : (
          <View
            style={[
              styles.avatarContainer,
              { backgroundColor: theme.colors.surfaceVariant },
            ]}
          >
            <Avatar.Icon
              size={120}
              icon={ICONS_NAME.IMAGE}
              style={{ backgroundColor: theme.colors.surfaceVariant }}
              color={theme.colors.onSurfaceVariant}
            />
          </View>
        )}

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text
              variant="headlineMedium"
              style={[styles.projectName, { color: theme.colors.onSurface }]}
            >
              {project.name}
            </Text>
            <View style={styles.row}>
              <Icon
                name={ICONS_NAME.CODE_BRACES}
                size={20}
                color={theme.colors.onSurfaceVariant}
                style={styles.metaIcon}
              />
              <Text
                variant="bodyMedium"
                style={[
                  styles.projectCode,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                {PROJECT_TEXTS.INFO.CODE}: {project.code}
              </Text>
            </View>

            {project.description && (
              <>
                <Divider
                  style={[
                    styles.divider,
                    { backgroundColor: theme.colors.outline },
                  ]}
                />
                <View style={styles.row}>
                  <Icon
                    name={ICONS_NAME.INFORMATION_OUTLINE}
                    size={20}
                    color={theme.colors.onSurfaceVariant}
                    style={styles.metaIcon}
                  />
                  <Text
                    variant="titleSmall"
                    style={[
                      styles.sectionTitle,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    {PROJECT_TEXTS.INFO.DESCRIPTION}
                  </Text>
                </View>
                <Text
                  variant="bodyMedium"
                  style={[
                    styles.description,
                    { color: theme.colors.onSurface },
                  ]}
                >
                  {project.description}
                </Text>
              </>
            )}
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.rowSpaceBetween}>
              <View style={styles.row}>
                <Icon
                  name={ICONS_NAME.GAUGE}
                  size={20}
                  color={theme.colors.onSurfaceVariant}
                  style={styles.metaIcon}
                />
                <Text
                  variant="titleSmall"
                  style={[
                    styles.sectionTitle,
                    { color: theme.colors.onSurfaceVariant },
                  ]}
                >
                  {PROJECT_TEXTS.INFO.STATUS}
                </Text>
              </View>
              <Chip
                icon={() => (
                  <Icon
                    name={statusStyle.icon}
                    size={18}
                    color={statusStyle.textColor}
                  />
                )}
                style={[
                  styles.statusChipDetails,
                  { backgroundColor: statusStyle.backgroundColor },
                ]}
                textStyle={[
                  styles.statusChipTextDetails,
                  { color: statusStyle.textColor },
                ]}
                mode="flat"
              >
                {project.status || PROJECT_TEXTS.STATUS_LABEL.UNKNOWN}
              </Chip>
            </View>

            {typeof project.progress === "number" && (
              <>
                <Divider
                  style={[
                    styles.divider,
                    { backgroundColor: theme.colors.outline },
                  ]}
                />
                <View style={styles.row}>
                  <Icon
                    name={ICONS_NAME.CHART_BAR}
                    size={20}
                    color={theme.colors.onSurfaceVariant}
                    style={styles.metaIcon}
                  />
                  <Text
                    variant="titleSmall"
                    style={[
                      styles.sectionTitle,
                      { color: theme.colors.onSurfaceVariant },
                    ]}
                  >
                    {PROJECT_TEXTS.INFO.PROGRESS}
                  </Text>
                </View>
                <View style={styles.progressContainerDetails}>
                  <ProgressBar
                    progress={(project.progress || 0) / 100}
                    color={theme.colors.primary}
                    style={[
                      styles.progressBarDetails,
                      { backgroundColor: theme.colors.surfaceDisabled },
                    ]}
                  />
                  <Text
                    variant="bodyMedium"
                    style={[
                      styles.progressTextDetails,
                      { color: theme.colors.primary },
                    ]}
                  >
                    {project.progress}%
                  </Text>
                </View>
              </>
            )}
          </Card.Content>
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title={PROJECT_TEXTS.INFO.GENERAL_INFO}
            titleVariant="titleLarge"
            titleStyle={[styles.cardTitle, { color: theme.colors.primary }]}
            left={(props) => (
              <Icon
                {...props}
                name={ICONS_NAME.INFORMATION}
                size={24}
                color={theme.colors.primary}
              />
            )}
          />
          <Divider style={{ backgroundColor: theme.colors.outline }} />
          <List.Item
            title={PROJECT_TEXTS.INFO.START_DATE}
            description={formatDate(project.start_at)}
            left={(props) => (
              <List.Icon {...props} icon={ICONS_NAME.CALENDAR_START} />
            )}
            titleStyle={[
              styles.listItemTitle,
              { color: theme.colors.onSurface },
            ]} // Sử dụng theme.colors
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
          />
          <List.Item
            title={PROJECT_TEXTS.INFO.FINISH_DATE}
            description={formatDate(project.finish_at)}
            left={(props) => (
              <List.Icon {...props} icon={ICONS_NAME.CALENDAR_CHECK} />
            )}
            titleStyle={[
              styles.listItemTitle,
              { color: theme.colors.onSurface },
            ]} // Sử dụng theme.colors
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
          />
          {project.approvalDate && (
            <List.Item
              title={PROJECT_TEXTS.INFO.APPROVAL_DATE}
              description={formatDate(project.approvalDate)}
              left={(props) => (
                <List.Icon
                  {...props}
                  icon={ICONS_NAME.CALENDAR_MULTIPLE_CHECK}
                />
              )}
              titleStyle={[
                styles.listItemTitle,
                { color: theme.colors.onSurface },
              ]} // Sử dụng theme.colors
              descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
            />
          )}
          {project.approvedBy &&
            project.approvedBy !== PROJECT_TEXTS.COMMON.NOT_AVAILABLE && (
              <List.Item
                title={PROJECT_TEXTS.INFO.APPROVED_BY}
                description={project.approvedBy}
                left={(props) => (
                  <List.Icon {...props} icon={ICONS_NAME.ACCOUNT_CHECK} />
                )}
                titleStyle={[
                  styles.listItemTitle,
                  { color: theme.colors.onSurface },
                ]} // Sử dụng theme.colors
                descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
              />
            )}
          <List.Item
            title={PROJECT_TEXTS.INFO.CREATED_AT}
            description={formatDate(project.created_at)}
            left={(props) => (
              <List.Icon {...props} icon={ICONS_NAME.CALENDAR_PLUS} />
            )}
            titleStyle={[
              styles.listItemTitle,
              { color: theme.colors.onSurface },
            ]} // Sử dụng theme.colors
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
          />
          <List.Item
            title={PROJECT_TEXTS.INFO.CREATOR}
            description={project.creator_id}
            left={(props) => (
              <List.Icon {...props} icon={ICONS_NAME.ACCOUNT_EDIT} />
            )}
            titleStyle={[
              styles.listItemTitle,
              { color: theme.colors.onSurface },
            ]} // Sử dụng theme.colors
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
          />
        </Card>

        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Title
            title={PROJECT_TEXTS.INFO.STAKEHOLDERS}
            titleVariant="titleLarge"
            titleStyle={[styles.cardTitle, { color: theme.colors.primary }]}
            left={(props) => (
              <Icon
                {...props}
                name={ICONS_NAME.ACCOUNT_GROUP}
                size={24}
                color={theme.colors.primary}
              />
            )}
          />
          <Divider style={{ backgroundColor: theme.colors.outline }} />
          <List.Item
            title={PROJECT_TEXTS.INFO.CONTRACTOR}
            description={project.nha_thau_thi_cong_name}
            left={(props) => (
              <List.Icon {...props} icon={ICONS_NAME.ACCOUNT_HARD_HAT} />
            )}
            titleStyle={[
              styles.listItemTitle,
              { color: theme.colors.onSurface },
            ]} // Sử dụng theme.colors
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
          />
          <List.Item
            title={PROJECT_TEXTS.INFO.SUPERVISION_CONSULTANT}
            description={project.tu_van_giam_sat_name}
            left={(props) => (
              <List.Icon {...props} icon={ICONS_NAME.ACCOUNT_EYE} />
            )}
            titleStyle={[
              styles.listItemTitle,
              { color: theme.colors.onSurface },
            ]} // Sử dụng theme.colors
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
          />
          <List.Item
            title={PROJECT_TEXTS.INFO.DESIGN_CONSULTANT}
            description={project.tu_van_thiet_ke_name}
            left={(props) => (
              <List.Icon {...props} icon={ICONS_NAME.PENCIL_RULER} />
            )}
            titleStyle={[
              styles.listItemTitle,
              { color: theme.colors.onSurface },
            ]} // Sử dụng theme.colors
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
          />
        </Card>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16, // Sử dụng giá trị cụ thể thay vì GlobalStyles
    // backgroundColor: theme.colors.background, // Sẽ được áp dụng inline
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
    // color: theme.colors.error, // Sẽ được áp dụng inline
  },
  errorSubtitle: {
    textAlign: "center",
    // color: theme.colors.onSurfaceVariant, // Sẽ được áp dụng inline
    marginBottom: 24,
  },
  coverImage: {
    height: 220,
    marginBottom: 16,
    borderRadius: 12, // Sử dụng giá trị cụ thể
  },
  avatarContainer: {
    height: 220,
    marginBottom: 16,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: theme.colors.surfaceVariant, // Sẽ được áp dụng inline
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 1,
    // backgroundColor: theme.colors.surface, // Sẽ được áp dụng inline
  },
  cardTitle: {
    fontWeight: "bold",
  },
  projectName: {
    fontWeight: "bold",
    marginBottom: 8,
    // color: theme.colors.onSurface, // Sẽ được áp dụng inline
  },
  projectCode: {
    // color: theme.colors.onSurfaceVariant, // Sẽ được áp dụng inline
    marginLeft: 8,
  },
  metaIcon: {
    marginRight: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4, // Giảm margin
  },
  rowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4, // Giảm margin
  },
  sectionTitle: {
    fontWeight: "600",
    // color: theme.colors.onSurfaceVariant, // Sẽ được áp dụng inline
  },
  description: {
    marginTop: 8,
    lineHeight: 22,
    // color: theme.colors.onSurface, // Sẽ được áp dụng inline
  },
  divider: {
    marginVertical: 16,
    // backgroundColor: theme.colors.outline, // Sẽ được áp dụng inline
  },
  statusChipDetails: {
    paddingHorizontal: 12, // Sử dụng giá trị cụ thể
    paddingVertical: 6, // Sử dụng giá trị cụ thể
    height: "auto",
    borderRadius: 16, // Sử dụng giá trị cụ thể
  },
  statusChipTextDetails: {
    fontSize: 14,
    fontWeight: "500",
  },
  progressContainerDetails: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  progressBarDetails: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    // backgroundColor: theme.colors.surfaceDisabled, // Sẽ được áp dụng inline
  },
  progressTextDetails: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  listItemTitle: {
    fontWeight: "600",
    // color: theme.colors.onSurface, // Sẽ được áp dụng inline
  },
});
