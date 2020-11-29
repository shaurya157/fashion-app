export default theme => ({
  root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      width: `100%`
    },
    gridList: {
      width: `100%`,
      height: `auto`,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
})
