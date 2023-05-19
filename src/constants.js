export const COMMAND_PREFIX = "!gnome";

export const ASCII_GNOMES = [
    `⣿⠿⠋⠉⠄⠄⠄⠄⠄⠉⠙⢻⣿
⣿⣿⣿⣿⣿⣿⢋⠄⠐⠄⠐⠄⠠⠈⠄⠂⠠⠄⠈⣿
⣿⣿⣿⣿⣿⡟⠄⠄⠄⠁⢀⠈⠄⠐⠈⠄⠠⠄⠁⠈⠹
⣿⣿⣿⣿⣿⣀⡀⡖⣖⢯⢮⢯⡫⡯⢯⡫⡧⣳⡣⣗⣼
⣿⣿⣿⣿⣷⣕⢱⢻⢮⢯⢯⡣⣃⣉⢪⡪⣊⣀⢯⣺⣺
⣿⣿⣿⣿⣿⣷⡝⣜⣗⢽⢜⢎⢧⡳⡕⡵⡱⣕⡕⡮⣾
⣿⣿⣿⣿⣿⡿⠓⣕⢯⢮⡳⣝⣕⢗⡭⣎⢭⠮⣞⣽⡺
⣿⣿⣿⡿⠋⠄⠄⠸⣝⣗⢯⣳⢕⣗⡲⣰⡢⡯⣳⣳⣫
⣿⣿⠋⠄⠄⠄⠄⠄⠘⢮⣻⣺⢽⣺⣺⣳⡽⣽⣳⣳⠏⠛⠛⠛⢿
⣿⠇⠄⢁⠄⠄⠄⠁⠄⠈⠳⢽⢽⣺⢞⡾⣽⣺⣞⠞⠄⠄⠈⢄⢎⡟⣏⢯⢝⢛⠿
⡇⠄⡧⣣⢢⢔⢤⢢⢄⠂⠄⠄⠁⠉⠙⠙⠓⠉⠈⢀⠄⠄⠄⠑⢃⣗⢕⣕⢥⡣⣫⢽
⣯⠄⢽⢸⡪⡪⡣⠲⢤⠄⠄⠂⠄⠄⠄⡀⠄⠠⠐⠄⣶⣤⣬⣴⣿⣿⣷⡹⣿⣿⣾⣿
⣿⣶⣾⣵⢱⠕⡕⡱⠔⠄⠁⢀⠠⠄⠄⢀⠄⠄⢀⣾
⣿⣿⣿⣿⡷⡗⠬⡘⠂⠄⠈⠄⠄⠄⠈⠄⠄⠄⢸
⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶
⣿⣿⣿⣿⣿⣿⣇⠄⢀⠄⡀⢁⠄⠐⠈⢀⠠⠐⡀⣶
⣿⣿⣿⣿⣿⣿⣧⢁⠂⠔⠠⠈⣾⠄⠂⠄⡁⢲
⣿⣿⣿⣿⣿⣿⠿⠠⠈⠌⠨⢐⡉⠄⠁⡂⠔⠼
⣿⣿⣿⣿⣿⣿⡆⠈⠈⠈⠄⠂⣆⠄⠄⠄⠄⣼
⣿⣿⣿⣿⣿⣿⣿⠄⠁⠈⠄⣾⡿⠄⠄⠂⢸
⣿⣿⣿⣿⣿⣿⡟⠄⠄⠁⠄⠻⠇⠄⠐⠄⠄⠈⠙⢻
⣿⣿⣿⣿⣿⣿⡇⡀⠄⠂⠁⢀⠐⠄⣥⡀⠁⢀⠄⣿`,

    `⣿⣿⣿⣿⠏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⢿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⡏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢿⣿⣿⣿⣿⣿⣿
⣿⣿⡿⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢸⣿⣿⣿⣿⣿
⣿⣿⣤⣀⢠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣾⣿⣿⣿⣿⣿
⣿⣿⣿⡟⣻⣿⣿⣿⣿⣿⣟⠉⠙⢹⣿⣏⠉⢹⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡿⣿⣿⣿⣿⣿⣿⣿⣿⡿⢿⡿⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⠟⠋⠄⣿⣿⣿⣿⣿⣿⣿⣟⡛⠛⢛⣛⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡟⠁⠄⠄⠄⠹⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⡇⠄⠄⠄⠄⠄⠘⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡏⠛⠿⠛⠻⣿
⡇⠄⠄⠄⠄⠄⠄⠘⢻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠟⠄⠄⠄⠄⣠⣽
⣇⣀⠄⣀⡀⢀⠄⠄⠄⠄⠙⠛⠛⠿⣿⢿⠿⠟⠛⠄⠄⠄⠄⠈⢿⣿`,

    `⣿⣿⣿⣿⣿⠟⠉⠁⠄⠄⠄⠈⠙⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⠏⠄⠄⠄⠄⠄⠄⠄⠄⠄⠸⢿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣏⠄⡠⡤⡤⡤⡤⡤⡤⡠⡤⡤⣸⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣗⢝⢮⢯⡺⣕⢡⡑⡕⡍⣘⢮⢿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⡧⣝⢮⡪⡪⡪⡎⡎⡮⡲⣱⣻⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⠟⠁⢸⡳⡽⣝⢝⢌⢣⢃⡯⣗⢿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⠟⠁⠄⠄⠄⠹⡽⣺⢽⢽⢵⣻⢮⢯⠟⠿⠿⢿⣿⣿⣿⣿⣿
⡟⢀⠄⠄⠄⠄⠄⠙⠽⠽⡽⣽⣺⢽⠝⠄⠄⢰⢸⢝⠽⣙⢝⢿
⡄⢸⢹⢸⢱⢘⠄⠄⠄⠄⠄⠈⠄⠄⠄⣀⠄⠄⣵⣧⣫⣶⣜⣾
⣧⣬⣺⠸⡒⠬⡨⠄⠄⠄⠄⠄⠄⠄⣰⣿⣿⣿⣿⣿⣷⣽⣿⣿
⣿⣿⣿⣷⠡⠑⠂⠄⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣄⠠⢀⢀⢀⡀⡀⠠⢀⢲⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⢐⢀⠂⢄⠇⠠⠈⠄⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣧⠄⠠⠈⢈⡄⠄⢁⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⡀⠠⠐⣼⠇⠄⡀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣯⠄⠄⡀⠈⠂⣀⠄⢀⠄⠈⣿⣿⣿⣿⣿⣿⣿⣿⣿
⣿⣿⣿⣿⣿⣶⣄⣀⠐⢀⣸⣷⣶⣶⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿`,

    `████████▓▓████████▓▓█████████████
██████▓▓█████████████▓███████████
█████▓███████████████▓███████████
████▓█████████████████▒██████████
████▓▓▓▒░░▒▒▒▒▒▒▒▒▒▒▒▒▒██████████
████▒▒░▒▒░▒▒▗▒▒▒▒▒▒▗▒▒▒██████████
████▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒██████████
████░▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒█████████
█████▒▒▒▒▒▒▒▒▃▒░░░▒▃▒▒███████████
██████▓▒▒▒▒▒▃▒▒▒▒▒▒▒▃░▒▒█████████
███████▒▒▒▒░▒▒▒▒▒▒▒▒▒▒░██████████
█████████▒░░░░░░░░░░░░░██████████
██████████░▒░░░░░░░░░░██▓▒▒▒▒▒▓▒▓
▓▓█████████████▒░░░▒████▒▒▒▒▒▓▓▒▓
▒▒▒▒▒▒▓███████████████████▒░░▒▒▒█
▒▒▒▒▒▓▓▒▒█████████████▒████░▒████
█▒▒▒▓▓▒▒▒████████████▒███████████
███▓▒▓▓▒█████████████████████████
░░█▀▀░░█▄░█░█▀▀█░█▄░▄█░█▀▀░█▀▄
░░█░▀█░█░▀█░█░░█░█░▀░█░█▀▀░█░█
░░▀▀▀░░▀░░▀░▀▀▀▀░▀░░░▀░▀▀▀░▀▀░`,

    `Ho ho ho ha ha 😂🤣😂, ho ho ho he ha🤣🤣. Hello there😃👋, old chum👴👵. I’m 🙅‍♀️ g'not 🙅‍♀️a g'nelf🧝👎. I’m 🙅‍♀️g'not🙅‍♀️ a g'noblin👺👎👺. I’m a g'nome🎅😁!! And you’ve been, GNOOOMED🎅🤣😂😂🤣🤣!!!`,
    `Ho 🎅ho 🎅ho 🎅ha 😂ha 😂, ho 🎅ho 🎅ho 🎅he 😂ha 😂. Hello 👋there, old chum 😴. I’m gnot an elf 🤳. I’m gnot a goblin 👺. I’m a gnome 🙌. And you’ve 👉😟been, GNOMED’ 😂🔥👌💯⁭`,
];

