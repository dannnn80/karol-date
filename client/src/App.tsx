import { Alert, Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const typographyStyle = {
  fontFamily: "Dancing Script",
  fontWeight: 400,
  color: "#66001A",
  paddingX: 0,
  paddingY: 2,
  borderRadius: "100px",
};

const App: React.FC = () => {
  const [pageState, setPageState] = useState<"initial" | "dateOptions">(
    "initial"
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const [buttonPosition, setButtonPosition] = useState<null | {
    top: number;
    left: number;
  }>(null);

  const handleYes = () => setPageState("dateOptions");

  const handleNoHover = () => {
    let nextPosition;
    do {
      nextPosition = {
        top: Math.random() * (window.innerHeight - 50), // 50 is an approximate height of the button
        left: Math.random() * (window.innerWidth - 100), // 100 is an approximate width of the button
      };
    } while (
      buttonPosition &&
      nextPosition.top === buttonPosition.top &&
      nextPosition.left === buttonPosition.left
    );
    setButtonPosition(nextPosition);
  };

  // Add a resize listener to update button position on screen resize
  React.useEffect(() => {
    const handleResize = () => {
      if (buttonPosition) {
        setButtonPosition({
          top: Math.min(buttonPosition.top, window.innerHeight - 50),
          left: Math.min(buttonPosition.left, window.innerWidth - 100),
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [buttonPosition]);

  const submitOption = async (option: string) => {
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ choice: option }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage(
          "Done! I was sent an email with your response. See you soon!"
        );
        setSnackbarSeverity("success");
      } else {
        throw new Error(
          data.message || "An error occurred while sending the email"
        );
      }
    } catch (error) {
      setSnackbarMessage(
        "Oops! An error occurred while notifying me of your choice. Please DM me!"
      );
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  if (pageState === "dateOptions")
    return (
      <Box>
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackbarOpen}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Typography
          mt={4}
          sx={{ color: "#66001A", fontWeight: "bolder" }}
          variant="h4"
        >
          Yay!!! I'm excited to go out with you!
        </Typography>
        <video
          autoPlay
          muted
          playsInline
          loop
          style={{
            display: "block",
            maxWidth: "350px",
            height: "auto",
            margin: "auto",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <source
            src={
              "https://personal-stuff.nyc3.cdn.digitaloceanspaces.com/HappySloth.mp4"
            }
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <Typography
          sx={{ color: "#66001A", marginBottom: "10px" }}
          variant="h5"
        >
          Here are some date options:
        </Typography>
        <Button
          sx={{
            width: "360px",
            borderRadius: "20px",
            marginBottom: "20px",
            mx: 1,
            py: 1,
            backgroundColor: "#66001A",
            color: "white",
            "&&:hover": {
              backgroundColor: "#800020",
            },
          }}
          onClick={() => submitOption("Velvet Taco + Mini-golf")}
        >
          Velvet Taco + Mini-golf
        </Button>
        <Button
          sx={{
            width: "360px",
            borderRadius: "20px",
            marginBottom: "20px",
            mx: 1,
            py: 1,
            backgroundColor: "#66001A",
            color: "white",
            "&&:hover": {
              backgroundColor: "#800020",
            },
          }}
          onClick={() => submitOption("The Museum of Illusions")}
        >
          The Museum of Illusions
        </Button>
        <Button
          sx={{
            width: "360px",
            borderRadius: "20px",
            marginBottom: "20px",
            mx: 1,
            py: 1,
            backgroundColor: "#66001A",
            color: "white",
            "&&:hover": {
              backgroundColor: "#800020",
            },
          }}
          onClick={() => submitOption("The Museum of Illusions")}
        >
          Couple's Massage + Champagne
        </Button>
      </Box>
    );

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Box mt={3} display={"flex"} justifyContent={"center"}>
        <Box>
          <Typography sx={typographyStyle} variant="h4">
            Would you like to go on a date with me?
          </Typography>
          <video
            autoPlay
            muted
            playsInline
            loop
            style={{
              display: "block",
              maxWidth: "350px",
              height: "auto",
              margin: "auto",
              marginTop: "30px",
              marginBottom: "30px",
            }}
          >
            <source
              src={
                "https://personal-stuff.nyc3.cdn.digitaloceanspaces.com/SlothWithABigHeart.mp4"
              }
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <Box>
            <Box my={2}>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#66001A",
                  color: "white",
                  "&&:hover": {
                    backgroundColor: "#800020",
                  },
                }}
                onClick={handleYes}
              >
                <FontAwesomeIcon icon={faHeart} />{" "}
                <span style={{ marginLeft: "5px" }}>Yes!</span>
              </Button>
            </Box>
            <Box>
              <Button
                variant="contained"
                sx={{ backgroundColor: "#35000E" }}
                onClick={() => {
                  alert(
                    "Error. An error occured. Please try clicking yes to see if it resolves it"
                  );
                }}
                onMouseMove={handleNoHover}
                style={
                  buttonPosition
                    ? {
                        position: "absolute",
                        top: buttonPosition.top,
                        left: buttonPosition.left,
                      }
                    : {}
                }
              >
                No {" :("}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
