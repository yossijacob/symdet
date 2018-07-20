import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    addButton: {
        position: 'fixed',
        bottom: '30px',
        right: '30px'
    },
});

class Analyze extends Component {
    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={8}>
                <Grid item xs={12}>Coming Soon</Grid>
            </Grid>
        )
    }
}


export default withStyles(styles)(Analyze)

export const AnalyzeAppBar = () => {
    return "Analyze"
}