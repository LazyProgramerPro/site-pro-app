export const DIARY_TEXTS = {
  SCREEN_TITLE: "Danh sách nhật ký",
  SELECT_PROJECT: "Chọn dự án",
  SELECT_CONSTRUCTION: "Chọn công trình",
  SELECT_CONTRACT: "Chọn hợp đồng",
  EMPTY_LIST: {
    TITLE: "Không tìm thấy nhật ký nào",
    SUBTITLE: "Thử lọc khác",
  },
  STATUS: {
    ALL: "Tất cả",
    COMPLETED: "Đã hoàn thành",
    IN_PROGRESS: "Đang thực hiện",
    NOT_STARTED: "Chưa bắt đầu",
  },
  ACTIONS: {
    VIEW: "Xem chi tiết",
    EDIT: "Chỉnh sửa",
    DELETE: "Xoá",
  },
  INFO: {
    UPDATED_BY: "Cập nhật:",
    CREATED_BY: "Tạo bởi:",
  },
  ADD_BUTTON: "Thêm nhật ký",
} as const;

export const DIARY_TYPELIST = {
  DIARY: [
    { id: 0, name: "construction" },
    { id: 1, name: "material" },
    { id: 2, name: "planning" },
    { id: 3, name: "inspection" },
    { id: 4, name: "report" },
  ],
  CAPACITY: [
    { id: 0, name: "nhathauthicong" },
    { id: 1, name: "tuvanthietke" },
    { id: 2, name: "tuvangiamsat" },
    { id: 3, name: "chudautu" },
    { id: 4, name: "quantrivien" },
  ],
  SAFETY: [
    { id: 0, name: "Đảm bảo an toàn lao động theo quy định" },
    { id: 1, name: "Kiểm tra an toàn thiết bị" },
    { id: 2, name: "Chuẩn bị phương án an toàn" },
    { id: 3, name: "Đào tạo an toàn lao động" },
    { id: 4, name: "Kiểm tra trang thiết bị bảo hộ" },
  ],
  ENVIRONMENT: [
    { id: 0, name: "Tuân thủ các biện pháp bảo vệ môi trường" },
    { id: 1, name: "Xử lý chất thải xây dựng" },
    { id: 2, name: "Đánh giá tác động môi trường" },
    { id: 3, name: "Kiểm soát tiếng ồn và bụi" },
    { id: 4, name: "Quản lý nước thải" },
  ],
} as const;

export const DIARY_WEATHER_LIST = [
  { id: 0, name: "Nắng" },
  { id: 1, name: "Mưa" },
] as const;

export const DIARY_OPTIONS = {
  TYPES: [
    { id: "1", name: "Nhật ký thi công xây dựng" },
    { id: "2", name: "Nhật ký an toàn lao động" },
  ],

  SAFETY: [
    { id: "1", name: "An toàn" },
    { id: "2", name: "Cảnh báo" },
    { id: "3", name: "Nguy hiểm" },
  ],

  ENVIRONMENT: [
    { id: "1", name: "Trong nhà" },
    { id: "2", name: "Ngoài trời" },
    { id: "3", name: "Hỗn hợp" },
  ],

  WEATHER: [
    { id: "1", name: "Nắng" },
    { id: "2", name: "Mưa" },
    { id: "3", name: "Nhiều mây" },
    { id: "4", name: "Âm u" },
    { id: "5", name: "Sương mù" },
  ],
};

// Mock data for development
export const DIARY_MOCK_DATA = {
  PROJECTS: [
    { id: 1, name: "Xây dựng tuyến đường 01" },
    { id: 2, name: "Đường cao tốc Bắc Nam" },
    { id: 3, name: "Dự án cầu vượt" },
  ] as { id: number; name: string }[],

  CONSTRUCTIONS: [
    { id: 1, name: "Công trình A", projectId: 1 },
    { id: 2, name: "Công trình B", projectId: 2 },
    { id: 3, name: "Công trình C", projectId: 3 },
  ],

  DIARY_ENTRIES: [
    {
      id: 1,
      title: "Nhật ký ngày 12/04/2025",
      date: "12/04/2025",
      status: DIARY_TEXTS.STATUS.COMPLETED,
      createdBy: "Nguyễn Chí Thanh",
      updatedBy: "Nguyễn Chí Thanh",
      description: "Ghi chép về tiến độ thi công và các vấn đề phát sinh",
      type: { id: "1", name: "Nhật ký thi công xây dựng" },
      projectId: 1,
      constructionId: 1,
      weather: "Nắng",
      capacity: [
        { id: 0, name: "nhathauthicong" },
        { id: 1, name: "tuvanthietke" },
        { id: 2, name: "tuvangiamsat" },
      ],
      safety: { id: 0, name: "Đảm bảo an toàn lao động theo quy định" },
      environment: { id: 0, name: "Tuân thủ các biện pháp bảo vệ môi trường" },
      createdAt: "2025-04-12T08:00:00Z",
      completionDate: "2025-04-12T17:00:00Z",
      approvedBy: { id: 2, name: "Trần Minh Hoàng" },
      approvalDate: "2025-04-12T18:00:00Z",
      images: [],
      supportingDocuments: [],
    },
    {
      id: 2,
      title: "Nhật ký ngày 10/04/2025",
      date: "10/04/2025",
      status: DIARY_TEXTS.STATUS.IN_PROGRESS,
      createdBy: "Nguyễn Chí Thanh",
      updatedBy: "Lê Văn An",
      description: "Báo cáo về tình hình thi công và vật tư",
      type: { id: "1", name: "Nhật ký thi công xây dựng" },
      projectId: 2,
      constructionId: 2,
      weather: "Mưa",
      capacity: [
        { id: 0, name: "nhathauthicong" },
        { id: 2, name: "tuvangiamsat" },
      ],
      safety: { id: 1, name: "Kiểm tra an toàn thiết bị" },
      environment: { id: 1, name: "Xử lý chất thải xây dựng" },
      createdAt: "2025-04-10T09:00:00Z",
      completionDate: "2025-04-11T16:30:00Z",
      approvedBy: { id: 2, name: "Lê Văn An" },
      approvalDate: "2025-04-11T17:00:00Z",
      images: [],
      supportingDocuments: [],
    },
    {
      id: 3,
      title: "Nhật ký ngày 08/04/2025",
      date: "08/04/2025",
      status: DIARY_TEXTS.STATUS.NOT_STARTED,
      createdBy: "Nguyễn Chí Thanh",
      updatedBy: "Nguyễn Thị Hương",
      description: "Kế hoạch thi công tuần tới",
      type: { id: "2", name: "Nhật ký an toàn lao động" },
      projectId: 3,
      constructionId: 3,
      weather: "Nhiều mây",
      capacity: [
        { id: 0, name: "nhathauthicong" },
        { id: 1, name: "tuvanthietke" },
      ],
      safety: { id: 2, name: "Chuẩn bị phương án an toàn" },
      environment: { id: 2, name: "Đánh giá tác động môi trường" },
      createdAt: "2025-04-08T10:00:00Z",
      completionDate: "2025-04-09T15:00:00Z",
      approvedBy: { id: 1, name: "Nguyễn Thị Hương" },
      approvalDate: "2025-04-09T16:00:00Z",
      images: [],
      supportingDocuments: [],
    },
  ],
} as const;
