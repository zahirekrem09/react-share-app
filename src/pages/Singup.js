import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import * as Yup from "yup";
import { useFormik } from "formik";
import { auth, db, storage } from "../firebase";
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(1, 0, 1),
    borderRadius: theme.spacing(8),
    alignItems: "center",
    // backgroundColor: "tomato",
  },
  input: {
    borderRadius: "1rem",
  },
}));

const SignupSchema = Yup.object().shape({
  displayName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});
export default function SignUp({ setAuth }) {
  const [errMsg, setErrMsg] = useState(null);
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      password: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const singUp = (e) => {
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        formik.values.email,
        formik.values.password
      )
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: formik.values.displayName,
        });
      })
      .catch((err) => setErrMsg(err.message));
  };

  const useGoogleProvider = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: "select_account" });
    auth.signInWithPopup(googleProvider);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                className={classes.input}
                autoComplete="dname"
                fullWidth
                name="displayName"
                variant="outlined"
                required
                id="displayName"
                label="Display Name"
                onChange={formik.handleChange}
                value={formik.values.displayName}
                autoFocus
              />
            </Grid>

            <Grid item xs={12} className={classes.input}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={12} className={classes.input}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Grid>
            {errMsg ? <Alert severity="error">{errMsg}</Alert> : null}
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={singUp}
                size="small"
                fullWidth
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12} sm={4} justify="center" alignItems="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={() => setAuth("LOGIN")}
                size="small"
                fullWidth
              >
                Sign In
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
                size="small"
                onClick={useGoogleProvider}
                fullWidth
              >
                Google
              </Button>
            </Grid>
          </Grid>

          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
