import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';


export default function CongressCard({ senator }) {
  const [imgURL, setImageUrl] = useState('');

  function removeMiddleInitial(name) {
    const parts = name.split(' ');
    const filteredParts = parts.filter(part => !(part.length === 2 && part.endsWith('.')));
    return filteredParts.join(' ');
}

  const normalizeName = (name) => {
    name = name.replace("Bob ", "Robert ");
    name = name.replace("Tom", "Thomas");
    name = name.replace("Bernie", "Bernard");
    name = name.replace("Ed", "Edward");
    name = name.replace("Bobby", "Robert");
    name = name.replace("Chris Murphy", "Christopher Murphy");
    name = name.replace("Chuck Schumer", "Charles Schumer");
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
          acc[removeMiddleInitial(key)] = value;
          return acc;
        }, {});

        const normalizedSenatorName = normalizeName(senator.name);
        console.log("state normalized name: ", normalizedSenatorName)

        const imgFilename = Object.keys(imgDict).find(key => key.includes(normalizedSenatorName));
        console.log("Matched Name: ", imgFilename);

        if (imgFilename && imgDict[imgFilename]) {
          setImageUrl(`https://www.congress.gov/img/member/${imgDict[imgFilename]}`);
        } else {
          setImageUrl("/images/placeholder.jpg");
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setImageUrl('/images/placeholder.jpg');
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

