import React, { useState } from 'react';
import Style from './AnotherModal.module.css'; // Import the CSS module
import Swal from 'sweetalert2';
import axios from 'axios';
import UpdateStudentModal from './UpdateStudentGrade.jsx';

export default function AnotherModal({ isVisible, onClose, examGrades , studentID }) {

  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const handleUpdateShow = (selectedExam) => {
    setSelectedExam(selectedExam);
    setShowUpdateModal(true);
  };

  const handleUpdateClose = () => setShowUpdateModal(false);

  const deleteStudent = async (id) => {
    console.log(studentID);
    console.log('Deleting student with ID:', id); // Debugging log
    try {
      await axios.delete(`https://registration-80nq.onrender.com/api/v2/students/${studentID}/${id}`);
      Swal.fire('Deleted!', 'Exam grade has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting exam grade:', error);
      Swal.fire('Error!', 'Could not delete exam grade.', 'error');
    }
  };

  const handleDeleteClick = (id) => {
    console.log('Handle delete click for ID:', id); // Debugging log
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteStudent(id);
      }
    });
  };

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
              <th>تعديل</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(examGrades) && examGrades.length > 0 ? (
              examGrades.map(exam => {
             // Debugging log
                return (
                  <tr key={exam._id}>
                    <td>{exam.lecture}</td>
                    <td>{exam.grade}</td>
                    <td>
                      <button onClick={() => handleUpdateShow(exam)}>
                        <i className="fa-solid fa-file-pen text-success fs-3"></i>
                      </button>
                    </td>
                    <td>
                      <button onClick={() => handleDeleteClick(exam._id)}>
                        <i className="fa-solid fa-trash text-danger fs-3"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4">لا توجد بيانات</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedExam && (
        <UpdateStudentModal
          show={showUpdateModal}
          handleClose={handleUpdateClose}
          examGrade={selectedExam}
          singleStudent={studentID}
        />
      )}
    </div>
  );
}
