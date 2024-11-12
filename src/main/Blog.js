import React from "react";
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Box,
} from "@mui/material";

import Navbar from "./Navbar";
import Footer from "./Footer";

// Sample blog data
const blogData = {
  title: "Understanding JavaScript Closures",
  author: {
    name: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=3", // Placeholder image for author avatar
  },
  date: "September 18, 2024",
  content: `
    Closures are an important and powerful feature in JavaScript. A closure is a function that has access to the variables from another function’s scope. This happens even after the outer function has returned. In simpler terms, a closure is formed when a function is able to remember and access its lexical scope even when it’s invoked outside of that lexical scope.

    Closures are useful for creating data privacy, and they play a crucial role in JavaScript callbacks, event handlers, and other asynchronous code. Let’s explore how closures work with examples...

    Closures are an important and powerful feature in JavaScript. A closure is a function that has access to the variables from another function’s scope. This happens even after the outer function has returned. In simpler terms, a closure is formed when a function is able to remember and access its lexical scope even when it’s invoked outside of that lexical scope.

    Closures are useful for creating data privacy, and they play a crucial role in JavaScript callbacks, event handlers, and other asynchronous code. Let’s explore how closures work with examples...

    Closures are an important and powerful feature in JavaScript. A closure is a function that has access to the variables from another function’s scope. This happens even after the outer function has returned. In simpler terms, a closure is formed when a function is able to remember and access its lexical scope even when it’s invoked outside of that lexical scope.

    Closures are useful for creating data privacy, and they play a crucial role in JavaScript callbacks, event handlers, and other asynchronous code. Let’s explore how closures work with examples...
  `,
};

const BlogPage = () => {
  return (
    <>
      <Navbar title="Helping Hands" />
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Card
          sx={{
            boxShadow: 5, // Elevation for shadow
            borderRadius: 2,
            padding: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "#fafafa", // Light background color
          }}
        >
          {/* Blog Title */}
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
            {blogData.title}
          </Typography>

          {/* Author Details and Date */}
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <Avatar
                alt={blogData.author.name}
                src={blogData.author.avatar}
                sx={{ width: 56, height: 56 }}
              />
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">
                {blogData.author.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {blogData.date}
              </Typography>
            </Grid>
          </Grid>

          {/* Blog Content */}
          <CardContent sx={{ mt: 3 }}>
            <Typography variant="body1" paragraph>
              {blogData.content.split("\n\n").map((paragraph, index) => (
                <Box key={index} mb={2}>
                  {paragraph}
                </Box>
              ))}
            </Typography>
          </CardContent>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default BlogPage;
