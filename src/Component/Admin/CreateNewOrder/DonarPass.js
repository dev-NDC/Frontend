import React, { useState , useContext} from "react";
import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
} from "@mui/material";
import CreateNewOrderContext from "../../../Context/Admin/CreateNewOrder/CreateNewOrderContext";

function DonarPass() {
    const {formData, setFormData,} = useContext(CreateNewOrderContext);

  const [showCCEmailInput, setShowCCEmailInput] = useState(false);

  const handleSendLinkChange = (_, value) => {
    if (value !== null) {
      setFormData({ ...formData, sendLink: value === "yes" });
    }
  };

  const handleDonorPassChange = (_, value) => {
    if (value !== null) {
      const show = value === "yes";
      setFormData({ ...formData, ccEmail: show ? formData.ccEmail : "" });
      setShowCCEmailInput(show);
    }
  };

  const handleCCEmailChange = (event) => {
    setFormData({ ...formData, ccEmail: event.target.value });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4, mb : 3 }}>
      {/* Send Scheduling Link */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Send Scheduling Link
        </Typography>
        <ToggleButtonGroup
          value={formData.sendLink ? "yes" : "no"}
          exclusive
          onChange={handleSendLinkChange}
          size="small"
        >
          <ToggleButton value="yes">Yes</ToggleButton>
          <ToggleButton value="no">No</ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Send Donor Pass */}
      <Box>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Send Donor Pass
        </Typography>
        <ToggleButtonGroup
          value={showCCEmailInput ? "yes" : "no"}
          exclusive
          onChange={handleDonorPassChange}
          size="small"
        >
          <ToggleButton value="yes">Yes</ToggleButton>
          <ToggleButton value="no">No</ToggleButton>
        </ToggleButtonGroup>

        {showCCEmailInput && (
          <TextField
            label="Enter email(s) separated by semicolons"
            variant="outlined"
            fullWidth
            value={formData.ccEmail}
            onChange={handleCCEmailChange}
            sx={{ mt: 2 }}
          />
        )}
      </Box>
    </Box>
  );
}

export default DonarPass;
