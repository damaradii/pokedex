let pokemonData = [];

// Fetch data from mock server
async function fetchPokemon() {
  try {
    const response = await fetch("http://localhost:3000/pokemon");
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
    grass: "bg-green-700 rounded-sm p-1 m-1 w-16 text-center text-white",
    poison: "bg-purple-500 rounded-sm p-1 m-1 w-16 text-center text-white",
    fire: "bg-red-500 rounded-sm p-1 m-1 w-16 text-center text-white",
    flying: "bg-blue-300 rounded-sm p-1 m-1 w-16 text-center text-white",
    water: "bg-blue-500 rounded-sm p-1 m-1 w-16 text-center text-white",
    bug: "bg-green-500 rounded-sm p-1 m-1 w-16 text-center text-white",
    normal: "bg-gray-500 rounded-sm p-1 m-1 w-16 text-center text-white",
  };
  return React.createElement(
    "div",
    {
      className:
        "bg-[white]/20 rounded-md m-1 w-1/4 flex flex-col justify-center items-center font-mono",
    },
    React.createElement("img", {
      className: "",
      src: props.image,
      alt: props.name,
    }),

    React.createElement(
      "h2",
      { className: "text-white text-center text-lg" },
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
            key: t,
            className: typeStyles[t],
          },
          t
        )
      )
    )
  );
}

// List component
function PokemonList() {
  if (pokemonData.length === 0) {
    return React.createElement(
      "p",
      { className: "text-center" },
      "Loading Pokemon data..."
    );
  }

  return React.createElement(
    "div",
    { className: "flex flex-wrap justify-center" },
    pokemonData.map((pokemon) =>
      React.createElement(PokemonCard, {
        key: pokemon.id,
        name: pokemon.name,
        types: pokemon.types,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      })
    )
  );
}

// App component wrap header and list
function App() {
  return React.createElement(
    "div",
    { className: "" },
    React.createElement(
      "header",
      { className: "" },
      React.createElement(
        "h1",
        { className: "text-yellow-400 text-3xl text-center font-bold m-3" },
        "Pokédex"
      )
    ),
    React.createElement(PokemonList, null)
  );
}

// Function to render the app
function renderApp() {
  ReactDOM.render(React.createElement(App), document.getElementById("root"));
}

// Initial render
renderApp();

// Fetch and display the Pokemon data
fetchPokemon();
