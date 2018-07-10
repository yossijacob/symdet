import React, { Component } from 'react'
import firebase from 'firebase'
import { db } from '../firebase/firebase'
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';

import { Field, fieldTypes } from '../fields/fields'


class LogSymptomDialog extends Component {
    state = { fields: [] }

    componentDidMount() {
        const userId = firebase.auth().currentUser.uid;
        const userRef = db.collection("users").doc(userId);
        this.setState({
            userRef,
        });
        
        // update tags when added
        userRef.onSnapshot((doc) => {
            if (doc.exists) {
                const user = doc.data();
                this.setState({
                    fields: this.initFields(user.tags),
                    tagsSet:user.tags,
                });
            }
        });
    }


    initFields = (tagsSet = []) => [
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
        },
        {
            name: 'tags',
            type: fieldTypes.autoSuggest,
            label: 'Tags',
            helperText: 'Add tags of recent events, for example food you eat.',
            value: [],
            tagsSet: tagsSet
        }
    ]

    // update fields on change
    handleFieldChange = (name) => {
        return (event, value) => {
            console.log(name,value);
            this.setState(prevState => ({
                fields: prevState.fields.map((field) =>
                    field.name === name ?
                        Object.assign({}, field, { value: value })
                        :
                        field)
            }))
        };
    }

    submit = () => {
        const data = this.state.fields.reduce((obj, item) => (obj[item.name] = item.value, obj), {});
        console.log(this.state.fields);
        console.log(data);
       
        const tags = this.state.fields.tags;
        const metaData = {tags:[...new Set(this.state.tagsSet.concat(data.tags))]}; // merge new tags
        console.log(metaData);
        data.timestamp = firebase.firestore.FieldValue.serverTimestamp()
        const self = this;

        self.props.toggleDialog(false);
        this.state.userRef.set(metaData, {merge: true});
        this.state.userRef.collection("log").add(data).then(function (docRef) {

        }).catch(function (error) {
            self.props.toggleDialog(true);
            console.error("Error adding document: ", error);
        });


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
                    <Grid container spacing={32}>
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
                    <Button onClick={this.submit} color="primary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withMobileDialog()(LogSymptomDialog);