import React from 'react';
import Style from './AnotherModal.module.css'; // Import the CSS module

export default function AnotherModal({ isVisible, onClose, examGrades }) {
  if (!isVisible) return null;

  return (
    <div className={Style.modalOverlay}>
      <div className={Style.modalContent}>
        <div className={Style.modalHeader}>
          <h3 className='fw-bolder'>درجات الاختبارات</h3>
          <button className={Style.closeButton} onClick={onClose}>×</button>
        </div>

        <table className={Style.table}>
          <thead>
            <tr>
              <th>المحاضرة</th>
              <th>الدرجة</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(examGrades) && examGrades.length > 0 ? (
              examGrades.map(exam => {
                return (
                  <tr key={exam._id}>
                    <td>{exam.lecture}</td>
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
