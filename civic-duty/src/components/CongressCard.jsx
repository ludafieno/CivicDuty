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

  const normalizeName = (name) => {
    name.replace(/[^a-zA-Z ]/g, "").split(' ').filter(part => part).join(' ').toLowerCase();
    name = name.replace("Bob", "Robert");
    name = name.replace("Tom", "Thomas");
    name = name.replace("Bernie", "Bernard");
    name = name.replace("Chris Murphy", "Christopher Murphy");

    return name;
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('/img.json');
        const imgArray = response.data;

        //Array to dictionary
        const imgDict = imgArray.reduce((acc, item) => {
          const [key, value] = item.split(': ');
          acc[key] = value;
          return acc;
        }, {});

        const normalizedSenatorName = normalizeName(senator.name);
        console.log(normalizedSenatorName);
        const imgFilename = Object.keys(imgDict).find(key => key.includes(normalizedSenatorName));

        if (imgFilename && imgDict[imgFilename]) {
          setImageUrl(`https://www.congress.gov/img/member/${imgDict[imgFilename]}`);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setImageUrl('default_placeholder_image_url_here');
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

