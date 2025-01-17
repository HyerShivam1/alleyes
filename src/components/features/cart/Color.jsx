/* eslint-disable react/prop-types */
const Color = ({ colors, onClick, selectColor }) => {
  const getColorStyle = (colorName) => {
    const predefinedColors = {
      alabaster: "bg-rose-50",
      algaeGreen: "bg-green-900",
      almond: "bg-amber-500",
      almondBrown: "bg-brown-700",
      amaranth: "bg-fuchsia-700",
      amber: "bg-amber-400",
      amberYellow: "bg-yellow-700",
      amethyst: "bg-purple-700",
      amethystPurple: "bg-purple-600",
      appleGreen: "bg-green-800",
      apricot: "bg-orange-100",
      aquaBlue: "bg-teal-800",
      aquamarine: "bg-teal-200",
      aquamarineGreen: "bg-teal-700",
      ash: "bg-gray-400",
      ashGray: "bg-gray-500",
      auburn: "bg-red-800",
      aurora: "bg-pink-700",
      avocado: "bg-green-900",
      azure: "bg-blue-200",
      azureBlue: "bg-blue-400",
      babyBlue: "bg-blue-100",
      barley: "bg-yellow-800",
      basil: "bg-green-700",
      beige: "bg-yellow-200",
      blackberry: "bg-purple-800",
      blackberryPurple: "bg-purple-600",
      black: "bg-black",
      blackCherry: "bg-red-800",
      blush: "bg-rose-600",
      blue: "bg-blue-500",
      blueBerry: "bg-blueberry-500",
      blueGray: "bg-blue-gray-500",
      blueGreen: "bg-blue-green-500",
      blueMoon: "bg-blue-800",
      blueStone: "bg-blue-600",
      blueViolet: "bg-blue-violet-500",
      blueberryPurple: "bg-indigo-400",
      bonfire: "bg-orange-800",
      bubblegum: "bg-pink-600",
      burgundyRed: "bg-red-500",
      brown: "bg-amber-700",
      brownSugar: "bg-brown-600",
      bronzeGold: "bg-yellow-800",
      buff: "bg-amber-200",
      calypsoBlue: "bg-teal-800",
      cantaloupe: "bg-orange-500",
      caramel: "bg-amber-500",
      celadon: "bg-green-500",
      celeste: "bg-blue-400",
      champagne: "bg-yellow-100",
      charcoal: "bg-gray-800",
      charcoalGray: "bg-gray-700",
      cherry: "bg-red-700",
      cherryRed: "bg-red-700",
      chestnut: "bg-brown-500",
      chocolate: "bg-amber-800",
      cinnamon: "bg-red-800",
      cinnamonBrown: "bg-brown-500",
      claret: "bg-red-900",
      cloud: "bg-gray-200",
      cobalt: "bg-blue-700",
      copper: "bg-orange-700",
      coral: "bg-rose-300",
      coralPink: "bg-rose-400",
      cosmicPurple: "bg-purple-700",
      cream: "bg-gray-100",
      creamyYellow: "bg-yellow-200",
      crimson: "bg-red-600",
      daffodilYellow: "bg-yellow-500",
      desert: "bg-orange-900",
      denim: "bg-blue-800",
      dusk: "bg-purple-600",
      ebony: "bg-black",
      emerald: "bg-emerald-500",
      evergreen: "bg-green-600",
      fawn: "bg-brown-400",
      firebrick: "bg-red-800",
      firefly: "bg-yellow-500",
      fog: "bg-gray-300",
      forestBrown: "bg-brown-400",
      forestGreen: "bg-green-700",
      gold: "bg-yellow-300",
      goldfish: "bg-yellow-400",
      goldenRod: "bg-yellow-700",
      grapefruit: "bg-orange-600",
      grassGreen: "bg-green-400",
      green: "bg-green-500",
      greenMist: "bg-teal-500",
      greenTea: "bg-green-700",
      honey: "bg-yellow-200",
      honeyBrown: "bg-brown-300",
      honeydew: "bg-green-50",
      hotPink: "bg-pink-500",
      hotStone: "bg-gray-600",
      imperialRed: "bg-red-700",
      ivory: "bg-gray-100",
      jadeGreen: "bg-green-300",
      javaBrown: "bg-brown-800",
      jungleGreen: "bg-green-600",
      khaki: "bg-yellow-600",
      lavender: "bg-purple-200",
      lavenderBlush: "bg-purple-300",
      lemon: "bg-yellow-500",
      lemonChiffon: "bg-yellow-600",
      licorice: "bg-black",
      lightBlue: "bg-blue-200",
      lightCoral: "bg-rose-200",
      lightGoldenRodYellow: "bg-yellow-100",
      lightPink: "bg-pink-200",
      lightSalmon: "bg-rose-300",
      lightSeaGreen: "bg-teal-300",
      lightSteelBlue: "bg-sky-200",
      lilac: "bg-purple-300",
      lime: "bg-lime-400",
      limeGreen: "bg-lime-500",
      limeYellow: "bg-yellow-400",
      limeSorbet: "bg-lime-600",
      lilacGray: "bg-purple-500",
      magenta: "bg-fuchsia-400",
      maple: "bg-red-500",
      midnightBlue: "bg-blue-700",
      midnightSky: "bg-blue-900",
      mint: "bg-teal-300",
      mintCream: "bg-gray-50",
      mintGreen: "bg-teal-200",
      mulberry: "bg-purple-500",
      navy: "bg-blue-900",
      navyBlue: "bg-blue-900",
      nectarine: "bg-orange-400",
      nightfallBlue: "bg-blue-700",
      olive: "bg-lime-800",
      oliveGreen: "bg-green-500",
      onyx: "bg-gray-800",
      orchid: "bg-fuchsia-300",
      orchidPink: "bg-fuchsia-600",
      papaya: "bg-orange-400",
      papayaWhip: "bg-orange-50",
      peach: "bg-orange-300",
      peachMist: "bg-orange-300",
      peachPuff: "bg-orange-200",
      periwinkle: "bg-indigo-300",
      pistachio: "bg-green-400",
      plum: "bg-purple-600",
      pomegranate: "bg-red-600",
      powderBlue: "bg-blue-300",
      poppyRed: "bg-red-600",
      quicksilver: "bg-gray-600",
      raspberry: "bg-pink-500",
      red: "bg-red-500",
      rose: "bg-rose-500",
      rosewood: "bg-rose-600",
      royalBlue: "bg-blue-600",
      ruby: "bg-red-700",
      saffron: "bg-yellow-600",
      sageGreen: "bg-green-700",
      salmon: "bg-rose-400",
      salmonPink: "bg-rose-200",
      sapphire: "bg-blue-600",
      scarlet: "bg-red-600",
      seagreen: "bg-teal-600",
      seashellPink: "bg-rose-50",
      sienna: "bg-orange-800",
      silver: "bg-gray-300",
      snow: "bg-gray-100",
      snowWhite: "bg-white",
      softSand: "bg-yellow-100",
      springGreen: "bg-green-400",
      stone: "bg-stone-500",
      sunset: "bg-red-500",
      tangerine: "bg-orange-400",
      tangerineYellow: "bg-yellow-500",
      teal: "bg-teal-500",
      tealMist: "bg-teal-400",
      terracotta: "bg-orange-800",
      topaz: "bg-yellow-300",
      turquoise: "bg-teal-400",
      turquoiseBlue: "bg-teal-600",
      ultraviolet: "bg-purple-600",
      vanilla: "bg-yellow-100",
      veridian: "bg-green-800",
      vividAuburn: "bg-red-600",
      wheat: "bg-amber-200",
      wheatBread: "bg-amber-300",
      white: "bg-white",
      wildBerry: "bg-purple-700",
      wildHoney: "bg-orange-200",
      wine: "bg-purple-800",
      yellow: "bg-yellow-400",
      yellowGreen: "bg-lime-500",
      zaffre: "bg-blue-900",
      zinnia: "bg-orange-600",
    };
    return predefinedColors[colorName] || "bg-gray-200";
  };

  return (
    <div className="flex gap-2 pt-4">
      {colors.map((color, idx) => (
        <div
          key={idx}
          onClick={() => onClick(color)} // Trigger the parent handler
          className={`w-10 h-10 rounded-full border cursor-pointer hover:opacity-80 ${
            selectColor === color
              ? "border-white border-2 ring-2 ring-black"
              : ""
          } ${getColorStyle(color)}`}
        ></div>
      ))}
    </div>
  );
};

export default Color;
