import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


export default function CongressCard({ senator }) {
    return (
    <Card sx={{ maxWidth: 345, margin: '1rem' }}>
        <CardActionArea>
        {/* <CardMedia
              component="img"
              height="140"
              image=""
              alt=""
            /> */}
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

