import React, {useState, useContext } from "react";
import {
    Grid,
    Card,
    CardContent,
    Typography,
    Button,
    Pagination,
    Box,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CreateNewOrderContext from "../../../Context/Agency/CreateNewOrder/CreateNewOrderContext";

function ChooseCollectionSite() {
    const {
        currentPosition,
        maxPosition,
        setCurrentPosition,
        setMaxPosition,
        siteInformation,
        siteInformationLoading,
    } = useContext(CreateNewOrderContext);

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedSiteId, setSelectedSiteId] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSiteDetails, setSelectedSiteDetails] = useState(null);

    const sitesPerPage = 6;

    const indexOfLastSite = currentPage * sitesPerPage;
    const indexOfFirstSite = indexOfLastSite - sitesPerPage;
    const currentSites = siteInformation.slice(indexOfFirstSite, indexOfLastSite);
    const totalPages = Math.ceil(siteInformation.length / sitesPerPage);

    const handleSelectSite = (siteId) => {
        setSelectedSiteId(siteId);
    };

    const handlePrevious = () => {
        setCurrentPosition(currentPosition - 1);
    };

    const handleContinue = () => {
        if (currentPosition === maxPosition) {
            setMaxPosition(maxPosition + 1);
        }
        setCurrentPosition(currentPosition + 1);
    };

    const handleOpenModal = (site) => {
        setSelectedSiteDetails(site);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedSiteDetails(null);
    };

    if (siteInformationLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box p={3}>
            <Typography variant="h5" fontWeight={600} align="center" gutterBottom>
                Choose a Collection Site
            </Typography>

            <Grid container spacing={3}>
                {currentSites.map((site) => {
                    const isSelected = selectedSiteId === site.collection_site_link_id;

                    return (
                        <Grid item xs={12} sm={6} key={site.collection_site_link_id}>
                            <Card
                                variant="outlined"
                                sx={{
                                    borderColor: isSelected ? 'primary.main' : 'grey.300',
                                    backgroundColor: isSelected ? 'primary.light' : '#fff',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                    '&:hover': {
                                        boxShadow: 3
                                    },
                                    position: 'relative'
                                }}
                                onClick={() => handleSelectSite(site.collection_site_link_id)}
                            >
                                <CardContent>
                                    {isSelected && (
                                        <CheckCircleIcon
                                            color="primary"
                                            sx={{ position: 'absolute', top: 8, right: 8 }}
                                        />
                                    )}
                                    <Typography
                                        variant="subtitle1"
                                        fontWeight={600}
                                        textTransform="uppercase"
                                        gutterBottom
                                    >
                                        {site.collection_site_city}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {site.collection_site_address}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Distance: {site.distance_miles_numeric}
                                    </Typography>

                                    <Box display="flex" justifyContent="space-between" mt={2}>
                                        <Button
                                            size="small"
                                            variant="contained"
                                            sx={{
                                                backgroundColor: 'black',
                                                color: 'white',
                                                '&:hover': {
                                                    backgroundColor: '#333'
                                                }
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOpenModal(site);
                                            }}
                                        >
                                            More Details
                                        </Button>

                                        <Button
                                            size="small"
                                            variant={isSelected ? "contained" : "outlined"}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleSelectSite(site.collection_site_link_id);
                                            }}
                                        >
                                            {isSelected ? "Selected" : "Select Site"}
                                        </Button>
                                    </Box>

                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>

            {/* Pagination */}
            <Box display="flex" justifyContent="center" mt={4}>
                <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={(_, value) => setCurrentPage(value)}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                />
            </Box>

            {/* Navigation Buttons */}
            <Box display="flex" justifyContent="space-between" mt={4}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    variant="outlined"
                    onClick={handlePrevious}
                >
                    Previous
                </Button>
                <Button
                    endIcon={<ArrowForwardIcon />}
                    variant="contained"
                    onClick={handleContinue}
                    disabled={!selectedSiteId}
                >
                    Continue
                </Button>
            </Box>

            <Dialog open={openModal} onClose={handleCloseModal} fullWidth maxWidth="sm">
    <DialogTitle>More Details</DialogTitle>
    <DialogContent dividers>
        <Typography gutterBottom><strong>Name:</strong> {selectedSiteDetails?.collection_site_city}</Typography>
        <Typography gutterBottom><strong>Address:</strong> {selectedSiteDetails?.collection_site_address}</Typography>
        <Typography gutterBottom><strong>Distance:</strong> {selectedSiteDetails?.distance_miles_numeric} miles</Typography>
        <Typography gutterBottom><strong>Site Fax:</strong> {selectedSiteDetails?.collection_site_fax}</Typography>
        <Typography gutterBottom><strong>Site Phone:</strong> {selectedSiteDetails?.collection_site_phone}</Typography>

        <Box mt={3}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Weekly Operating Hours
            </Typography>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell><strong>Day</strong></TableCell>
                        <TableCell><strong>Opening</strong></TableCell>
                        <TableCell><strong>Closing</strong></TableCell>
                        <TableCell><strong>Open During Lunch</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[
                        "mon",
                        "tue",
                        "wed",
                        "thur",
                        "fri",
                        "sat",
                        "sun",
                    ].map((day) => {
                        const opening = selectedSiteDetails?.[`${day}_open`];
                        const closing = selectedSiteDetails?.[`${day}_close`];
                        const lunch = selectedSiteDetails?.[`${day}_open_lunch`] === "1";

                        const isClosed = !opening && !closing;

                        return (
                            <TableRow key={day}>
                                <TableCell sx={{ textTransform: "capitalize" }}>{day}</TableCell>
                                <TableCell>{isClosed ? "Closed" : opening}</TableCell>
                                <TableCell>{isClosed ? "—" : closing}</TableCell>
                                <TableCell>{isClosed ? "—" : lunch ? "Yes" : "No"}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </Box>
    </DialogContent>
    <DialogActions>
        <Button onClick={handleCloseModal}>Close</Button>
    </DialogActions>
</Dialog>

        </Box>
    );
}

export default ChooseCollectionSite;
