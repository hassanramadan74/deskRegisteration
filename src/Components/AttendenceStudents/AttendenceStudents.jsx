import React, { useEffect, useState } from 'react';
import Style from './AttendenceStudents.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {  Oval } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function AttendenceStudents() {
  const { ID , sessionID } = useParams();
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('Name');


  useEffect(() => {
    axios.get('https://registration-80nq.onrender.com/api/v2/students')
      .then(response => {
        setStudents(response.data.students);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching students:', error);
        setLoading(false);
      });
  }, [students]);


  const attendStudent = async (id) => {
    try {
      await axios.post(`https://registration-80nq.onrender.com/api/v2/attendance/${ID}/${sessionID}/${id}`);
      toast.success('Student attend successfully!');
    } catch (error) {
      console.error('Error attending student:', error);
      toast.error('Student cannot be attend.');
    }
  };


  const filteredStudents = students.filter(student => {
    if (searchOption === 'Name') {
      return student.Name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchOption === 'phoneNumber') {
      return student.phoneNumber.includes(searchTerm);
    } else if (searchOption === 'studentCode') {
      return String(student.studentCode).includes(searchTerm);
    }
    return false;
  });

  return (
    <>
      <Helmet>
        <title>Students</title>
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
                      <Link className="text-decoration-none text-white fw-bolder">Attendance</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-md-4 mb-md-0 mb-2">
              <select
                className="form-select"
                value={searchOption}
                onChange={(e) => setSearchOption(e.target.value)}
              >
                <option value="Name">Name</option>
                <option value="phoneNumber">Phone Number</option>
                <option value="studentCode">Student Code</option>
              </select>
            </div>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control"
                placeholder={`Search by ${searchOption}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {loading ? (
            <div className="d-flex justify-content-center">
<Oval
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
            </div>
          ) : (
            <div className="row gy-5 "  style={{ direction: 'rtl' }}>
              {filteredStudents.map(student => (
                <div className="col-md-3 text-dark " key={student._id}>
                  <div className={`${Style.romadyi} position-relative p-4 rounded-2`}>
                    <h4>الاسم:<span className="h5"> {student.Name}</span></h4>
                    <h4>رقم الهاتف: <span className="h4"> {student.phoneNumber}</span></h4>
                    <h4> الحضور : <span className="h4"> {student.lastAttendance.date}</span></h4>
                    <h4>الوصف: <span className="h4"> {student.description}</span></h4>
                    <h4>سعر الحصة: <span className="h4"> {student.price}</span></h4>
                    <h4>الكود: <span className="h4"> {student.studentCode}</span></h4>
                    <h4>الكتب: <span className="h4"> {student.books}</span></h4>
                    <div className='d-flex justify-content-center my-2'>
                      <button className="btn btn-success w-50 mx-1" onClick={() => attendStudent(student._id)}>attend</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
