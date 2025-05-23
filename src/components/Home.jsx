// src/pages/About.js
import React, { useContext, useEffect } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Stack, Typography, Grid, Button, Card, CardContent, CardMedia, } from '@mui/material';
import backgroundImage from '../assets/background.avif';
import { PostContext } from './postcontext';
const categories = [
  { label: 'Agriculture', path: 'agriculture' },
  { label: 'Health', path: 'health' },
  { label: 'Climate', path: 'climate' },
  { label: 'Law & Order', path: 'law-and-order' },
  { label: 'Society', path: 'society' },
  { label: 'Education', path: 'education' },
  { label: 'Politics', path: 'politics' },
];
const Home = () => {
  const { filterpostByCategory, latestpostData, fetchpost, fetchlatestpost, fetchpodcast, } = useContext(PostContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchpost();
        await fetchlatestpost();
        await fetchpodcast();
      } catch (error) {
        //console.error("Error fetching cart:", error);
      }
    };

    fetchData();

  }, []);
  return (
    <Box>

      <Box height={100}></Box>

      <Stack spacing={7} alignItems="center">

        <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
          Musings with Dara
        </Typography>
        <Box width={500} >
          <Typography variant="h6">
            Science communication, articles and discussions on a variety of Nigerian-related public-health, cultural and political issues, vibrant ideas and more.
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;