import '../index.css'
import axios from 'axios';
import { useFormik } from "formik";
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import * as yup from 'yup';

const dev = "http://localhost:5000"
const baseUrl = window.location.hostname.split(":")[0] === "localhost" ? dev : "";

const validationSchema = yup.object({
  

  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(10, 'No more then 10')
    .required('Password is required'),

});


function Login() {

  const formik = useFormik({
    validationSchema: validationSchema,
    initialValues: {
      
      email: '',
      password: '',

    },
    onSubmit: onSubmitFunction
  });

  function onSubmitFunction(values, { resetForm }) {
    console.log("values: ", values)

    axios.post(`${baseUrl}/api/v1/login`, {
      
      email: values.email,
      password: values.password
    })
      .then(res => {
        console.log(res.data);

      });
    resetForm({ values: '' })

  }

  return (
    <div className="container">
      <div className="heading">
        <h1>Log-in</h1>
      </div>


      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
         

          <TextField
            fullWidth
            color="primary"
            id="outlined-basic"
            label="E-mail"
            variant="outlined"

            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}

            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />

          <TextField
            fullWidth
            color="primary"
            id="filled-basic"
            label="Password"
            variant="outlined"
            type="password"

            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}

            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button fullWidth variant="contained" color="primary" type="submit">Login</Button>
        </Stack>
      </form>
    </div>
  );
}

export default Login;
