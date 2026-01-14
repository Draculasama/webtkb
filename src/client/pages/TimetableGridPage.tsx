import React, { useState } from 'react';
import { Card, Button, Typography, Avatar, Table, Select, Segmented } from 'antd';
import { 
  LeftOutlined, 
  RightOutlined, 
  UserOutlined, 
  SearchOutlined, 
  BarChartOutlined, 
  BellOutlined, 
  ShareAltOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  PrinterOutlined
} from '@ant-design/icons';
import { timetableGridData, timetableListData, SystemTimeTableItem } from '../data/timetableData';

const { Title } = Typography;
const { Option } = Select;

export const TimetableGridPage: React.FC = () => {
  // Removed viewType state to show both

  // ================== SHARED LOGIC ==================
  
  // Hardcoded times based on user request/screenshot
  const periodTimes = [
    "07:00", "07:50", "08:40", "09:45", "10:35", "11:25", 
    "12:45", "13:35", "14:25", "15:30", "16:20", "17:10", 
    "18:15", "19:05", "19:55", "20:45" // Estimated 16th period
  ];
  // Grid Data Helpers
  const periods = Array.from({ length: 16 }, (_, i) => i + 1);
  const days = [
    { name: 'Thứ 2', date: '26/01' },
    { name: 'Thứ 3', date: '27/01' },
    { name: 'Thứ 4', date: '28/01' },
    { name: 'Thứ 5', date: '29/01' },
    { name: 'Thứ 6', date: '30/01' },
    { name: 'Thứ 7', date: '31/01' },
    { name: 'Chủ Nhật', date: '01/02' },
  ];

  // Print Handlers
  const handlePrintGrid = () => {
    // Basic implementation: Hide list view and print
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        .no-print-grid { display: none !important; }
        .print-grid-only { display: block !important; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  const handlePrintList = () => {
     const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        .no-print-list { display: none !important; }
        .print-list-only { display: block !important; }
      }
    `;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  // ================== LIST VIEW COLUMNS ==================
  const listColumns = [
    { title: 'Mã MH', dataIndex: 'courseCode', key: 'courseCode', width: 90 }, // Hide on mobile/tablet
    { title: 'Tên môn học', dataIndex: 'courseName', key: 'courseName', width: 150 }, // Always visible
    { title: 'STC', dataIndex: 'credits', key: 'credits', width: 50, align: 'center' as const },
    { title: 'Lớp', dataIndex: 'classCode', key: 'classCode', width: 80 },
   
    { title: 'Tiết', dataIndex: 'startPeriod', key: 'startPeriod', width: 50, align: 'center' as const }, // Always visible
    { title: 'Phòng', dataIndex: 'room', key: 'room', width: 60 }, // Always visible
    { title: 'GV', dataIndex: 'lecturer', key: 'lecturer' },
    { 
      title: 'Thời gian học', 
      key: 'studyTime', 
      render: (_: any, record: SystemTimeTableItem) => `${record.startDate} - ${record.endDate}` 
    },

  ];

  return (
    <div style={{ background: '#f0f2f5', padding: '10px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ================== MAIN HEADER (STICKY) ================== */}
      <div className="no-print" style={{ 
        background: '#5c9ce6', 
        padding: '10px 16px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        // borderRadius: '0', // Full width sticky often looks better without top radius or handled by parent
        color: 'white',
        flexWrap: 'wrap',
        gap: 10,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <Title level={4} style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>
            Thời khóa biểu
        </Title>
        <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '16px', gap: 8 }}>
             <span title="Tiếng Việt" style={{ fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>🇻🇳</span>
             <div style={{ display: 'flex', alignItems: 'center' }}>
               <Avatar icon={<UserOutlined />} size="small" style={{ marginRight: 8 }} />
               <div style={{ lineHeight: 1.2, textAlign: 'left' }}>
                 <div style={{ fontSize: 12, fontWeight: 500, color: 'white' }}>Nguyễn Thị Quỳnh Giao</div>
                 <div style={{ fontSize: 10, opacity: 0.8, color: 'white' }}>TTQT51B11624</div>
               </div>
             </div>
        </div>
      </div>

      <Card bordered={false} bodyStyle={{ padding: 0 }} style={{ borderRadius: '0', overflow: 'visible' }}>
        
        {/* ================== CONTROL BAR ================== */}
        <div className="no-print" style={{ padding: '12px 16px', background: '#fff', borderBottom: '1px solid #f0f0f0', display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Select defaultValue="2025-2026-1" style={{ width: '100%', maxWidth: 220 }} size="middle">
                <Option value="2025-2026-1">HK2 2026-2027</Option>
              </Select>
              <Select defaultValue="personal" style={{ width: '100%', maxWidth: 180 }} size="middle">
                <Option value="personal">Lịch cá nhân</Option>
              </Select>
        </div>

        {/* ================== CONTENT VIEW ================== */}
        <div style={{ padding: 0 }}>
          
          {/* -------- GRID VIEW (TOP) -------- */}
          <div className="no-print-list" style={{ borderBottom: '4px solid #f0f2f5', paddingBottom: 20 }}>
            {/* Header for Grid Section */}
            <div style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fafafa', borderBottom: '1px solid #eee' }}>
                <div style={{ fontWeight: 600, color: '#1890ff' }}><AppstoreOutlined /> Thời khóa biểu tuần</div>
                <Button size="small" icon={<PrinterOutlined />} onClick={handlePrintGrid}>In TKB Tuần</Button>
            </div>

            {/* WRAPPER to allow responsive behavior without fixed scroll if possible, or strictly fit */}
            <div className="timetable-grid-container" style={{ width: '100%', overflowX: 'auto' }}>
                <style>{`
                  .timetable-grid-cols {
                    display: grid;
                    grid-template-columns: 40px repeat(7, 1fr); /* Time column + 7 days */
                    grid-template-rows: repeat(16, minmax(40px, auto)); /* Desktop row height */
                    width: 100%;
                  }
                  .grid-header-cell {
                     font-size: 13px;
                     padding: 4px 2px;
                  }
                  .grid-time-cell {
                     font-size: 11px;
                  }
                  /* Desktop Styles for Content */
                  .grid-course-name {
                     font-size: 13px;
                     line-height: 1.1;
                     margin-bottom: 2px;
                     font-weight: 700;
                     color: #000;
                  }
                  .grid-class-name, .grid-teacher-name, .grid-room-name {
                     font-size: 11px;
                     font-weight: 700;
                     color: #333;
                     line-height: 1.2;
                  }
                  
                  .timetable-grid-body {
                     /* REMOVED max-height to allow full page scroll */
                     overflow-y: visible; 
                  }

                  /* Mobile specifics */
                  @media (max-width: 768px) {
                    .timetable-grid-cols {
                       grid-template-columns: 35px repeat(7, 1fr); /* Slightly wider time col */
                       grid-template-rows: repeat(16, minmax(auto, auto)); /* Allow rows to grow fully based on content */
                    }
                    .grid-header-cell {
                       font-size: 10px; /* Increased header size */
                       padding: 4px 1px;
                       overflow: hidden;
                       text-overflow: clip; /* Let it wrap or clip naturally */
                    }
                    .grid-time-cell {
                       font-size: 9px; /* Increased time size */
                       padding: 0;
                       transform: none; /* Remove scale */
                    }
                    .grid-course-name {
                       font-size: 10px; /* Increased from 8px */
                       line-height: 1.2;
                       margin-bottom: 2px;
                       white-space: normal;
                       word-break: break-word; 
                       /* Removed truncation to allow full text wrapping */
                       display: block; 
                    }
                    .grid-class-name, .grid-teacher-name, .grid-room-name {
                       font-size: 9px; /* Increased from 7px */
                       font-weight: normal;
                       line-height: 1.2;
                       white-space: normal; /* Allow wrap */
                       word-break: break-word;
                       overflow: visible;
                       padding-top: 1px;
                    }
                  }
                `}</style>

                {/* Day Header */}
                <div className="timetable-grid-cols" style={{ borderBottom: '1px solid #f0f0f0', background: '#fff', gridTemplateRows: 'auto' }}>
                    <div style={{ padding: '8px 0', borderRight: '1px solid #eee' }}></div>
                    {days.map((day, index) => (
                      <div key={index} className="grid-header-cell" style={{ textAlign: 'center', fontWeight: 'bold', borderRight: '1px solid #eee', color: '#666', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <div>{day.name}</div>
                   
                      </div>
                    ))}
                </div>

                {/* Grid Body */}
                <div className="timetable-grid-cols timetable-grid-body">
                   {/* Background Lines & Period Labels */}
                   {periods.map((period, index) => (
                     <React.Fragment key={`row-${period}`}>
                        <div style={{ 
                          gridRow: period, gridColumn: 1, 
                          background: '#f7f9fc', color: '#595959', 
                          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', fontWeight: '600',
                          borderBottom: '1px solid #eee', borderRight: '1px solid #eee',
                          fontSize: 10, lineHeight: 1
                        }}>
                          <div style={{ marginBottom: 2 }}>{period}</div>
                          <div className="grid-time-cell" style={{ color: '#8c8c8c', fontWeight: 'normal', fontSize: '0.8em' }}>{periodTimes[index]}</div>
                        </div>
                        {days.map((_, dayIndex) => (
                          <div key={`empty-${period}-${dayIndex}`} style={{ 
                            gridRow: period, gridColumn: dayIndex + 2,
                            borderBottom: '1px solid #eee', borderRight: '1px solid #eee'
                          }} />
                        ))}
                     </React.Fragment>
                   ))}

                   {/* Class Items */}
                   {timetableGridData.map(item => (
                     <div key={item.id} style={{
                       gridColumn: item.dayOfWeek, // Note: dayOfWeek in data is 2 (Monday) to 8 (Sunday). Array index + 2 matches this?
                       // days array index 0 is Monday (col 2). 
                       // data.dayOfWeek: 2=Monday. 
                       // grid column maps: time=1, mon=2, tue=3...
                       // So item.dayOfWeek is correct directly.
                       gridRow: `${item.startPeriod} / span ${item.periodsCount}`,
                       background: item.color || '#e6f7ff',
                       padding: '2px',
                       borderLeft: '2px solid #1890ff',
                       margin: 1,
                       zIndex: 2,
                       overflow: 'hidden',
                       display: 'flex',
                       flexDirection: 'column',
                       justifyContent: 'flex-start',
                       cursor: 'pointer'
                     }}>
                        <div className="grid-course-name">{item.courseName} ({item.courseCode})</div>
                        <div className="grid-class-name">LTC: {item.creditClass}</div>
                        <div className="grid-room-name">Phòng: {item.room}</div>
                        <div className="grid-teacher-name">GV: {item.lecturer}</div>
                     </div>
                   ))}
                </div>
            </div>
          </div>

          {/* -------- LIST VIEW (BOTTOM) -------- */}
          <div className="no-print-grid" style={{ padding: 16 }}>
             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Title level={5} style={{ margin: 0, color: '#595959' }}>
                    <UnorderedListOutlined /> Thời khóa biểu kì
                </Title>
                <Button size="small" icon={<PrinterOutlined />} onClick={handlePrintList}>In Danh sách</Button>
             </div>
             
             <Table 
               columns={listColumns.map(col => ({
                 ...col,
                 // Remove fixed width for mobile, ensure responsive hiding
                 width: undefined, // Let table auto-size
                 render: (text: any, record: any, index: number) => (
                    <div style={{ whiteSpace: 'normal', wordBreak: 'break-word', minWidth: col.width ? (col.width as number) / 2 : undefined }}>
                      {col.render ? (col.render as any)(text, record, index) : text}
                    </div>
                 )
               })) as any} 
               dataSource={timetableListData} 
               rowKey="id"
               pagination={false}
               bordered
               size="small"
               style={{ maxWidth: '100%' }}
               scroll={{ x: 'max-content' }} // Allow horizontal scroll to see full details
             />
          </div>

        </div>
      </Card>
      
      {/* Print Styles */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>
    </div>
  );
};