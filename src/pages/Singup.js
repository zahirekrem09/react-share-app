import React from "react";
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
import { Formik } from "formik";
import { useFormik } from "formik";
import { auth, db, storage } from "../firebase";

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
    // backgroundColor: "tomato",
  },
  input: {
    borderRadius: "1rem",
  },
}));

const validate = (values) => {
  const errors = {};
  if (!values.displayName) {
    errors.displayName = "Required";
  } else if (values.displayName.length > 15) {
    errors.displayName = "Must be 15 characters or less";
  }

  //    if (!values.lastName) {
  //      errors.lastName = "Required";
  //    } else if (values.lastName.length > 20) {
  //      errors.lastName = "Must be 20 characters or less";
  //    }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};

export default function SignUp() {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      email: "",
      displayName: "",
      password: "",
    },
    validate,
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
      .catch((err) => alert(err.message));
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

              {formik.errors.firstName ? (
                <Alert severity="error">{formik.errors.displayName}</Alert>
              ) : null}
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
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={singUp}
              >
                Sign Up
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Google Sign Up
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
