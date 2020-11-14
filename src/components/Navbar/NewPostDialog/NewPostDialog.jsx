import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import styles from './NewPostDialog.styles'

const useStyles = makeStyles(styles)

function NewPostDialog({ onSubmit, open, onRequestClose, uploadImage }) {
  const classes = useStyles()
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting, isValid }
  } = useForm({ mode: 'onChange' })

  return (
    <Dialog open={open} onClose={onRequestClose}>
      <DialogTitle id="new-project-dialog-title">New Post</DialogTitle>
      <form className={classes.root} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <TextField
            error={!!errors.name}
            helperText={errors.name && 'Description is required'}
            name="description"
            label="Post Description"
            inputRef={register({
              required: true
            })}
            inputProps={{ tabIndex: '1' }}
            margin="normal"
            fullWidth
          />
          <TextField
            error={!!errors.name}
            name="tags"
            label="Enter Tags"
            inputRef={register({
              required: false
            })}
            inputProps={{ tabIndex: '1' }}
            margin="normal"
            fullWidth
          />
          <Button variant="contained" component="label">
            Upload File
            <input type="file"
            style={{ display: "none" }}
            onChange={uploadImage}
            />
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={onRequestClose} tabIndex="3">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            disabled={isSubmitting || !isValid}
            tabIndex="2">
            {isSubmitting ? 'Creating...' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

NewPostDialog.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
}

export default NewPostDialog
