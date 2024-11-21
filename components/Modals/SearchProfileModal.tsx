import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useSpring, animated } from "react-spring";

const AnimatedBox = animated(Box);

interface SearchProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: Array<{ name: string; email: string; role: string; major: string; gender: string; interests: string }>; // Update type as per your dataset
  searchTerm: string;
  onSearchChange: (searchTerm: string) => void; // Add this line
}

const SearchProfileModal: React.FC<SearchProfileModalProps> = ({ isOpen, onClose, data, searchTerm, onSearchChange }) => {
    const animationStyle = useSpring({
        to: {
            opacity: 1,
            transform: isOpen ? "translate(-50%, -50%) translateY(0)" : "translate(-50%, -50%) translateY(-100px)",
        },
        from: {
            opacity: 0,
            transform: "translate(-50%, -50%) translateY(-100px)",
        },
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value); // Trigger the onSearchChange callback
    };

    const filteredData = data.filter((profile) => {
        const lowerSearchTerm = searchTerm.toLowerCase();
        return (
            profile.name.toLowerCase().includes(lowerSearchTerm) ||
            profile.email.toLowerCase().includes(lowerSearchTerm) ||
            profile.role.toLowerCase().includes(lowerSearchTerm) ||
            profile.major.toLowerCase().includes(lowerSearchTerm) ||
            profile.gender.toLowerCase().includes(lowerSearchTerm) ||
            profile.interests.toLowerCase().includes(lowerSearchTerm)
        );
    });

    return (
        <Modal open={isOpen} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <AnimatedBox style={animationStyle} sx={style}>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <h2 id="modal-title">Search Results</h2>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={handleInputChange} // Handle input changes
                    sx={{ mb: 2 }}
                />
                {filteredData.length > 0 ? (
                    filteredData.map((profile, index) => (
                        <Box key={index} sx={{ mb: 2, p: 2, border: "1px solid #ddd", borderRadius: 2 }}>
                            <p><strong>Name:</strong> {profile.name}</p>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Role:</strong> {profile.role}</p>
                            <p><strong>Major:</strong> {profile.major}</p>
                            <p><strong>Gender:</strong> {profile.gender}</p>
                            <p><strong>Interests:</strong> {profile.interests}</p>
                        </Box>
                    ))
                ) : (
                    <p>No results found.</p>
                )}
            </AnimatedBox>
        </Modal>
    );
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 3,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    p: 4,
    outline: "none",
};

export default SearchProfileModal;
