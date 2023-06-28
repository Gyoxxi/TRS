import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFormControl, Box, TextField, Button, Typography, Grid, Link } from '@mui/material';

export default function SignUp() {


  let navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    isActive: true,
    userType: { type: 'FullTimeStudent' },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  const { firstName, lastName, username, email, password, isActive, userType, createdAt, updatedAt } = user;

  const [emailExists, setEmailExists] = useState(false);
  const handleInputChange = async   (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  
    if (name === 'email') {
      const exists = await checkEmailExists(value);
      setEmailExists(exists);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8080/users/check-email=${email}`);
      return response.data !== null;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName,
      lastName,
      username,
      email,
      password,
      isActive,
      userType,
      createdAt,
      updatedAt,
    };

    try {
      const response = await axios.post('http://localhost:8080/users', newUser);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <Box mb={4} textAlign="center">   
        <Typography variant="h3" component="h3">
          Sign Up
        </Typography>
        <Typography variant="h7" component="h7">
         Already a member? <Link href="/sign-in">Log in </Link>
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            id="outlined-required"
            label="First name"
            name="firstName"
            value={firstName}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Last name"
            name="lastName"
            value={lastName}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Username"
            name="username"
            value={username}
            helperText= "Must be 5-12 characters, start with a letter"
            error={username != '' && !/^[a-zA-Z][a-zA-Z0-9]{5,12}$/i.test(username)}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            type="email"
            label="Email address"
            name="email"
            value={email}
            helperText= {emailExists ? "This email already exists" : "Must be a valid email address"}
            onChange={(e) => handleInputChange(e)}
            error={(email != '' && !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email)) || emailExists }
            inputProps={{
              pattern: "^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]+)*$",
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            type="password"
            label="Password"
            name="password"
            value={password}
            helperText= "Must be 12-20 chararcters with uppercase letters, lowercase letters, numbers, and special characters"
            error={password != '' && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}/i.test(password)}
            onChange={(e) => handleInputChange(e)}
          />
        </Grid>
      </Grid>

      <Box mt={4} textAlign="center">
      <Button
        style={{ maxHeight: '50px', minHeight: '50px', fontSize: '18px' }}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={
          firstName === '' ||
          lastName === '' ||
          username === '' ||
          email === '' ||
          password === '' ||
          emailExists ||
          !/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i.test(email) ||
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,20}/i.test(password) ||
          !/^[a-zA-Z][a-zA-Z0-9]{5,12}$/i.test(username)
        }
      >
        Sign Up
      </Button>
    </Box>
    </form>
  );
}