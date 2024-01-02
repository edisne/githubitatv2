# Novular Exercise

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Application Overview
This application is a user-friendly platform that allows searching GitHub users by their username. It displays user profiles, including details and lists of repositories and followers. The application emphasizes responsive design, mobile optimization, and incorporates advanced features like dynamic theme switching, state management, and lazy loading.

## Getting Started
### Prerequisites
- Node.js (LTS version)
- Angular CLI
- Git (for version control)
### Installation
Clone the repository:
git clone <repository-url>

Navigate to the project directory:
cd NuvolarExercise
Install dependencies:
npm install

Start the development server:
ng serve
The application will be available at http://localhost:4200/.

## Building the Application
Development Build:
ng build
Production Build:

ng build --prod

## Application Features
User Search Functionality:

Search bar on the homepage.
Real-time search results as you type.
User Details Page:

Displays user details, repositories, and followers.
Accessible by clicking on a user in the search results.
Responsive Design:

Optimized for mobile and desktop viewing.
Theming:
Supports light and dark themes.
Theme toggle implemented in the header.

State Management:
Utilizes NgRx for consistent state across the app.

Lazy Loading:
Modules are loaded dynamically to improve performance.

Loading Indicators:
Spinners indicate data loading.

Error Handling:
Interceptors catch and handle API errors.


Animated Transitions:
Smooth page transitions enhance the user experience.

Unit Testing:
Basic unit tests provided for key components.

## Code Structure
src/app: Main application folder.
components: Reusable components.
services: Angular services for API calls and state management.
models: TypeScript models/interfaces.
pages: Components representing pages.
interceptors: HTTP interceptors.
src/assets: Static assets like images and global styles.
src/environments: Environment-specific configuration files.

