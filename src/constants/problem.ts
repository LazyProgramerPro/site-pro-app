export const PROBLEM_TEXTS = {
  SCREEN_TITLE: "Danh sách vấn đề",
  SELECT_PROJECT: "Chọn dự án",
  SELECT_CONSTRUCTION: "Chọn công trình",
  EMPTY_LIST: {
    TITLE: "Không tìm thấy vấn đề nào",
    SUBTITLE: "Thử lọc khác",
  },
  STATUS: {
    ALL: "Tất cả",
    COMPLETED: "Đã hoàn thành",
    IN_PROGRESS: "Đang xử lý",
    NOT_STARTED: "Chưa bắt đầu",
  },
  ACTIONS: {
    VIEW: "Xem chi tiết",
    EDIT: "Chỉnh sửa",
    DELETE: "Xoá",
    ASSIGN: "Giao việc",
  },
  INFO: {
    UPDATED_BY: "Cập nhật:",
    CREATED_BY: "Tạo bởi:",
  },
  ADD_BUTTON: "Thêm vấn đề",
  PLEASE_SELECT_PROJECT: "Vui lòng chọn dự án để xem vấn đề",
  PLEASE_SELECT_CONSTRUCTION: "Vui lòng chọn công trình để xem vấn đề",
  NO_PROBLEM: "Không có vấn đề nào",
} as const;

export const PROBLEM_TYPES = [
  {
    id: 1,
    name: "Vật liệu",
    description: "Các vấn đề liên quan đến vật liệu xây dựng",
  },
  { id: 2, name: "An toàn", description: "Các vấn đề về an toàn lao động" },
  { id: 3, name: "Tiến độ", description: "Các vấn đề về tiến độ thi công" },
  {
    id: 4,
    name: "Chất lượng",
    description: "Các vấn đề về chất lượng công trình",
  },
];

export const PROBLEM_SOLVERS = [
  { id: 1, name: "Nguyễn Chí Thanh" },
  { id: 2, name: "Trần Minh Hoàng" },
  { id: 3, name: "Lê Văn An" },
  { id: 4, name: "Phạm Văn Bình" },
  { id: 5, name: "Hoàng Văn Cường" },
];

export const PROBLEMS = [
  {
    id: 1,
    title: "Vấn đề về vật liệu thi công",
    date: "12/04/2025",
    status: PROBLEM_TEXTS.STATUS.COMPLETED,
    createdBy: "Nguyễn Chí Thanh",
    updatedBy: "Nguyễn Chí Thanh",
    description:
      "Phát hiện thiếu vật liệu xi măng cho công trình. Đã liên hệ nhà cung cấp và bổ sung kịp thời.",
    type: "Vật liệu",
    projectId: 1,
    constructionId: 1,
    assignedTo: [
      { id: 2, name: "Trần Minh Hoàng" },
      { id: 3, name: "Lê Văn An" },
      { id: 4, name: "Phạm Văn Bình" },
    ],
    createdAt: "2025-04-12T08:00:00Z",
    completionDate: "2025-04-12T17:00:00Z",
    approvedBy: { id: 2, name: "Trần Minh Hoàng" },
    approvalDate: "2025-04-12T18:00:00Z",
    images: [],
    supportingDocuments: [],
  },
  {
    id: 2,
    title: "Vấn đề về an toàn lao động",
    date: "10/04/2025",
    status: PROBLEM_TEXTS.STATUS.IN_PROGRESS,
    createdBy: "Nguyễn Chí Thanh",
    updatedBy: "Lê Văn An",
    description:
      "Phát hiện một số công nhân không tuân thủ quy định an toàn lao động. Đang xử lý và tăng cường giám sát.",
    type: "An toàn",
    projectId: 2,
    constructionId: 2,
    assignedTo: [
      { id: 3, name: "Lê Văn An" },
      { id: 4, name: "Phạm Văn Bình" },
    ],
    createdAt: "2025-04-10T09:00:00Z",
    completionDate: "2025-04-11T16:30:00Z",
    approvedBy: { id: 2, name: "Lê Văn An" },
    approvalDate: "2025-04-11T17:00:00Z",
    images: [],
    supportingDocuments: [],
  },
] as const;
