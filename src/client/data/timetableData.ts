export interface SystemTimeTableItem {
  id: string;
  courseCode: string; // Mã MH
  courseName: string; // Tên MH
  creditClass: string; // LTC (Lớp tín chỉ)
  credits: number; // Số tín chỉ
  classCode: string; // Lớp
  dayOfWeek: number; // Thứ (2-8)
  startPeriod: number; // Tiết bắt đầu
  periodsCount: number; // Số tiết
  room: string; // Phòng
  lecturer: string; // Giảng viên
  startDate: string; // Thời gian học start
  endDate: string; // Thời gian học end
  color?: string; // For grid view styling
}

// Data for Grid View (Specific Week)
export const timetableGridData: SystemTimeTableItem[] = [
  {
    id: "1",
    courseCode: "IC.0753",
    courseName: "Ứng dụng bản sắc văn hoá",
    creditClass: "1",
    credits: 3,
    classCode: "TTQT51B11624",
    dayOfWeek: 3, // Thứ 3
    startPeriod: 1,
    periodsCount: 6,
    room: "D101",
    lecturer: "Lương Thị Thu Hường",
    startDate: "26/01/2026",
    endDate: "05/05/2026",
    color: "#e6f7ff", // Light blue
  },
  {
    id: "2",
    courseCode: "IT.002.02",
    courseName: "Năng lực số",
    creditClass: "10",
    credits: 2,
    classCode: "",
    dayOfWeek: 4, // Thứ 4
    startPeriod: 7,
    periodsCount: 6,
    room: "_",
    lecturer: "_",
    startDate: "26/01/2026",
    endDate: "08/02/2026",
    color: "#e6f7ff",
  },
  {
    id: "3",
    courseCode: "IT.002.02",
    courseName: "Năng lực số",
    creditClass: "10",
    credits: 2,
    classCode: "",
    dayOfWeek: 6, // Thứ 6
    startPeriod: 1,
    periodsCount: 6,
    room: "_",
    lecturer: "_",
    startDate: "26/01/2026",
    endDate: "08/02/2026",
    color: "#e6f7ff",
  },
  {
    id: "5",
    courseCode: "IT.002.02",
    courseName: "Năng lực số",
    creditClass: "10",
    credits: 2,
    classCode: "",
    dayOfWeek: 5, // Thứ 5
    startPeriod: 7,
    periodsCount:6,
    room: "_",
    lecturer: "_",
    startDate: "26/01/2026",
    endDate: "08/02/2026",
    color: "#e6f7ff",
  },
];

// Data for List View (Semester View)
export const timetableListData: SystemTimeTableItem[] = [
  {
    id: "l1",
    courseCode: "IC.0753",
    courseName: "Ứng dụng bản sắc văn hoá",
    creditClass: "1",
    credits: 3,
    classCode: "_",
    dayOfWeek: 3,
    startPeriod: 1,
    periodsCount: 6,
    room: "_",
    lecturer: "Lương Thị Thu Hường",
    startDate: "26/01/2026",
    endDate: "05/2026",
    color: "#e6f7ff",
  },
  {
    id: "l2",
    courseCode: "IT.002.02",
    courseName: "Năng lực số",
    creditClass: "10",
    credits: 2,
    classCode: "_",
    dayOfWeek: 4,
    startPeriod: 1,
    periodsCount: 6,
    room: "_",
    lecturer: "_",
    startDate: "21/01/2026",
    endDate: "11/02/2026",
    color: "#e6f7ff",
  },
];
