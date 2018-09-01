'use strict';

const SKIN_COLOR = deepFreeze({
  "a": {
    "color": "#EEF0F3",
    "name": "Athens Gray"
  },
  "b":{
    "color": "#EEEEE8",
    "name": "Cararra"
  },
  "c":{
    "color": "#F4F2EE",
    "name": "Pampas"
  },
  "d":{
    "color": "#FAFDE4",
    "name": "Hint of Yellow"
  },
  "e":{
    "color": "#FDF5E6",
    "name": "Old Lace"
  },
  "f":{
    "color": "#FAF3F0",
    "name": "Fantasy"
  },
  "g":{
    "color": "#F3E9E5",
    "name": "Dawn Pink"
  },
  "h":{
    "color": "#F8F6F1",
    "name": "Spring Wood"
  },
  "i":{
    "color": "#FCFBF3",
    "name": "Bianca"
  },
  "j":{
    "color": "#FAF0E6",
    "name": "Linen"
  },
  "k":{
    "color": "#FEF8E2",
    "name": "Solitaire"
  },
  "l":{
    "color": "#FFF9E2",
    "name": "Gin Fizz"
  },
  "m":{
    "color": "#F4EBD3",
    "name": "Janna"
  },
  "n":{
    "color": "#F1EEC1",
    "name": "Mint Julep"
  },
  "o":{
    "color": "#EEE3AD",
    "name": "Double Colonial White"
  },
  "p":{
    "color": "#E4D69B",
    "name": "Zombie"
  },
  "q":{
    "color": "#F0E68C",
    "name": "Khaki"
  },
  "r":{
    "color": "#EDCDAB",
    "name": "Pancho"
  },
  "s":{
    "color": "#EEDC82",
    "name": "Flax"
  },
  "t":{
    "color": "#E1BC64",
    "name": "Equator"
  },
  "u":{
    "color": "#E1BC64",
    "name": "Equator"
  },
  "v":{
    "color": "#E0B974",
    "name": "Harvest Gold"
  },
  "w":{
    "color": "#E0B974",
    "name": "Harvest Gold"
  },
  "x":{
    "color": "#C8B568",
    "name": "Laser"
  },
  "y":{
    "color": "#B78E5C",
    "name": "Muddy Waters"
  },
  "z":{
    "color": "#A26645",
    "name": "Cape Palliser"
  },
  "aa":{
    "color": "#8C5738",
    "name": "Potters Clay"
  },
  "ab":{
    "color": "#724A2F",
    "name": "Old Copper"
  },
  "ac":{
    "color": "#5B3013",
    "name": "Jambalaya"
  },
  "ad":{
    "color": "#71291D",
    "name": "Metallic Copper"
  },
  "ae":{
    "color": "#5F3D26",
    "name": "Irish Coffee"
  },
  "af":{
    "color": "#4C3024",
    "name": "Saddle"
  },
  "ag":{
    "color": "#3E1C14",
    "name": "Cedar"
  },
  "ah":{
    "color": "#33292F",
    "name": "Thunder"
  },
  "ai":{
    "color": "#161928",
    "name": "Mirage"
  }
});


const EYE_COLOR  = deepFreeze({
  "a":{            
    "color": "LightBlue",
    "name": "Light Blue"
  },
  "b":{            
    "color": "Blue",
    "name": "Blue"
  },
  "c":{            
    "color": "LightGrey",
    "name": "Light Grey"
  },
  "d":{            
    "color": "DarkGrey",
    "name": "Dark Grey"
  },
  "e":{            
    "color": "Green",
    "name": "Green"
  },
  "f":{            
    "color": "DarkSeaGreen",
    "name": "Green-Brown"
  },
  "g":{            
    "color": "Maroon",
    "name": "Hazel"
  },
  "h":{            
    "color": "Chocolate",
    "name": "Light Brown"
  },
  "i":{            
    "color": "Brown",
    "name": "Brown"
  },
  "j":{            
    "color": "SaddleBrown",
    "name": "Dark Brown"
  },
  "k":{            
    "color": "Black",
    "name": "Black-Brown"
  }
});

const HAIR_COLOR = deepFreeze({
  "a":{            
    "color": "Black",
    "name": "Black"
  },
  "b":{            
    "color": "Maroon",
    "name": "Brunette"
  },
  "c":{            
    "color": "SaddleBrown",
    "name": "Dark Brown"
  },
  "d":{            
    "color": "Brown",
    "name": "Medium Brown"
  },
  "e":{            
    "color": "Chocolate",
    "name": "Light Brown"
  },
  "f":{            
    "color": "SandyBrown",
    "name": "Chestnut"
  },
  "g":{            
    "color": "iPeachPuff",
    "name": "Strawberry Blond"
  },
  "h":{            
    "color": "Gold",
    "name": "Blond"
  },
  "i":{            
    "color": "FireBrick",
    "name": "Auburn"
  },
  "j":{            
    "color": "GoldenRod",
    "name": "Copper"
  },
  "k":{            
    "color": "Crimson",
    "name": "Ginger"
  },
  "l":{            
    "color": "DarkRed",
    "name": "Titian"
  },
  "m":{            
    "color": "Silver",
    "name": "Grey"
  },
  "n":{            
    "color": "Gainsboro",
    "name": "White"
  },
  "o":{            
    "color": "DodgerBlue",
    "name": "Blue"
  }

}); 
