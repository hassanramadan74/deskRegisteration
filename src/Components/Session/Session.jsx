import React, { useEffect, useState } from 'react';
import Style from './Session.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Audio, Oval } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import UpdateSession from './UpdateSession.jsx';
import AddSessionModal from './AddSessionModal.jsx';

export default function Session() {
  const { ID } = useParams();
  const [loading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleUpdateShow = (session) => {
    setSelectedSession(session); // Use 'session' to be consistent
    setShowUpdateModal(true);
  };

  const handleUpdateClose = () => setShowUpdateModal(false);

  useEffect(() => {
    axios.get(`https://registration-80nq.onrender.com/api/v2/sessions/${ID}`)
      .then(response => {
        setSessions(response.data.sessions);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
        setLoading(false);
      });
  }, [sessions]);

  const deleteSession = async (id) => {
    try {
      await axios.delete(`https://registration-80nq.onrender.com/api/v2/sessions/${ID}/${id}`);
      setSessions(sessions.filter(session => session._id !== id));
      Swal.fire('Deleted!', 'Session has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting session:', error);
      Swal.fire('Error!', 'Could not delete session.', 'error');
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
        deleteSession(id);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Sessions</title>
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
          <Link className="text-decoration-none text-white fw-bolder">Attendance</Link>
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
            <div className="row gy-4 " style={{ direction: 'rtl' }}>
              {sessions.map(session => (
                <div className="col-md-3" key={session._id}>
                  <div className={`${Style.romadyi} d-flex flex-column justify-content-center p-3 align-items-center rounded-2`}>
                  <Link to={`/group/${ID}/${session._id}`} className="w-100 h-100 text-center">
                  <i class="fa-regular fa-clock fs-1 mb-3"></i>
                    <h3>{session.name}</h3>
                  </Link>
                    <div className='d-flex justify-content-between '>
                      <button className="btn btn-success w-50 mx-1" onClick={() => handleUpdateShow(session)}>Update</button>
                      <button onClick={() => handleDeleteClick(session._id)} className="btn btn-danger w-50 mx-2">Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <AddSessionModal groupID={ID} show={showModal} handleClose={handleClose} />
      {selectedSession && (
        <UpdateSession
          show={showUpdateModal}
          handleClose={handleUpdateClose}
          session={selectedSession} // Correct prop name
          groupID={ID}
        />
      )}
    </>
  );
}
  