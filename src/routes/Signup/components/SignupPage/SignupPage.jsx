import React from 'react'
import { Link } from 'react-router-dom'
import GoogleButton from 'react-google-button'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { useAuth, useDatabase } from 'reactfire'
import { makeStyles } from '@material-ui/core/styles'
import { LOGIN_PATH, PROFILE_PATH } from 'constants/paths'
import { useNotifications } from 'modules/notification'
import SignupForm from '../SignupForm'
import styles from './SignupPage.styles'
import { useEmailSignup } from 'utils/databaseUtils'
import { USERS_COLLECTION } from 'constants/firebasePaths'

const useStyles = makeStyles(styles)

function SignUpSection() {
  const classes = useStyles()
  const { showError } = useNotifications()
  const auth = useAuth()
  const { GoogleAuthProvider } = useAuth
  const database = useDatabase()

  async function googleLogin() {
    const provider = new GoogleAuthProvider()
    try {
      await auth.signInWithPopup(provider)
      // NOTE: window.location used since history.push/replace does not always work
      window.location = PROFILE_PATH
    } catch (err) {
      showError(err.message)
    }
  }

  async function emailSignup(formValues) {
    try {
      await auth.createUserWithEmailAndPassword(
        formValues.email,
        formValues.password
      ).then(function({user}) {
        var data = {
          email: user.email,
          username: formValues.username
        }

        database.ref(`${USERS_COLLECTION}/${user.uid}`)
        .set(data)
      })

      // NOTE: window.location used since history.push/replace does not always work
      window.location = PROFILE_PATH
    } catch (err) {
      showError(err.message)
    }
  }

  return (
    <React.Fragment>
      <Paper className={classes.panel}>
        <SignupForm onSubmit={emailSignup} />
      </Paper>
      <div className={classes.orLabel}>or</div>
      <div className={classes.providers}>
        <GoogleButton onClick={googleLogin} data-test="google-auth-button" className={classes.center}/>
      </div>
      <div className={classes.login}>
        <span className={classes.loginLabel}>Already have an account?</span>
        <Link className={classes.loginLink} to={LOGIN_PATH}>
          Login
        </Link>
      </div>
    </React.Fragment>
  )
}

function GridListPost() {
  const classes = useStyles()
  const tileData = []; // get data from existing posts
  return (
    <div className={classes.gridListPost}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {tileData && tileData.map((tile) => (
          <GridListTile key={tile.id} cols={tile.cols || 1}>
            <img src={tile.imageUrl} alt={tile.name} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}

function SignupPage() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid xs={12} md={6} lg={6}>
          <GridListPost />
        </Grid>
        <Grid xs={12} md={6} lg={6}>
          <SignUpSection />
        </Grid>
      </Grid>
    </div>
  )
}


export default SignupPage