export const ASCII_MONKIS = [
    `▒▒▒▒▒▄██████████▄▒▒▒▒▒
▒▒▒▄██████████████▄▒▒▒
▒▒██████████████████▒▒
▒▐███▀▀▀▀▀██▀▀▀▀▀███▌▒
▒███▒▒▌■▐▒▒▒▒▌■▐▒▒███▒
▒▐██▄▒▀▀▀▒▒▒▒▀▀▀▒▄██▌▒
▒▒▀████▒▄▄▒▒▄▄▒████▀▒▒
▒▒▐███▒▒▒▀▒▒▀▒▒▒███▌▒▒
▒▒███▒▒▒▒▒▒▒▒▒▒▒▒███▒▒
▒▒▒██▒▒▀▀▀▀▀▀▀▀▒▒██▒▒▒
▒▒▒▐██▄▒▒▒▒▒▒▒▒▄██▌▒▒▒
▒▒▒▒▀████████████▀▒▒▒▒`,
];

export const SOUNDS = {
    WOOHOHO: "assets/sounds/wohoho.ogg",
    ELF: "assets/sounds/elf.ogg",
    MONKI: "assets/sounds/monki.ogg",
    WOO: "assets/sounds/woo.ogg",
    GNOME_POWER: "assets/sounds/gnome_power.ogg"
};

