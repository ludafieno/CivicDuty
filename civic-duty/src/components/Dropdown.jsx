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
                <Select
                    sx={{
                        color: 'white',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
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
                        },
                        '& .MuiSelect-select': {
                            backgroundColor: 'transparent',
                        },
                        '& .MuiPaper-root': {
                            backgroundColor: '#333',
                            color: 'white',
                        },
                        '& .MuiMenuItem-root': {
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        },
                    }}
                    value={selectedIssue}
                    onChange={handleChange}
                    displayEmpty
                    renderValue={(value) => value || "Issues"}
                    MenuProps={{
                        PaperProps: {
                            sx: {
                                backgroundColor: '#333',
                                color: 'white',
                                '& .MuiMenuItem-root': {
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                },
                            },
                        },
                    }}
                >
                    <MenuItem value="" disabled>
                        Select an issue
                    </MenuItem>
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



