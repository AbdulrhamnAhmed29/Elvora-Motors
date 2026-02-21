# ELVORA MOTORS - Luxury Car Management System

---

## Live Demo

Frontend: [https://elvora-motors.vercel.app/](https://elvora-motors.vercel.app/)

---

## Overview

ELVORA MOTORS is a full-stack automotive platform built to simulate a real-world luxury car business environment.

The system provides a modern customer experience for browsing vehicles and a secure administrative dashboard for managing inventory, users, and business operations.

This project focuses on scalable architecture, performance optimization, and production-level frontend practices.

---

## Features

### User Application

* Responsive modern landing page
* Dynamic vehicle catalog powered by API
* Car details with full specifications and pricing
* Contact system for purchase, booking, and selling requests
* Form validation and validation handling
* Loading, error, and empty states
* Data caching and background refetch using TanStack Query

---

### Admin Dashboard

* Authentication using Laravel Sanctum
* Protected routes with role-based access
* Full CRUD operations for vehicles
* Multi-image upload support
* Server-side pagination for large datasets
* Real-time customer request management
* Export data to Excel for reporting

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* TanStack Query (React Query)
* Axios
* React Hook Form
* Framer Motion

### Backend

* Laravel (RESTful API)
* Laravel Sanctum

### Database

* MySQL

---

## Project Architecture

* Feature-based folder structure
* Separation between API layer and UI components
* Centralized Axios configuration with interceptors
* Server state managed using TanStack Query
* Reusable and modular components
* Protected routes for authenticated users
* Centralized error handling

---

## Performance Optimization

* Server-side pagination for large datasets
* API response caching
* Background data refetch
* Optimized rendering and component structure
* Reduced unnecessary API calls using React Query

---

## Screenshots

### Landing Page

![Landing](https://github.com/user-attachments/assets/0a9a9152-9a0f-46b0-9ab3-f841c7df1c04)

### Car Collection

![Collection](https://github.com/user-attachments/assets/63953dcb-bdcb-44fb-97a2-172985b241b6)

### Car Details

![Details](https://github.com/user-attachments/assets/0882e832-0920-4073-a84b-de062f3d1972)

### Admin Dashboard

![Dashboard](https://github.com/user-attachments/assets/14fa80cc-0e98-4bb1-80c5-b49f378c7dc2)

---

## Installation

### Frontend

```bash
git clone https://github.com/AbdulrhamnAhmed29/Elvora-Motors.git
cd Elvora-Motors
npm install
npm run dev