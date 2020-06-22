# EatLocal
  
> "About 89% percent of households do their primary grocery shopping at supermarkets or supercenters."  

-[USDA Economic Research Service, March 2015](https://www.rootcausecoalition.org/wp-content/uploads/2016/06/Food-Acquisition-and-Purchase-Survey.pdf)  
  
Most Americans, especially those who live in highly populated areas, have access to farmers markets and CSAs. If they had a centralized resource for discovering these local resources, they can eat better while supporting sustainable agricultural practices. Eat Local aims to help solve this problem by providing a map of all the local farmer's markets and CSAs.  

#

### Functionality & MVP  
  
Eat Local will allow users to:

- Browse a map of all CSAs and Farmers Markets in the country
- A search bar to enter their location
- View the CSAs and Farmers Markets as pins on the map and in a list
- Filter the results based on when they are open and what kind of food they sell
- Click on a pin or list item to see more details
  
Additionally the project will include:

- Geo-locator that sets map to nearby location by default
- A mission statement
- A production readme
  
#
  
### Architecture & Tech
  
*Stack:*  
- Environment - Node.js
- Bundler - Webpack
- Map, Geolocation, Places - Google Maps API
- Primary Data - USDA National Farmers Market Directory API
- Supplemental Data - Scraper API (bonus)
- Design inspiration - IBM Carbon
- React for updating the sidebar when map is altered
  
*Structure:*  
- index.html will include most of our app, search bar is just an html form, search bar drop down results is just a hidden div, then we have our map which is an iframe embed, our sidebar menu which is an unordered list, and the static footer.
- index.js entry file to begin compilation
- map.js google maps api logic, which uses jquery dom manipulation to populate the map and map sidebar. When document loads, it uses request.findGeo from request.js to check the users geolocation, sets it to local storage & updates the page using jquery DOM manipulation, then centers the map to that location. It then uses request.getNearbyLocations that queries the database APIs, populates the map with pins and sidebar menu with a list of locations.
- searchbar.js google maps places api logic, imports request.js and makes api calls, then stores results in localStorage and uses jquery to update the map element.
- request.js includes API calls to fetch data and returns promise using ajax jquery.

#

### Timeline

*Day 1:* Build out the html, integrate google maps API

- The basic layout and styling is done
- When entering the website it shows you a map with your current location
- You can enter an address in the search bar and it will move the map to that location
- Address autocomplete options are rendered in a dropdown menu

*Day 2:* Database API integration with google maps

- Based on the location, google maps will now also render nearby farmer's markets
- Changing your location or moving the map will trigger another db query
- Clicking on a pin opens the sidebar menu which displays additional info about db record (farmer's market)

*Day 3:* Scraper API for additional data

- Setup the scraper API to draw additional data for the map from the USDA databases (that don't have an API)
- Finalize the styling and debug

Bonus Features

- Scrape aggregator sites
- Form for requesting another market or CSA dropoff be added to the DB (which means we gotta setup a db, ideally using Prisma + Express)
- Build a web crawler that can continue the search for new and unlisted CSAs/local markets!

#

### Wireframe

<img src="./docs/wireframe.png"/>