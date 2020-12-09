import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'reactfire'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import GoogleButton from 'react-google-button'
import { SIGNUP_PATH, HOME_PATH } from 'constants/paths'
import useNotifications from 'modules/notification/useNotifications'
import LoginForm from '../LoginForm'
import styles from './LoginPage.styles'

const useStyles = makeStyles(styles)

function LoginPage() {
  const classes = useStyles()
  const auth = useAuth()
  const { showError } = useNotifications()

  async function emailLogin(formValues) {
    try {
      await auth.signInWithEmailAndPassword(
        formValues.email,
        formValues.password
      )
      // NOTE: window.location used since history.push/replace does not always work
      window.location = HOME_PATH
    } catch (err) {
      showError(err.message)
    }
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.panel}>
        <LoginForm onSubmit={emailLogin} />
      </Paper>
      <div className={classes.signup}>
        <span className={classes.signupLabel}>Need an account?</span>
        <Link className={classes.signupLink} to={SIGNUP_PATH}>
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default LoginPage
