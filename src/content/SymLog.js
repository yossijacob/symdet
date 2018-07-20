import React, { Component } from 'react'
import moment from 'moment'
import firebase from 'firebase'
import { db } from '../firebase/firebase'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { store as logSymptomDialogStore} from './LogSymptomDialog'
import Loading from './Loading'

const cardStyles = theme => ({
    chip: {
        margin: theme.spacing.unit,
    },
    title: {
        fontSize: '14px',
        color: theme.palette.secondary.main
    },
    cardHeader: {
        // backgroundColor: theme.palette.primary.light                         
    },
    cardField: {
        paddingLeft: 10,
        fontSize: 14
    }

});



class LogCard extends Component {
    state = {
        anchorEl: null,
    };

    openMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    closeMenu = () => {
        this.setState({ anchorEl: null });
    };

    deleteLog = () => {
        const userId = firebase.auth().currentUser.uid;
        db.collection("users").doc(userId).collection("log").doc(this.props.log.id)
            .delete().then(function () {
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });
    }
    
    editLog = () =>{
        this.closeMenu();
        logSymptomDialogStore.editDialog(this.props.log);
        // this.props.openEditDialog(this.props.log);
    }

    render() {
        const { anchorEl } = this.state;
        const { classes, log } = this.props;
        const stressLevel = ['None', 'Low', 'Moderate', 'High']
        const time = moment.unix(log.timestamp).format("HH:mm:ss");
        const date = moment.unix(log.timestamp).format("dddd, MMMM Do YYYY");
        return (
            <div >
                <Card className={classes.card}>
                    <CardHeader
                        classes={{
                            root: classes.cardHeader,
                            title: classes.title
                        }}
                        action={
                            <IconButton aria-label="Menu"
                                aria-owns={anchorEl ? `menu-${log.id}` : null}
                                aria-haspopup="true"
                                onClick={this.openMenu}>
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={time}
                        subheader={date}
                    />
                    <Menu
                        id={`menu-${log.id}`}
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={this.closeMenu}
                    >
                        <MenuItem onClick={this.editLog}>Edit</MenuItem>
                        <MenuItem onClick={this.deleteLog}>Delete</MenuItem>
                    </Menu>
                    <CardContent>
                        <Typography color="textSecondary" className={classes.cardField}>
                            Stress:
                    {' '}
                            <b>{stressLevel[log.stress]}</b>
                        </Typography>
                        <div>
                            {log.tags.map((tag) => (
                                <Chip label={tag} className={classes.chip} key={tag} />
                            ))}

                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }
}


LogCard = withStyles(cardStyles)(LogCard)


const styles = theme => ({
    container: {
        padding: 15,
        paddingBottom: '55px'
    },
    card: {
        margin: '10px 0'
    },
});

class SymLog extends Component {
    constructor() {
        super();
        const userId = firebase.auth().currentUser.uid;
        this.state = {
            loading: true,
            logs: [],
            userId
        }
    }

    fetch() {
    }

    componentDidMount() {
        this.setState({ loading: true });
        const userId = this.state.userId;
        const userLogsRef = db.collection("users").doc(userId).collection("log").orderBy("timestamp", "desc").limit(15);

        userLogsRef.onSnapshot((querySnapshot) => {
            const logs = []
            querySnapshot.forEach(function (doc) {
                logs.push({ id: doc.id, ...doc.data() });
            });
            this.setState({
                loading: false,
                logs,
            });
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                {this.state.loading ?
                    <Loading />
                    : <Grid container className={classes.container}>
                        {
                            this.state.logs.map((log) =>
                                (
                                    <Grid item xs={12} className={classes.card} key={log.id}>
                                        <LogCard log={log}/>
                                    </Grid>
                                )
                            )
                        }
                    </Grid>
                }
            </React.Fragment>
        )
    }
}


export default withStyles(styles)(SymLog)

export const SymLogAppBar = () => {
    return "Symptom Log"
}