export const RANDOM_WOO_CHANCE = 0.2; // 20%

export const PHRASES = [
    "Que homem é um homem que não torna o mundo melhor.",
    "A vida não é uma mar de rosas! mas as rosas são de uma beleza inestimável!",
    "Um simples ato de gentileza pode mudar tudo!",
    "O homem sábio aprender com os erros dos outros! o homem comum aprende com seus próprios erros! o homem estupido não aprende nunca!",
    "O que vale nessa vida e o que se vive o que se faz.",
    "Sem planos programados, não faz sentido nada disso!",
    "Serviço que atrasa não adianta!",
    "Tudo o que fizer na vida, tente fazer o melhor! Um dia voce sera melhor em tudo o que faz!",
    "Nós somos o que nós fazemos! Faça certo! Faça por merecer!",
    "Pois tudo nos é dado! só nos falta a Fé!",
    "A fé na vitória tem que ser inabalável!",
    "Um vinho, Um pão, E uma Reza!",
    "Cada um de nós tem que viver com sua consciência!",
    "Nem quem tá certo tá errado! nem quem tá errado tá certo! tá todo mundo errado!",
    "Diga o que quer dizer É queira dizer o que diz!",
    "Nem tudo que é certo é correto! mas o correto é sempre fazer o certo!",
    "Um rei não mata outro rei.",
    "Shit happens!",
    "A loucura e uma coisa normal. Tem doido pra tudo!",
    "Acreditar eu nao acredito nao! mas que existir, existi.",
    "Pois nem todas as lagrimas são ruins!",
    "A vitória pertence àquele que acredita nela, e àquele que acredita nela por mais tempo",
    "Os ideais que iluminaram o meu caminho são a bondade, a beleza e a verdade!",
    "The right mode!",
    "Por todas as coisas boas!",
    "Perfection just got better, because of you!",
    "A armadura do guerreiro e a verdade! seu escudo e a fé! sua espada e a justiça!",
    "Seus verdadeiros amigos não são os que te dizem doces palavras! mas aqueles que tem a coragem de falar as palavras amargas!",
    "Você nunca me conheceu de verdade!",
    "Eu defenderei meu sonho com toda a minha força! ele e o símbolo da minha fé e quem eu sou!",
    "Make it right when everything seems to go wrong!",
    "Making the good even better!",
    "Espere o Inesperado!",
    "Através de tudo!",
    "O Amor é a resposta! o Amor é o segredo! o Amor é a unica coisa que importa!",
    "Life is made to play together!",
    "Thanks for all!",
    "Quando voce estiver de pé ajude os que estão caidos, para que quando voce cair possa ser ajudado também!",
    "A perfeição existe de varias formas!",
    "A coisa mais difícil de suportar é ver quem você ama, amar outra pessoa.",
    "Rough diamond!",
    "Sentimos saudade unicamente do que amamos!",
    "A vida é um jogo feito para todos! e o amor é o prêmio!",
    "I'm A Believer you!",
    "Eu quero saber, você alguma vez viu a chuva\nCaindo em um dia ensolarado?",
    "Coração Sobre Mente.",
    "O amor è igual a rapadura e doce mais nao é mole não!",
    "A vida é um amor!",
    "Love is the only way!",
    "A cada vez que se ganha ja e uma vitoria!",
    "Tem pergunta que nao deve ser feita, é resposta que nao deve ser dada!",
    "nao acredite na mentira ela nao e verdade!",
    "Fale a verdade! se não a vida fala por voce! A verdade nunca muda!",
    "Algumas pessoas só gostão da verdade quando as convém!",
    "Como logo o biscoito bom!",
    "Aquisição de conhecimento torna as coisas mais bonitas!",
    "Ser bom no Facil todo mundo É, quero ver ser bom no Dificil.",
    "Always try again!",
    "Moderação quase sempre é a melhor escolha!"
]

export const WOO = "src/assets/sounds/woo.ogg"
export const GNOME_POWER = "src/assets/sounds/gnome_power.ogg"


export const ERROR_RESPONSES = {
  NO_CHESS_GAME: 'There is no game in this channel! Start a new game with `/chess new`'
}
