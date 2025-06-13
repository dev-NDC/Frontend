import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Chip,
  Avatar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GroupIcon from '@mui/icons-material/Group';
import StoreIcon from '@mui/icons-material/Store';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';

// Styled components
const GradientCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 20,
  boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const ChartBox = styled(Box)(({ bgcolor }) => ({
  borderRadius: 20,
  padding: 24,
  height: 300,
  background: bgcolor,
  color: "#fff",
  boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const Welcome = () => {
  
  const metrics = [
    {
      icon: <FolderOpenIcon />,
      title: "Today Customers",
      value: 281,
      change: "+55% than last week",
    },
    {
      icon: <GroupIcon />,
      title: "Active Customers",
      value: "2,300",
      change: "+3% than last month",
    },
    {
      icon: <StoreIcon />,
      title: "Total Drivers",
      value: "34k",
      change: "+1% than yesterday",
    },
    {
      icon: <PersonAddAltIcon />,
      title: "Agency's",
      value: "+91",
      change: "Just updated",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",       // optional: make it flexible
    maxWidth: "100%",   // retain max layout width
    ml: 0,               // reduced left margin
    mr: "auto",          // right stays auto to align left
    p: 3,
      }}
    >
      {/* Centered Heading */}
      <Typography
  variant="h4"
  gutterBottom
  sx={{
    mb: 5,
    textAlign: 'center',
    fontWeight: 600,
    color: 'white',               // Set text color to white
    backgroundColor: '#0a0a42',   // Set background color
    p: 2,                         // Optional: add padding for better appearance
    borderRadius: 1              // Optional: slightly round the edges
  }}
>
  NDC Dashboard
</Typography>


      {/* Metric Cards */}
      <Grid container spacing={4}>
        {metrics.map((metric, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <GradientCard>
              <CardContent>
                <Box display="flex" alignItems="center" gap={2}>
                  <Avatar sx={{ bgcolor: "#000000" }}>{metric.icon}</Avatar>
                  <Box>
                    <Typography color="text.secondary" variant="subtitle2">
                      {metric.title}
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      {metric.value}
                    </Typography>
                    <Chip
                      label={metric.change}
                      size="small"
                      sx={{
                        mt: 1,
                        backgroundColor: "#e0f2f1",
                        color: "green",
                        fontWeight: 500
                      }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>
        ))}
      </Grid>

      {/* Chart Cards */}
      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <ChartBox bgcolor="#2196f3">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Website Views</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Last Campaign Performance
            </Typography>
            <Box mt={4} textAlign="center" fontSize={24}>📊 Bar Chart</Box>
            <Typography variant="caption" sx={{ mt: 4, display: 'block' }}>
              campaign sent 2 days ago
            </Typography>
          </ChartBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartBox bgcolor="#4caf50">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>New Users</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              (+15%) increase in today sales.
            </Typography>
            <Box mt={4} textAlign="center" fontSize={24}>📈 Line Chart</Box>
            <Typography variant="caption" sx={{ mt: 4, display: 'block' }}>
              updated 4 min ago
            </Typography>
          </ChartBox>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartBox bgcolor="#212121">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>Test Scheduled</Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Last Campaign Performance
            </Typography>
            <Box mt={4} textAlign="center" fontSize={24}>📉 Line Chart</Box>
            <Typography variant="caption" sx={{ mt: 4, display: 'block' }}>
              just updated
            </Typography>
          </ChartBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;