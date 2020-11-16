export default (theme) => ({
  root: {
    ...theme.flexColumnCenter,
    justifyContent: 'flex-start',
    height: '100%',
    width: '100%',
    fontWeight: 400,
    paddingTop: '1.5rem'
  },
  panel: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    flexGrow: 1,
    padding: '1.25rem',
    width: '250px',
    minHeight: '270px',
    margin: '100px auto 0'
  },
  orLabel: {
    marginTop: '1rem',
    marginBottom: '.5rem',
    textAlign: 'center'
  },
  login: {
    ...theme.flexColumnCenter,
    justifyContent: 'center',
    marginTop: '1.5rem'
  },
  loginLabel: {
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  loginLink: {
    fontSize: '1.2rem'
  },
  providers: {
    marginTop: '1rem',
  },
  center: {
    width: '50%',
    margin: 'auto' 
  },
  gridListPost: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
    margin: '100px',
    minHeight: '500px'
  },
  gridList: {
    width: 500,
    height: 450,
  }
})
