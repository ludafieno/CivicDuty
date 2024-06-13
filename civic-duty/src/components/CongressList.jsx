import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import OpenAI from "openai";
import CongressCard from './CongressCard';
import { debounce } from './debounce';

export default function CongressList({ selectedIssue }) {
    const [senators, setSenators] = useState([]);

    useEffect(() => {
        if(selectedIssue) {
            debouncedFetchSenators(selectedIssue)
            .then(senatorData => setSenators(senatorData))
            .catch(error => console.error("Error fetching senators: ", error));
        }
    }, [selectedIssue]);

    const fetchChatGPTSenators = async (issue) => {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        const prompt = `List three US senators who work closely with ${issue} via bills and other political activities. Provide names, and a short description. ONLY output a JSON file in the format [{"name": <>, "description":<>}, etc]`;

        const openai = new OpenAI({apiKey: apiKey, dangerouslyAllowBrowser: true});

        const completion = await openai.chat.completions.create({
            messages:[{role: "user", content: prompt}],
            model: "gpt-3.5-turbo"
        })

        const senatorsData = parseChatGPTResponse(completion.choices[0].message.content);
        return senatorsData;
    
    }

    const parseChatGPTResponse = (text) => {
        try {
            const senators = JSON.parse(text);
            return senators;
        } catch (error) {
            console.error("Error parsing JSON response: ", error);
            return [];
        }
    }

    const debouncedFetchSenators = debounce(fetchChatGPTSenators, 300);

    return(
        <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {senators.map((senator, index) => (
                    <CongressCard key={index} senator={senator} />
                ))}
            </Box>
        </div>
    )


}