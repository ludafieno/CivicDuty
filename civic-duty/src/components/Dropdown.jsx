import '../App.css'
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Dropdown({ selectedIssue, setSelectedIssue }) {
    const [issues, setIssues] = useState([]);

    useEffect(() => {
        fetch('/issues.json')
            .then(response => response.json())
            .then(data => setIssues(data))
            .catch(error => console.error("Error fetching issues: ", error));
    }, []);

    const handleChange = (event) => {
        setSelectedIssue(event.target.value);
    }

    return (
        <Box id="dropdown-box" sx={{ minWidth: 240, maxWidth: 240}}> 
            <FormControl fullWidth>
                <InputLabel sx={{ color: 'white' }}>Issues</InputLabel>
                <Select
                    sx={{
                        color: 'white',
                        '.MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                            backgroundColor: 'white'
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                            backgroundColor: 'white'
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'white',
                            backgroundColor: 'white'
                        },
                        '.MuiSvgIcon-root ': {
                            fill: 'white !important',
                            backgroundColor: 'white'
                        }
                    }}
                    label="Issues"
                    value={selectedIssue}
                    onChange={handleChange}
                >
                    {issues.map((issue, index) => (
                        <MenuItem key={index} value={issue}>
                            {issue}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}



