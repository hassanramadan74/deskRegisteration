import React, { useState, useEffect } from 'react';
import Style from './StudentInfo.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Modal from './Modal.jsx'; // Import the Modal component
import AnotherModal from './AnotherModal.jsx';
import HomeworkModal from './HomeworkModal.jsx';


export default function StudentInfo() {
  const [studentData, setStudentData] = useState(null);
  const [groupID, setGroupID] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [examGrades, setExamGrades] = useState([]);
  const [homeWork, setHomeWork] = useState([]);
  const [topFive, setTopFive] = useState([]);
  const [studentID, setStudentID] = useState(localStorage.getItem('userID'));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalExamVisible, setIsModalExamVisible] = useState(false);
  const [isModalHomeWorkVisible, setIsModalHomeWorkVisible] = useState(false);
  useEffect(() => {
    // Function to fetch student data
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`https://registration-80nq.onrender.com/api/v2/students/${studentID}`);
        setStudentData(response.data.student);
        setGroupID(response.data.student.group)
        setHomeWork(response.data.student.homeWork)
        setAttendanceRecords(response.data.attendanceRecords);
        setExamGrades(response.data.student.examGrades);
        console.log(response);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };


    if (studentID) {
      fetchStudentData();
    }
    const topFive = async () => {
      try {
        const response = await axios.get(`https://registration-80nq.onrender.com/api/v2/students/${groupID}/Top5`);
        setTopFive(response.data.topScores)
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };
    topFive();
  }, [studentID,groupID]);

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
      <div className={`${Style.bgNav} p-2 px-5 text-white`} style={{ direction: 'rtl' }}>
        <h2>مستر محسن عطية</h2>
      </div>

      <div className="bg-white p-3" style={{ direction: 'rtl' }}>
        <ul className={`${Style.hoverUnderline} d-flex list-unstyled px-4`}>
          <li className="fs-4">
            <Link to="#">الطلبة</Link>
          </li>
        </ul>
      </div>

      <div className="py-1 px-5">
        <div className="row mt-1">
          <div className="col-md-6">
            <div className={`${Style.giro} p-4 rounded-2`} style={{ direction: 'rtl' }}>
              <div className="d-flex align-items-center bg-white p-2 rounded-2">
                <div className="mx-5">
                  <i className={`${Style.goldi} fa-solid fa-medal fs-2`}></i>
                </div>
                <div>
                  <h4>الأول : {topFive[0]?.name}</h4>
                  <h4>النتيجة : {topFive[0]?.average}</h4>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2 p-2">
                <div className="mx-5">
                  <i className={`${Style.silveri} fa-solid fa-medal fs-2`}></i>
                </div>
                <div>
                <h4>التاني : {topFive[1]?.name}</h4>
                <h4>النتيجة : {topFive[1]?.average}</h4>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2 p-2">
                <div className="mx-5">
                  <i className={`${Style.bronzi} fa-solid fa-medal fs-2`}></i>
                </div>
                <div>
                <h4>التالت : {topFive[2]?.name}</h4>
                <h4>النتيجة : {topFive[2]?.average}</h4>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2 p-2">
                <div className="mx-5">
                  <i className="fa-solid fa-star fs-2"></i>
                </div>
                <div>
                <h4>الرابع : {topFive[3]?.name}</h4>
                <h4>النتيجة : {topFive[3]?.average}</h4>
                </div>
              </div>
              <div className="d-flex align-items-center mt-2 accordion p-2">
                <div className="mx-5">
                  <i className="fa-solid fa-star fs-2"></i>
                </div>
                <div>
                <h4>الخامس : {topFive[4]?.name}</h4>
                <h4>النتيجة : {topFive[4]?.average}</h4>
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
            </div>
          </div>
        </div>
      </div>

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
      />







      {/* <ExamGradeModal // Correct the usage with PascalCase
        isVisible={isExamModalVisible} // Correct variable for exam modal visibility
        onClose={handleCloseExamModal}
        examGrades={examGrades}
        studentID={studentID}
      /> */}

    </>
  );
}
