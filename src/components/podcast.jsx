import React, { useContext, useState, useEffect } from 'react';
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, Box, Stack, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { PostContext } from './postcontext';
import { Link as RouterLink } from 'react-router-dom';

const Podcast = () => {
    const navigate = useNavigate();
    const {podcastData,filterpostByCategory,latestpostData,fetchpost,fetchlatestpost,setcategoryhead } = useContext(PostContext);
    //console.log(filteredpostData[0].category);
    //console.log(sessionStorage.getItem('category'));
    const pagetitle = sessionStorage.getItem('category')
    //{pagetitle.charAt(0).toUpperCase()+pagetitle.slice(1)}
    //const storedfilteredpostData = JSON.parse(sessionStorage.getItem('filteredpostData'));
    //xs={12} sm={6} md={4} lg={4} xl={4}
    return (
        <>
          <Box>
            <Box height={100}></Box>
            <Typography variant="h4" sx={{ fontWeight: 'bold',textDecoration: 'underline', }}>
                     All Podcast
            </Typography>
            <Box height={50}></Box>
            <Box >
              <Grid container rowSpacing={2} columnSpacing={{ xs: 2, sm: 3, md: 4,}} spacing={3} justifyContent="center">
                {podcastData.map((post) => {  
                  return (
                    <Grid item  key={post.id}>
                     <Card sx={{ height: { xs: 400, sm: 500, md: 450 }, width: {xs: 400, sm: 300, md: 310, lg: 350,xl: 400}, }}>
                                 <CardMedia
                                   component="img"
                                   alt={post.title}
                                   height="140"
                                   image={`http://localhost:8000${post.image}`}
                                   //title={item.title}
                                 />
                        <CardContent>
                                      <Typography variant="h6">
                                        {post.title}
                                      </Typography>
                                      <Typography
                                  variant="body2"
                                  color="textSecondary"
                                  sx={{
                                    display: '-webkit-box',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 5, // Limit to 2 lines
                                    overflow: 'hidden',
                                  }}
                                >
                                  {post.content}
                                </Typography>
                        
                                {/* Link to the post detail page */}
                                <Link
                                  component={RouterLink} // Use React Router Link for navigation
                                  to={`/podcast/${post.id}`} // Use the post ID for the detail page URL
                                  variant="body2"
                                  sx={{ textDecoration: 'none', marginTop: 1 }}
                                >
                                  Read More
                                </Link>
                                    </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Box>
          </>
);    
};
export default Podcast;