import React, { useEffect, useState } from 'react';
import Style from './Absentees.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { Oval } from 'react-loader-spinner';
import Swal from 'sweetalert2';

export default function Absentees() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(localStorage.getItem('selectedGroup') || '');
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(localStorage.getItem('selectedSession') || '');
  const [absentees, setAbsentees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchOption, setSearchOption] = useState('Name');
  const containerStyle = {
    direction: 'rtl',
  };

  useEffect(() => {
    axios.get('https://registration-production-c3f5.up.railway.app/api/v2/groups')
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
      axios.get(`https://registration-production-c3f5.up.railway.app/api/v2/sessions/${selectedGroup}`)
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
  const barCodeClick = async (id) => {
    try {
      const response = await axios.get(`https://registration-production-c3f5.up.railway.app/api/v2/students/${id}/qrcode`);
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

  useEffect(() => {
    if (selectedGroup && selectedSession) {
      axios.get(`https://registration-production-c3f5.up.railway.app/api/v2/attendance/${selectedGroup}/${selectedSession}`)
        .then(response => {
          console.log(response);
          setAbsentees(response.data.absentees);
        })
        .catch(error => {
          console.error('Error fetching attendance:', error);
          toast.error('Failed to fetch attendance data');
        });
    }
  }, [selectedGroup, selectedSession]);
  const filteredStudents = absentees.filter(student => {
    if (searchOption === 'Name') {
      return student?.Name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    } else if (searchOption === 'phoneNumber') {
      return student?.phoneNumber?.includes(searchTerm);
    } else if (searchOption === 'studentCode') {
      return String(student?.studentCode)?.includes(searchTerm);
    }
    return false;
  });

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
                      <Link className="text-decoration-none text-white fw-bolder">Attendance</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={`${Style.romada} rounded-2 container`} style={containerStyle} >
            <div className="row p-3">
            <div className="col-md-12 my-3 d-flex">
                <div className="d-flex flex-column flex-md-row w-100">
                  <select
                    className="form-select w-50 mb-2 mb-md-0"
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
                      className="form-select w-50 mx-md-2 mb-2 mb-md-0"
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
              </div>
              <div className="col-md-12 d-flex mb-3">
                <div className="col-md-4 mb-md-0 mb-2">
                  <select
                    className="form-select"
                    value={searchOption}
                    onChange={e => setSearchOption(e.target.value)}
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
                    onChange={e => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
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
            <div className="row gy-5 my-4" style={{ direction: 'rtl' }}>
              {filteredStudents.map(student => (
                <div className="col-md-3 text-dark" key={student._id}>
                  <div className={`${Style.romadyi} position-relative p-4 rounded-2`}>
                    <div className='d-flex justify-content-end'>
                    <i onClick={() => barCodeClick(student._id)}  class="fa-solid fa-qrcode fs-2 cursor-pointer"></i>
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
