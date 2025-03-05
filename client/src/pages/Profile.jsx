import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProfile, fetchAuthor, fetchQuote } from "../api/api";
import { Container, Typography, Button, Modal, Box, CircularProgress } from "@mui/material";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [quoteData, setQuoteData] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [authorName, setAuthorName] = useState(""); 
  const [quoteText, setQuoteText] = useState(""); 
  const [isCancelled, setIsCancelled] = useState(false);  
  const [abortController, setAbortController] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await fetchProfile();
        setProfile(res.data);
      } catch (error) {
        console.error("Ошибка при загрузке профиля:", error);
        navigate("/login");
      }
    };

    fetchUserProfile();
  }, [navigate]);

  useEffect(() => {
    const savedQuote = localStorage.getItem("quote");
    if (savedQuote) {
      setQuoteData(savedQuote);
    }
  }, []);

  const handleFetchQuote = async () => {
    setOpenModal(true);
    setLoading(true);
    setIsCancelled(false);

    const controller = new AbortController();
    setAbortController(controller);

    setQuoteData("");
    setAuthorName("");
    setQuoteText("");

    try {
      const authorRes = await new Promise((resolve) =>
        setTimeout(async () => {
          const author = await fetchAuthor(controller.signal);
          resolve(author);
        }, 1000)
      );

      if (isCancelled) return;
      setAuthorName(authorRes.name);

     
      const quoteRes = await new Promise((resolve) =>
        setTimeout(async () => {
          const quote = await fetchQuote(authorRes.id, controller.signal);
          resolve(quote);
        }, 2000)  
      );

      if (isCancelled) return;
      setQuoteText(quoteRes);

      const newQuoteData = `${authorRes.name}: "${quoteRes}"`;
      setQuoteData(newQuoteData);

      localStorage.setItem("quote", newQuoteData);
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Ошибка запроса цитаты:", error);
        alert("Ошибка при получении цитаты");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (abortController) {
      abortController.abort(); 
    }
    setIsCancelled(true); 
    setLoading(false);
    setOpenModal(false);
    setQuoteData(""); 
    setAuthorName("");
    setQuoteText("");  
  };

  return (
    <Container>
      <Typography variant="h4">
        Welcome, {profile ? profile.fullName : "Loading..."}
      </Typography>
      {profile ? (
        <>
          <Button
            variant="contained"
            onClick={handleFetchQuote}
            disabled={loading}
          >
            {loading ? "Loading..." : "Update"}
          </Button>
          {quoteData && <Typography mt={2}>{quoteData}</Typography>}
        </>
      ) : (
        <Typography>Loading...</Typography>
      )}

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 24,
            width: 300,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2">
            Requesting the Quote
          </Typography>

          <Typography mt={2}>
            Author: {authorName ? authorName : loading ? <CircularProgress size={20} /> : "Not found"}
          </Typography>

          <Typography mt={2}>
            Quote: {quoteText ? quoteText : loading ? <CircularProgress size={20} /> : "Not found"}
          </Typography>
          <Button
            variant="outlined"
            onClick={handleCancel}
            sx={{ mt: 2 }}
            disabled={!loading}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </Container>
  );
};

export default Profile;
