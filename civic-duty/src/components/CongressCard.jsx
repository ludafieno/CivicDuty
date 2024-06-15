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
    const fetchImages = async () => {
      try {
        // const response = await axios.get('https://www.congress.gov/members?q=%7B%22congress%22%3A118%7D'); no access womp womp
        const response = await axios.get('http://localhost:3000/local-files');
        const { data1, data2, data3 } = response.data;

        const htmlData = [data1, data2, data3];
        const nameParts = senator.name.split(" ");
        let rearrangedName = `${nameParts[1]}, ${nameParts[0]}`; //changes from First Last to Last, First
        console.log(rearrangedName);
        rearrangedName = rearrangedName.replace("Bob", "Robert");
        rearrangedName = rearrangedName.replace("Tom", "Thomas"); //nicknames wow
        if (rearrangedName === "Sanders, Bernie") { //bro HAD to have a nickname damn
          rearrangedName = "Sanders, Bernard";
        }

        let found = false;
        for(let html of htmlData) {
          if (found) break;
          const $ = cheerio.load(html);
          $('img').each((index, element) => {
              if (found) return false;
              const altText = $(element).attr('alt');
              const src = $(element).attr('src');

              if (altText && src && altText.includes(rearrangedName)) {
                const imgFilename = src.split('/').pop();
                console.log("FILENAME:", imgFilename);
                console.log(`https://www.congress.gov/img/member/${imgFilename}`);

                setImageUrl(`https://www.congress.gov/img/member/${imgFilename}`);
                found = true;
              }
          });
      }
      } catch (error) {
          console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, [senator.name]);

  
    return (
    <Card sx={{ maxWidth: 200, maxHeight: 500, margin: '1rem' }}>
        <CardActionArea>
        <CardMedia
              component="img"
              height="175"
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

