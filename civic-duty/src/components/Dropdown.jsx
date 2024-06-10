import { useState, useEffect } from 'react'
import '../App.css'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown() {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        fetch('/issues.json')
        .then(response => response.json())
        .then(data => setIssues(data))
        .catch(error => console.error("Error fetching issues: ", error));
    }, []);

    return (
    <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
            <InputLabel sx={{ color: 'white' }}>Issues</InputLabel>
            <Select 
            sx={{
                color: 'white',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'white',
                },
                '.MuiSvgIcon-root ': {
                  fill: 'white !important',
                }
                }} label="Issues">
                {issues.map((issue, index) => (
                    <MenuItem key={index} value={issue}>
                        {issue}
                    </MenuItem>
                ))}
            </Select>
      </FormControl>
    </Box>
    )
}
