import React, { useRef, useState, useEffect } from "react";
import { Box, Typography, Button, IconButton, Stack } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import Replay5Icon from "@mui/icons-material/Replay5";
import Forward5Icon from "@mui/icons-material/Forward5";
import WaveSurfer from "wavesurfer.js";

const CustomAudioPlayer = ({ audioSrc }) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    // Initialize WaveSurfer
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#a0a0a0",
      progressColor: "#FF5722",
      cursorColor: "#FF5722",
      barWidth: 5,
      responsive: true,
      height: 100,
    });

    wavesurfer.current.load(audioSrc);

    // Cleanup
    return () => {
      wavesurfer.current.destroy();
    };
  }, [audioSrc]);

  const togglePlayPause = () => {
    wavesurfer.current.playPause();
    setIsPlaying(wavesurfer.current.isPlaying());
  };

  const skipForward = () => {
    wavesurfer.current.skip(5);
  };

  const skipBackward = () => {
    wavesurfer.current.skip(-5);
  };

  const changeSpeed = (speed) => {
    setPlaybackSpeed(speed);
    wavesurfer.current.setPlaybackRate(speed);
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Listen to the Podcast:
      </Typography>

      {/* Waveform */}
      <Box ref={waveformRef} sx={{ width: "100%", mb: 2 }} />

      {/* Controls */}
      <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
        <IconButton onClick={skipBackward}>
          <Replay5Icon fontSize="large" />
        </IconButton>

        <IconButton onClick={togglePlayPause}>
          {isPlaying ? (
            <PauseIcon fontSize="large" />
          ) : (
            <PlayArrowIcon fontSize="large" />
          )}
        </IconButton>

        <IconButton onClick={skipForward}>
          <Forward5Icon fontSize="large" />
        </IconButton>
      </Stack>

      {/* Playback Speed */}
      <Box mt={2} >
        <Typography variant="body2" gutterBottom>
          Playback Speed:
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          {[0.5, 1, 1.5, 2].map((speed) => (
            <Button
              key={speed}
              variant={playbackSpeed === speed ? "contained" : "outlined"}
              onClick={() => changeSpeed(speed)}
            >
              {speed}x
            </Button>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};

export default CustomAudioPlayer;

