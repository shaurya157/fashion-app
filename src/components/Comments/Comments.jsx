import React from 'react'
import { useForm } from 'react-hook-form'
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  TextField, Button
} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles'
import styles from './Comments.styles'

const useStyles = makeStyles(styles)

function Comments({commentsObj, onSubmit}) {

  const classes = useStyles()
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid }
  } = useForm({
    mode: 'onChange',
    nativeValidation: false
  })

  const commentsArr = []
  if(commentsObj) {
    Object.keys(commentsObj).forEach( key => {
      commentsArr.push(commentsObj[key])
    })
  }


  return (
    <>
    <List className={classes.root}>
    {commentsArr.map(comment => {
      console.log("Comment", comment);
      return (
        <React.Fragment key={comment.id}>
          <ListItem key={comment.id} alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="avatar" src={comment.photoUrl} />
            </ListItemAvatar>
            <ListItemText
              primary={
                <Typography className={classes.fonts}>
                  {comment.username}
                </Typography>
              }
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {comment.email}
                  </Typography>
                  {`${comment.description}`}
                </>
              }
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      );
    })}
  </List>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <TextField
          name="description"
          id="outlined-basic"
          label="Add Comment.."
          variant="outlined"
          margin="normal"
          inputRef={register}
          fullWidth={true} />
        <div className={classes.submit}>
          <Button
            color="primary"
            type="submit"
            variant="contained"
            disabled={isSubmitting || !isValid} fullWidth>
            {isSubmitting ? 'Loading' : 'Send'}
          </Button>
        </div>
      </form>
    </>
  )
}

export default Comments
