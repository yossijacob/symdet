import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';



const styles = theme => ({
    container: {
        padding: 15,
        paddingBottom: '55px'
    },
});

class Calendar extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid container className={classes.container}>
                <Grid item xs={12}>Coming Soon</Grid>
            </Grid>
        )
    }
}


export default withStyles(styles)(Calendar)

export const CalendarAppBar = () => {
    return "Calendar"
}