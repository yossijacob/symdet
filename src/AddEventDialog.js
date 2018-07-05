import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
// import Slider from '@material-ui/lab/Slider';

import { SliderField, Field, fieldTypes } from './fields'


class AddEventDialog extends Component {
    state = {
        fields: [
            {
                name: 'hoursSlept',
                type: fieldTypes.slider,
                label: 'Hours slept last night',
                range: 12,
                value: 6
            },
            {
                name: 'stress',
                type: fieldTypes.slider,
                label: 'Current stress level',
                range: 3,
                value: 0
            }
        ]
    };

    handleFieldChange = (name) => {
        return (event, value) => {
            this.setState(prevState => ({
                fields: prevState.fields.map((field) =>
                    field.name == name ?
                        Object.assign({}, field, { value: value })
                        :
                        field)
            }))
        };
    }

    render() {
        const { open, toggleDialog, fullScreen } = this.props;
        
        return (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={() => toggleDialog(false)}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Log Symptom
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={16}>
                        {this.state.fields.map((field) => {
                            return (
                                <Field {...field} onChange={this.handleFieldChange} key={field.name} />
                            )
                        })}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => toggleDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withMobileDialog()(AddEventDialog);