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

export const DIARY_ICONS = {
  PROJECT: "folder",
  CONSTRUCTION: "office-building",
  CONTRACT: "file-document-outline",
  NOTEBOOK: "notebook-outline",
  CALENDAR: "calendar",
  ACCOUNT_EDIT: "account-edit",
  ACCOUNT: "account",
  EYE: "eye",
  PENCIL: "pencil",
  DELETE: "delete",
  DOTS_VERTICAL: "dots-vertical",
  PLUS: "plus",
  CHECK_CIRCLE: "check-circle",
  CLOCK: "clock",
  ALERT_CIRCLE: "alert-circle",
} as const;

export const DIARY_COLORS = {
  STATUS: {
    COMPLETED: {
      BACKGROUND: "#e8f5e9",
      TEXT: "#2e7d32",
    },
    IN_PROGRESS: {
      BACKGROUND: "#fff3e0",
      TEXT: "#f57c00",
    },
    NOT_STARTED: {
      BACKGROUND: "#ffebee",
      TEXT: "#d32f2f",
    },
  },
  ICON: {
    DEFAULT: "#757575",
    SELECTED: "#2196F3",
    EMPTY: "#bdbdbd",
  },
  TEXT: {
    PRIMARY: "#757575",
    SECONDARY: "#9e9e9e",
  },
} as const;

// Mock data for development
export const DIARY_MOCK_DATA = {
  PROJECTS: [
    "Xây dựng tuyến đường 01",
    "Xây dựng tuyến đường 02",
    "Xây dựng cầu vượt 01",
  ] as string[],

  CONSTRUCTIONS: {
    "Xây dựng tuyến đường 01": [
      "Công trình số 1",
      "Công trình số 2",
      "Công trình số 3",
    ],
    "Xây dựng tuyến đường 02": ["Công trình A", "Công trình B"],
    "Xây dựng cầu vượt 01": ["Công trình X", "Công trình Y"],
  } as { [key: string]: string[] },

  DIARY_ENTRIES: [
    {
      id: "1",
      title: "Nhật ký ngày 12/04/2025",
      date: "12/04/2025",
      status: DIARY_TEXTS.STATUS.COMPLETED,
      updatedBy: "tuvanthietke",
      createdBy: "nhathauthicong",
    },
    {
      id: "2",
      title: "Nhật ký ngày 10/04/2025",
      date: "10/04/2025",
      status: DIARY_TEXTS.STATUS.IN_PROGRESS,
      updatedBy: "nhathauthicong",
      createdBy: "nhathauthicong",
    },
    {
      id: "3",
      title: "Nhật ký ngày 08/04/2025",
      date: "08/04/2025",
      status: DIARY_TEXTS.STATUS.NOT_STARTED,
      updatedBy: "tuvangiamsat",
      createdBy: "nhathauthicong",
    },
  ],
} as const;
