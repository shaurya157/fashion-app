import React, { useState } from 'react'
import { useFirebaseApp } from 'reactfire'
import { Link } from 'react-router-dom'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import AccountCircle from '@material-ui/icons/AccountCircle'
import { makeStyles } from '@material-ui/core/styles'
import { ACCOUNT_PATH, PROFILE_PATH, SEARCH_PATH } from 'constants/paths'
import styles from './Navbar.styles'
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import NewPostDialog from './NewPostDialog'
import { useNewPostCreation, useSearchByTag } from 'utils/databaseUtils'
import { useUser } from 'reactfire'
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles(styles)

function AccountMenu() {
  const classes = useStyles()
  const [anchorEl, setMenu] = useState(null)
  const firebase = useFirebaseApp()
  const auth = useUser()
  const userId = auth.uid;
  function closeAccountMenu() {
    setMenu(null)
  }
  function handleMenuClick(e) {
    setMenu(e.target)
  }
  function handleLogout() {
    closeAccountMenu()
    // redirect to '/login' will occur if on a route where auth is required
    return firebase.auth().signOut()
  }

  const {
    addPost,
    newDialogOpen,
    toggleDialog,
    uploadImage
  } = useNewPostCreation()

  function handleSearchInput(input) {
    window.location = SEARCH_PATH + `/${input}`
  }

  return (
    <>
    <SearchBar
      cancelOnEscape
      onRequestSearch={handleSearchInput}
    />
      <IconButton
        aria-owns={anchorEl ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={toggleDialog}
        classes={{ root: classes.accountButton }}>
        <AddAPhotoIcon />
      </IconButton>

      <NewPostDialog
        onSubmit={addPost}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
        uploadImage={uploadImage}
      />
      <IconButton
        aria-owns={anchorEl ? 'menu-appbar' : null}
        aria-haspopup="true"
        onClick={handleMenuClick}
        classes={{ root: classes.accountButton }}>
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(anchorEl)}
        onClose={closeAccountMenu}>
        <MenuItem
          component={Link}
          to={ACCOUNT_PATH}
          onClick={closeAccountMenu}
        >
          Account
        </MenuItem>
        <MenuItem
          component={Link}
          to={PROFILE_PATH + `/${userId}`}
          onClick={closeAccountMenu}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
      </Menu>
    </>
  )
}

export default AccountMenu
