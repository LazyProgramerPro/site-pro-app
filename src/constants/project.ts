export const PROJECT_TEXTS = {
  ADD_REQUEST: "Thêm yêu cầu nghiệm thu",
  NAME: "Yêu cầu nghiệm thu",
  SCREEN_TITLE: {
    ACCEPTANCE_REQUESTS: "Danh sách yêu cầu nghiệm thu",
    PROJECT_DETAILS: "Chi tiết dự án",
  },
  PLEASE_SELECT_PROJECT: "Vui lòng chọn dự án để xem yêu cầu nghiệm thu",
  PLEASE_SELECT_CONSTRUCTION:
    "Vui lòng chọn công trình để xem yêu cầu nghiệm thu",
  NO_ACCEPTANCE_REQUESTS: "Không có yêu cầu nghiệm thu nào",
  LOADING_DATA: "Đang tải dữ liệu...",
  SELECT_PROJECT: "Chọn dự án",
  SELECT_CONSTRUCTION: "Chọn công trình",
  SELECT_CONTRACT: "Chọn hợp đồng",
  EMPTY_LIST: {
    NO_DATA: "Không có yêu cầu nghiệm thu nào",
    TITLE: "Không tìm thấy yêu cầu nghiệm thu nào",
    SUBTITLE: "Thử lọc khác",
  },
  STATUS_LABEL: {
    ALL: "Tất cả",
    REJECTED: "Bị từ chối",
    APPROVED: "Đã duyệt",
    PENDING: "Chờ duyệt",
    IN_PROGRESS: "Đang thực hiện",
    COMPLETED: "Hoàn thành", // Added
    CANCELLED: "Đã hủy", // Added
    UNKNOWN: "Không xác định", // Trạng thái không xác định
  },
  STATUS_VALUE: {
    ALL: null,
    REJECTED: "REJECTED",
    APPROVED: "APPROVED",
    PENDING: "PENDING",
    IN_PROGRESS: "IN_PROGRESS",
  },
  ACTIONS: {
    VIEW: "Xem",
    EDIT: "Cập nhật và gửi yêu cầu nghiệm thu",
    DELETE: "Xoá",
    ADD: "Thêm",
    CANCEL: "Huỷ",
    APPROVE: "Duyệt",
    SAVE_ACCEPTANCE_REQUEST: "Lưu thông tin yêu cầu phê duyệt",
    SELECTED: "Chọn",
    RETRY: "Thử lại", // Added
    BACK: "Quay lại", // Added
    BACK_TO_LIST: "Quay lại danh sách", // Added
  },
  COMMON: {
    NOT_AVAILABLE: "N/A",
    OPTIONS: "Tùy chọn",
    OK: "OK",
    ERROR_TITLE: "Lỗi", // Added
    ERROR_OCCURRED: "Đã xảy ra lỗi", // Added
    PROJECT_NOT_FOUND: "Không tìm thấy dự án", // Added
    PROJECT_NOT_FOUND_DETAIL: "Không tìm thấy thông tin dự án", // Added
    PROJECT_NOT_FOUND_SUBTITLE:
      "Dự án bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.", // Added
  },
  INFO: {
    GENERAL_INFO: "Thông tin chung",
    CODE: "Mã dự án",
    NAME: "Tên dự án",
    DESCRIPTION: "Mô tả",
    INVESTOR: "Chủ đầu tư",
    CONSTRUCTION_CONTRACTOR: "Nhà thầu thi công",
    SUPERVISION_CONSULTANT: "Tư vấn giám sát",
    DESIGN_CONSULTANT: "Tư vấn thiết kế",
    START_DATE: "Ngày bắt đầu",
    FINISH_DATE: "Ngày kết thúc",
    EXPECTED_FINISH_DATE: "Ngày dự kiến hoàn thành",
    ACTUAL_FINISH_DATE: "Ngày hoàn thành thực tế",
    STATUS: "Trạng thái",
    PROGRESS: "Tiến độ", // Đã thêm
    LOCATION: "Địa điểm",
    CREATED_AT: "Ngày tạo",
    UPDATED_AT: "Ngày cập nhật",
    APPROVED_BY: "Người duyệt",
    APPROVAL_DATE: "Ngày duyệt",
    CONTRACTOR: "Nhà thầu thi công",
    CREATOR: "Người tạo", // Added
    STAKEHOLDERS: "Các bên liên quan", // Added
  },
  DIALOG: {
    DELETE_TITLE: "Xác nhận xoá",
    DELETE_MESSAGE: "Bạn có chắc chắn muốn xoá dự án này không?",
  },
  MESSAGES: {
    DELETE_SUCCESS: "Đã xoá dự án thành công",
  },
  ADD_BUTTON: "Thêm yêu cầu nghiệm thu",
} as const;
