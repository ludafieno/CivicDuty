import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import * as cheerio from 'cheerio';


export default function CongressCard({ senator }) {
  const [imgURL, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        // const response = await axios.get('https://www.congress.gov/members?q=%7B%22congress%22%3A118%7D'); no access womp womp
        const response = await axios.get('http://localhost:3000/local-file');
        const html = response.data;
        const $ = cheerio.load(html);
        const nameParts = senator.name.split(" ");
        let rearrangedName = `${nameParts[1]}, ${nameParts[0]}`; //changes from First Last to Last, First

        $('img').each((index, element) => {
            const altText = $(element).attr('alt');
            const src = $(element).attr('src');

            if (altText && src && altText.includes(rearrangedName)) {
              const imgFilename = src.split('/').pop();
              console.log("FILENAME:", imgFilename);
              console.log(`https://www.congress.gov/img/member/${imgFilename}`);
              setImageUrl(`https://www.congress.gov/img/member/${imgFilename}`);
            }
        });
      } catch (error) {
          console.error('Error fetching image:', error);
      }
    };
    fetchImage();
  }, [senator.name]);

  
    return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
        <CardActionArea>
        <CardMedia
              component="img"
              height="140"
              image={imgURL}
              alt={senator.name}
            />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {senator.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {senator.description}
            </Typography>
          </CardContent>
        </CardActionArea>
    </Card>
  );

}

