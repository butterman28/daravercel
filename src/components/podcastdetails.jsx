import React, { useContext, useEffect, useState } from "react";
import {
  CircularProgress,
  Container,
  Card,
  Stack,
  CardMedia,
  FormLabel,
  CardContent,
  Typography,
  Grid,
  Avatar,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { PostContext } from "./postcontext";
import CustomAudioPlayer from "./audioplayer";
const PodcastDetail = () => {
  const { fetchsinglepodcast } = useContext(PostContext); // Context function for fetching podcast
  const { id } = useParams(); // Get podcast ID from URL parameters
  const [podcast, setPodcast] = useState(null); // State to store podcast details
  const [comment, setComment] = useState(""); // State for comment content
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  //const [comment , setComment]=useState("");


  useEffect(() => {
    // Fetch the podcast details by ID
    const fetchData = async () => {
      try {
        const fetchedPodcast = await fetchsinglepodcast(parseInt(id));
        setPodcast(fetchedPodcast);
      } catch (error) {
        console.error("Error fetching podcast:", error);
      }
    };

    fetchData();
  }, [fetchsinglepodcast, id]);

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    setter(value);

    // Save the data to localStorage
    if (setter === setName) localStorage.setItem("name", value);
    if (setter === setEmail) localStorage.setItem("email", value);
    if (setter === setWebsite) localStorage.setItem("website", value);
  };

  const handleAddComment = async (event) => {
    event.preventDefault();
    if (!comment.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    const data = {
        name: name,
        email: email,
        website: website,
        content: comment,
      };

    const response = await fetch(
      `http://127.0.0.1:8000/podcast/comment/${podcast.id}/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.status === 201) {
      const result = await response.json();

      // Add the new comment to the podcast comments array
      setPodcast((prevPodcast) => ({
        ...prevPodcast,
        comments: [...prevPodcast.comments, result],
      }));

      // Clear comment input
      setComment("");
      setError("");
      setSnackbar({
        open: true,
        message: "Comment submitted successfully!",
        severity: "success",
      });
    } else {
      const errorData = await response.json();
      setSnackbar({
        open: true,
        message: errorData.message || "Failed to submit comment.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (!podcast) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box height={100}></Box>
      <Card>
        {/* Podcast Image */}
        <CardMedia
          component="img"
          height="300"
          image={`http://localhost:8000${podcast.image}`}
          alt={podcast.title}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        />

        <CardContent>
          {/* Title */}
          <Typography variant="h4" gutterBottom>
            {podcast.title}
          </Typography>

          {/* Author and Category */}
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar>{podcast.author.username.charAt(0).toUpperCase()}</Avatar>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                By: <strong>{podcast.author.username}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Category: {podcast.category}
              </Typography>
            </Grid>
          </Grid>

            {/* Audio Player */}
            <CustomAudioPlayer audioSrc={`http://localhost:8000${podcast.audio}`} />


          {/* Content */}
          <Box mt={3}>
            {podcast.content.split("\r\n").map((paragraph, index) => (
              <Typography key={index} paragraph align="left">
                {paragraph}
              </Typography>
            ))}
          </Box>

          {/* Comments Section */}
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Comments ({podcast.comments.length})
            </Typography>
            {podcast.comments.length > 0 ? (
              podcast.comments.map((comment, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="body1">{comment.content}</Typography>
                   <Typography variant="body2" color="textSecondary">
                                      By: {comment.name}
                                    </Typography>
                </Box>
              ))
            ) : (
              <Typography>No comments yet.</Typography>
            )}
          </Box>

          {/* Add a Comment */}
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Add a Comment
            </Typography>
            <TextField
              fullWidth
              multiline
              minRows={3}
              variant="outlined"
              placeholder="Write your comment here..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Stack direction ="row">
                          {/* Name */}
                          <TextField
                          label={
                            <FormLabel>
                              Name <span style={{ color: "red" }}>*</span>
                            </FormLabel>
                          }
                            fullWidth
                            variant="outlined"
                            //placeholder="Name"
                            name="name"
                            value={name}
                            required
                            onChange={handleInputChange(setName)}
                            sx={{ mb: 2 }}
                          />
            
                          {/* Email */}
                          <TextField
                          label={
                            <FormLabel>
                              Email<span style={{ color: "red" }}>*</span>
                            </FormLabel>
                          }
                            fullWidth
                            variant="outlined"
                            //placeholder="Email"
                            name="email"
                            value={email}
                            required
                            onChange={handleInputChange(setEmail)}
                            sx={{ mb: 2 }}
                          />
            
                          {/* Website */}
                          <TextField
                          label={
                            <FormLabel>
                              Website
                            </FormLabel>
                          }
                            fullWidth
                            variant="outlined"
                            //placeholder="Website (optional)"
                            name="website"
                            value={website}
                            onChange={handleInputChange(setWebsite)}
                            sx={{ mb: 2 }}
                          />
                        </Stack>
            <Button variant="contained" color="primary" onClick={handleAddComment}>
              Submit Comment
            </Button>
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PodcastDetail;
