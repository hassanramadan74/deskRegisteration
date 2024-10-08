import React, { useEffect, useState } from 'react';
import Style from './Groups.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Audio, Oval } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import GroupModel from './groupModel.jsx';
import Swal from 'sweetalert2';
import UpdateModal from './updateGroupModal.jsx';


export default function Group() {
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);
  const [loading, setLoading] = useState(true);
const [groups, setGroups] = useState([]);
const [showUpdateModal, setShowUpdateModal] = useState(false);
const [selectedStudent, setSelectedStudent] = useState(null);
const handleUpdateShow = (student) => {
  setSelectedStudent(student);
setShowUpdateModal(true);
};  

  const handleUpdateClose = () => setShowUpdateModal(false);
  useEffect(() => {
    axios.get('https://registration-production-c3f5.up.railway.app/api/v2/groups')
      .then(response => {
        console.log(response);
        setGroups(response.data.groups);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
        setLoading(false);
      });
  }, [groups]);


  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://registration-production-c3f5.up.railway.app/api/v2/groups/${id}`);
      setGroups(groups.filter(group => group._id !== id));
      Swal.fire('Deleted!', 'group has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting group:', error);
      Swal.fire('Error!', 'Could not delete group.', 'error');
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







  return (
    <>
      <Helmet>
        <title>groups</title>
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
  <Link onClick={handleShow} className='d-none d-md-block order-2 order-md-1 mb-3 mb-md-0'>
    <div className={`${Style.romadyBorder} p-3 rounded-1`}>
      <i className={`${Style.textMoza} fa-solid fa-plus`}></i>
    </div>
  </Link>
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
          <div className="row gy-4 "  style={{ direction: 'rtl' }}>
            {groups.map(group => (
              <div className="col-md-3" key={group._id}>
                <div className={`${Style.romadyi} d-flex flex-column justify-content-center p-3 align-items-center rounded-2`}>
                <Link to={`/group/${group._id}` } className="w-100 h-100 text-center">
                
                  <i className="fa-solid fa-user-group fs-1 my-3"></i>
                  <h3>{group.Name}</h3>
              </Link>
                  <div className='d-flex justify-content-between '>
                      <button className="btn btn-success w-50 mx-1" onClick={() => handleUpdateShow(group)}>Update</button>
                      <button onClick={() => handleDeleteClick(group._id)} className="btn btn-danger w-50 mx-2">Delete</button>
                    </div>
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
      <GroupModel show={showModal} handleClose={handleClose} />
      {selectedStudent && (
        <UpdateModal
          show={showUpdateModal}
          handleClose={handleUpdateClose}
          group={selectedStudent}
        />
      )}
    </>
  );
}
