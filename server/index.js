const express = require("express");
const hbs = require("hbs");
const path = require("path");
const presidentsList = require("../data/presidents.json");
const isEmptyObj = require("./utils/isEmptyObj");

const app = express();

// Define paths for Express Config
const viewsPath = path.join(__dirname, "../client/views");
const imagesPath = path.join(__dirname, "../data/images");

// Use static files
app.use("/images", express.static(imagesPath));

// Set up hanldebars view engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);

// Route Handlers
app.get("/", (req, res) => {
  return res.render("index");
});

app.get("/presidents", (req, res) => {
  const noQuery = isEmptyObj(req.query);

  // NO QUERY
  if (noQuery) {
    return res.send({
      error: "Please provide a valid query",
    });
  }

  // RESULT QUERIES
  if ("result" in req.query) {
    if (req.query.result === "all") {
      // 1) Filter presidents by party
      if ("party" in req.query && req.query.party) {
        filteredList = presidentsList.filter((president) => {
          return president.party.toLowerCase() === req.query.party.toLowerCase();
        });
        return res.send({
          presidents: filteredList,
        });
      }
      // 2) Filter presidents by election year range
      if ("election" in req.query && req.query.election) {
        const election = req.query.election.split(",");
        const start = parseInt(election[0]);
        const end = parseInt(election[1]);

        // Filter all whose election was in between the given range
        filteredList = presidentsList.filter((president) => {
          const elected = president.election[0] || president.elected[1];
          return elected >= start && elected <= end;
        });
        return res.send({
          presidents: filteredList,
        });
      }
      // 3) Send all presidents
      return res.send({
        presidents: presidentsList,
      });
    }
    // 4) Send a random president
    if (req.query.result === "random") {
      const randomIndex = Math.floor(Math.random() * (presidentsList.length - 1));
      return res.send({
        president: presidentsList[randomIndex],
      });
    }
  }

  // SEARCH QUERIES
  if ("search" in req.query) {
    const searchName = req.query.search;
    // Search for all presidents who has got the searchName inside their name property
    const searchResults = presidentsList.filter((president) => {
      return president.name.toLowerCase().includes(searchName);
    });
    return res.send({
      presidents: searchResults,
    });
  }

  // NO DATA FOUND
  res.send({
    error: "Couldn't find any data",
  });
});

app.listen("3000", () => console.log("Server up and running on port 3000"));
