import React from 'react';
import Style from './Modal.module.css'; // Import the CSS module

export default function Modal({ isVisible, onClose, attendanceRecords }) {
  if (!isVisible) return null;

  return (
    <div className={Style.modalOverlay}>
      <div className={Style.modalContent}>
        <div className={Style.modalHeader}>
          <h3 className='fw-bolder'>الحضور</h3>
          <button className={Style.closeButton} onClick={onClose}>×</button>
        </div>

        <table className={Style.table}>
          <thead>
            <tr>
              <th>التاريخ</th>
              <th>الوقت</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(attendanceRecords) && attendanceRecords.length > 0 ? (
              attendanceRecords.map(record => {
                const [date, time] = record.date?.split(' ') || ['', ''];
                return (
                  <tr key={record._id}>
                    <td>{date}</td>
                    <td>{time}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="2">لا توجد بيانات</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
