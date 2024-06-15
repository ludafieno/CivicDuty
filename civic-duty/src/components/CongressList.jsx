import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CongressCard from './CongressCard';

export default function CongressList({ selectedIssue }) {
    const [senators, setSenators] = useState([]);

    useEffect(() => {
        if(selectedIssue) {
            fetchChatGPTSenators(selectedIssue)
            .then(senatorData => setSenators(senatorData))
            .catch(error => console.error("Error fetching senators: ", error));
        }
    }, [selectedIssue]);

    const fetchChatGPTSenators = async (issue) => {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        const prompt = `List three US senators who work closely with ${issue} via bills and other political activities. Provide names, and a short description (description is two sentences max). ONLY output a JSON file in the format [{"name": <>, "description":<>}, etc]`;
 
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 180,
                top_p: 1,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log("Raw API response data:", data); //debug
        const rawText = data.choices[0].message.content;
        console.log("Raw text:", rawText); //debug

        const validText = ensureValidJson(rawText.trim());

        const senatorsData = parseChatGPTResponse(validText);
        return senatorsData;
        
    }


    const ensureValidJson = (text) => {
        return text
            .replace(/```json\n/g, '')  // remove beginning block markdown
            .replace(/```/g, '') // remove end block markdown
            .trim(); 
    };


    const parseChatGPTResponse = (text) => {
        try {
            const senators = JSON.parse(text);
            return senators;
        } catch (error) { // debug
            console.error("Error parsing JSON response: ", error);
            console.log("Raw API text response:", text);
            return [];
        }
    }

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