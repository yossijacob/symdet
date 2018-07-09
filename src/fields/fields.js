import React from 'react'
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/lab/Slider';
import AutoSuggest from './AutoSuggest'


export const SliderField = ({name, label, range, value, onChange,}) => {
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




export const fieldTypes = {
    slider: SliderField,
    autoSuggest: AutoSuggest,
}



export const Field = (props) => {
    const TagName = props.type;
    return <TagName {...props}/>
}