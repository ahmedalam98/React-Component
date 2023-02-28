import React from "react";
import "./Pokecard.css";

const POKE_API = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/`;

function idPadding(id) {
  return id.toString().padStart(3, "0");
}

class Pokecard extends React.Component {
  render() {
    const props = this.props;
    let imgSrc = `${POKE_API}${idPadding(this.props.id)}.png`;

    return (
      <div className="Pokecard">
        <h4 className="Pokecard-title">{props.name}</h4>
        <div className="Pokecard-image">
          <img src={imgSrc} alt={props.name} />
        </div>
        <div className="Pokecard-data">
          <p className="Pokecard-data">Type: {props.type}</p>
          <p className="Pokecard-data">EXP: {props.exp}</p>
        </div>
      </div>
    );
  }
}

export default Pokecard;
