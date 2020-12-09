import React from 'react'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid'
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
  let tempTags = [];
  Object.keys(post.tags).forEach(key => tempTags.push(key));

  return (
    <Grid container className={classes.root} justify="center">
      <Grid item xs={10} className={classes.gridItem}>
        <Paper className={classes.pane}>
          <img src={post.imageUrl}/>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {post.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {post.description}
            </Typography>
            Tags: {tempTags && tempTags.map((tag, index) => {
              return (<Typography key={`${tag}-${index}`} variant="body2" color="textSecondary" component="p">
                {tag}
              </Typography>)
            })}
            <Comments commentsObj={post.comments} onSubmit={onSubmit} />
          </CardContent>
        </Paper>
      </Grid>
    </Grid>
  )
}



export default PostData
