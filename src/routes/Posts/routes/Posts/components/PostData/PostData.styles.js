export default (theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
  gridItem: {
    textAlign: 'center',
    marginTop: theme.spacing(5)
  },
  pane: {
    // ...theme.flexColumnCenter,
    justifyContent: 'space-around',
    padding: theme.spacing(6)
  },
  media: {
    height: 350
  }
})

// root: {
//   padding: theme.spacing(2)
// },
// card: {
//   marginBottom: theme.spacing(2)
// }
