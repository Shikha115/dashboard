import React, { useEffect } from "react";

const RedirectToApp = () => {
  useEffect(() => {
    // Replace with your deep link and Play Store URL
    const appDeepLink = "https://rojgarapp.in/app"; // Your app's deep link
    const playStoreLink =
      "https://play.google.com/store/apps/details?id=com.rojgarapp.rojgar"; // Your Play Store URL

    // Function to redirect the user
    const redirectToAppOrPlayStore = () => {
      const startTime = new Date().getTime();

      // Try to open the app
      // window.open(appDeepLink, "_blank");

      // If the app is not installed, redirect to Play Store after 1.5 seconds
      setTimeout(() => {
        const elapsedTime = new Date().getTime() - startTime;

        // If the time elapsed is short, the app was likely not opened
        if (elapsedTime < 3500) {
          window.location.href = playStoreLink;
        }
      }, 3000);
    };

    // Call the function to open the app or go to the Play Store
    redirectToAppOrPlayStore();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1 style={{ fontSize: 30 }}>Redirecting...</h1>
      <p>
        If the app does not open, you'll be redirected to the Play Store
        shortly.
      </p>
    </div>
  );
};

export default RedirectToApp;
