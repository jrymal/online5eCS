'use strict';

const PRONOUNS = deepFreeze({
    he:{
        name: "He"
    },
    she:{
        name: "She"
    },
    they: {
        name: "They"
    },
    ze:{
        name: "Ze"
    }
});

const RACES = deepFreeze({
    MountainDwarf:{
        name: "Mountain Dwarf",
        family: "Dwarf",
        attribute:{
           strength: 2,
           constitution: 2
        },
        names:{
            he: ["Adrik", "Alberich","Baern","Barendd","Brottor","Bruenor",
                "Dain","Darrak","Delg","Eberk","Einkil","Fargrim","Flint",
                "Gardain","Harbek","Kildrak","Morgran","Orsik","Oskar",
                "Rangrim","Rurik","Taklinn","Thoradin","Tordek","Traubon",
                "Travok","Ulfgar","Veit","Vondal"],
            she: ["Amber","Artin","Audhild","Bardryn","Dagnal","Diesa","Eldeth",
                "Falkrunn","Finellen","Gunnloda","Gurdis","Helja","Hlin",
                "Kathra","Kristryd","Ilde","Liftrasa","Mardred","Riswynn",
                "Sannl","Torbera","Torgga","Vistra"],
            family: ["Balderk","Battlehammer","Brawnanvil","Dankil","Fireforge",
                "Frostbeard","Gorunn","Holderhek","Ironfist","Loderr","Lutgehr",
                "Rumnaheim","Strakeln","Torunn","Ungart"]
        },
        age:{
            min: 50,
            max: 350
        },
        alignment:{
            society:"lawful",
            morality:"good",
        },
        size:{
            height:{
                base: 48,
                modifier: "2d4",
                max: 60
            },
            weight: {
                base: 130,
                modifier: "2d6"
            },
            simple: "Medium"
        },
        speed: 25,
        features:["Darkvision (60ft)","Speed is not reduced by heavy armor",
            "Resistance to poison","Intelligence(history) checks on stone cutting are considered proficient"],
        proficiency:["Battleaxe","Handaxe","Throwing Hammer","Warhammer","Light Armor","Medium Armor"],
        proficiency_choice:{
            join: "or",
            select: ["Smith's Tools","Brewer's Supplies","Mason's Tools"]
        },
        languages: ["common","dwarvish"]
    },
    HillDwarf:{
        name: "Hill Dwarf",
        family: "Dwarf",
        attribute:{
           wisdom: 1,
           constitution: 2
        },
        names:{
            he: ["Adrik", "Alberich","Baern","Barendd","Brottor","Bruenor",
                "Dain","Darrak","Delg","Eberk","Einkil","Fargrim","Flint",
                "Gardain","Harbek","Kildrak","Morgran","Orsik","Oskar",
                "Rangrim","Rurik","Taklinn","Thoradin","Tordek","Traubon",
                "Travok","Ulfgar","Veit","Vondal"],
            she: ["Amber","Artin","Audhild","Bardryn","Dagnal","Diesa","Eldeth",
                "Falkrunn","Finellen","Gunnloda","Gurdis","Helja","Hlin",
                "Kathra","Kristryd","Ilde","Liftrasa","Mardred","Riswynn",
                "Sannl","Torbera","Torgga","Vistra"],
            family: ["Balderk","Battlehammer","Brawnanvil","Dankil","Fireforge",
                "Frostbeard","Gorunn","Holderhek","Ironfist","Loderr","Lutgehr",
                "Rumnaheim","Strakeln","Torunn","Ungart"]
        },
        age:{
            min: 50,
            max: 350
        },
        alignment:{
            society:"lawful",
            morality:"good",
        },
        size:{
            height:{
                base: 44,
                modifier: "2d4",
                max: 52
            },
            weight: {
                base: 115,
                modifier: "2d6"
            },
            simple: "Medium"
        },
        speed: 25,
        features:["Darkvision (60ft)","Speed is not reduced by heavy armor",
            "Resistance to poison","Intelligence(history) checks on stone cutting are considered proficient"],
        proficiency:["Battleaxe","Handaxe","Throwing Hammer","Warhammer"],
        proficiency_choice:{
            join: "or",
            select: ["Smith's Tools","Brewer's Supplies","Mason's Tools"]
        },
        levelup: {
            hitpoint: 1
        },
        languages: ["common","dwarvish"]
    },
    HighElf:{
        name: "High Elf",
        family: "Elf",
        attribute:{
            dexterity: 2,
            intelligence: 1
        },
        names:{
            he: ["Adran", "Aelar","Aramil","Arannis","Aust","Beiro",
                "Berrian","Carrie","Enialis","Erdan","Erevan","Galinndan","Hadarai",
                "Heian","Himo","Immeral","Ivellios","Laucian","Mindartis",
                "Paelias","Peren","Quarion","Riardon","Rolen","Soveliss",
                "Thamior","Tharivol","Theren","Varis"],
            she: ["Adrie","Althaea","Anastrianna","Andraste","Antinua","Bethrynna","Birel",
                "Caelynn","Drusilia","Enna","Felosial","Ielenia","Jelenneth",
                "Keyleth","Leshanna","Lia","Meriele","Mialee","Shava",
                "Silaqui","Theirastra","Thia","Vadania","Valanthe","Xanaphia"],
            child:["Ara","Bryn","Del","Eryn","Faen","Innil","Lael","Mella",
                "Maill","Naeris","Phann","Rael","Rinn","Sai","Syllin","Thia",
                "Vall"],
            family: ["Amakiir","Amastacia","Galanodel",
                "Holimion","Ilphelkiir",
                "Liadon","Meliamne","Nailo",
                "Siannodel","Xiloscient"]
        },
        age:{
            min: 100,
            max: 750
        },
        alignment:{
            society:"chaotic",
            morality:"good",
        },
        size:{
            height:{
                base: 54,
                modifier: "2d10",
                max: 74
            },
            weight: {
                base: 90,
                modifier: "1d4"
            },
            simple: "Medium"
        },
        speed: 30,
        features:["Darkvision (60ft)","Advantage on saving throws on being charmed",
            "Cannot be put to sleep via magic means","Trance (sleep - 4hrs)"],
        skills:["perception"],
        proficiency:["Longsword","Shortsword","Shortbow","Longbow"],
        languages: ["common","elvish","ANY"],
        level: {
            1 : {
                spells: ["any - wizard"]
            }
        },
    },
    WoodElf:{
        name: "Wood Elf",
        family: "Elf",
        attribute:{
            dexterity: 2,
            wisdom: 1
        },
        names:{
            he: ["Adran", "Aelar","Aramil","Arannis","Aust","Beiro",
                "Berrian","Carrie","Enialis","Erdan","Erevan","Galinndan","Hadarai",
                "Heian","Himo","Immeral","Ivellios","Laucian","Mindartis",
                "Paelias","Peren","Quarion","Riardon","Rolen","Soveliss",
                "Thamior","Tharivol","Theren","Varis"],
            she: ["Adrie","Althaea","Anastrianna","Andraste","Antinua","Bethrynna","Birel",
                "Caelynn","Drusilia","Enna","Felosial","Ielenia","Jelenneth",
                "Keyleth","Leshanna","Lia","Meriele","Mialee","Shava",
                "Silaqui","Theirastra","Thia","Vadania","Valanthe","Xanaphia"],
            child:["Ara","Bryn","Del","Eryn","Faen","Innil","Lael","Mella",
                "Maill","Naeris","Phann","Rael","Rinn","Sai","Syllin","Thia",
                "Vall"],
            family: ["Amakiir","Amastacia","Galanodel",
                "Holimion","Ilphelkiir",
                "Liadon","Meliamne","Nailo",
                "Siannodel","Xiloscient"]
        },
        age:{
            min: 100,
            max: 750
        },
        alignment:{
            society:"chaotic",
            morality:"good",
        },
        size:{
            height:{
                base: 54,
                modifier: "2d10",
                max: 74
            },
            weight: {
                base: 100,
                modifier: "1d4"
            },
            simple: "Medium"
        },
        speed: 35,
        features:["Darkvision (60ft)","Advantage on saving throws on being charmed",
            "Cannot be put to sleep via magic means","Trance (sleep - 4hrs)","Mask of the wild (attempt to hide in natural phenomena)"],
        skills:["perception"],
        proficiency:["Longsword","Shortsword","Shortbow","Longbow"],
        languages: ["common","elvish"]
    },
    Drow:{
        name: "Drow",
        family: "Elf",
        attribute:{
            dexterity: 2,
            charisma: 1
        },
        names:{
            he: ["Adran", "Aelar","Aramil","Arannis","Aust","Beiro",
                "Berrian","Carrie","Enialis","Erdan","Erevan","Galinndan","Hadarai",
                "Heian","Himo","Immeral","Ivellios","Laucian","Mindartis",
                "Paelias","Peren","Quarion","Riardon","Rolen","Soveliss",
                "Thamior","Tharivol","Theren","Varis", "Drizzt"],
            she: ["Adrie","Althaea","Anastrianna","Andraste","Antinua","Bethrynna","Birel",
                "Caelynn","Drusilia","Enna","Felosial","Ielenia","Jelenneth",
                "Keyleth","Leshanna","Lia","Meriele","Mialee","Shava",
                "Silaqui","Theirastra","Thia","Vadania","Valanthe","Xanaphia"],
            child:["Ara","Bryn","Del","Eryn","Faen","Innil","Lael","Mella",
                "Maill","Naeris","Phann","Rael","Rinn","Sai","Syllin","Thia",
                "Vall"],
            family: ["Amakiir","Amastacia","Galanodel",
                "Holimion","Ilphelkiir",
                "Liadon","Meliamne","Nailo",
                "Siannodel","Xiloscient","Do'Urden"]
        },
        age:{
            min: 100,
            max: 750
        },
        alignment:{
            society:"chaotic",
            morality:"evil",
        },
        size:{
            height:{
                base: 53,
                modifier: "2d6",
                max: 65
            },
            weight: {
                base: 75,
                modifier: "1d6"
            },
            simple: "Medium"
        },
        speed: 30,
        features:["Darkvision (120ft)","Advantage on saving throws on being charmed",
            "Cannot be put to sleep via magic means","Trance (sleep - 4hrs)","Sunlight Sensitivity"],
        skills:["perception"],
        proficiency:["Rapier","Shortsword","Handcrossbows"],
        languages: ["common","elvish"],
        level: {
            1 : {
                spells: ["dancing lights"]
            },
            3 : {
                spells: ["Faerie fire"]
            },
            5: {
                spells: ["Darkness"]
            }
        }

    },
    LightfootHalfling:{
        name: "Lightfoot Halfling",
        family: "Halfling",
        attribute:{
            dexterity: 2,
            charisma: 1
        },
        names:{
            he: ["Alton", "Ander","Cade","Corrin","Eldon","Errich",
                "Finnan","Garret","Lindal","Lyle","Merrie","Milo","Osborn",
                "Perrin","Reed","Roscoe","Wellby","Regis"],
            she: ["Andry","Bree","Callie","Cora","Euphemia","Jillian","Kithri",
                "Lavinia","Lidda","Merla","Nedda","Paela","Portia",
                "Seraphina","Shaena","Trym","Vani","Verna"],
            family: ["Brushgather","Goodbarrel","Greenbottle",
                "High-hill","Hightopple","Leagallow","Tealeaf","Thorngage",
                "Tosscobble","Underbough"]
        },
        age:{
            min: 20,
            max: 250
        },
        alignment:{
            society:"lawful",
            morality:"good",
        },
        size:{
            height:{
                base: 31,
                modifier: "2d4",
                max: 39
            },
            weight: {
                base: 35,
                modifier: "1"
            },
            simple: "Small"
        },
        speed: 25,
        features:["Reroll a 1 for attack, ability check, or saving throw",
            "Advantage against being frightened","Can move through spaces occupied by those larger than you","Can hide even if obsured by a creature 1 size larger then you" ],
        languages: ["common","halfling"]
    },
    StoutHalfling:{
        name: "Stout Halfling",
        family: "Halfling",
        attribute:{
            dexterity: 2,
            constitution: 1
        },
        names:{
            he: ["Alton", "Ander","Cade","Corrin","Eldon","Errich",
                "Finnan","Garret","Lindal","Lyle","Merrie","Milo","Osborn",
                "Perrin","Reed","Roscoe","Wellby","Regis"],
            she: ["Andry","Bree","Callie","Cora","Euphemia","Jillian","Kithri",
                "Lavinia","Lidda","Merla","Nedda","Paela","Portia",
                "Seraphina","Shaena","Trym","Vani","Verna"],
            family: ["Brushgather","Goodbarrel","Greenbottle",
                "High-hill","Hightopple","Leagallow","Tealeaf","Thorngage",
                "Tosscobble","Underbough"]
        },
        age:{
            min: 20,
            max: 250
        },
        alignment:{
            society:"lawful",
            morality:"good",
        },
        size:{
            height:{
                base: 31,
                modifier: "2d4",
                max: 39
            },
            weight: {
                base: 35,
                modifier: "1"
            },
            simple: "Small"
        },
        speed: 25,
        features:["Reroll a 1 for attack, ability check, or saving throw",
            "Advantage against being frightened","Can move through spaces occupied by those larger than you",
            "Resistance to poison","Bonus to savng throws against poison"],
        languages: ["common","halfling"]
    },
    Human:{
        name: "Human",
        attribute:{
            strength: 1,
            dexterity: 1,
            constitution: 1,
            intelligence: 1,
            wisdom: 1,
            charisma: 1
        },
        names:{
            he: ["Aseir","Bardeid","Haseid","Khemed","Mehmed","Sudeiman",
                "Zasheir","Darvin","Dorn","Evendur","Gorstag","Grim","Helm",
                "Malark","Morn","Randal","Stedd","Bor","Fodel","Glar","Grigor",
                "Igan","Ivor","Kosef","Mival","Orel","Pavel","Sergor",
                "Ander","Blath","Bran","Frath","Geth","Lander","Luth","Malcer",
                "Stor","Taman","Urth","Aoth","Bareris","Ehput-Ki","Kethoth",
                "Mumed","Ramas","So-Kehur","Thazar-De","Urhur","Borivik",
                "Faurgar","Jandar","Kanithar","Madislak","Ralmevik","Shaumar",
                "Vladislak","An","Chen","Chi","Fai","Jiang","Jun","Lian","Long",
                "Meng","On","Shan","Shui","Wen","Anton","Diero","Marcon",
                "Pieron","Rimardo","Romero","Salazar","Umbero",
                "Jozan", "Regdar", "Kerwyn"],
            she: ["Atala","Ceidil","Hama","Jasmal","Meilil","Seipora",
                "Yashiera","Zasheida","Arveene","Esvele","Jhessail","Kerri",
                "Lureene","Miri","Rowan","Shandri","Tessele","Alethra","Kara",
                "Katernin","Mara","Natali","Olma","Tana","Zora","Amafrey",
                "Betha","Cefrey","Kethra","Mara","Olga","Silifrey","Westra",
                "Arizima","Chathi","Nephis","Nulara","Murithi","Sefris","Thola",
                "Umara","Zolis","Fyevarra","Hulmarra","Immith","Imzel",
                "Navarra","Shevarra","Tammith","Yuldra","Bai","Chao","Jia",
                "Lei","Mei","Qiao","Shui","Tai","Balama","Dona","Faila",
                "Jalana","Luisa","Marta","Quara","Selise","Vonda",
                "Naull"],
            family: ["Basha","Dumein","Jassan","Khalid","Mostana","Pashar",
                "Rein","Amblecrowne","Buckman","Dundragon","Evanwood",
                "Greycastle","Tallstag","Bersk","Chernin","Dotsk","Kulenov",
                "Marsk","Nematsk","Shemov","Starag","Brightwood","Helder",
                "Hornraven","Lackman","Stormwind","Windrivver","Ankhalab",
                "Anskuld","Fezim","Hahpet","Nathandem","Sepret","Uuthrakt",
                "Chergoba","Dyernina","Iltazyara","Murnyethara","Stayanoga",
                "Ulmokina","Chien","Huang","Kao","Kung","Lao","Ling","Mei",
                "Pin","Shin","Sum","Tan","Wan","Agosto","Astorio","Calabra",
                "Domine","Falone","Marivaldi","Piscar","Ramondo"]
        },
        age:{
            min: 16,
            max: 95
        },
        size:{
            height:{
                base: 56,
                modifier: "2d10",
                max: 76
            },
            weight: {
                base: 110,
                modifier: "2d4"
            },
            simple: "Medium"
        },
        speed: 30,
        languages: ["common","ANY"]
    },
    Dragonborn:{
        name: "Dragonborn",
        attribute:{
            strength: 2,
            charisma: 1
        },
        names:{
            he: ["Arjhan","Balasar","Bharash","Donaar","Ghesh","Heskan",
                "Kriv","Medrash","Mehen","Nadarr","Pandjed","Patrin","Rhogar",
                "Shamash","Shedinn","Tarhun","Torinn"],
            she: ["Akra","Biri","Daar","Farideh","Harann","Havilar",
                "Jheri","Kava","Korinn","Mishann","Nala","Perra",
                "Raiann","Sora","Surina","Thava","Uadjit"],
            child:["Climber","Earbender","Leaper","Pious","Shieldbiter","Zealous"],
            family: ["Clethinthtinthiallor","Daardendrian","Delmirev",
                "Drachedandion","Fenkenkabradon","Kepeshkmolik",
                "Kerrhylon","Kimbatuul","Linxakasendlor","Myastan","Nemmonis",
                "Norixius","Ophinshtalor","Prexijandilin","Shestendeliath",
                "Turnuroth","Verthisathurgiesh",
                "Yarjerit"]
        },
        age:{
            min: 15,
            max: 80
        },
        alignment:{
            society:"lawful",
            morality:"good",
        },
        size:{
            height:{
                base: 66,
                modifier: "2d8",
                max: 82
            },
            weight: {
                base: 175,
                modifier: "2d6"
            },
            simple: "Medium"
        },
        speed: 30,
        heritage: {
            black: {
                type: "acid",
                area: "5 x 30 ft. line (Dex save)"
            },
            blue: {
                type: "lightning",
                area: "5 x 30 ft. line (Dex save)"
            },
            brass: {
                type: "fire",
                area: "5 x 30 ft. line (Dex save)"
            },
            bronze: {
                type: "lightning",
                area: "5 x 30 ft. line (Dex save)"
            },
            copper: {
                type: "acid",
                area: "5 x 30 ft. line (Dex save)"
            },
            gold: {
                type: "fire",
                area: "15 ft. cone (Dex save)"
            },
            green: {
                type: "poison",
                area: "15 ft. cone (Con save)"
            },
            red: {
                type: "fire",
                area: "15 ft. cone (Dex save)"
            },
            silver: {
                type: "cold",
                area: "15 ft. cone (Con save)"
            },
            white: {
                type: "cold",
                area: "15 ft. cone (Con save)"
            },
        },
        level:{
            1:{
                feature:["Each creature in area of breath weapon makes saving throw against 8 + Con modifier + proficiency mod. Success 1/2 damage, failure full damage (2d6)", 
                    "Reuse of breath weapon requires a short rest"]
            },
            6:{
                feature:["Breath damage increase to 3d6"]
            },
            11:{
                feature:["Breath damage increase to 4d6"]
            },
            16:{
                feature:["Breath damage increase to 5d6"]
            }
        },

        features:["Resistance to the breath type of your ansestory"],
        languages: ["common","draconic"]
    },
    ForestGnome:{
        name: "Forest Gnome",
        family: "Gnome",
        attribute:{
            dexterity: 1,
            intelligence: 2
        },
        names:{
            he: ["Alston","Alvyn","Boddynock","Brocc","Bergell","Dimble",
                "Eldon","Erky","Fonkin","Frug","Gerbo","Gimble","Glim",
                "Jebeddo","Kellen","Namfoodle","Orryn","Roondar","Seebo",
                "Sindri","Warryn","Wrenn","Zook"],
            she: ["Bimpnottin","Breena","Caramip","Carlin","Donelia","Duvamil",
                "Ella","Ellyjobell","Ellywick","Lilli","Loopmottin","Lorilla",
                "Mardnab","Nissa","Nyx","Oda","Oria","Orla","Roywyn","Shamil",
                "Tana","Waywocket","Zanna"],
            nickname:["Aleslosh","Ashhearth","Badger","Cloak","Doublelock",
                "Filchbatter","Fnipper","Ku","Nim","Oneshoe","Pock",
                "Sparklegem","Stumbleduck"],
            family: ["Beren","Daergel","Folkor","Garrick","Nackle","Murnig",
                "Ningel","Raulnor","Scheppen","Timbers","Turen"]
        },
        age:{
            min: 15,
            max: 500
        },
        alignment:{
            morality:"good",
        },
        size:{
            height:{
                base: 35,
                modifier: "2d4",
                max: 43
            },
            weight: {
                base: 35,
                modifier: "1"
            },
            simple: "Small"
        },
        speed: 25,
        features:["Darkvision (60 ft)","Advantage on Int, Wis, Cha checks against magic","Can communicate simple ideas to Small animals/beasts"],
        level: {
            1 : {
                spells: ["minor illusion"]
            }
        },
        languages: ["common","gnomish"]
    },
    RockGnome:{
        name: "Rock Gnome",
        family: "Gnome",
        attribute:{
            constitution: 1,
            intelligence: 2
        },
        names:{
            he: ["Alston","Alvyn","Boddynock","Brocc","Bergell","Dimble",
                "Eldon","Erky","Fonkin","Frug","Gerbo","Gimble","Glim",
                "Jebeddo","Kellen","Namfoodle","Orryn","Roondar","Seebo",
                "Sindri","Warryn","Wrenn","Zook"],
            she: ["Bimpnottin","Breena","Caramip","Carlin","Donelia","Duvamil",
                "Ella","Ellyjobell","Ellywick","Lilli","Loopmottin","Lorilla",
                "Mardnab","Nissa","Nyx","Oda","Oria","Orla","Roywyn","Shamil",
                "Tana","Waywocket","Zanna"],
            nickname:["Aleslosh","Ashhearth","Badger","Cloak","Doublelock",
                "Filchbatter","Fnipper","Ku","Nim","Oneshoe","Pock",
                "Sparklegem","Stumbleduck"],
            family: ["Beren","Daergel","Folkor","Garrick","Nackle","Murnig",
                "Ningel","Raulnor","Scheppen","Timbers","Turen"]
        },
        age:{
            min: 15,
            max: 500
        },
        alignment:{
            morality:"good",
        },
        size:{
            height:{
                base: 35,
                modifier: "2d4",
                max: 43
            },
            weight: {
                base: 35,
                modifier: "1"
            },
            simple: "Small"
        },
        speed: 25,
        proficiency:["Tinker's Tools"],
        features:["Darkvision (60 ft)","Advantage on Int, Wis, Cha checks against magic",
            "Int (History) checks on magical/alchemical/technological gets 2x the proficiency",
            "Tinker: Create a AC 5 HP 1 device which lives for 24 hr unless maintained Types: Clockwork, Fire starter, Music box"],
        languages: ["common","gnomish"]
    },
    HalfElf:{
        name: "Half Elf",
        attribute:{
            charisma: 2,
            any: 2
        },
        names:{
            he: ["Aseir","Bardeid","Haseid","Khemed","Mehmed","Sudeiman",
                "Zasheir","Darvin","Dorn","Evendur","Gorstag","Grim","Helm",
                "Malark","Morn","Randal","Stedd","Bor","Fodel","Glar","Grigor",
                "Igan","Ivor","Kosef","Mival","Orel","Pavel","Sergor",
                "Ander","Blath","Bran","Frath","Geth","Lander","Luth","Malcer",
                "Stor","Taman","Urth","Aoth","Bareris","Ehput-Ki","Kethoth",
                "Mumed","Ramas","So-Kehur","Thazar-De","Urhur","Borivik",
                "Faurgar","Jandar","Kanithar","Madislak","Ralmevik","Shaumar",
                "Vladislak","An","Chen","Chi","Fai","Jiang","Jun","Lian","Long",
                "Meng","On","Shan","Shui","Wen","Anton","Diero","Marcon",
                "Pieron","Rimardo","Romero","Salazar","Umbero",
                "Jozan", "Regdar", "Kerwyn","Adran", "Aelar","Aramil","Arannis",
                "Aust","Beiro","Berrian","Carrie","Enialis","Erdan","Erevan",
                "Galinndan","Hadarai","Heian","Himo","Immeral","Ivellios",
                "Laucian","Mindartis","Paelias","Peren","Quarion","Riardon",
                "Rolen","Soveliss","Thamior","Tharivol","Theren","Varis"],
            she: ["Atala","Ceidil","Hama","Jasmal","Meilil","Seipora",
                "Yashiera","Zasheida","Arveene","Esvele","Jhessail","Kerri",
                "Lureene","Miri","Rowan","Shandri","Tessele","Alethra","Kara",
                "Katernin","Mara","Natali","Olma","Tana","Zora","Amafrey",
                "Betha","Cefrey","Kethra","Mara","Olga","Silifrey","Westra",
                "Arizima","Chathi","Nephis","Nulara","Murithi","Sefris","Thola",
                "Umara","Zolis","Fyevarra","Hulmarra","Immith","Imzel",
                "Navarra","Shevarra","Tammith","Yuldra","Bai","Chao","Jia",
                "Lei","Mei","Qiao","Shui","Tai","Balama","Dona","Faila",
                "Jalana","Luisa","Marta","Quara","Selise","Vonda",
                "Naull","Adrie","Althaea","Anastrianna","Andraste","Antinua",
                "Bethrynna","Birel","Caelynn","Drusilia","Enna","Felosial",
                "Ielenia","Jelenneth","Keyleth","Leshanna","Lia","Meriele",
                "Mialee","Shava","Silaqui","Theirastra","Thia","Vadania",
                "Valanthe","Xanaphia"],
            family: ["Basha","Dumein","Jassan","Khalid","Mostana","Pashar",
                "Rein","Amblecrowne","Buckman","Dundragon","Evanwood",
                "Greycastle","Tallstag","Bersk","Chernin","Dotsk","Kulenov",
                "Marsk","Nematsk","Shemov","Starag","Brightwood","Helder",
                "Hornraven","Lackman","Stormwind","Windrivver","Ankhalab",
                "Anskuld","Fezim","Hahpet","Nathandem","Sepret","Uuthrakt",
                "Chergoba","Dyernina","Iltazyara","Murnyethara","Stayanoga",
                "Ulmokina","Chien","Huang","Kao","Kung","Lao","Ling","Mei",
                "Pin","Shin","Sum","Tan","Wan","Agosto","Astorio","Calabra",
                "Domine","Falone","Marivaldi","Piscar","Ramondo",
                "Amakiir (Gemflower)","Amastacia (Startflower)","Galanodel (Moonwhisper)",
                "Holimion (Diamonddew)","Ilphelkiir (Gemblossom)",
                "Liadon (Silverfrond)","Meliamne (Oakenheel)","Nailo (Nightbreeze)",
                "Siannodel (Moonbrook)","Xiloscient (Goldpetal)"]
        },
        age:{
            min: 20,
            max: 180
        },
        alignment:{
            society:"chaotic",
        },
        size:{
            height:{
                base: 57,
                modifier: "2d8",
                max: 73
            },
            weight: {
                base: 110,
                modifier: "2d4"
            },
            simple: "Medium"
        },
        speed: 30,
        features:["Darkvision (60 ft)",
            "Advantage on saving throws against being charmed and magic",
            "Magic cannot put you to sleep"],
        skills:["ANY","ANY"],
        languages: ["common","elvish","ANY"]
    },
    HalfOrc:{
        name: "Half Orc",
        attribute:{
            strength: 2,
            constitution: 1
        },
        names:{
            he: ["Dench","Feng","Gell","Henk","Holg","Imsh",
                "Keth","Krusk","Mhurren","Ront","Shump","Thokk"],
            she: ["Baggi","Emen","Engong","Kansif","Myev","Neegia",
                "Ovak","Ownka","Shautha","Sutha","Vola","Volen",
                "Yevelda"]
        },
        age:{
            min: 14,
            max: 75
        },
        alignment:{
            society:"chaotic",
        },
        size:{
            height:{
                base: 58,
                modifier: "2d10",
                max: 78
            },
            weight: {
                base: 140,
                modifier: "2d6"
            },
            simple: "Medium"
        },
        speed: 30,
        features:["Darkvision (60 ft)",
            "If brought to 0 HP but not killed outright, set your HP to 1 (Full rest to reset)",
            "On a critical hit, roll one of your weapon's hit die and add that to your damage delt"],
        skills:["intimidation"],
        languages: ["common","orc"]
    },
    Tiefling:{
        name: "Tiefling",
        attribute:{
            intelligence: 1,
            charisma: 2
        },
        names:{
            he: ["Akmenos","Amnon","Barakas","Damakos","Ekemon","Iados",
                "Kairon","Leucis","Melech","Mordai","Morthos","Pelaios",
                "Skamos","Therai"],
            she: ["Akta","Anakis","Bryseis","Criella","Damaia","Ea",
                "Kallista","Lerissa","Makaria","Nemeia","Orianna","Phelaia",
                "Reita"],
            nickname:["Art","Carrion","Chant","Creed","Despair","Excellence",
                "Fear","Glory","Hope","Ideal","Music","Nowhere","Open","Poetry",
                "Quest","Random","Reverence","Sorrow","Temerity","Torment",
                "Weary"]
        },
        age:{
            min: 14,
            max: 100
        },
        alignment:{
            society:"chaotic",
        },
        size:{
            height:{
                base: 57,
                modifier: "2d8",
                max: 73
            },
            weight: {
                base: 110,
                modifier: "2d4"
            },
            simple: "Medium"
        },
        speed: 30,
        features:["Darkvision (60 ft)",
            "Resistance to fire damage"],
        languages: ["common","infernal"],
        level: {
            1 : {
                spells: ["thaumatergy"]
            },
            3 : {
                spells: ["hellish rebuke"]
            },
            5 : {
                spells: ["darkness"]
            },
        },
    }
});
