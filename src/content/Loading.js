import React from 'react'
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles={
    container:{
        height:'100vh',
    }
}

const Loading = ({classes}) => {
  return (
    <Grid container justify='center' alignItems='center' className={classes.container}>
        <Grid item>
            <CircularProgress/>
        </Grid>         
    </Grid>
  )
}

export default withStyles(styles)(Loading);