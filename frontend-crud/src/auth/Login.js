import React, { useState } from 'react';
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Link,
  useToast,
  Box,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUserLogin } from '../api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigation = useNavigate();

  const handleTogglePassword = () => setShowPassword(!showPassword);

  const submitHandler = async () => {
    setLoading(true);

    if (!email || !password) {
      toast({
        title: 'Please fill in all fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await getUserLogin({ email, password }, config);
      toast({
        title: 'Login Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
      navigation('/user');
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response?.data?.message || 'Unknown error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setLoading(false);
    }
    login(); // Call this after a successful login
  };

  return (
    
    <Box
    backgroundImage="linear-gradient(to right, #667eea, #764ba2)"
    borderRadius="lg"
    p="6"
    mt="100" // Adjust the top margin as needed
    maxW="400px"
    mx="auto"
    boxShadow="lg"
    >
      <VStack spacing="4" align="stretch">
        <FormControl id="email" isRequired>
          <FormLabel color="white">Email Address</FormLabel>
          <Input
            value={email}
            type="email"
            placeholder="Enter Your Email Address"
            size="md"
            focusBorderColor="blue.500"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel color="white">Password</FormLabel>
          <InputGroup size="md">
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter password"
              size="md"
              focusBorderColor="blue.500"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleTogglePassword} fontSize="sm">
                {showPassword ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button colorScheme="blue" width="100%" mt={4} onClick={submitHandler} isLoading={loading}>
          Login
        </Button>
        <Text mt={2} textAlign="center" color="white">
          Don't have an account?{' '}
          <Link color="blue.500" href="/signup">
            Sign Up
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
