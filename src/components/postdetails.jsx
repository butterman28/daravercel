import React, { useState, useEffect } from 'react'; // Missing React and hooks imports
import { CircularProgress, Container, Card, Stack, CardMedia, FormLabel, CardContent, Typography, Grid, Avatar, Box, TextField, Button, Snackbar, Alert } from '@mui/material';
import { PostContext } from './postcontext';
import { useParams } from 'react-router-dom';
import { article } from '../postdata';

const PostDetail = () => {
  const { id } = useParams();
  const numericId = parseInt(id, 10);

  const [item, setItem] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    // Add debugging
    console.log('ID from params:', id);
    console.log('Numeric ID:', numericId);
    console.log('Articles array:', article);

    const foundItem = article.find((a) => a.id === numericId);
    console.log('Found item:', foundItem);

    setItem(foundItem);

    // Load saved form data from localStorage
    const savedName = localStorage.getItem("name");
    const savedEmail = localStorage.getItem("email");
    const savedWebsite = localStorage.getItem("website");

    if (savedName) setName(savedName);
    if (savedEmail) setEmail(savedEmail);
    if (savedWebsite) setWebsite(savedWebsite);
  }, [id, numericId]);

  const handleInputChange = (setter) => (event) => {
    const value = event.target.value;
    setter(value);

    // Save the data to localStorage
    if (setter === setName) localStorage.setItem("name", value);
    if (setter === setEmail) localStorage.setItem("email", value);
    if (setter === setWebsite) localStorage.setItem("website", value);
  };

  const handleAddComment = async (event) => { // Added event parameter
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setError("Name and email are required.");
      return;
    }

    if (!comment.trim()) {
      setError("Comment content is required.");
      return;
    }

    const data = {
      name: name,
      email: email,
      website: website,
      content: comment,
    };

    try {
      const response = await fetch(`http://127.0.0.1:8000/post/comment/${item.id}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        const result = await response.json();

        // Update the item with the new comment
        setItem((prevItem) => ({
          ...prevItem,
          comments: [...prevItem.comments, result],
        }));

        setComment('');
        setError('');
        setSnackbar({ open: true, message: "Comment submitted successfully!", severity: "success" });
      } else {
        const errorData = await response.json();
        setSnackbar({ open: true, message: errorData.message || "Failed to submit comment. An Error Occurred", severity: "error" });
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      setSnackbar({ open: true, message: "Network error. Please try again.", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  // Show loading state while item is being fetched
  if (!item) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box height={100}></Box>
      <Card>
        <CardContent>
          {/* Title */}
          <Typography variant="h4" gutterBottom>
            {item?.title || 'No Title'}
          </Typography>

          {/* Author and Category */}
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar>{item?.author?.username?.charAt(0)?.toUpperCase() || '?'}</Avatar>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                By: <strong>{item?.author?.username || 'Alegbeleye Oluwaseun Oluwadara'}</strong>
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Category: {item?.category || 'Uncategorized'}
              </Typography>
            </Grid>
          </Grid>

          {/* Content */}
          <Box mt={3}>
            {item?.content ? (
              item.content.split('\r\n').map((paragraph, index) => (
                <Typography key={index} paragraph align='left'>
                  {paragraph}
                </Typography>
              ))
            ) : (
              <Typography>No content available.</Typography>
            )}
          </Box>

          {/* Comments Section */}
          <Box mt={4}>
            <Typography variant="h5" gutterBottom>
              Comments ({item?.comments?.length || 0})
            </Typography>
            {item?.comments && item.comments.length > 0 ? (
              item.comments.map((comment, index) => (
                <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
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

          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Add a Comment
            </Typography>

            {/* Comment */}
            <TextField
              fullWidth
              multiline
              minRows={3}
              variant="outlined"
              placeholder="Write your comment here..."
              name="content"
              value={comment}
              onChange={handleInputChange(setComment)}
              sx={{ mb: 2 }}
            />

            <Stack direction="row" spacing={2}>
              {/* Name */}
              <TextField
                label="Name *"
                fullWidth
                variant="outlined"
                name="name"
                value={name}
                required
                onChange={handleInputChange(setName)}
                sx={{ mb: 2 }}
              />

              {/* Email */}
              <TextField
                label="Email *"
                fullWidth
                variant="outlined"
                name="email"
                value={email}
                required
                onChange={handleInputChange(setEmail)}
                sx={{ mb: 2 }}
              />

              {/* Website */}
              <TextField
                label="Website"
                fullWidth
                variant="outlined"
                name="website"
                value={website}
                onChange={handleInputChange(setWebsite)}
                sx={{ mb: 2 }}
              />
            </Stack>

            {/* Submit Button */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              disabled={!name.trim() || !email.trim() || !comment.trim()}
            >
              Submit Comment
            </Button>

            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PostDetail;