# Admin Dashboard - Role-Based Access Control (RBAC)

This project demonstrates a frontend implementation of an Admin Dashboard where user roles and permissions are managed using Role-Based Access Control (RBAC). The application uses modern React techniques to provide a seamless and secure experience for admins, creators, and users.

## Table of Contents
- Project Overview
- Features
- Technologies Used
- Project Structure
- State Management
- Routing & Permissions
- How to Access the Dashboard
- How to Run the Project

## Project Overview

### Role-Based Functionality:
- **Admin**:
  - Manage users and creators.
  - Assign or toggle roles between "creator" and "user."
  - Add new members to the system.
- **Creator**:
  - Create and manage posts.
  - View the history of their past posts.
- **User**:
  - View posts created by creators.
  - Follow and unfollow creators.

## Features
- **Role Management**: Admins can assign roles or toggle between user and creator roles.
- **User Management**: Admins can add new users to the system.
- **Post Management**: Creators can write posts, insert media/links using an integrated text editor (TinyMCE), and manage their content.
- **Protected Routes**: Pages are access-restricted based on the logged-in user’s role.
- **Shimmer Effect**: Loading skeletons are displayed while fetching data.
- **Debounce**: Optimized input handling for actions like searching or adding members.
- **Mobile-Responsive Sidebar**: A collapsible sidebar enhances usability on smaller screens.

## Technologies Used
- **React**: For building the user interface.
- **React Context API**: For global state management.
- **React Router**: For navigation and implementing protected routes.
- **Reducer**: To handle centralized state updates.
- **Tailwind CSS**: For responsive styling.
- **TinyMCE**: For the interactive text editor used by creators.

## Project Structure
- **components**:
  - **forms**: Login form and "Add User" form.
  - **CreatorNav**: Navbar specific to creators.
  - **UserNav**: Navbar for users.
  - **Shimmer**: Component for displaying loading skeletons.
- **context**:
  - **AuthContext**: Manages authentication states.
  - **BlogContext**: Manages post-related states.
- **pages**:
  - **Dashboard**: Admin dashboard for user and role management.
  - **Following**: Page where users can follow/unfollow creators.
  - **PastBlogs**: Page showing creators their post history.
  - **UnAuthorized**: Displays a message when a user tries to access a restricted page.
  - **UserDashboard**: Dashboard displaying posts fetched from a dummy API.
  - **Write**: Content creation page for creators with TinyMCE integration.
- **utils/reducer.js**:
  - Centralized functions for managing state changes (e.g., adding users, assigning roles, deleting users, and managing posts).
- **App.jsx**: Main file setting up routes for the application.
- **protectedRoute.jsx**: Handles access control logic for routes based on user roles.

## State Management
- **Context API**:
  - Used to share global states such as posts, user roles, and login status across components without prop drilling.
- **Reducer**:
  - Manages state changes centrally, ensuring consistent and predictable updates.

## Routing & Permissions
- **Protected Routes**:
  - Role-based restrictions ensure users can only access pages they’re authorized for. Unauthorized users are redirected to the UnAuthorized page.
- **RBAC Implementation**:
  - Admin can toggle user roles, add members, and manage the system.
  - Creators can access post creation and history.
  - Users can view posts and follow creators.

## How to Access the Dashboard
- **Admin Login**:
  - Email: admin@gmail.com
  - Password: admin1234
- **User Login**:
  - Email: user@gmail.com
  - Password: user1234
- **Creator Login**:
  - Email: creator@gmail.com
  - Password: creator1234

## How to Run the Project

### Prerequisites
Ensure the following tools are installed on your system:
- **Node.js**
- **npm or yarn**

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Abhikori/RoleBasedAccessControl  
   cd RoleBasedAccessControl  
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start  
    # or  
   yarn start 
   ``` 
4. Access the application: Open your browser and visit:
http://localhost:3000

### Conclusion
This Admin Dashboard demonstrates an efficient implementation of Role-Based Access Control (RBAC) with modern React practices. It features user role management, post creation, and a responsive interface, making it scalable, maintainable, and user-friendly.