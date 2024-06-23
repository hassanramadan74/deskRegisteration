import React, { useEffect, useState } from 'react';
import Style from './Students.module.css';
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import ModalComponent from '../Modal/Modal.jsx';
import Swal from 'sweetalert2';
import UpdateModal from '../Modal/UpdateModal.jsx';

export default function Students() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('Name');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleUpdateShow = (student) => {
    setSelectedStudent(student);
    setShowUpdateModal(true);
  };
  const handleUpdateClose = () => setShowUpdateModal(false);

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
  }, []);


  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://registration-80nq.onrender.com/api/v2/students/${id}`);
      setStudents(students.filter(student => student._id !== id));
      Swal.fire('Deleted!', 'Student has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting student:', error);
      Swal.fire('Error!', 'Could not delete student.', 'error');
    }
  };

  const barCodeClick = async (id) => {
    try {
      const response = await axios.get(`https://registration-80nq.onrender.com/api/v2/students/${id}/qrcode`);
      const barcodeImage = response.data;
      Swal.fire({
        title: 'Student Barcode',
        html: `<div style="display: flex; justify-content: center; align-items: center;">
        <${barcodeImage} alt="Generated Barcode" />
      </div>`,
        imageAlt: 'Generated Barcode',
        showCloseButton: true,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error fetching student barcode:', error);
      Swal.fire('Error!', 'Could not fetch student barcode.', 'error');
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

  const filteredStudents = students.filter(student => {
    if (searchOption === 'Name') {
      return student?.Name?.toLowerCase().includes(searchTerm?.toLowerCase());
    } else if (searchOption === 'phoneNumber') {
      return student?.phoneNumber.includes(searchTerm);
    } else if (searchOption === 'studentCode') {
      return String(student?.studentCode).includes(searchTerm);
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
            <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center">
              <Link onClick={handleShow} className='d-md-none mt-3 order-2 order-md-1'>
                <div className={`${Style.romadyBorder} p-3 rounded-1`}>
                  <i className={`${Style.textMoza} fa-solid fa-plus`}></i>
                </div>
              </Link>
              <div className="d-flex justify-content-center order-1 order-md-2">
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
              <div className="d-none d-md-flex order-2 order-md-1 mb-3 mb-md-0">
                <Link onClick={handleShow}>
                  <div className={`${Style.romadyBorder} p-3 rounded-1`}>
                    <i className={`${Style.textMoza} fa-solid fa-plus`}></i>
                  </div>
                </Link>
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
            <div className="row gy-5" style={{ direction: 'rtl' }}>
              {filteredStudents.map(student => (
                <div className="col-md-3 text-dark" key={student._id}>
                  <div className={`${Style.romadyi} position-relative p-4 rounded-2`}>
                    <div className='d-flex justify-content-end'>
                      <i onClick={() => barCodeClick(student._id)} className="fa-solid fa-qrcode fs-2 cursor-pointer"></i>
                    </div>
                    <Link to={`/students/${student._id}`} className="w-100 h-100">
                      <h4>الاسم:<span className="h5"> {student.Name}</span></h4>
                      <h4>رقم الهاتف: <span className="h4"> {student.phoneNumber}</span></h4>
                      <h4>رقم الوالد: <span className="h4"> {student.guardianPhoneNumber}</span></h4>
                      <h4>الوصف: <span className="h4"> {student.description}</span></h4>
                      <h4>سعر الحصة: <span className="h4"> {student.price}</span></h4>
                      <h4>الكود: <span className="h4"> {student.studentCode}</span></h4>
                      <h4>الكتب: <span className="h4"> {student.books}</span></h4>
                    </Link>
                    <div className='d-flex justify-content-between mt-2'>
                      <button className="btn btn-success w-50 mx-1" onClick={() => handleUpdateShow(student)}>Update</button>
                      <button onClick={() => handleDeleteClick(student._id)} className="btn btn-danger w-50 mx-2">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <ModalComponent show={showModal} handleClose={handleClose} />

      {selectedStudent && (
        <UpdateModal
          show={showUpdateModal}
          handleClose={handleUpdateClose}
          student={selectedStudent}
        />
      )}
    </>
  );
}
