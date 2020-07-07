---
title: Tebetebe Routing Analysis
slug: tebetebe
url: /proj/tebetebe/
image: ./img/tebetebe.jpg
caption: "Sko Buffs"
date: 2019-09-01
tags: ["python", "openstreetmap", "osrm"]

display: true

blurb: "Python API to compile, serve, and compare routing scenarios with Open Source Routing Machine and OpenStreetMap data. Unlock accessibility and transportation insight with a full open source stack!" 
---

Routing analysis is a critically useful tool in geospatial analysis, enabling an understanding of transportation networks, route planning, population accessibility, and more.

However, while possible with open source software, the existing routing analysis implementations lacked robustness and ease of use for the average end-user to perform various types of custom routing analysis.

While assisting with the eSwatini National Needs Assessment, I witnessed this gap in available software and developed [tebetebe](https://github.com/geoDavey/tebetebe), a python package to easily perform custom routing analysis.

[**Click here to see my presentation on tebetebe, given at State of the Map 2019 in Heidelberg, Germany**](https://youtu.be/B6bzW-V0zW4)

Here are a list of tebetebe's features:

# **1. Built around OSRM**

*tebetebe* isn't a routing engine itself; it is a routing analysis framework built around the [Open Source Routing Machine (OSRM)](http://project-osrm.org), a well-aged and robust routing engine supported by a large community.

As tebetebe is built around OSRM, it inherits all of its advanced optimization and features, such as easily readable LUA routing profiles, in-memory edge weight updates, support for raster friction maps, and more.

# **2. Easily compiled, modified, and queried routing scenarios**

tebetebe is designed to make it trivial for a user to spin up a routing "Scenario"---a combination of an OSM dataset and routing profile--- to run analysis and to compare one scenario to another.

Under the hood, tebetebe manages the scenario compilation and associated file operations, and provides a context manager to manage the execution of the HTTP server and returns an API to query that server.

Furthermore, tebetebe provides methods for downloading live data from the OSM database to be used in routing analysis, using the Overpass API. This enables users to dynamically download route networks, origins and destination points, allowing for updatable and reproducible analysis.

[Check out the documentation for some examples](https://geoDavey.github.io/tebetebe/)!

# **3. Plugin Support**

tebetebe provides a low-level API into the routing engine, which can be incorporated into a larger analysis scheme. Included in the package are Route Comparison and Accessibility Isochrone modules as an example.

# **Future Plans**

* Implement shared memory to allow route network manipulation without recompilation
* Incorporate Osmium filters before compilation to programically modify road network
* Parallelization via asynchronous HTTP requests to increase performance 
* Remove python-osrm dependence to streamline communication with HTTP API
* QGIS plugin to bring routing analysis to more users

**Other links:**

* [tebetebe](https://github.com/geoDavey/tebetebe/) on GitHub
* [tebetebe documentation](https://geoDavey.github.io/tebetebe/)
