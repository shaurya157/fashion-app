import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import PostsDisplay from 'components/PostsDisplay'
import {useLikedPosts } from 'utils/databaseUtils'
import { useUser } from 'reactfire'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: 'rgb(69, 151, 236)'
    }
  }
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />)

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&:focus': {
      opacity: 1
    }
  }
}))((props) => <Tab disableRipple {...props} />)

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  padding: {
    padding: theme.spacing(3)
  }
}))

export default function CustomizedTabs({user, posts}) {
  const auth = useUser()
  const currUser = auth.displayName;
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  let likedPostIds = []

  user.likes.forEach((like) => {
    let id = Object.keys(like)[0]
    if((!like.temp || !like.tempLike) && like[id] == true ){
      likedPostIds.push(Object.keys(like)[0])
    }
  })

  const {likedPosts} = useLikedPosts();
  const likedPostsToDisplay = likedPosts(likedPostIds);
  const showDelete = posts[0] && (posts[0].createdby === currUser)

  return (
    <div className={classes.root}>
      <div>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example">
          <StyledTab label="Post (TAB)" />
          <StyledTab label="Like" />
        </StyledTabs>
        <Typography className={classes.padding} />
        <TabPanel component={'span'} value={value} index={0}>
          <PostsDisplay posts={posts} showDelete={showDelete}/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PostsDisplay posts={likedPostsToDisplay} showDelete={false} />
        </TabPanel>
      </div>
    </div>
  )
}
