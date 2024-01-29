import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import { Checkbox, Tooltip } from "@mui/material";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

const GridItem = (props) => {
  const { item, thumbnailUrls } = props;

  const imageUrls = [
    "https://learnkoods.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-1.png&w=64&q=75",
    "https://learnkoods.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F1-5.png&w=64&q=75",
    "https://learnkoods.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F3-2.png&w=64&q=75",
    "https://learnkoods.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F3-4.png&w=64&q=75",
    "https://learnkoods.vercel.app/_next/image?url=%2Fimages%2Fresource%2Fcompany-logo%2F3-7.png&w=64&q=75",
  ];

  const getRandomIndex = () => Math.floor(Math.random() * imageUrls.length);

  console.log(item, "item");

  return (
    <Card
      sx={{
        p: 5,
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
      className="item-hover"
    >
      <Box
        sx={{
          mt: 2,
          mb: 5,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="span"
          sx={{
            maxHeight: 28,
            width: 48,
            color: "primary.contrastText",

            pt: 1.5,
            pb: 1,
            px: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

            borderRadius: 8,
            fontSize: 14,
          }}
        >
          <Box component="span" sx={{ pb: 1.25 }}>
            {item.subscribed ? (
              <>
                <Tooltip title="SUBSCRIBED">
                  <DoneAllIcon size="xs" style={{ color: "#0d72bf" }} />
                </Tooltip>
              </>
            ) : (
              ""
            )}
          </Box>
        </Box>
        <Box
          sx={{
            mx: 2,
            maxHeight: { xs: 140, sm: 200, md: 260 },
            minHeight: { xs: 140, sm: 200, md: 260 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            "& img": {
              maxHeight: "100%",
              maxWidth: "100%",
            },
          }}
        >
          <img src={imageUrls[getRandomIndex()]} alt="job" />
        </Box>
        <Box
          sx={{
            mt: -3,
          }}
        >
          <Checkbox icon={<BookmarkBorderIcon />} />
        </Box>
      </Box>

      <Box
        sx={{
          mb: 1,
          color: "text.primary",

          fontSize: 16,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
        component="h3"
      >
        {item.job_title}
      </Box>

      <Box
        component="p"
        sx={{
          mb: 3,
          color: "text.secondary",
          fontSize: 14,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}
      >
        {item.job_des || "no content"}
      </Box>
    </Card>
  );
};

export default GridItem;

GridItem.propTypes = {
  item: PropTypes.object.isRequired,
  thumbnailUrls: PropTypes.object,
};
