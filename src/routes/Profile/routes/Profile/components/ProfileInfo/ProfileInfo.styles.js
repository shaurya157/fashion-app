export default (theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1)
    }
  },
  xlarge: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  gridItem: {
    textAlign: 'center',
    marginTop: theme.spacing(5)
  },
  pane: {
    ...theme.flexColumnCenter
  }
})
