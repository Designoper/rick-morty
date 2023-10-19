# Rick and Morty Web App

## Overview

Our web app provides comprehensive information about all characters from the popular show, Rick and Morty. Leveraging the show's API, the app fetches and displays a variety of character data transformed from the original JSON format, including name, picture, status, gender, species, and more.

Users can utilize the search bar to filter characters by name. As users scroll through the results (20 per request), they will find a button to load more, if there's a next page.

## Technology Stack

This project was built using the following technologies:

* Rick and morty API: this API provides extensive data from the Rick and Morty show, including information about characters, locations, and episodes. You can find the API documentation in [https://rickandmortyapi.com/documentation](https://rickandmortyapi.com/documentation).

* HTML: the markup language used to structure the website and link to other resources such as CSS, javascript, and images.

* CSS: the style sheet language that defines the app's aesthetics (colors, padding, layout...) and ensures responsiveness across various devices.

* Javascript: the programming language used for client-side operations. In this app, javascript fetches content from the API, updates the DOM with the received content, modifies the fetch URL based on user input, and gives a button the capability to fetch more characters.

* Git: an open-source version control system used to track changes in the source code during software development. It facilitates collaboration among multiple users.

* Github: a platform for hosting Git repositories. All the code for this web app is stored here.

* Github Pages: a static site hosting service from GitHub that turns repositories into websites, provided the content is front-end technology. Given its free nature and ease of use, and considering that our project's back-end is hosted elsewhere (accessible via the API), GitHub Pages is the ideal choice for hosting a public version of our project.

## How to use

You have 2 ways to try the app:

1. Locally: open a terminal and use the command `git clone https://github.com/Designoper/rick-morty`, then open the index.html file with your browser of choice.

2. Online hosted: Just visit [https://designoper.github.io/rick-morty/](https://designoper.github.io/rick-morty/).

## Why it fulfills the criteria

* API connection: it successfully connects to the API, retrieves data from it and uses its commands (ex: info.next).

* Style and design: CSS is used to style the app and the UI is easy to understand and operate with.

* Responsive: the app can be used on mobile, tablet, or computer. You can also use the developer tools of the browser to test how it looks at different screen sizes.

* Documentation: the documentation for the app is provided in this README file.