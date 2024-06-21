import React, { useState } from 'react';
import Style from './ExamGradeModal.module.css'; // Import the CSS module
import axios from 'axios';
import Swal from 'sweetalert2';
import UpdateStudentModal from '../StudentInfo/UpdateStudentModal.jsx';

export default function ExamGradeModal({ isVisible, onClose, examGrades, studentID }) {
  // const [showUpdateModal, setShowUpdateModal] = useState(false);
  // const [selectedStudent, setSelectedStudent] = useState(null);

  // const handleUpdateShow = (examG) => {
  //   setSelectedStudent(examG);
  //   setShowUpdateModal(true);
  // };

  // const handleUpdateClose = () => setShowUpdateModal(false);

  // const deleteStudent = async (id) => {
  //   try {
  //     await axios.delete(`https://registration-80nq.onrender.com/api/v2/students/${studentID}/${id}`);
  //     Swal.fire('Deleted!', 'Grade has been deleted.', 'success');
  //   } catch (error) {
  //     console.error('Error deleting student:', error);
  //     Swal.fire('Error!', 'Could not delete student.', 'error');
  //   }
  // };

  // const handleDeleteClick = (id) => {
  //   Swal.fire({
  //     title: 'Are you sure?',
  //     text: "You won't be able to revert this!",
  //     icon: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: 'Yes, delete it!'
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       deleteStudent(id);
  //     }
  //   });
  // };

  return (
    <div className={Style.modalOverlay}>
      <div className={Style.modalContent}>
        <div className={Style.modalHeader}>
          <h3>الدرجات</h3>
          <button className={Style.closeButton} onClick={onClose}>×</button>
        </div>

        <table className={Style.table}>
          <thead>
            <tr>
              <th>المحاضرة</th>
              <th>الدرجة</th>
              {/* <th>تعديل</th>
              <th>حذف</th> */}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(examGrades) && examGrades.length > 0 ? (
              examGrades.map(record => (
                <tr key={record._id}>
                  <td>{record.lecture}</td>
                  <td>{record.grade}</td>
                  {/* <td><button onClick={() => handleUpdateShow(record)}><i className="fa-solid fa-file-pen text-success"></i></button></td>
                  <td><button onClick={() => handleDeleteClick(record._id)}><i className="fa-solid fa-trash text-danger"></i></button></td> */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">لا توجد بيانات</td>
              </tr>
            )}
          </tbody>
        </table>
{/* 
        {showUpdateModal && selectedStudent && (
          <UpdateStudentModal
            show={showUpdateModal}
            handleClose={handleUpdateClose}
            student={selectedStudent}
            singleStudent={studentID}
          />
        )} */}
      </div>
    </div>
  );
}
