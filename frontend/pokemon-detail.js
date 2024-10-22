let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon(id) {
  try {
    const response = await fetch(`http://localhost:3000/pokemon/${id}`);
    if (!response.ok) {
      throw new Error("http call failed");
    }
    const data = await response.json();
    pokemonData = data;
    renderApp();
  } catch (error) {
    console.error("Failed to fetch Pokemon data:", error);
    renderApp();
  }
}

// Card component
function PokemonCard(props) {
  const typeStyles = {
    grass: "bg-green-700 rounded-sm p-1 m-1 w-20 text-center text-white",
    poison: "bg-purple-500 rounded-sm p-1 m-1 w-20 text-center text-white",
    fire: "bg-red-500 rounded-sm p-1 m-1 w-20 text-center text-white",
    flying: "bg-blue-300 rounded-sm p-1 m-1 w-20 text-center text-white",
    water: "bg-blue-500 rounded-sm p-1 m-1 w-20 text-center text-white",
    bug: "bg-green-500 rounded-sm p-1 m-1 w-20 text-center text-white",
    normal: "bg-gray-500 rounded-sm p-1 m-1 w-20 text-center text-white",
    electric: "bg-yellow-400 rounded-sm p-1 m-1 w-20 text-center text-white",
    ground: "bg-yellow-900 rounded-sm p-1 m-1 w-20 text-center text-white",
    fairy: "bg-pink-500 rounded-sm p-1 m-1 w-20 text-center text-white",
    fighting: "bg-yellow-600 rounded-sm p-1 m-1 w-20 text-center text-white",
    psychic: "bg-pink-700 rounded-sm p-1 m-1 w-20 text-center text-white",
    rock: "bg-neutral-700 rounded-sm p-1 m-1 w-20 text-center text-white",
    steel: "bg-neutral-400 rounded-sm p-1 m-1 w-20 text-center text-white",
    ghost: "bg-indigo-800 rounded-sm p-1 m-1 w-20 text-center text-white",
    ice: "bg-blue-300 rounded-sm p-1 m-1 w-20 text-center text-white",
    dragon: "bg-blue-900 rounded-sm p-1 m-1 w-20 text-center text-white",
  };

  return React.createElement(
    "div",
    {
      className: "flex flex-col justify-center items-center font-mono h-full",
    },
    React.createElement("img", {
      className: "w-60",
      src: props.image,
      alt: props.name,
    }),
    React.createElement(
      "h1",
      { className: "text-white text-center text-4xl" },
      null,
      props.name
    ),
    React.createElement(
      "div",
      { className: "flex" },
      React.createElement("p"),
      props.types.map((t) =>
        React.createElement(
          "span",
          {
            id: t,
            className: typeStyles[t],
          },
          t
        )
      )
    ),
    React.createElement(
      "p",
      { className: "text-white mt-3" },
      null,
      `Abilities: ${props.abilities}`
    ),
    React.createElement(
      "p",
      { className: "text-white mt-3 " },
      null,
      `Height: ${props.height} m`
    ),
    React.createElement(
      "p",
      { className: "text-white mt-3" },
      null,
      `Weight: ${props.weight} kg`
    ),
    React.createElement("audio", {
      controls: true,
      src: props.cries1,
      className: "m-3",
    }),
    React.createElement("audio", {
      controls: true,
      src: props.cries2,
      className: "mb-3",
    })
  );
}

function PokemonList() {
  if (!pokemonData) {
    return React.createElement(
      "p",
      { className: "text-center" },
      "Loading Pokémon data..."
    );
  }
  return React.createElement(
    "div",
    { className: "flex justify-center" },
    React.createElement(PokemonCard, {
      name: pokemonData.name,
      types: pokemonData.types,
      image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonData.id}.png`,
      abilities: pokemonData.abilities,
      height: pokemonData.height,
      weight: pokemonData.weight,
      cries1: pokemonData.cries.latest,
      cries2: pokemonData.cries.legacy,
    })
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "" },
    React.createElement("header", { className: "" }),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

const params = new URLSearchParams(window.location.search);
const pokemonId = params.get("id");
// Fetch and display the Pokemon data
fetchPokemon(pokemonId);
