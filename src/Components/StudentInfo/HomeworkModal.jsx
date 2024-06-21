import React from 'react';
import Style from './HomeworkModal.module.css'; // Import the CSS module

export default function HomeworkModal({ isVisible, onClose, homeWork }) {
  if (!isVisible) return null;

  return (
    <div className={Style.modalOverlay}>
      <div className={Style.modalContent}>
        <div className={Style.modalHeader}>
          <h3 className='fw-bolder'>درجات الواجب المنزلي</h3>
          <button className={Style.closeButton} onClick={onClose}>×</button>
        </div>

        <table className={Style.table}>
          <thead>
            <tr>
              <th>الحصة</th>
              <th>الدرجة</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(homeWork) && homeWork.length > 0 ? (
              homeWork.map(exam => {
                return (
                  <tr key={exam._id}>
                    <td>{exam.assignment}</td>
                    <td>{exam.grade}</td>
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
