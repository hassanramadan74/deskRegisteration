import React, { useContext, useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  IconButton,
  InputGroup,
  InputRightElement,
  Icon,
} from '@chakra-ui/react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'; // Import icons from react-icons

import axios from 'axios';
import { UserContext } from '../../Context/userContext.js';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  let {setUserToken}= useContext(UserContext);
  let navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://registration-80nq.onrender.com/api/v2/auth/signin', {
        email: email,
        password: password
      });
      if (response.data.message === 'success') {
        localStorage.setItem("userToken",response.data.token);
        setUserToken(response.data.token);
        navigate('/');
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      // Handle error (e.g., display error message)
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>Log In</Heading>
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
          <Button type="submit" colorScheme="teal" mb={8}>
            Log In
          </Button>
        </form>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="dark_mode" mb="0">
            Enable Dark Mode?
          </FormLabel>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
        </FormControl>
      </Flex>
    </Flex>
  );
};

export default Login;
