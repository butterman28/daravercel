{/* Audio Player */ }
<Box mt={3}>
  <Typography variant="h6" gutterBottom>
    Listen to the Podcast:
  </Typography>
  <audio controls style={{ width: "100%" }}>
    <source
      src={http://localhost:8000${podcast.audio}}
    type="audio/mpeg"
  />
    Your browser does not support the audio element.
  </audio>

  <Grid container spacing={3} justifyContent="center">
    {/* Top row with 4 items */}
    {categories.slice(0, 4).map((category, index) => (
      <Grid item xs={6} sm={3} key={index}>
        <Button
          fullWidth
          sx={{
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'primary.dark', // Theme-based color
            '&:hover': {
              backgroundColor: 'primary.light', // Hover effect
            },
          }}
          onClick={() => filterpostByCategory(category.path)}
          component={Link}
          // Optional: Use for navigation if using React Router
          to="/post"  //{`/${category.path}`} // Use the `path` property for routing
        >
          {category.label}
        </Button>
      </Grid>
    ))}

    {/* Bottom row with 3 items */}
    <Box
      sx={{
        backgroundColor: 'primary.main', // Set background color
        color: 'white',                  // Text color for contrast
        padding: 3,                      // Padding inside the Box
        borderRadius: 1,                 // Rounded corners
        minwidth: '100%',                  // Full screen width
        //minHeight: '100vh',              // Full screen height
      }}
    >

      <CardMedia
        component="img"
        alt={post.title}
        height="140"
        image={`http://localhost:8000${post.image}`}
      //title={item.title}
      />

    </Box>
    {categories.slice(4).map((category, index) => (
      <Grid item xs={12} sm={4} key={index + 4}>
        <Button
          fullWidth
          sx={{
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'primary.dark',
            '&:hover': {
              backgroundColor: 'primary.light',
            },
          }}
          onClick={() => filterpostByCategory(category.path)}
          component={Link}
          to="/post"
        >
          {category.label}
        </Button>
      </Grid>
    ))}
  </Grid>
</Box>

