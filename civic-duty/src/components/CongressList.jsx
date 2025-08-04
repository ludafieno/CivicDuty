import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import CongressCard from './CongressCard';

export default function CongressList({ selectedIssue }) {
    const [senators, setSenators] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Default cards to show when no issue is selected
    const defaultSenators = [
        {
            name: "Alexandria Ocasio-Cortez",
            description: "Representative from New York's 14th congressional district, known for her progressive policies on climate change, healthcare, and economic justice. She has been a vocal advocate for the Green New Deal and Medicare for All."
        },
        {
            name: "Ted Cruz",
            description: "Senator from Texas who has been a prominent conservative voice on issues including immigration, healthcare, and judicial appointments. He has served on the Senate Judiciary Committee and Foreign Relations Committee."
        },
        {
            name: "Nancy Pelosi",
            description: "Former Speaker of the House and Representative from California, known for her leadership in healthcare reform and economic recovery efforts. She has been a key figure in passing major legislation including the Affordable Care Act."
        }
    ];

    useEffect(() => {
        if(selectedIssue) {
            setLoading(true);
            setError(null);
            fetchChatGPTSenators(selectedIssue)
            .then(senatorData => {
                setSenators(senatorData);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching senators: ", error);
                setError(error.message);
                setLoading(false);
                setSenators([]);
            });
        } else {
            setSenators(defaultSenators);
            setError(null);
        }
    }, [selectedIssue]);

    const fetchChatGPTSenators = async (issue) => {
        const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
        const prompt = `List three (ONLY CURRENT) US congress members who work closely with ${issue} via bills and other political activities. Provide names('First Name Last Name' ONLY), and a short description (description is two sentences). ONLY output a JSON file in the format [{"name": <>, "description":<>}, etc]`;
 
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7,
                max_tokens: 500, // Increased token limit to prevent truncation
                top_p: 1,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        const rawText = data.choices[0].message.content;
        console.log("Raw text:", rawText);

        const validText = ensureValidJson(rawText.trim());
        console.log("Valid text:", validText); 

        const senatorsData = parseChatGPTResponse(validText);
        return senatorsData;
        
    }


    const ensureValidJson = (text) => {
        // Remove ```json and ``` at beginning and end
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        
        // Remove escape characters that might cause JSON.parse to fail
        text = text.replace(/\\n/g, ' ').replace(/\\t/g, ' ').trim();
        
        // Remove trailing commas before the closing bracket
        text = text.replace(/,\s*([\]}])/g, '$1');
        
        // Try to ensure it starts with [ and ends with ] for a valid JSON array
        if (!text.startsWith('[')) {
            text = '[' + text;
        }
        if (!text.endsWith(']')) {
            text = text + ']';
        }
        
        // Fix common JSON issues
        text = text.replace(/("[^"\\]*(?:\\.[^"\\]*)*)"/g, '$1"');
        
        // Handle truncated responses by trying to complete the JSON
        if (text.includes('"description":') && !text.endsWith(']')) {
            // Find the last complete object and close the array
            const lastCompleteObject = text.lastIndexOf('}');
            if (lastCompleteObject > 0) {
                text = text.substring(0, lastCompleteObject + 1) + ']';
            }
        }
        
        return text;
    };


    const parseChatGPTResponse = (text) => {
        try {
            const senators = JSON.parse(text);
            // Validate that we have the expected structure
            if (Array.isArray(senators) && senators.length > 0) {
                return senators.filter(senator => 
                    senator && senator.name && senator.description
                );
            }
            return [];
        } catch (error) { 
            console.error("Error parsing JSON response: ", error);
            console.error("Problematic text:", text);
            return [];
        }
    }

    return(
        <div>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {loading ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '2rem',
                        color: 'white',
                        fontSize: '1.2rem'
                    }}>
                        Loading congress members...
                    </div>
                ) : error ? (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '2rem',
                        color: '#ff6b6b',
                        fontSize: '1.2rem'
                    }}>
                        Error: {error}. Please try again later.
                    </div>
                ) : senators.length > 0 ? (
                    senators.map((senator, index) => (
                        <CongressCard key={index} senator={senator} />
                    ))
                ) : (
                    <div style={{ 
                        textAlign: 'center', 
                        padding: '2rem',
                        color: 'white',
                        fontSize: '1.2rem'
                    }}>
                        No congress members found for the selected issue
                    </div>
                )}
            </Box>
        </div>
    )


}