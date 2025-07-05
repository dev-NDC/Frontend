import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import GroupIcon from "@mui/icons-material/Group";
import StoreIcon from "@mui/icons-material/Store";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import axios from "axios";
import Cookies from "js-cookie";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const API_URL = process.env.REACT_APP_API_URL;

// Styled components
const GradientCard = styled(Card)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: 20,
  boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const ChartBox = styled(Box)(({ bgcolor }) => ({
  borderRadius: 20,
  padding: 24,
  height: 300,
  background: bgcolor,
  color: "#fff",
  boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const Welcome = () => {
  const [counts, setCounts] = useState({
    totalCustomers: 0,
    activeCustomers: 0,
    totalDrivers: 0,
    totalAgencies: 0,
    customerChange: "0%",
    activeCustomerChange: "0%",
    driverChange: "0%",
    agencyChange: "0%",
  });

  const [userData, setUserData] = useState([]);
  const [testScheduleData, setTestScheduleData] = useState([]);
  const [websiteVisits, setWebsiteVisits] = useState([]);


  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get(`${API_URL}/admin/getCustomerAndAgencyCount`);
        setCounts(res.data);
      } catch (err) {
        console.error("Failed to fetch dashboard counts:", err);
      }
    };

    const fetchUserStats = async () => {
      try {
        const token = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get(`${API_URL}/admin/getUserCountsLast6Months`);
        const formatted = res.data.data.map((d) => ({
          name: `${d.month} ${d.year}`,
          count: d.count,
        }));
        setUserData(formatted);
      } catch (err) {
        console.error("Failed to load user chart data:", err);
      }
    };

    const fetchTestScheduleData = async () => {
      try {
        const token = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get(`${API_URL}/admin/getMonthlyTestScheduleStats`);
        setTestScheduleData(res.data);
      } catch (err) {
        console.error("Failed to load test schedule data:", err);
      }
    };

    const fetchWebsiteVisits = async () => {
      try {
        const token = Cookies.get("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const res = await axios.get(`${API_URL}/admin/getWebsiteVisitsLast6Months`);
        // Format: name (month), count
        const formatted = res.data.data.map(d => ({
          name: d.name,
          count: d.count
        }));
        setWebsiteVisits(formatted);
      } catch (err) {
        console.error("Failed to load website visits data:", err);
      }
    };


    fetchWebsiteVisits();
    fetchCounts();
    fetchUserStats();
    fetchTestScheduleData();
  }, []);

  const metrics = [
    {
      icon: <FolderOpenIcon />,
      title: "Today Customers",
      value: counts.totalCustomers,
    },
    {
      icon: <GroupIcon />,
      title: "Active Customers",
      value: counts.activeCustomers,
    },
    {
      icon: <StoreIcon />,
      title: "Total Drivers",
      value: counts.totalDrivers,
    },
    {
      icon: <PersonAddAltIcon />,
      title: "Agency's",
      value: counts.totalAgencies,
    },
  ];

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", ml: 0, mr: "auto", p: 3 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          mb: 5,
          textAlign: "center",
          fontWeight: 600,
          color: "white",
          backgroundColor: "#0a0a42",
          p: 2,
          borderRadius: 1,
        }}
      >
        NDC Dashboard
      </Typography>

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
                  </Box>
                </Box>
              </CardContent>
            </GradientCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        <Grid item xs={12} md={4}>
          <ChartBox bgcolor="#2196f3">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Website Views
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Visits over the last 6 months
            </Typography>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={websiteVisits}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    border: "none",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    color: "#000",
                  }}
                  labelStyle={{ color: "#000", fontWeight: 600 }}
                  itemStyle={{ color: "#2196f3" }}
                />
                <Bar dataKey="count" fill="#ffffff" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
            <Typography variant="caption" sx={{ mt: 4, display: "block" }}>
              Updated {websiteVisits.length ? websiteVisits[websiteVisits.length - 1].name : "--"}
            </Typography>
          </ChartBox>

        </Grid>

        <Grid item xs={12} md={4}>
          <ChartBox bgcolor="#4caf50">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              New Users
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              New users over the last 6 months
            </Typography>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={userData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderRadius: 8,
                    border: "none",
                    boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
                    color: "#000",
                  }}
                  labelStyle={{ color: "#000", fontWeight: 600 }}
                  itemStyle={{ color: "#d32f2f" }}
                />
                <Bar dataKey="count" fill="#d32f2f" barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </Grid>

        {/* Test Scheduled Chart (stacked) */}
        <Grid item xs={12} md={4}>
          <ChartBox bgcolor="#000000">
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Test Scheduled
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Random vs Other tests (Last 6 months)
            </Typography>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={testScheduleData}>
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" allowDecimals={false} />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: 8,
                    border: "none",
                    boxShadow: "none",
                    color: "#000",
                  }}
                  labelStyle={{ color: "#000", fontWeight: 600 }}
                  itemStyle={{ color: "#000" }}
                  formatter={(value, name) => [
                    `${value}`,
                    name === "random" ? "Random" : "Other",
                  ]}
                />
                <Bar dataKey="random" stackId="a" fill="#1976d2" />
                <Bar dataKey="other" stackId="a" fill="#fbc02d" />
              </BarChart>
            </ResponsiveContainer>
          </ChartBox>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Welcome;
