import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AutoSuggest from './AutoSuggest'


export const SliderField = ({ name, label, range, value, onChange, }) => {
    return (
        <Grid container alignItems='center' item>
            <Grid item xs={6}>
                {label}
            </Grid>
            <Grid item xs={6} container justify='center'>
                {value}
                <Slider value={value} min={0} max={range} step={1} onChange={onChange(name)} />
            </Grid>
        </Grid>
    )
}


const selectStyles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      width:'100%'
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
  });

let SelectField = ({ classes, name, label, value, options, onChange }) => {
    return (
        <Grid container alignItems='center' item>
            <Grid item xs={12}>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor={name}>{label}</InputLabel>
                    <Select
                        value={value}
                        onChange={(event) => onChange(name)(event.target.value)}
                    >
                        {options.map((option,idx) => (
                            <MenuItem value={option.value} key={idx}>{option.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    )
}

SelectField = withStyles(selectStyles)(SelectField)




export const fieldTypes = {
    slider: SliderField,
    autoSuggest: AutoSuggest,
    select: SelectField,
}



export const Field = (props) => {
    const TagName = props.type;
    return <TagName {...props} />
}