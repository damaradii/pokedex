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
  function click() {
    window.location.href = `pokemon-detail.html?id=${props.id}`;
  }

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
      className:
        // "bg-[white]/20 rounded-md m-1 w-1/4 flex flex-col justify-center items-center font-mono",
        "m-2 relative cursor-pointer",
      onClick: click,
    },
    React.createElement(
      "div",
      {
        className:
          "bg-[white]/20 rounded-md flex flex-col justify-center items-center font-mono h-80 w-52",
      },
      React.createElement("img", {
        className: "w-44 transition-transform hover:scale-125 duration-200",
        src: props.image,
        alt: props.name,
      }),
      React.createElement(
        "h2",
        { className: "text-white text-center text-xl" },
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
        id: pokemon.id,
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
      React.createElement("img", {
        src: "https://images.alphacoders.com/603/thumb-1920-603479.png",
        alt: "Background image",
        className: "w-full h-auto bg-cover",
      }),
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
