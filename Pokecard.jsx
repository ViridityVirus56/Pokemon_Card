import React from "react";
import gifBackground from './assets/wired-gradient-1807-boxing-glove-hover-pinch.gif';

const capitalise = (type) => {
  return String(type).charAt(0).toUpperCase() + String(type).slice(1);
};

const Pokecard = ({ id, name, types = [], img, moves = [], desc = [] }) => {
    console.log(name, types, moves)
  const type1 = types[0]; 
  const type2 = types[1] || ""; // Default to an empty string if type2 is undefined
    console.log(type1, type2);

  const backgroundMap = {
    fire: "https://i.gifer.com/origin/d2/d2561722160ad9e3d3e064f4edce865e_w200.gif",
    grass: "https://imgs.search.brave.com/CLkQFoenQbzgTBw0_bF5IAeTfl2qO2L5ONwwCLBa9Ng/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS50ZW5vci5jb20v/clg5OG5xMWJHR0VB/QUFBTS9ncmFzcy13/aW5kLmdpZg.gif",
    fighting: gifBackground,
  };

  const background = backgroundMap[type1] || null;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        fontFamily: "gothmomy",
      }}
    >
      <div
        className="card"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "18%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          border: "20px",
          padding: "40px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "2.5%",
        }}
      >
        <div className="topBar" style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="cardText" style={{ fontSize: "medium", textAlign: "center" }}>ID {id}</div>
          <div className="cardText" style={{ fontSize: "medium", textAlign: "center" }}>{capitalise(name)}</div>
          <div className="cardText" style={{ fontSize: "medium", textAlign: "center" }}>{capitalise(type1)}</div>
        </div>
        <div
          className="pkmnImage"
          style={{ display: "flex", alignItems: "center", justifyContent: "center", paddingTop: "10%" }}
        >
          <img style={{ width: "1400px" }} src={img} alt={name} />
        </div>
        <div className="textpanel" style={{ display: "flex", flexDirection: "column", paddingTop: "10%" }}>
          <div className="cardText" style={{ fontSize: "medium", textAlign: "center" }}>
            {capitalise(moves[0])}<br />
          </div>
          <div className="cardText" style={{ fontSize: "medium", textAlign: "center" }}>
            {desc[0] || "No description"}<br />
          </div>
          <div className="cardText" style={{ fontSize: "medium", textAlign: "center" }}>
            {capitalise(moves[1] || " ")}<br />
          </div>
          <div className="cardText" style={{ fontSize: "medium", textAlign: "center" }}>
            {desc[1] || "No description"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pokecard;
