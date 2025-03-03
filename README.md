<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <img src="/gaming-mapper-leaflet-ui/public/images/the-gaming-mapper.png" width=75% height=75% display=flex justify-content=center>

  <h3 align="center">The Gaming Mapper</h3>

  <p align="center">
     A react leaflet and maplibre webmap that is a fun history through gaming systems and their games, along with their origin locations.
    <br />
    <a href="https://ksundeen.github.io/the-gaming-mapper.index.html">View Demo</a>

  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](/gaming-mapper-leaflet-ui/public/images/the-gaming-mapper.png)

This project is a fun and interactive learning tool for how to get started with react, react-leaflet, and maplibre for opensource mapping information. We use free FLATICON icons for each gaming console.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

This was built with React-Leaflet, Maplibre, React, Node.js, and the Wikipedia API.

* [![React][React.js]][React-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Follow these instructions to get up and running with a sample application.

### Prerequisites

You'll need Node.js and npm to run react applications. Run:

    npm install npm@latest -g

### Installation

1. Clone the repo

        git clone https://github.com/ksundeen/the-gaming-mapper.git

2. Change to the new repo

        cd ./the-gaming-mapper

3. Install NPM packages

        npm install

4. If you want to add/change icons, add them in the `the-gaming-mapper/gaming-mapper-leaflet-ui/public/icons` folder
5. Add a new geojson file in `the-gaming-mapper/gaming-mapper-leaflet-ui/public/data` folder.
6. Now get to coding!

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Building & Deploying

As this app was created with the create-react-app, you get all the npm scripts to use like `npm run start` and `npm run build`. See `gaming-mapper-leaflet-ui\package.json` under `scripts`.


In the folder `the-gaming-mapper/gaming-mapper-leaflet-ui/` make the transpiled code using Webpack. Use the `the-gaming-mapper/gaming-mapper-leaflet-ui/build` folder to copy all files and directories to a web server to deploy.

    npm run build

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

Naviage on the map and click on each icon to view the popup. 

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Roadmap

- [x] Add Icons for each gaming console
- [x] Use react-leaflet
- [ ] Add overview description on map
- [ ] Create option to switch basemaps to Maplibre
- [ ] Add Slider for years
- [ ] Add filter select options to zoom to various consoles

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## License

Distributed MIT License License. See `LICENSE` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Contact

Kim Sundeen - geoinformatica.consulting@gmail.com

Project Link: [https://github.com/ksundeen/the-gaming-mapper](https://github.com/ksundeen/the-gaming-mapper)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Acknowledgments

World 9 Gaming inspired this data and icons.

* [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
* [React Icons](https://react-icons.github.io/react-icons/search)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/