# AI Resume Builder

## Overview

AI Resume Builder is a full-stack web application designed to streamline the process of creating, updating, managing, and sharing professional resumes. Built using modern web technologies like React JS, TailwindCSS, and Shadcn for the frontend, and powered by Strapi for the backend, the app provides users with an intuitive and efficient way to build resumes. Users can also download their resumes and share them with others via social media or URL links. The app leverages the Gemini API for summarizing content, and authentication is handled through Clerk, allowing users to log in via Google, Microsoft, or GitHub.

## Features

- **Create, Update, Delete Resumes**: Easily manage resume content through a user-friendly interface.
- **Download Resume**: Download your resume in multiple formats for personal use.
- **Share Resume**: Share your resume directly via social media platforms or with a unique URL.
- **AI-Powered Summaries**: Generate resume summaries using the Gemini API to provide concise, impactful descriptions.
- **Authentication**: Secure login options through Google, Microsoft, and GitHub using Clerk.
- **Responsive Design**: A fully responsive UI built with TailwindCSS and Shadcn ensures a seamless experience on all devices.

## Technologies Used

### Frontend

- **React JS**: A popular JavaScript library for building user interfaces.
- **TailwindCSS**: A utility-first CSS framework for rapid UI development.
- **Shadcn**: UI components for building consistent and accessible interfaces.

### Backend

- **Strapi**: A powerful headless CMS that simplifies API development.
- **PostgreSQL**: The database used for storing user and resume data, hosted on Neon for scalability and security.
- **Gemini API**: Utilized for generating AI-based summaries of resumes.

### Authentication

- **Clerk**: Provides authentication with Google, Microsoft, and GitHub for seamless user login and session management.

## Database

- **PostgreSQL on Neon**: We use Neon’s free-tier PostgreSQL database service, integrated with Strapi for data management.
