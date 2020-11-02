import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import { useDatabaseObject, useDatabase, useUser, useDatabaseList } from 'reactfire'
import { useNotifications } from 'modules/notification'
import { POSTS_COLLECTION } from 'constants/firebasePaths'
import styles from './PostData.styles'
import Comments from 'components/Comments'

const useStyles = makeStyles(styles)

function PostData({ post, onSubmit }) {
  const classes = useStyles()
  console.log(post);
  return (
    <Paper>
      <CardMedia
        className={classes.media}
        image={post.imageUrl}
        title="Contemplative Reptile"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {post.title}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.description}
        </Typography>
        <Comments commentsObj={post.comments} onSubmit={onSubmit} />
      </CardContent>
    </Paper>
  )
}

export default PostData
