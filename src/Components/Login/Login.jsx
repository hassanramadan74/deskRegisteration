import React, { useContext, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  IconButton,
  InputGroup,
  InputRightElement,
  Icon,
  Text,
  Box, // Import Box from Chakra UI for positioning
} from '@chakra-ui/react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'; // Import icons from react-icons

import axios from 'axios';
import { UserContext } from '../../Context/userContext.js';
import { useNavigate } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'; // Import Oval loader from react-loader-spinner

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // State for loading indicator
  let { setUserToken } = useContext(UserContext);
  let navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true); // Set loading to true on form submit

    try {
      const response = await axios.post('https://registration-80nq.onrender.com/api/v2/auth/signin', {
        email: email,
        password: password
      });
      if (response.data.message === 'success') {
        localStorage.setItem("userToken", response.data.token);
        setUserToken(response.data.token);
        navigate('/home');
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      // Handle error (e.g., display error message)
    } finally {
      setLoading(false); // Set loading to false after request completes (success or error)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleStudentLogin = () => {
    // Handle student login logic here
    navigate('/anotherSpace');
  };

  return (
    <Flex flexDirection="column" h="100vh" alignItems="center" justifyContent="center">
      <Text mb={20} fontSize='5xl'>
        Brought to you by <Text as='span' color='teal.500'>H&M</Text>
      </Text>
      <Flex
        flexDirection="column"
        bg="teal.200"
        p={12}
        borderRadius={8}
        boxShadow="lg"
        position="relative" // Set position to relative for parent container
      >
        {loading && ( // Conditionally render the loader
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)" // Center the loader
            zIndex="9999" // Set a high z-index to ensure it appears above other elements
          >
            <Oval width={24} height={24} color="green" />
          </Box>
        )}
        <Heading color="black" mb={6}>Log In</Heading>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            mb={3}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <InputGroup size="md" mb={6}>
            <Input
              placeholder="**********"
              type={showPassword ? 'text' : 'password'}
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <InputRightElement width="3rem">
              <IconButton
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={togglePasswordVisibility}
                icon={showPassword ? <Icon as={MdVisibilityOff} /> : <Icon as={MdVisibility} />}
                variant="ghost"
              />
            </InputRightElement>
          </InputGroup>
          <Button type="submit" colorScheme="teal" mb={8} width="100%" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
        <Button onClick={handleStudentLogin} colorScheme="blue" disabled={loading}>
          Student Login
        </Button>
      </Flex>
    </Flex>
  );
};

export default Login;
