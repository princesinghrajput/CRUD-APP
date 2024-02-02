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
import { useAuth } from '../context/AuthContext';
import axios from "axios";

const Signup = () => {
  const { login } = useAuth();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
  const [password, setPassword] = useState('');
  const [pic, setPic] = useState('');
  const [picLoading, setPicLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = () => setShow(!show);

  const submitHandler = async () => {
    setPicLoading(true);
    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: 'Please Fill all the Fields',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: 'Passwords Do Not Match',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          'Content-type': 'application/json',
        },
      };

      const { data } = await axios.post("http://localhost:8000/api/user", { name, email, password, pic }, config);

      console.log(data);
      toast({
        title: 'Registration Successful',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setPicLoading(false);
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: error.response?.data?.message || 'Unknown error',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
    }
    login(); // Called this after successful signup
  };

  const postDetails = (pics) => {
    setPicLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      return;
    }

    console.log(pics);
    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'CRUD-APP');
      data.append('cloud_name', 'dsh8ayde9');

      fetch('https://api.cloudinary.com/v1_1/dsh8ayde9/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else {
      toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
      setPicLoading(false);
    }
  };

  return (
    <Box
      backgroundImage="linear-gradient(to right, #667eea, #764ba2)"
      borderRadius="lg"
      p="6"
      mt="100"
      maxW="400px"
      mx="auto"
      boxShadow="lg"
    >
      <VStack spacing="4" align="stretch">
        <FormControl id="first-name" isRequired>
          <FormLabel color="white">Name</FormLabel>
          <Input
            value={name}
            placeholder="Enter Your Name"
            size="md"
            focusBorderColor="blue.500"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
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
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
              size="md"
              focusBorderColor="blue.500"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick} fontSize="sm">
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl id="confirmpassword" isRequired>
          <FormLabel color="white">Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              type={show ? 'text' : 'password'}
              placeholder="Confirm password"
              size="md"
              focusBorderColor="blue.500"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick} fontSize="sm">
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {/* <FormControl id="pic">
          <FormLabel color="white">Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
          />
        </FormControl> */}
        <Button
          colorScheme="blue"
          width="100%"
          mt={4}
          onClick={submitHandler}
          isLoading={picLoading}
        >
          Sign Up
        </Button>
        <Text mt={2} textAlign="center" color="white">
          Already have an account?{' '}
          <Link color="blue.500" href="/login">
            Login
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Signup;
