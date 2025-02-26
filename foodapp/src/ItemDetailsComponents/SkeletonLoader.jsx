import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import styles from "./itemDetails.module.css";

export default function SkeletonLoader() {
  return (
    <div className={styles.container}>
      <Stack
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "start",
          gap: 2,
          marginTop: 2 // Adjusts spacing between image and text
        }}
      >
        {/* Left Side - Product Image & Thumbnails */}
        <Box>
          {/* Large Image Skeleton */}
          <Skeleton
            variant="rectangular"
            width={500}
            height={300}
            sx={{
              bgcolor: "#444",
              borderRadius: "10px",
            }}
          />
          
          {/* Small Thumbnail Skeletons */}
          <Box display="flex" justifyContent="CENTER" gap={1} mt={3}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={90}
                height={80}
                sx={{ bgcolor: "#555", borderRadius: "2px" }}
              />
            ))}
          </Box>
        </Box>

        {/* Right Side - Product Details */}
        <Box flex={1} sx={{ textAlign: "left", maxWidth: "90%"  }}>
          {/* Title Skeleton */}
          <Skeleton variant="text" sx={{ bgcolor: "#555" }} width="20%" />
          <Skeleton variant="text" sx={{ fontSize: "70px", bgcolor: "#555" }} width="70%" />
          <Skeleton variant="text" sx={{ fontSize: "50px", bgcolor: "#555" }} width="40%" />
          
          {/* Description Skeleton */}
          <Skeleton variant="text" sx={{ fontSize: "30px", bgcolor: "#555" }} width="450px" />
          <Skeleton variant="text" sx={{ fontSize: "30px", bgcolor: "#555" }} width="95%" />
          <Skeleton variant="text" sx={{ fontSize: "30px", bgcolor: "#555" }} width="60%" />

          {/* Quantity & Add to Cart Skeletons */}
          <Box display="flex" alignItems="center" gap={2} mt={2}>
            <Skeleton variant="rectangular" width={100} height={40} sx={{ bgcolor: "#444", borderRadius: "5px" }} />
            <Skeleton variant="rectangular" width={150} height={40} sx={{ bgcolor: "#444", borderRadius: "20px" }} />
          </Box>
        </Box>
      </Stack>
    </div>
  );
}
