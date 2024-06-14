import React, { useEffect, useState } from 'react';
import Style from './SpecificStudent.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import GradesModal from './GradesModal.jsx';
import UpdateStudentModal from './UpdateStudentModal.jsx';

export default function SpecificStudent() {
  const { studentID } = useParams();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState()
  const [examGrades, setExamGrades] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const handleUpdateShow = (examG) => {
    setSelectedStudent(examG)
    setShowUpdateModal(true);
  };
  const handleUpdateClose = () => setShowUpdateModal(false);

  function getSingleStudent (){
    axios.get(`https://registration-80nq.onrender.com/api/v2/students/${studentID}`)
    .then(response => {
      setAttendanceRecords(response.data.attendanceRecords);
      setStudent(response.data.student);
      setExamGrades(response.data.student.examGrades)
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching student:', error);
      setLoading(false);
    });
  }

  useEffect(() => {
    getSingleStudent()
  }, [student])
  
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://registration-80nq.onrender.com/api/v2/students/${studentID}/${id}`);
      Swal.fire('Deleted!', 'grade has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting student:', error);
      Swal.fire('Error!', 'Could not delete student.', 'error');
    }
  };

  const handleDeleteClick = (id) => {
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
  const containerStyle = {
    direction: 'rtl',
  };
  return (
    <>
      <Helmet>
        <title>specific student</title>
      </Helmet>
      <div className={` ${Style.serviceHome}`}>
        <div className="container-fluid">
          <div className="row mb-4">
            <div className="col-md-12 mb-4">
              <div className={`${Style.bgPrimaryMoza} ${Style.bar} w-100 rounded-2 p-4`}>
                <h1 className="text-light text-end">مستر / محسن عطية</h1>
              </div>
            </div>
            <div className="col-md-12 d-flex justify-content-center">
              <div className="d-flex justify-content-center">
                <div className={`${Style.romady} rounded-3 p-3`}>
                  <ul className={`${Style.poppinsRegular} d-flex justify-content-between list-unstyled text-decoration-none flex-md-row flex-column text-white`}>
                    <li className="mx-5 mb-md-0 mb-2">
                      <Link to={'/students'} className="text-decoration-none text-white fw-bolder">Students</Link>
                    </li>
                    <li className="mx-5 mb-md-0 mb-2">
                      <Link to={'/group'} className="text-decoration-none text-white fw-bolder">Groups</Link>
                    </li>
                    <li className="mx-5 mb-md-0 mb-2">
                    <Link to={'/attendence'} className="text-decoration-none text-white fw-bolder">Sessions</Link>
                    </li>
                    <li className="mx-5 mb-md-0 mb-2">
                      <Link to={'/absentees'} className="text-decoration-none text-white fw-bolder">Attendance</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={`${Style.romada} rounded-2 container`} style={containerStyle} >
                <div className="row p-3">
                    <div className="col-md-6 my-3">
                        <h2 className={`${Style.poppinsRegular} `}>الاسم : {student?.Name}</h2>
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className={`${Style.poppinsRegular} `}>رقم الطالب : {student?.phoneNumber}</h2>
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className={`${Style.poppinsRegular} `}>رقم الوالد : {student?.guardianPhoneNumber}</h2>
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className={`${Style.poppinsRegular} `}> كود الطالب : {student?.studentCode}</h2>
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className={`${Style.poppinsRegular} `}>سعر الحصة : {student?.price}</h2>
                    </div>
                    <div className="col-md-6 my-3">
                        <h2 className={`${Style.poppinsRegular} `}>سعر الكتب : {student?.books}</h2>
                    </div>
{student?.description?                    <div className="col-md-12 my-3">
                        <h2 className={`${Style.poppinsRegular} `}>الوصف : {student?.description} </h2>
                    </div>:''}


                    <div className={`${Style.margino} col-md-6 mt-5`}>
                        <div className="py-2 d-flex">
                            <h3 className={`${Style.poppinsRegular} `}>الحضور </h3>
                        </div>
                        <table className="table rounded-2">
                            <thead>
                              <tr>
                                <th scope="col" className="text-center">التاريخ</th>
                              </tr>
                            </thead>
                            <tbody>
                            {
                              attendanceRecords.map(attendance=>(
                                <tr key={attendance._id}>
                                <td>{attendance?.date}</td>
                              </tr>
                              ))
                            }


                            </tbody>
                          </table>
                    </div>
                    <div className="col-md-6 my-3">
                        <div className="py-2 d-flex justify-content-between align-items-center ">
                            <h3 className={`${Style.poppinsRegular} `}><span className="py-2">درجة الاختبارات</span></h3>
                            <button onClick={handleShow} className={`${Style.smoothBorderButton} ${Style.poppinsRegular}`}>إضافة درجات</button>
                        </div>
                        <table className="table rounded-2">
                            <thead>
                              <tr>
                                <th scope="col">المحاضرة</th>
                                <th scope="col">الدرجة</th>
                                <th scope="col" className="text-center">تعديل</th>
                              </tr>
                            </thead>
                            <tbody>
                              {examGrades.map(examGrade=>(
                              <tr key={examGrade._id}>
                                <td>{examGrade.lecture}</td>
                                <td>{examGrade.grade}</td>
                                <td className='d-flex justify-content-center' ><button  onClick={() => handleUpdateShow(examGrade)} className="btn btn-success mx-2">update</button> <button onClick={() => handleDeleteClick(examGrade._id)} className="btn btn-danger">delete</button></td>
                              </tr>
                              ))}

                            </tbody>
                          </table>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <GradesModal show={showModal} id={studentID} handleClose={handleClose} />
      {selectedStudent && (
        <UpdateStudentModal
          show={showUpdateModal}
          handleClose={handleUpdateClose}
          student={selectedStudent}
          singleStudent={studentID}
        />
      )}
    </>
  );
}
