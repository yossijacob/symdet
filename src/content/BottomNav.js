import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import LogIcon from '@material-ui/icons/Assignment';
import CalendarIcon from '@material-ui/icons/Event';
import AnalyzeIcon from '@material-ui/icons/Equalizer';

const styles = theme => ({
    root: {
        position: 'fixed',
        bottom: '0px',
        width: '100%'
    },
});

const pathMap = ['/symlog','/calendar','/analyze']

class BottomNav extends Component {
    handleChange = (event, value) => {
        this.props.history.push(pathMap[value]);
    };

    render() {
        const { classes, location } = this.props;
        return (
            <BottomNavigation
                value={pathMap.indexOf(location.pathname)}
                onChange={this.handleChange}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Log" icon={<LogIcon />} />
                <BottomNavigationAction label="Calendar" icon={<CalendarIcon />} />
                <BottomNavigationAction label="Analyze" icon={<AnalyzeIcon />} />
            </BottomNavigation>
        )
    }
}

export default withStyles(styles)(withRouter(BottomNav))