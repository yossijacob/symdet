import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import keycode from 'keycode';
import Downshift from 'downshift';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
// import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/AddBox';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';


function renderInput(inputProps) {
    const { InputProps, classes, ref, ...other } = inputProps;

    return (
        <TextField
            InputProps={{
                inputRef: ref,
                classes: {
                    root: classes.inputRoot,
                },
                ...InputProps,
            }}
            {...other}
        />
    );
}

function renderSuggestion({ suggestion, index, itemProps, highlightedIndex, selectedItem }) {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion) > -1;

    return (
        <MenuItem
            {...itemProps}
            key={suggestion}
            selected={isHighlighted}
            component="div"
            style={{
                fontWeight: isSelected ? 500 : 400,
            }}
        >
            {suggestion}
        </MenuItem>
    );
}
renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};

function getSuggestions(inputValue, tags) {
    let count = 0;

    return tags.filter(suggestion => {
        const keep =
            (!inputValue || suggestion.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) &&
            count < 5;

        if (keep) {
            count += 1;
        }

        return keep;
    });
}

class DownshiftMultiple extends React.Component {
    state = {
        inputValue: '',
        selectedItem: [],
    };

    // componentDidUpdate(prevProps) {
    //     console.log('componentDidUpdate 1', this.props.initTags, prevProps.initTags)
    //     if (this.props.initTags !== prevProps.initTags) {
    //         console.log('componentDidUpdate 2')
    //         this.setState({
    //             selectedItem: this.props.initTags,
    //         });
    //     }
    // }

    handleKeyDown = event => {
        const { inputValue } = this.state;
        let selectedItem = this.props.value;

        if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
            this.props.onChange(this.props.name)([...selectedItem.slice(0, selectedItem.length - 1)]);  // update outside state
            // this.props.onChange(this.props.name)(selectedItem.slice(0, selectedItem.length - 1));  // update outside state
            // this.setState({
            //     selectedItem: selectedItem.slice(0, selectedItem.length - 1),
            // });
        }

        // Add on enter key
        if (inputValue.length && keycode(event) === 'enter') {
            this.handleChange(inputValue);
        }
    };

    handleInputChange = event => {
        this.setState({ inputValue: event.target.value });
    };

    handleChange = item => {
        // let { selectedItem } = this.state;
        let selectedItem = this.props.value;

        if (selectedItem.indexOf(item) === -1) {
            selectedItem = [...selectedItem, item];
        }

        this.setState({
            inputValue: '',
            // selectedItem,
        });
        this.props.onChange(this.props.name)(selectedItem);  // update outside state
    };

    handleAdd = () => {
        this.handleChange(this.state.inputValue);
    }

    handleDelete = item => () => {
        let selectedItem = this.props.value;
        const index = selectedItem.indexOf(item);
        selectedItem = [...selectedItem.slice(0, index), ...selectedItem.slice(index + 1)];
        // selectedItem.splice(selectedItem.indexOf(item), 1);
        // this.setState(state => {
        //     const selectedItem = [...state.selectedItem];
        //     selectedItem.splice(selectedItem.indexOf(item), 1);
        //     return { selectedItem };
        // });
        this.props.onChange(this.props.name)(selectedItem);  // update outside state
    };

    render() {
        const { classes, label, tagsSet, helperText, value } = this.props;
        console.log('autoSuggest value', value);
        const { inputValue } = this.state;
        return (
            <Grid container alignItems='center' item spacing={8} className={classes.container}>
                <Grid item xs={11}>
                    <Downshift
                        inputValue={inputValue}
                        onChange={this.handleChange}
                        selectedItem={value}
                    >
                        {({
                            getInputProps,
                            getItemProps,
                            isOpen,
                            inputValue,
                            selectedItem,
                            highlightedIndex,
                        }) => (
                                <div className={classes.container}>
                                    {renderInput({
                                        fullWidth: true,
                                        classes,
                                        helperText: helperText,
                                        InputProps: getInputProps({
                                            startAdornment: selectedItem.map(item => (
                                                <Chip
                                                    key={item}
                                                    tabIndex={-1}
                                                    label={item}
                                                    className={classes.chip}
                                                    onDelete={this.handleDelete(item)}
                                                />
                                            )),
                                            onChange: this.handleInputChange,
                                            onKeyDown: this.handleKeyDown,
                                            placeholder: label,
                                            id: 'integration-downshift-multiple',
                                            // endAdornment: (
                                            //     <InputAdornment position="end">
                                            //         <IconButton
                                            //             aria-label="Add"
                                            //             onClick={this.handleAdd}
                                            //         // onMouseDown={this.handleInputChange}
                                            //         >
                                            //             <AddIcon />
                                            //         </IconButton>
                                            //     </InputAdornment>
                                            // )
                                        }),
                                    })}
                                    {isOpen ? (
                                        <Paper className={classes.paper} square>
                                            {getSuggestions(inputValue, tagsSet).map((suggestion, index) =>
                                                renderSuggestion({
                                                    suggestion,
                                                    index,
                                                    itemProps: getItemProps({ item: suggestion }),
                                                    highlightedIndex,
                                                    selectedItem: selectedItem,
                                                }),
                                            )}
                                        </Paper>
                                    ) : null}
                                </div>
                            )}
                    </Downshift>
                </Grid>
                <Grid item xs={1}>
                    <IconButton color="primary" className={classes.button} component="span">
                        <AddIcon onClick={this.handleAdd} />
                    </IconButton>
                </Grid>

            </Grid>
        );
    }
}

DownshiftMultiple.propTypes = {
    classes: PropTypes.object.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
    container: {
        flexGrow: 1,
        position: 'relative',
        padding: 5
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    inputRoot: {
        flexWrap: 'wrap',
    },
});

// function IntegrationDownshift(props) {
//     const { classes } = props;

//     return (
//         <DownshiftMultiple classes={classes} {...props} />
//     );
// }

// IntegrationDownshift.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(observer(DownshiftMultiple));