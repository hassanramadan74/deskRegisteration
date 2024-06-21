import React, { useEffect, useState } from 'react';
import Style from './SpecificStudent.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Modal from './Modal.jsx';
import AnotherModal from './AnotherModal.jsx';
import HomeworkModal from './HomeworkModal.jsx';
import ModalComponent from './ModalAddition.jsx';
import ExamAddition from './ExamAddition.jsx';

export default function SpecificStudent() {
  const { studentID } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [ShowExamModal, setShowExamModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [studentData, setStudent] = useState()
  const [examGrades, setExamGrades] = useState([])
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [topFiv, setTopFiv] = useState([]);
  const [groupID, setGroupID] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalExamVisible, setIsModalExamVisible] = useState(false);
  const [isModalHomeWorkVisible, setIsModalHomeWorkVisible] = useState(false);
  const [homeWork, setHomeWork] = useState([]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const handleExamShow = () => setShowExamModal(true);
  const handleExamClose = () => setShowExamModal(false);
  function getSingleStudent (){
    axios.get(`https://registration-80nq.onrender.com/api/v2/students/${studentID}`)
    .then(response => {
      setAttendanceRecords(response.data.attendanceRecords);
      setStudent(response.data.student);
      setGroupID(response.data.student.group)
      setExamGrades(response.data.student.examGrades)
      setHomeWork(response.data.student.homeWork)
      setLoading(false);
    })
    .catch(error => {
      console.error('Error fetching student:', error);
      setLoading(false);
    });
  }

  const topFive = async () => {
    try {
      const response = await axios.get(`https://registration-80nq.onrender.com/api/v2/students/${groupID}/Top5`);
      setTopFiv(response.data.topScores)
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };






  useEffect(() => {
    getSingleStudent()
    // topFive()
  }, [studentData])
  

  const containerStyle = {
    direction: 'rtl',
  };






  const handleAttendanceClick = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleExamGradeClick = () => {
    setIsModalExamVisible(true);
  };

  const handleCloseExamGradeModal = () => {
    setIsModalExamVisible(false);
  };
  const handleHomeWorkGradeClick = () => {
    setIsModalHomeWorkVisible(true);
  };

  const handleCloseHomeWorkGradeModal = () => {
    setIsModalHomeWorkVisible(false);
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
            <div className="col-md-12 d-flex justify-content-md-end justify-content-center">
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
                <div className="py-1 px-1">
        <div className="row mt-1">
          <div className="col-md-6">
            <div className={`${Style.giro} p-4 rounded-2`} style={{ direction: 'rtl' }}>
              <div className="d-flex align-items-center bg-white p-2 rounded-2">
                <div className="mx-5">
                  <i className={`${Style.goldi} fa-solid fa-medal fs-2`}></i>
                </div>
                <div>
                  <h4>الأول : {topFiv[0]?.name}</h4>
                  <h4>النتيجة : {topFiv[0]?.average}</h4>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2 p-2">
                <div className="mx-5">
                  <i className={`${Style.silveri} fa-solid fa-medal fs-2`}></i>
                </div>
                <div>
                  <h4>الثاني : {topFiv[1]?.name}</h4>
                  <h4>النتيجة : {topFiv[1]?.average}</h4>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2 p-2">
                <div className="mx-5">
                  <i className={`${Style.bronzi} fa-solid fa-medal fs-2`}></i>
                </div>
                <div>
                <h4>الثاني : {topFiv[2]?.name}</h4>
                <h4>النتيجة : {topFiv[2]?.average}</h4>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2 p-2">
                <div className="mx-5">
                  <i className="fa-solid fa-star fs-2"></i>
                </div>
                <div>
                <h4>الثاني : {topFiv[3]?.name}</h4>
                <h4>النتيجة : {topFiv[3]?.average}</h4>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2 accordion p-2">
                <div className="mx-5">
                  <i className="fa-solid fa-star fs-2"></i>
                </div>
                <div>
                <h4>الثاني : {topFiv[4]?.name}</h4>
                <h4>النتيجة : {topFiv[4]?.average}</h4>
                </div>
              </div>
            </div>
            <div className={`${Style.bgNav} p-4 rounded-2 mt-3`}>
              <h3 className="text-center text-white fw-bolder">نتيجتك : {studentData?.averageGrades} </h3>
            </div>
          </div>
          <div className="col-md-6 mt-md-0 mt-3">
            <div className={`${Style.giro} p-4 rounded-2`} style={{ direction: 'rtl' }}>
              {studentData && (
                <>
                  <h3 className="mt-3 p-3">الاسم : {studentData?.Name}</h3>
                  <h3 className="mt-3 p-2">رقم الطالب : {studentData.phoneNumber}</h3>
                  <h3 className="mt-3 p-2">رقم الوالد : {studentData.guardianPhoneNumber}</h3>
                  <h3 className="mt-3 p-2">كود الطالب : {studentData.studentCode}</h3>
                  <h3 className="mt-3 p-2">سعر الحصة : {studentData.price}</h3>
                  <h3 className="mt-3 p-2">سعر الكتب : {studentData.bookPrice}</h3>
                  <h3 className="mt-3 p-2">الوصف : {studentData.description}</h3>
                </>
              )}
            </div>
            <div className="mt-3">
              <button className={`${Style.cordi} py-2 rounded-2 fw-bolder w-100`} onClick={handleAttendanceClick}>
                الحضور
              </button>
              <div className="d-flex mt-2">
                <button className={`${Style.cordi} me-2 py-2 rounded-2 fw-bolder w-100`} onClick={handleHomeWorkGradeClick}>الواجب المنزلي</button>
                <button className={`${Style.cordi} py-2 rounded-2 fw-bolder w-100`} onClick={handleExamGradeClick} >نتيجة الاختبارات</button>
              </div>
              <div className="d-flex mt-2">
                <button onClick={handleShow} className={`${Style.cordi} me-2 py-2 rounded-2 fw-bolder w-100`}> إضافة واجب</button>
                <button onClick={handleExamShow} className={`${Style.cordi} py-2 rounded-2 fw-bolder w-100`}  >إضافة درجة اختبار </button>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>

      <ExamAddition show={ShowExamModal} handleClose={handleExamClose} studentID={studentID}/>
      <ModalComponent show={showModal} handleClose={handleClose} studentID={studentID}/>

      <Modal
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        attendanceRecords={attendanceRecords}
      />

<AnotherModal
        isVisible={isModalExamVisible}
        onClose={handleCloseExamGradeModal}
        examGrades={examGrades}
      />


<HomeworkModal
        isVisible={isModalHomeWorkVisible}
        onClose={handleCloseHomeWorkGradeModal}
        homeWork={homeWork}
        studentID={studentID}
      />

      {/* <GradesModal show={showModal} id={studentID} handleClose={handleClose} />
      {selectedStudent && (
        <UpdateStudentModal
          show={showUpdateModal}
          handleClose={handleUpdateClose}
          student={selectedStudent}
          singleStudent={studentID}
        />
      )} */}
    </>
  );
}
