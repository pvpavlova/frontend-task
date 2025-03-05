import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { fetchInfo } from "../api/api";

const Home = () => {
  const [info, setInfo] = useState("");

  useEffect(() => {
    fetchInfo().then((res) => setInfo(res));
  }, []);

  return (
    <Box sx={{ pl: 0, pr: 0 }}>
      <Typography 
        sx={{ textAlign: "left", fontSize: "24px", fontWeight: "bold", ml: 3 }} 
        dangerouslySetInnerHTML={{ __html: info }} 
      />
    </Box>
  );
};

export default Home;
