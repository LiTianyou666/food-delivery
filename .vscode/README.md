# Food Delivery Frontend Project
## Tech Stack
Pure native HTML / CSS / JavaScript, no frontend frameworks.

## Project Structure
├─ index.html Application entry point
├─ README.md Project documentation
├─ css/
│ └─ style.css Global unified styles (no inline style)
└─ js/
├─ api/
│ └─ api.js Centralized API request layer
├─ components/ Reusable UI components
│ ├─ Loader.js
│ ├─ ErrorMessage.js
│ ├─ DishCard.js
│ ├─ CartItem.js
│ ├─ OrderCard.js
│ └─ Pagination.js
├─ pages/ All page logic files
├─ state/
│ └─ store.js Single source of truth global state
└─ utils/ Utility functions
├─ validator.js Form validation rules
├─ helpers.js XSS escape, price & date formatter
└─ mask.js Phone input mask (+7 (xxx) xxx-xx-xx)

## Client-side Routing (Hash Router, refresh supported)
- `/`                Dish menu homepage
- `/login`           Login page
- `/register`        Register page
- `/profile`         User profile page
- `/cart`            Shopping cart page
- `/checkout`        Order checkout page
- `/orders`          All user orders list
- `/item/{id}`       Single dish detail page
- `/order/{id}`      Single order detail page

## Global State Management
All auth data, dish filters, pagination params and cart data are stored in `store.js` as single source of truth, no duplicated data stored in page variables or URL.

## API Layer
All HTTP requests are wrapped in unified api module, auto inject bearer token for authorized requests, unified error catching.

## Core Requirements Implemented (Match Teacher Checklist)
1. Split large HTML template into separate reusable components
2. Each component stored in independent file, not one single component file
3. Single global state source, no data duplication
4. Central auth protection inside router, no repeated login check per page
5. Full client form validation: email, password, name, phone, birthdate, address, required fields
6. Real phone input mask: `+7 (xxx) xxx-xx-xx`
7. All API requests handle 3 states: Loading / Empty data / Error message
8. XSS protection: all dynamic text escaped before render, no raw innerHTML injection
9. Shared utility functions for date, price formatting & error processing, eliminate duplicate code
10. All styles moved to external CSS file, remove all inline `style=""`
11. Client-side routing works correctly after page refresh
12. Complete README document with structure, routing and startup guide

## How to Run
1. Open project root folder with VS Code
2. Install Live Server extension and launch server
3. Open local address in browser to use application