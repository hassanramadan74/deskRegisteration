import React, { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import Style from './Students.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import { useDebounce } from 'use-debounce';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

// Lazy load the Modal components
const ModalComponent = React.lazy(() => import('../Modal/Modal.jsx'));
const UpdateModal = React.lazy(() => import('../Modal/UpdateModal.jsx'));

// Memoized StudentCard component to prevent unnecessary re-renders
const StudentCard = React.memo(({ student, handleUpdateShow, handleDeleteClick, barCodeClick }) => {
  return (
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
  );
});

export default function Students() {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('Name');
  const [currentPage, setCurrentPage] = useState(0);
  const studentsPerPage = 8;

  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  const handleShow = useCallback(() => setShowModal(true), []);
  const handleClose = useCallback(() => setShowModal(false), []);
  
  const handleUpdateShow = useCallback((student) => {
    setSelectedStudent(student);
    setShowUpdateModal(true);
  }, []);

  const handleUpdateClose = useCallback(() => setShowUpdateModal(false), []);

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
  }, [students]); // Fetch data only once on component mount

  const deleteStudent = useCallback(async (id) => {
    try {
      await axios.delete(`https://registration-80nq.onrender.com/api/v2/students/${id}`);
      setStudents(prevStudents => prevStudents.filter(student => student._id !== id));
      Swal.fire('Deleted!', 'Student has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting student:', error);
      Swal.fire('Error!', 'Could not delete student.', 'error');
    }
  }, []);

  const barCodeClick = useCallback(async (id) => {
    try {
      const response = await axios.get(`https://registration-80nq.onrender.com/api/v2/students/${id}/qrcode`);
      const barcodeImage = response.data;
      Swal.fire({
        title: 'Student Barcode',
        html: `<div style="display: flex; justify-content: center; align-items: center;">
        <img src="${barcodeImage}" alt="Generated Barcode" />
      </div>`,
        imageAlt: 'Generated Barcode',
        showCloseButton: true,
        showConfirmButton: false
      });
    } catch (error) {
      console.error('Error fetching student barcode:', error);
      Swal.fire('Error!', 'Could not fetch student barcode.', 'error');
    }
  }, []);

  const handleDeleteClick = useCallback((id) => {
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
  }, [deleteStudent]);

  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      if (searchOption === 'Name') {
        return student?.Name?.toLowerCase()?.includes(debouncedSearchTerm?.toLowerCase());
      } else if (searchOption === 'phoneNumber') {
        return student?.phoneNumber?.includes(debouncedSearchTerm);
      } else if (searchOption === 'studentCode') {
        return String(student?.studentCode)?.includes(debouncedSearchTerm);
      }
      return false;
    });
  }, [students, searchOption, debouncedSearchTerm]);

  const pageCount = Math.ceil(filteredStudents.length / studentsPerPage);
  const currentStudents = useMemo(() => {
    return filteredStudents.slice(currentPage * studentsPerPage, (currentPage + 1) * studentsPerPage);
  }, [filteredStudents, currentPage, studentsPerPage]);

  const handlePageClick = useCallback(({ selected }) => {
    setCurrentPage(selected);
  }, []);

  return (
    <>
      <Helmet>
        <title>Students</title>
      </Helmet>
      <div className={Style.serviceHome}>
        <div className="container-fluid">
          {/* Search and Filter */}
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
              <div className="d-flex align-items-center justify-content-center order-3">
                <div className="input-group">
                  <select
                    className="form-select form-select-lg"
                    aria-label="Default select example"
                    value={searchOption}
                    onChange={(e) => setSearchOption(e.target.value)}
                  >
                    <option value="Name">Name</option>
                    <option value="phoneNumber">Phone Number</option>
                    <option value="studentCode">Student Code</option>
                  </select>
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Students List */}
          {loading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Oval height="100" width="100" color="#ff0000" secondaryColor="#00ff00" />
            </div>
          ) : (
            <div className="row g-2">
              {currentStudents.length > 0 ? (
                currentStudents.map(student => (
                  <StudentCard
                    key={student._id}
                    student={student}
                    handleUpdateShow={handleUpdateShow}
                    handleDeleteClick={handleDeleteClick}
                    barCodeClick={barCodeClick}
                  />
                ))
              ) : (
                <div className="d-flex justify-content-center align-items-center text-danger">
                  <h1>No Students Found</h1>
                </div>
              )}
            </div>
          )}
          {/* Pagination */}
          <div className="mt-4 d-flex justify-content-center">
            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={handlePageClick}
              containerClassName={'pagination justify-content-center'}
              activeClassName={'active'}
              previousLabel={'<<'}
              nextLabel={'>>'}
              breakLabel={'...'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
            />
          </div>
        </div>
        {/* Modals */}
        <Suspense fallback={<div>Loading...</div>}>
          <ModalComponent show={showModal} handleClose={handleClose} />
          {selectedStudent && (
            <UpdateModal
              show={showUpdateModal}
              handleClose={handleUpdateClose}
              student={selectedStudent}
            />
          )}
        </Suspense>
      </div>
    </>
  );
}
