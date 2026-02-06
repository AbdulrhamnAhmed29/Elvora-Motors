# 🏎️ ELVORA MOTORS - Luxury Car Management System

[![React](https://img.shields.io/badge/React-17.0.2-blue?logo=react&logoColor=white)](https://reactjs.org/)
[![Laravel](https://img.shields.io/badge/Laravel-10-red?logo=laravel&logoColor=white)](https://laravel.com/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.3-teal?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

ELVORA MOTORS is a full-stack premium automotive platform. It provides a high-end experience for users to browse and interact with a luxury car fleet, while offering a powerful, data-driven dashboard for admins to manage the entire business logic.

---

##  Key Features

###  User Side
- **Modern Landing Page**: Multiple sections showcasing the brand's identity and premium car collections.
- **Dynamic Product Catalog**: Real-time car listing with advanced caching using React Query.
- **Deep Linking**: Detailed view for each vehicle with technical specifications and pricing.
- **Smart Contact System**: Concierge form with three distinct flows: Purchase, Booking, or Selling.
- **Email Integration**: User requests are sent directly to the admin’s email.

###  Admin Terminal (Dashboard)
- **Role-Based Access Control (RBAC)**: Secure authentication; only Admins can access the dashboard.
- **Comprehensive Overview**: Analytics for total users, daily sign-ups, and monthly growth tracking.
- **Real-Time Counters**: Admin counts, total products, and stock availability.
- **User Management**: Complete CRUD operations for platform users.
- **Fleet Management**: Professional control over car listings, including multi-field forms and image uploading.
- **Data Portability**: Export user and product tables to Excel files for offline reporting.
- **Advanced UI**: Integrated pagination and optimized table views for large datasets.

---

##  Tech Stack & Architecture
- **Frontend**: React.js, Tailwind CSS (Custom Dark Theme), Framer Motion.
- **Backend**: Laravel API.
- **State Management**: TanStack Query (React Query) for efficient caching and synchronization.
- **API Layer**: Axios Instance with automatic JWT/Sanctum token injection.
- **Security**: Environment variables (`.env`) for sensitive credentials.

---
