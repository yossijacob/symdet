import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import AddEventDialog from './AddEventDialog'

const styles = theme => ({
    addButton: {
        position: 'fixed',
        bottom: '30px',
        right: '30px'
    },
});

class SymLog extends Component {
    state = {
        addDialogOpen: false,
    };

    toggleAddDialog = (val) => {
        this.setState({ addDialogOpen: val });
    };

    render() {
        const { classes, match } = this.props;
        
        return (
            <div>
                Symlog
                <Button variant="fab" color="primary" aria-label="add" className={classes.addButton}>
                    <AddIcon onClick={ () => this.toggleAddDialog(true)}/>
                </Button>
                <AddEventDialog open={this.state.addDialogOpen} toggleDialog={this.toggleAddDialog}/>
            </div>
        )
    }
}


export default withStyles(styles)(SymLog)