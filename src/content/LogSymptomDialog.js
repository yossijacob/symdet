import React, { Component } from 'react'
import { decorate, observable, computed } from "mobx"
import { observer } from 'mobx-react';
import moment from 'moment'
import firebase from 'firebase'
import { db } from '../firebase/firebase'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Button from '@material-ui/core/Button';
import { Field, fieldTypes } from '../fields/fields'


// const initFields = ({ tagsSet = [], tags = [], hoursSlept = 6, stress = 0 }) => {
//     console.log('initFields tagsSet', tagsSet);
//     return [
//         {
//             name: 'tags',
//             type: fieldTypes.autoSuggest,
//             label: 'Tags',
//             helperText: 'Add tags of recent events, for example food you eat.',
//             value: tags,
//             tagsSet: tagsSet
//         },
//         {
//             name: 'hoursSlept',
//             type: fieldTypes.select,
//             label: 'Hours slept last night',
//             options: [...Array(12).keys()].map(i => ({ name: i, value: i })),
//             value: hoursSlept
//         },
//         {
//             name: 'stress',
//             type: fieldTypes.select,
//             label: 'Current stress level',
//             options: [{ name: 'None', value: 0 }, { name: 'Low', value: 1 }, { name: 'Moderate', value: 2 }, { name: 'High', value: 3 }],
//             value: stress
//         },
//     ]
// }

const initFields = (tagsSet=[]) => [
        {
            name: 'tags',
            type: fieldTypes.autoSuggest,
            label: 'Tags',
            helperText: 'Add tags of recent events, for example food you eat.',
            value: [],
            tagsSet: tagsSet
        },
        {
            name: 'hoursSlept',
            type: fieldTypes.select,
            label: 'Hours slept last night',
            options: [...Array(12).keys()].map(i => ({ name: i, value: i })),
            value: 6
        },
        {
            name: 'stress',
            type: fieldTypes.select,
            label: 'Current stress level',
            options: [{ name: 'None', value: 0 }, { name: 'Low', value: 1 }, { name: 'Moderate', value: 2 }, { name: 'High', value: 3 }],
            value: 0
        },
    ]

class Store {
    open = false;
    isEdit = false;
    editLog = null;
    tagsSet = [];
    fields = initFields();

    get submitData() {
        let data = this.fields.reduce((obj, item) => { obj[item.name] = item.value; return obj }, {});
        if (!this.isEdit) {
            data.timestamp = moment().unix();
        }
        return data;
    };

    get metaData() {
        return { tags: [...new Set(this.tagsSet.concat(this.submitData.tags))] }
    };

    // initalizeFields() {
    //     const log = this.editLog === null ? {} : this.editLog;
    //     console.log('initalizeFields', log);
    //     this.fields = initFields(this.tagsSet, ...log);
    //     console.log('initalizeFields fields', this.fields[2].value);
    // }

    // openForEdit(log) {
    //     console.log('openForEdit', log);
    //     this.editLog = log;
    //     console.log('openForEdit editLog', this.editLog.hoursSlept);
    //     this.initalizeFields();
    //     this.open = true;
    // }

    setTags(tagsSet){
        this.tagsSet = tagsSet;
        const field = this.fields.find(f => f.name === 'tags')
        field.tagsSet = tagsSet;
    }

    openDialog() {  
        this.open = true;
        this.isEdit = false;
        this.fields = initFields(this.tagsSet);
    }

    editDialog(log){
        this.open = true;
        this.isEdit = true;
        this.editLog = log;
        this.fields.forEach( field => {
            field.value = log[field.name];
        })
    }

    // update fields on change
    handleFieldChange = (name) => {
        return (value) => {
            console.log(name, value)
            const field = this.fields.find(f => f.name === name)
            field.value = value;
            // this.fields = this.fields.map((field) =>
            //         field.name === name ?
            //             Object.assign({}, field, { value: value })
            //             :
            //             field)
        };
    }
}
decorate(Store, {
    open: observable,
    editLog: observable,
    tagsSet: observable,
    fields: observable,
    submitData: computed,
    metaData: computed,
})
const store = new Store();
export { store }

const style = theme => ({
    logTime: {
        fontSize: '14px',
        color: theme.palette.secondary.main
    }
});

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
            // let tags;
            // if (doc.exists) {
            //     // tags = doc.data().tags;
            //     store.tagsSet = doc.data().tags;
            // }
            // else {
            //     tags = []
            // }
            const tags = doc.exists ? doc.data().tags : [];
            store.setTags(tags);
            // store.initalizeFields();
            // this.setState({
            //     fields: this.initFields(tags),
            //     // tagsSet: tags,
            // });
        });
    }

    // componentDidUpdate(prevProps) {
    //     let log = this.props.editLog
    //     if (log !== prevProps.editLog) {
    //         if (this.props.editLog === null) {  // new log
    //             log = {}
    //         }
    //         this.setState((prevState, props) => {
    //             return {
    //                 fields: this.initFields({ tagsSet: prevState.tagsSet, ...log }),
    //             };
    //         });
    //     }
    // }



    // // update fields on change
    // handleFieldChange = (name) => {
    //     return (value) => {
    //         this.setState(prevState => ({
    //             fields: prevState.fields.map((field) =>
    //                 field.name === name ?
    //                     Object.assign({}, field, { value: value })
    //                     :
    //                     field)
    //         }))
    //     };
    // }

    submit = () => {
        const log = store.editLog;// this.props.editLog;
        //const data = this.state.fields.reduce((obj, item) => { obj[item.name] = item.value; return obj }, {});
        // const metaData = { tags: [...new Set(this.state.tagsSet.concat(data.tags))] }; // merge new tags     
        // const self = this;

        // self.props.closeDialog();
        store.open = false;
        console.log('store.metadata', store.metaData);
        console.log('store.submitData', store.submitData);
        this.state.userRef.set(store.metaData, { merge: true });

        let query;
        if (!store.isEdit) { // Create
            // data.timestamp = moment().unix();
            query = this.state.userRef.collection("log").add(store.submitData); // create    
        } else {    // edit
            query = this.state.userRef.collection("log").doc(log.id).update(store.submitData);
        }

        query.then(function (docRef) {
            // console.log(docRef);
        }).catch(function (error) {
            // self.props.closeDialog();
            store.open = false;
            console.error("Error adding document: ", error);
        });



    }

    render() {
        const { classes, fullScreen } = this.props;
        const { open, editLog, fields, isEdit } = this.props.store;
        // console.log(fields);
        let time;
        if (isEdit) {
            time = moment.unix(editLog.timestamp).format("dddd, MMMM Do YYYY HH:mm:ss");
        }

        return (
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={() => store.open = false}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {isEdit ?
                        (<div>
                            Edit Log
                            <div className={classes.logTime}>{time}</div>
                        </div>)
                        :
                        'Log Symptom'
                    }
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={16}>
                        {fields.map((field) => {
                            return (
                                <Field {...field} onChange={store.handleFieldChange} key={field.name} />
                            )
                        })}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    {/* <Button onClick={() => closeDialog()} color="primary">
                        Cancel
                    </Button> */}
                    <Button onClick={() => store.open = false} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.submit} color="primary" autoFocus>
                        {isEdit ? 'Save' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

export default withMobileDialog()(withStyles(style)(observer(LogSymptomDialog)));