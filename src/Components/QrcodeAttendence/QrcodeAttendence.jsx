import React, { useEffect, useState } from 'react';
import Style from './QrcodeAttendence.module.css';
import axios from 'axios';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';

export default function QrcodeAttendence() {
  const { ID } = useParams();
  const [student, setStudent] = useState();
  const [lastAttendence, setlastAttendence] = useState(null);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(localStorage.getItem('selectedGroup') || '');
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(localStorage.getItem('selectedSession') || '');
  const navigate = useNavigate(); // Hook from react-router-dom for navigation

  const containerStyle = {
    direction: 'rtl',
  };

  function getSingleStudent() {
    axios.get(`https://registration-80nq.onrender.com/api/v2/students/${ID}`)
      .then(response => {
        setStudent(response.data.student);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student:', error);
        setLoading(false);
      });
  }

  function getlastAttendence() {
    axios.get(`https://registration-80nq.onrender.com/api/v2/attendance/${ID}`)
      .then(response => {
        setlastAttendence(response.data.lastAttendanceRecord.date);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student:', error);
        setLoading(false);
      });
  }

  useEffect(() => {
    getSingleStudent();
    getlastAttendence();
  }, [ID]);

  useEffect(() => {
    axios.get('https://registration-80nq.onrender.com/api/v2/groups')
      .then(response => {
        setGroups(response.data.groups);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching groups:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedGroup) {
      axios.get(`https://registration-80nq.onrender.com/api/v2/sessions/${selectedGroup}`)
        .then(response => {
          setSessions(response.data.sessions);
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching sessions:', error);
          setLoading(false);
        });
    }
  }, [selectedGroup]);

  useEffect(() => {
    localStorage.setItem('selectedGroup', selectedGroup);
  }, [selectedGroup]);

  useEffect(() => {
    localStorage.setItem('selectedSession', selectedSession);
  }, [selectedSession]);

  const handleAttendance = () => {
    if (!selectedGroup || !selectedSession) {
      toast.error('Please select both group and session');
      return;
    }

    axios.post(`https://registration-80nq.onrender.com/api/v2/attendance/${selectedGroup}/${selectedSession}/${ID}`)
      .then(response => {
        toast.success('Attendance marked successfully!');
        // Update URL with new QR code link
        navigate(`/attendence/${response.data.qrCodeLink}`);
      })
      .catch(error => {
        console.error('Error marking attendance:', error);
        toast.error('Failed to mark attendance');
      });
  };

  return (
    <>
      <Helmet>
        <title>Attendance</title>
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
              <div className="col-md-6 my-3">
                <h2 className={`${Style.poppinsRegular} `}>الوصف : {student?.description} </h2>
              </div>
              <div className="col-md-6 my-3">
                <h2 className={`${Style.poppinsRegular} `}>اخر حضور : {lastAttendence} </h2>
              </div>
              <div className="col-md-6 my-3 d-flex">
                <select
                  className="form-select w-50"
                  value={selectedGroup}
                  onChange={e => setSelectedGroup(e.target.value)}
                >
                  <option value="">Select Group</option>
                  {groups.map(group => (
                    <option key={group._id} value={group._id}>{group.Name}</option>
                  ))}
                </select>
                {selectedGroup && (
                  <select
                    className="form-select w-50 mx-2"
                    value={selectedSession}
                    onChange={e => setSelectedSession(e.target.value)}
                  >
                    <option value="">Select Session</option>
                    {sessions.map(session => (
                      <option key={session._id} value={session._id}>{session.name}</option>
                    ))}
                  </select>
                )}
              </div>
              <div className="col-md-12 my-3">
                <button className='btn btn-success w-100' onClick={handleAttendance}>Attend</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
