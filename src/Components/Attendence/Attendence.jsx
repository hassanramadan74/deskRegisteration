import React, { useEffect, useState } from 'react';
import Style from './Attendence.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner';
import { Helmet } from 'react-helmet';
import toast from 'react-hot-toast';
import { Select, Flex, Heading, Box, Text } from '@chakra-ui/react';

export default function Attendence() {
  const { ID, sessionID } = useParams();
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('');
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState('');
  const [sessionDetails, setSessionDetails] = useState(null);

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

  const handleGroupChange = (event) => {
    const groupID = event.target.value;
    setSelectedGroup(groupID);

    // Fetch sessions for the selected group
    axios.get(`https://registration-80nq.onrender.com/api/v2/sessions/${groupID}`)
      .then(response => {
        setSessions(response.data.sessions);
      })
      .catch(error => {
        console.error('Error fetching sessions:', error);
      });
  };

  const handleSessionChange = (event) => {
    setSelectedSession(event.target.value);
  };


  
  useEffect(() => {
    if (selectedGroup && selectedSession) {
      axios.get(`https://registration-80nq.onrender.com/api/v2/sessions/${selectedGroup}/${selectedSession}`)
        .then(response => {
          setSessionDetails(response.data);
        })
        .catch(error => {
          console.error('Error fetching session details:', error);
        });
    }
  }, [selectedGroup, selectedSession]);








  return (
    <>
      <Helmet>
        <title>Attendence</title>
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

          <div className="row">
            <div className="col-md-12 d-flex justify-content-center">
              <Flex direction="column" alignItems="center">
                <Heading mb={4}>Select Group</Heading>
                {loading ? (
                  <Oval color="#00BFFF" height={80} width={80} />
                ) : (
                  <Select placeholder="Select group" onChange={handleGroupChange}>
                    {groups.map(group => (
                      <option key={group._id} value={group._id}>
                        {group.Name}
                      </option>
                    ))}
                  </Select>
                )}
                {selectedGroup && (
                  <>
                    <Heading mb={4} mt={4}>Select Session</Heading>
                    <Select placeholder="Select session" onChange={handleSessionChange}>
                      {sessions.map(session => (
                        <option key={session._id} value={session._id}>
                          {session.name}
                        </option>
                      ))}
                    </Select>
                  </>
                )}
                {sessionDetails && (
                  <Box mt={4} p={4} borderWidth="2px" borderRadius="lg">
                    <Text>Total Students: {sessionDetails.totalStudents}</Text>
                    <Text>Total Price: {sessionDetails.totalPrice}</Text>
                  </Box>
                )}
              </Flex>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
