'use strict';

const RACES = {
    Dwarf:{
        name: "Dwarf",
        family: "Dwarf",
        attribute:{
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
            f:"lawful",
            f:"good",
        },
        size:{
            height:{
                min: 4,
                max: 5
            },
            weight: 150,
            simple: "medium"
        },
        speed: 25,
        features:["Darkvision (60ft)","Speed is not reduced by heavy armor",
            "Resistance to poison","Intelligence(history) checks on stone cutting are considered proficient"],
        proficiency:["battleaxe","handaxe","throwing hammer","warhammer"],
        proficiency_choice:{
            join: "or",
            select: ["smith's tools","brewer's supplies","mason's tools"]
        },
        languages: ["Common","Dwarfish"]
    },
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
            f:"lawful",
            f:"good",
        },
        size:{
            height:{
                min: 4,
                max: 5
            },
            weight: 150,
            simple: "medium"
        },
        speed: 25,
        features:["Darkvision (60ft)","Speed is not reduced by heavy armor",
            "Resistance to poison","Intelligence(history) checks on stone cutting are considered proficient"],
        proficiency:["battleaxe","handaxe","throwing hammer","warhammer","light armor","medium armor"],
        proficiency_choice:{
            join: "or",
            select: ["smith's tools","brewer's supplies","mason's tools"]
        },
        languages: ["Common","Dwarfish"]
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
            f:"lawful",
            f:"good",
        },
        size:{
            height:{
                min: 4,
                max: 5
            },
            weight: 150,
            simple: "medium"
        },
        speed: 25,
        features:["Darkvision (60ft)","Speed is not reduced by heavy armor",
            "Resistance to poison","Intelligence(history) checks on stone cutting are considered proficient"],
        proficiency:["battleaxe","handaxe","throwing hammer","warhammer"],
        proficiency_choice:{
            join: "or",
            select: ["smith's tools","brewer's supplies","mason's tools"]
        },
        levelup: {
            hitpoint: 1
        },
        languages: ["Common","Dwarfish"]
    },
    Elf:{
        name: "Elf",
        family: "Elf",
        attribute:{
            dexterity: 2,
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
            family: ["Amakiir (Gemflower)","Amastacia (Startflower)","Galanodel (Moonwhisper)",
                "Holimion (Diamonddew)","Ilphelkiir (Gemblossom)",
                "Liadon (Silverfrond)","Meliamne (Oakenheel)","Nailo (Nightbreeze)",
                "Siannodel (Moonbrook)","Xiloscient (Goldpetal)"]
        },
        age:{
            min: 100,
            max: 750
        },
        alignment:{
            f:"chaotic",
            f:"good",
        },
        size:{
            height:{
                min: 4,
                max: 6
            },
            weight: 150,
            simple: "medium"
        },
        speed: 30,
        features:["Darkvision (60ft)","Advantage on saving throws on being charmed",
            "Cannot be put to sleep via magic means","Trance (sleep - 4hrs)"],
        proficiency_skill:["Perception"],
        languages: ["Common","Elvish"]
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
            family: ["Amakiir (Gemflower)","Amastacia (Startflower)","Galanodel (Moonwhisper)",
                "Holimion (Diamonddew)","Ilphelkiir (Gemblossom)",
                "Liadon (Silverfrond)","Meliamne (Oakenheel)","Nailo (Nightbreeze)",
                "Siannodel (Moonbrook)","Xiloscient (Goldpetal)"]
        },
        age:{
            min: 100,
            max: 750
        },
        alignment:{
            f:"chaotic",
            f:"good",
        },
        size:{
            height:{
                min: 4,
                max: 6
            },
            weight: 150,
            simple: "medium"
        },
        speed: 30,
        features:["Darkvision (60ft)","Advantage on saving throws on being charmed",
            "Cannot be put to sleep via magic means","Trance (sppel - 4hrs)"],
        proficiency_skill:["Perception"],
        proficiency:["Longsword","Shortsword","Shortbow","Longbow"],
        languages: ["Common","Elvish","any"],
        level: {
            1 : {
                spell: ["any - wizard"]
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
            family: ["Amakiir (Gemflower)","Amastacia (Startflower)","Galanodel (Moonwhisper)",
                "Holimion (Diamonddew)","Ilphelkiir (Gemblossom)",
                "Liadon (Silverfrond)","Meliamne (Oakenheel)","Nailo (Nightbreeze)",
                "Siannodel (Moonbrook)","Xiloscient (Goldpetal)"]
        },
        age:{
            min: 100,
            max: 750
        },
        alignment:{
            f:"chaotic",
            f:"good",
        },
        size:{
            height:{
                min: 4,
                max: 6
            },
            weight: 150,
            simple: "medium"
        },
        speed: 35,
        features:["Darkvision (60ft)","Advantage on saving throws on being charmed",
            "Cannot be put to sleep via magic means","Trance (sppel - 4hrs)","Mask of the wild (attempt to hide in natural phenomena)"],
        proficiency_skill:["Perception"],
        proficiency:["Longsword","Shortsword","Shortbow","Longbow"],
        languages: ["Common","Elvish"]
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
            family: ["Amakiir (Gemflower)","Amastacia (Startflower)","Galanodel (Moonwhisper)",
                "Holimion (Diamonddew)","Ilphelkiir (Gemblossom)",
                "Liadon (Silverfrond)","Meliamne (Oakenheel)","Nailo (Nightbreeze)",
                "Siannodel (Moonbrook)","Xiloscient (Goldpetal)","Do'Urden"]
        },
        age:{
            min: 100,
            max: 750
        },
        alignment:{
            f:"chaotic",
            f:"evil",
        },
        size:{
            height:{
                min: 4,
                max: 6
            },
            weight: 150,
            simple: "medium"
        },
        speed: 30,
        features:["Darkvision (120ft)","Advantage on saving throws on being charmed",
            "Cannot be put to sleep via magic means","Trance (sppel - 4hrs)","Sunlight Sensitivity"],
        proficiency_skill:["Perception"],
        proficiency:["Rapier","Shortsword","iHandcrossbows"],
        languages: ["Common","Elvish"],
        level: {
            1 : {
                spell: ["dancing lights"]
            },
            3 : {
                spell: ["Faerie fire"]
            },
            5: {
                spell: ["Darkness"]
            }
        }

    },
    Halfling:{
        name: "Halfling",
        family: "Halfling",
        attribute:{
            dexterity: 2,
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
                "Tosscobble","iUnderbough"]
        },
        age:{
            min: 20,
            max: 250
        },
        alignment:{
            f:"lawful",
            f:"good",
        },
        size:{
            height:{
                min: 3,
                max: 3
            },
            weight: 40,
            simple: "small"
        },
        speed: 25,
        features:["Reroll a 1 for attack, ability check, or saving throw",
            "Advantage against being frightened","Can move through spaces occupied by those larger than you"],
        languages: ["Common","Halfling"]
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
                "Tosscobble","iUnderbough"]
        },
        age:{
            min: 20,
            max: 250
        },
        alignment:{
            f:"lawful",
            f:"good",
        },
        size:{
            height:{
                min: 3,
                max: 3
            },
            weight: 40,
            simple: "small"
        },
        speed: 25,
        features:["Reroll a 1 for attack, ability check, or saving throw",
            "Advantage against being frightened","Can move through spaces occupied by those larger than you","Can hide even if obsured by a creature 1 size larger then you" ],
        languages: ["Common","Halfling"]
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
                "Tosscobble","iUnderbough"]
        },
        age:{
            min: 20,
            max: 250
        },
        alignment:{
            f:"lawful",
            f:"good",
        },
        size:{
            height:{
                min: 3,
                max: 3
            },
            weight: 40,
            simple: "small"
        },
        speed: 25,
        features:["Reroll a 1 for attack, ability check, or saving throw",
            "Advantage against being frightened","Can move through spaces occupied by those larger than you",
            "Resistance to poison","Bonus to savng throws against poison"],
        languages: ["Common","Halfling"]
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
                "Marsk","Nematsk","Shemov","Starag","iBrightwood","Helder",
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
                min: 5,
                max: 6
            },
            weight: 170,
            simple: "medium"
        },
        speed: 30,
        languages: ["Common","any"]
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
            f:"lawful",
            f:"good",
        },
        size:{
            height:{
                min: 6,
                max: 6
            },
            weight: 250,
            simple: "medium"
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
        languages: ["Common","Draconic"]
    },
    Gnome:{
        name: "Gnome",
        family: "Gnome",
        attribute:{
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
            f:"good",
        },
        size:{
            height:{
                min: 3,
                max: 4
            },
            weight: 40,
            simple: "small"
        },
        speed: 25,
        features:["Darkvision (60 ft)","Advantage on Int, Wis, Cha checks against magic"],
        languages: ["Common","Gnomish"] 
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
            f:"good",
        },
        size:{
            height:{
                min: 3,
                max: 4
            },
            weight: 40,
            simple: "small"
        },
        speed: 25,
        features:["Darkvision (60 ft)","Advantage on Int, Wis, Cha checks against magic","Can communicate simple ideas to small animals/beasts"],
        level: {
            1 : {
                spell: ["minor illusion"]
            }
        },
        languages: ["Common","Gnomish"]
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
            f:"good",
        },
        size:{
            height:{
                min: 3,
                max: 4
            },
            weight: 40,
            simple: "small"
        },
        speed: 25,
        proficiency:["tinker's tools"],
        features:["Darkvision (60 ft)","Advantage on Int, Wis, Cha checks against magic",
            "Int (History) checks on magical/alchemical/technological gets 2x the proficiency",
            "Tinker: Create a AC 5 HP 1 device which lives for 24 hr unless maintained Types: Clockwork, Fire starter, Music box"],
        languages: ["Common","Gnomish"]
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
            f:"chaotic",
        },
        size:{
            height:{
                min: 5,
                max: 6
            },
            weight: 170,
            simple: "medium"
        },
        speed: 30,
        features:["Darkvision (60 ft)",
            "Advantage on saving throws against being charmed and magic",
            "Magic cannot put you to sleep"],
        proficiency_skill:["any","any"],
        languages: ["Common","Elvish","any"]
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
            f:"chaotic",
        },
        size:{
            height:{
                min: 5,
                max: 6
            },
            weight: 220,
            simple: "medium"
        },
        speed: 30,
        features:["Darkvision (60 ft)",
            "If brought to 0 HP but not killed outright, set your HP to 1 (Full rest to reset)",
            "On a critical hit, roll one of your weapon's hit die and add that to your damage delt"],
        proficiency_skill:["Intimidation"],
        languages: ["Common","Orc"]
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
                "Kallista","Lerissa","iMakaria","Nemeia","Orianna","Phelaia",
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
            f:"chaotic",
        },
        size:{
            height:{
                min: 5,
                max: 6
            },
            weight: 170,
            simple: "medium"
        },
        speed: 30,
        features:["Darkvision (60 ft)",
            "Resistance to fire damage"],
        languages: ["Common","Infernal"],
        level: {
            1 : {
                spell: ["thaumatergy"]
            },
            3 : {
                spell: ["hellish rebuke"]
            },
            5 : {
                spell: ["darkness"]
            },
        },
    }
};
