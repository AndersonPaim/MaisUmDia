/*<meta name="viewport" content="user-scalable=no, initial-scale=2, maximum-scale=0.45, minimum-scale=0.4, width=device-width, height=device-height, target-densitydpi=device-dpi" />*/
    var firebaseConfig = {
    apiKey: "AIzaSyDDrHjFahpBX-6kxkFfa-waBb7Ss7zmR_I",
    authDomain: "maisumdia-a6785.firebaseapp.com",
    databaseURL: "https://maisumdia-a6785.firebaseio.com",
    projectId: "maisumdia-a6785",
    storageBucket: "maisumdia-a6785.appspot.com",
    messagingSenderId: "734551526602",
    appId: "1:734551526602:web:12dc1b6786b28d30c2b833"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();
  var ref = database.ref('PlayerData');
  var user = firebase.auth().currentUser;
  var provider = new firebase.auth.FacebookAuthProvider();

  var inputText = document.getElementById("nameInput"); //configurações do input de texto
  inputText.style.position="absolute";
  inputText.style.top="470px";
  inputText.style.left="300px";
  inputText.style.width="400px";
  inputText.style.height="50px";
  inputText.style.fontSize="40px";

  var inputEmail = document.getElementById("emailInput"); //configurações do input de texto
  inputEmail.style.position="absolute";
  inputEmail.style.top="600px";
  inputEmail.style.left="300px";
  inputEmail.style.width="400px";
  inputEmail.style.height="50px";
  inputEmail.style.fontSize="40px";

  var inputPassword = document.getElementById("passwordInput"); //configurações do input de texto
  inputPassword.style.position="absolute";
  inputPassword.style.top="730px";
  inputPassword.style.left="300px";
  inputPassword.style.width="400px";
  inputPassword.style.height="50px";
  inputPassword.style.fontSize="40px";

  var inputPassword = document.getElementById("passwordConfirm"); //configurações do input de texto
  inputPassword.style.position="absolute";
  inputPassword.style.top="860px";
  inputPassword.style.left="300px";
  inputPassword.style.width="400px";
  inputPassword.style.height="50px";
  inputPassword.style.fontSize="40px";

  var pistaY = 665;
  var patX = 400;
  var playerVel = 5;
  var pat;
  var carros = [], moedas = [], baterias = [], pardal = [];
  var tempo = 0;
  var ms = 0, seg = 0, min = 0, hora; //tempo
  var m = 0, km = 0, aux = 0; //distancia
  var delayCarro = 180, delayMoeda = 0, delayEnergia = 0, delayBateria = 0; //delay de spawns
  var distancia = 3; //distancia do trajeto
  var rndPista, rndFaixa;
  var frameAtual = 8; //frame da bateria
  var pontuacaoParcial = 0, multasParcial = 0;
  var playerData = {
    nome: "",
    pontuacao: 0,
    uid: 0,
    dinheiro: 0,
    multas: 0,
    skin1: 1,
    skin2: 0,
    skin3: 0,
    skin4: 0,
    skin5: 0,
    corridas: 0
  }
  var criouconta = false, trocarCena = false, girosc = true;
  var email, senha;
  var pointer;
  var patSelecionado = 1;
  var motivoFinal;


//cena de login
var Login = new Phaser.Class({

Extends: Phaser.Scene,

initialize:

function Login ()
{
  Phaser.Scene.call(this, { key: 'login' });
},

preload: function ()
{
  this.load.image("jogarDia", "assets/jogar.png");
  this.load.image("botaoNoite", "assets/botaoNoite.png");
  this.load.image("botaoDia", "assets/botaoDia.png");
  this.load.image("jogarNoite", "assets/jogarNoite.png");
  this.load.image("pista2", "assets/road2.png");
  this.load.image("pista3", "assets/road3.png");
  this.load.image("pista4", "assets/road4.png");
  this.load.image("pista5", "assets/road5.png");
  this.load.image("bateria", "assets/Bateria.png");
  this.load.image("pauseicon", "assets/pause.png");
  this.load.image("barra", "assets/barra.png");
  this.load.image("login", "assets/login.png");
  this.load.image("playIcon", "assets/playIcon.png");
  this.load.image("PlacaPardal", "assets/PlacaPardal.png");
  this.load.image("pardal", "assets/Pardal.png");
  this.load.image("lojaIcon", "assets/lojaIcon.png");
  this.load.image("socialIcon", "assets/socialIcon.png");
  this.load.image("register", "assets/register.png");
  this.load.image("voltar", "assets/voltar.png");
  this.load.image("chegada", "assets/chegada.png");
  this.load.image("fundopreto", "assets/fundopreto.png");
  this.load.image("facebook", "assets/facebook.png");
  this.load.image("circulo", "assets/circulo.png");
  this.load.image("retangulo", "assets/retangulo.png");
  this.load.image("moeda2", "assets/Moeda.png");
  this.load.image("menu", "assets/menu.png");
  this.load.image("menuNoite", "assets/MenuNoite.png");
  this.load.image("menuDia", "assets/MenuDia.png");
  this.load.image("CeuNoite", "assets/CeuNoite.png");
  this.load.image("CeuDia", "assets/CeuDia.png");
  this.load.image("CeuDia2", "assets/CeuDia2.png");
  this.load.image("pat2loja", "assets/Patinete_V2.png");
  this.load.image("pat3loja", "assets/Patinete_V3.png");
  this.load.image("pat4loja", "assets/Patinete_v4.png");
  this.load.image("bike", "assets/bike.png");
  this.load.image("acelerarDia", "assets/acelerarDia.png");
  this.load.image("acelerarNoite", "assets/acelerarNoite.png");
  this.load.image("freiarDia", "assets/freiarDia.png");
  this.load.image("freiarNoite", "assets/freiarNoite.png");
  this.load.spritesheet("pat", "assets/patineteSprite.png", { frameWidth: 512, frameHeight: 512 } )
  this.load.spritesheet("pat2", "assets/patineteSprite_v2.png", { frameWidth: 512, frameHeight: 512 } )
  this.load.spritesheet("pat3", "assets/patineteSprite_v3.png", { frameWidth: 512, frameHeight: 512 } )
  this.load.spritesheet("pat4", "assets/patineteSprite_V4.png", { frameWidth: 512, frameHeight: 512 } )
  this.load.spritesheet("bikeSprite", "assets/bikeSprite.png", { frameWidth: 512, frameHeight: 512 } )
  this.load.spritesheet("moeda", "assets/coin.png", { frameWidth: 200, frameHeight: 200 } )
  this.load.spritesheet("carro3", "assets/Carro3.png", { frameWidth: 256, frameHeight: 272 } )
  this.load.spritesheet("caminhonete", "assets/caminhonete.png", { frameWidth: 256, frameHeight: 272 } )
  this.load.spritesheet("caminhonete2", "assets/caminhonete2.png", { frameWidth: 256, frameHeight: 272 } )
  this.load.spritesheet("energia", "assets/energia.png", { frameWidth: 192, frameHeight: 249 } )
  this.load.spritesheet("velocimetro", "assets/Velocimetro.png", { frameWidth: 512, frameHeight: 256 } )
  this.load.bitmapFont('fontTitulo', 'assets/fonts/font1.png', 'assets/fonts/font1.xml');
  this.load.bitmapFont('fontPixel', 'assets/fonts/FontPixelArt.png', 'assets/fonts/FontPixelArt.xml');
  hora = new Date().getHours(); //recebe horario do sistema
  gyro.frequency = 10;
},

create: function ()
{
  /*
  var music = this.sound.add('musica');
  music.play();
*/
  //cenario do fundo do menu

  if(hora > 19 || hora >= 0 && hora < 5){
    menu = this.add.image(490, 1460, "menuNoite").setScale(1.3).setAlpha(0.2);
    CeuNoite = this.add.image(490, 850, "CeuNoite").setScale(1.3).setAlpha(0.2);
    CeuNoite2 = this.add.image(490, 250, "CeuNoite").setScale(1.3).setAlpha(0.2);
    login = this.add.sprite(500, 850, "botaoNoite", 0).setScale(1.6, 1).setInteractive();
    register = this.add.sprite(500, 1300, "botaoNoite", 0).setScale(1.6, 1).setInteractive();
  }
  else if(hora >= 5 && hora <= 19){
    menu = this.add.image(490, 1460, "menuDia").setScale(1.3).setAlpha(0.2);
    CeuDia = this.add.image(490, 794.5, "CeuDia").setScale(1.3).setAlpha(0.2);
    CeuDia2 = this.add.image(490, 129, "CeuDia2").setScale(1.3).setAlpha(0.2);
    login = this.add.sprite(500, 850, "botaoDia", 0).setScale(1.6, 1).setInteractive();
    register = this.add.sprite(500, 1300, "botaoDia", 0).setScale(1.6, 1).setInteractive();
  }

  //
  //login = this.add.sprite(600, 840, "login", 0).setScale(1.5).setInteractive();
  //register = this.add.sprite(390, 840, "register", 0).setScale(1.5).setInteractive();

  logintext = this.add.bitmapText(500, 850, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Logar");
  registertext = this.add.bitmapText(500, 1300, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Registrar");

  login.on('pointerdown', function(){
    this.inputLogin();
  }, this);
  register.on('pointerdown', function(){
    this.scene.stop();
    this.scene.launch('registrar');
  }, this);

  textemail = this.add.bitmapText(400, 560, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Email: ");
  textsenha = this.add.bitmapText(400, 690, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Senha: ");

  document.getElementById("nameInput").style.display = "none";
  document.getElementById("passwordConfirm").style.display = "none";
  /*
  facebook = this.add.sprite(game.config.width / 2, 1100, "facebook", 0).setScale(0.12).setInteractive();

  facebook.on('pointerdown', function(){
    this.loginFacebook();
  }, this);*/

},

update: function ()
{

  firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    playerData.uid = user.uid;
    this.getData();
  } else {
    // User not logged in or has just logged out.
  }
  });

  if(user != null){
    this.scene.stop();
    this.scene.launch('menu');
  }
},

loginFacebook: function ()
{
  /* ERRO DO LOGIN DO FACEBOOK
      O Facebook detectou que o Mais Um Dia não está usando uma conexão segura para a transferência de informações.
  */
  firebase.auth().signInWithPopup(provider).then(function(result) {
    var token = result.credential.accessToken;
    var user = result.user;
    console.log(user);
  }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    var email = error.email;
    var credential = error.credential;
  });
},

getData: function ()
{
  ref.on("value", function (snapshot){
    snapshot.forEach(function (childSnapshot){
       var data = childSnapshot.val();
       if(data.uid == playerData.uid){
        playerData.pontuacao = data.pontuacao;
        playerData.nome = data.nome;
        playerData.dinheiro = data.dinheiro;
        playerData.multas = data.multas;
        playerData.skin1 = data.skin1;
        playerData.skin2 = data.skin2;
        playerData.skin3 = data.skin3;
        playerData.skin4 = data.skin4;
        playerData.skin5 = data.skin5;
        playerData.corridas = data.corridas;
       }
       else{
        playerData.pontuacao = 0;
        playerData.dinheiro = 0;
        playerData.multas = 0;
        playerData.skin1 = 1;
        playerData.skin2 = 0;
        playerData.skin3 = 0;
        playerData.skin4 = 0;
        playerData.skin5 = 0;
        playerData.corridas = 0;
       }
    });
  })
},

inputLogin: function ()
{
  email = document.getElementById("emailInput").value;
  password = document.getElementById("passwordInput").value;

  firebase.auth().signInWithEmailAndPassword(email, password).then(function (result){
    logou = true;
    user = firebase.auth().currentUser;
  }).catch(function (error) {
    alert(error);
  })
},
});

//cena de registro
var Registrar = new Phaser.Class({

Extends: Phaser.Scene,

initialize:

function Registrar ()
{
  Phaser.Scene.call(this, { key: 'registrar' });
},

create: function ()
{
  if(hora > 19 || hora >= 0 && hora < 5){
    menu = this.add.image(490, 1460, "menuNoite").setScale(1.3).setAlpha(0.2);
    CeuNoite = this.add.image(490, 850, "CeuNoite").setScale(1.3).setAlpha(0.2);
    CeuNoite2 = this.add.image(490, 250, "CeuNoite").setScale(1.3).setAlpha(0.2);
    register = this.add.sprite(500, 1000, "botaoNoite", 0).setScale(1.6, 1).setInteractive();
    voltar = this.add.sprite(500, 1300, "botaoNoite", 0).setScale(1.6, 1).setInteractive();
  }
  else if(hora >= 5 && hora <= 19){
    menu = this.add.image(490, 1460, "menuDia").setScale(1.3).setAlpha(0.2);
    CeuDia = this.add.image(490, 794.5, "CeuDia").setScale(1.3).setAlpha(0.2);
    CeuDia2 = this.add.image(490, 129, "CeuDia2").setScale(1.3).setAlpha(0.2);
    register = this.add.sprite(500, 1000, "botaoDia", 0).setScale(1.6, 1).setInteractive();
    voltar = this.add.sprite(500, 1300, "botaoDia", 0).setScale(1.6, 1).setInteractive();
  }

  document.getElementById("nameInput").style.display = "block";
  document.getElementById("passwordConfirm").style.display = "block";
  textemail = this.add.bitmapText(400, 560, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setLeftAlign().setText("Email: ");
  textsenha = this.add.bitmapText(400, 690, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setLeftAlign().setText("Senha: ");
  textsenhaConfirm = this.add.bitmapText(540, 820, 'fontPixel', '', 36).setOrigin(0.5).setScale(0.9).setLeftAlign().setText("Confirmar senha: ");
  textnome = this.add.bitmapText(450, 430, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Nickname: ");

  registertext = this.add.bitmapText(500, 1000, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Registrar");
  logintext = this.add.bitmapText(500, 1300, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("voltar");

  register.on('pointerdown', function(){
    this.registrar();
  }, this);

  voltar.on('pointerdown', function(){
    this.scene.stop();
    this.scene.launch('login');
  }, this);
},

update: function ()
{
  if(criouconta){
    this.scene.stop();
    this.scene.launch('login');
  }
},

registrar: function ()
{
  email = document.getElementById("emailInput").value;
  password = document.getElementById("passwordInput").value;
  playerData.nome = document.getElementById("nameInput").value;

  if(document.getElementById("nameInput").value != "" && document.getElementById("passwordInput").value == document.getElementById("passwordConfirm").value){
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function (result){
        alert("Conta criada!");
        ref.push(playerData);
        criouconta = true;
      }).catch(function (error) {
        alert(error);
      })
  }
},

verificarEmail() //NAO SEI SE VAMOS USAR VERIFICAÇÃO DE EMAIL MAS SE FOR JA TA AQUI
{
  var user = firebase.auth().currentUser;

  user.sendEmailVerification().then(function() {
    }).catch(function(error) {
    });
}



});

//cena do menu
var Menu = new Phaser.Class({


Extends: Phaser.Scene,

initialize:

function Menu ()
{
  Phaser.Scene.call(this, { key: 'menu' });
},

create: function ()
{
  document.getElementById("nameInput").style.display = "none";
  document.getElementById("emailInput").style.display = "none";
  document.getElementById("passwordInput").style.display = "none";

  //cenario do fundo do menu

  if(hora > 19 || hora >= 0 && hora < 5){
    menu = this.add.image(490, 1310, "menuNoite").setScale(1.3).setAlpha(0.2);
    CeuNoite = this.add.image(490, 700, "CeuNoite").setScale(1.3).setAlpha(0.2);
    CeuNoite2 = this.add.image(490, 100, "CeuNoite").setScale(1.3).setAlpha(0.2);
    jogarDia = this.add.sprite(game.config.width / 2, 1100, "jogarNoite", 0).setScale(1.5).setInteractive();
    titulo = this.add.bitmapText(950, 1000, 'fontTitulo', '', 38).setOrigin(0.5).setScale(3).setCenterAlign();
    titulo.setTintFill(0x1B1B97, 0x1B1B97, 0x8102F1, 0x8102F1);
  }
  else if(hora >= 5 && hora <= 19){
    menu = this.add.image(490, 1310, "menuDia").setScale(1.3).setAlpha(0.2);
    CeuDia = this.add.image(490, 645.2, "CeuDia").setScale(1.3).setAlpha(0.2);
    CeuDia2 = this.add.image(490, -20.5, "CeuDia2").setScale(1.3).setAlpha(0.2);
    jogarDia = this.add.sprite(game.config.width / 2, 1100, "jogarDia", 0).setScale(1.5).setInteractive();
    titulo = this.add.bitmapText(950, 1000, 'fontTitulo', '', 38).setOrigin(0.5).setScale(3).setCenterAlign();
    titulo.setTintFill(0xff7c00, 0xff7c00, 0xa75100, 0xa75100);
  }

  moeda2 = this.add.image(70, 70, "moeda2").setScale(0.5);
  retangulo = this.add.image(500, 1725, "retangulo").setScale(7, 2);
  playIcon = this.add.image(500, 1720, "playIcon").setScale(1.5);
  lojaIcon = this.add.image(150, 1720, "lojaIcon").setScale(1.5).setInteractive();
  socialIcon = this.add.image(850, 1720, "socialIcon").setScale(1.5).setInteractive();


  titulo.setText([
        'Mais',
        'Um',
        'Dia'
    ]);

    textDinheiro = this.add.bitmapText(170, 65, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setText(playerData.dinheiro).setLeftAlign();

  jogarDia.on('pointerdown', function(){ //clicando no botao de jogar para abrir o jogo
    this.scene.stop();
    this.scene.launch('Jogo');
  }, this);

  lojaIcon.on('pointerdown', function(){ //clicando no botao de jogar para abrir o jogo
    this.scene.stop();
    this.scene.launch('loja');
  }, this);

  socialIcon.on('pointerdown', function(){
    this.scene.stop();
    this.scene.launch('social');
  }, this);

/*
  fundopreto.on('dragstart', function(pointer, dragX, dragY){ //arrastar para os lados pra mudar o menu
        if(dragX > 200){
          trocarCena = true;
        }
    })*/

},

update: function ()
{
  if(trocarCena){
    trocarCena = false;
    this.scene.stop();
    this.scene.launch('social');
  }

}

});

//cena do menu social
var Social = new Phaser.Class({

Extends: Phaser.Scene,

initialize:

function Social ()
{
  Phaser.Scene.call(this, { key: 'social' });
},

create: function ()
{
  //cenario do fundo do menu
  if(hora > 19 || hora >= 0 && hora < 5){
    menu = this.add.image(490, 1310, "menuNoite").setScale(1.3).setAlpha(0.2);
    CeuNoite = this.add.image(490, 700, "CeuNoite").setScale(1.3).setAlpha(0.2);
    CeuNoite2 = this.add.image(490, 100, "CeuNoite").setScale(1.3).setAlpha(0.2);
  }
  else if(hora >= 5 && hora <= 19){
    menu = this.add.image(490, 1310, "menuDia").setScale(1.3).setAlpha(0.2);
    CeuDia = this.add.image(490, 645, "CeuDia").setScale(1.3).setAlpha(0.2);
    CeuDia2 = this.add.image(490, -20.5, "CeuDia2").setScale(1.3).setAlpha(0.2);
  }

  //
  moeda2 = this.add.image(70, 70, "moeda2").setScale(0.5);
  retangulo = this.add.image(500, 1725, "retangulo").setScale(7, 2);
  playIcon = this.add.image(500, 1720, "playIcon").setScale(1.5).setInteractive();
  lojaIcon = this.add.image(150, 1720, "lojaIcon").setScale(1.5).setInteractive();
  socialIcon = this.add.image(850, 1720, "socialIcon").setScale(1.5).setInteractive();
  textNome = this.add.bitmapText(520, 300, 'fontPixel', '', 38).setOrigin(0.5).setScale(1.2).setText("Nickname: " + playerData.nome).setCenterAlign();
  textPts = this.add.bitmapText(300, 400, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setText("Pontuacao: " + playerData.pontuacao).setLeftAlign();
  textMultas = this.add.bitmapText(215, 470, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setText("Multas: " + playerData.multas).setLeftAlign();
  textCorridas = this.add.bitmapText(370, 540, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setText("Corridas concluidas: " + playerData.corridas).setLeftAlign();
  textDinheiro = this.add.bitmapText(170, 65, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setText(playerData.dinheiro).setLeftAlign();

  playIcon.on('pointerdown', function(){ //clicando no botao de jogar para abrir o jogo
    this.scene.stop();
    this.scene.launch('menu');
  }, this);

  lojaIcon.on('pointerdown', function(){ //clicando no botao de jogar para abrir o jogo
    this.scene.stop();
    this.scene.launch('loja');
  }, this);

},

update: function ()
{
  if(trocarCena){
    trocarCena = false;
    this.scene.stop();
    this.scene.launch('menu');
  }
}

});

//cena do menu da loja
var Loja = new Phaser.Class({

Extends: Phaser.Scene,

initialize:

function Loja ()
{
  Phaser.Scene.call(this, { key: 'loja' });
},

create: function ()
{

  //cenario do fundo do menu
  if(hora > 19 || hora >= 0 && hora < 5){
    menu = this.add.image(490, 1310, "menuNoite").setScale(1.3).setAlpha(0.2);
    CeuNoite = this.add.image(490, 700, "CeuNoite").setScale(1.3).setAlpha(0.2);
    CeuNoite2 = this.add.image(490, 100, "CeuNoite").setScale(1.3).setAlpha(0.2);
    botaoLoja1 = this.add.sprite(820, 300, "botaoNoite", 0).setScale(1, 0.9).setInteractive();
    botaoLoja2 = this.add.sprite(820, 600, "botaoNoite", 0).setScale(1, 0.9).setInteractive();
    botaoLoja3 = this.add.sprite(820, 900, "botaoNoite", 0).setScale(1, 0.9).setInteractive();
    botaoLoja4 = this.add.sprite(820, 1200, "botaoNoite", 0).setScale(1, 0.9).setInteractive();
    botaoLoja5 = this.add.sprite(820, 1500, "botaoNoite", 0).setScale(1, 0.9).setInteractive();
  }
  else if(hora >= 5 && hora <= 19){
    menu = this.add.image(490, 1310, "menuDia").setScale(1.3).setAlpha(0.2);
    CeuDia = this.add.image(490, 645, "CeuDia").setScale(1.3).setAlpha(0.2);
    CeuDia2 = this.add.image(490, -20.5, "CeuDia2").setScale(1.3).setAlpha(0.2);
    botaoLoja1 = this.add.sprite(820, 300, "botaoDia", 0).setScale(1, 0.9).setInteractive();
    botaoLoja2 = this.add.sprite(820, 600, "botaoDia", 0).setScale(1, 0.9).setInteractive();
    botaoLoja3 = this.add.sprite(820, 905, "botaoDia", 0).setScale(1, 0.9).setInteractive();
    botaoLoja4 = this.add.sprite(820, 1200, "botaoDia", 0).setScale(1, 0.9).setInteractive();
    botaoLoja5 = this.add.sprite(820, 1500, "botaoDia", 0).setScale(1, 0.9).setInteractive();
  }
  textDinheiro = this.add.bitmapText(170, 65, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setText(playerData.dinheiro).setLeftAlign();
//rodapé
  moeda2 = this.add.image(70, 70, "moeda2").setScale(0.5);
 retangulo = this.add.image(500, 1725, "retangulo").setScale(7, 2);
  playIcon = this.add.image(500, 1720, "playIcon").setScale(1.5).setInteractive();
  lojaIcon = this.add.image(150, 1720, "lojaIcon").setScale(1.5).setInteractive();
  socialIcon = this.add.image(850, 1720, "socialIcon").setScale(1.5).setInteractive();
//imagem dos patinetes da loja
  patLoja = this.add.sprite(150, 300, "pat", 0).setScale(0.45).setInteractive();
  patLoja2 = this.add.sprite(150, 600, "pat2loja", 0).setScale(1).setInteractive();
  patLoja3 = this.add.sprite(150, 900, "pat3loja", 0).setScale(1).setInteractive();
  patLoja4 = this.add.sprite(150, 1200, "pat4loja", 0).setScale(1).setInteractive();
  bikeLoja  = this.add.sprite(150, 1500, "bike", 0).setScale(1).setInteractive();
//nome das skins
  this.add.bitmapText(360, 300, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.7).setLeftAlign().setText(" PATINETE PADRAO");
  this.add.bitmapText(360, 600, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.7).setLeftAlign().setText("NOME DA SKIN");
  this.add.bitmapText(360, 900, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.7).setLeftAlign().setText("NOME DA SKIN");
  this.add.bitmapText(330, 1200, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.7).setLeftAlign().setText("PUNKNETE");
  this.add.bitmapText(330, 1500, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.7).setLeftAlign().setText("BICICLETA");
//botao de comprar ou equipar
  comprar1 = this.add.bitmapText(800, 300, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setCenterAlign().setText("Comprar");
  comprar2 = this.add.bitmapText(800, 600, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setCenterAlign().setText("Comprar");
  comprar3 = this.add.bitmapText(800, 900, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setCenterAlign().setText("Comprar");
  comprar4 = this.add.bitmapText(800, 1200, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setCenterAlign().setText("Comprar");
  comprar5 = this.add.bitmapText(800, 1500, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setCenterAlign().setText("Comprar");
//preço das skins

  if(playerData.skin2 == 0){
    preco2 = this.add.image(730, 540, "moeda2").setScale(0.5);
    precoText2 = this.add.bitmapText(850, 540, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setCenterAlign().setText("1000");
  }
  if(playerData.skin3 == 0){
    preco3 = this.add.image(730, 840, "moeda2").setScale(0.5);
    precoText3 = this.add.bitmapText(850, 840, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setCenterAlign().setText("2000");
  }
  if(playerData.skin4 == 0){
    preco4 = this.add.image(730, 1140, "moeda2").setScale(0.5);
    precoText4 = this.add.bitmapText(850, 1140, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setCenterAlign().setText("3000");
  }
  if(playerData.skin5 == 0){
    preco5 = this.add.image(730, 1440, "moeda2").setScale(0.5);
    precoText5 = this.add.bitmapText(850, 1440, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setCenterAlign().setText("5000");
  }

  botaoLoja1.on('pointerdown', function(){
    patSelecionado = 1; //patinete padrao
  }, this);
  botaoLoja2.on('pointerdown', function(){
    if(comprar2.text == 'Comprar'){ //se o botao for de comprar adiciona a skin para o player senao é pq ele ja tem a skin e só seleciona
      if(playerData.dinheiro - 1000 >= 0){
        playerData.dinheiro -= 1000;
        preco2.destroy();
        precoText2.destroy();
        playerData.skin2 = 1;
        ref.push(playerData);
      }
    }
    else{
      patSelecionado = 2;
    }
  }, this);
  botaoLoja3.on('pointerdown', function(){
    if(comprar3.text == 'Comprar'){
      if(playerData.dinheiro - 2000 >= 0){
        playerData.dinheiro -= 2000;
        preco3.destroy();
        precoText3.destroy();
        playerData.skin3 = 1;
        ref.push(playerData);
      }
    }
    else{
      patSelecionado = 3;
    }
  }, this);
  botaoLoja4.on('pointerdown', function(){
    if(comprar4.text == 'Comprar'){
      if(playerData.dinheiro - 3000 >= 0){
        playerData.dinheiro -= 3000;
        preco4.destroy();
        precoText4.destroy();
        playerData.skin4 = 1;
        ref.push(playerData);
      }
    }
    else{
      patSelecionado = 4;
    }
  }, this);
  botaoLoja5.on('pointerdown', function(){
    if(comprar5.text == 'Comprar'){
      if(playerData.dinheiro - 5000 >= 0){
        playerData.dinheiro -= 5000;
        preco5.destroy();
        precoText5.destroy();
        playerData.skin5 = 1;
        ref.push(playerData);
      }
    }
    else{
      patSelecionado = 5;
    }
  }, this);

  playIcon.on('pointerdown', function(){ //clicando no botao de jogar para abrir o jogo
    this.scene.stop();
    this.scene.launch('menu');
  }, this);

  socialIcon.on('pointerdown', function(){
    this.scene.stop();
    this.scene.launch('social');
  }, this);

  socialIcon.on('pointerdown', function(){
    this.scene.stop();
    this.scene.launch('social');
  }, this);


},

update: function ()
{

  textDinheiro = this.add.bitmapText(170, 65, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.8).setText(playerData.dinheiro).setLeftAlign();

  if(playerData.skin1 == 1){
    comprar1.setText("Equipar").setAlpha(1);
    botaoLoja1.setAlpha(1);
  }
  if(playerData.skin2 == 1){
    comprar2.setText("Equipar").setAlpha(1);
    botaoLoja2.setAlpha(1);
  }
  if(playerData.skin3 == 1){
    comprar3.setText("Equipar").setAlpha(1);
    botaoLoja3.setAlpha(1);
  }
  if(playerData.skin4 == 1){
    comprar4.setText("Equipar").setAlpha(1);
    botaoLoja4.setAlpha(1);
  }
  if(playerData.skin5 == 1){
    comprar5.setText("Equipar").setAlpha(1);
    botaoLoja5.setAlpha(1);
  }

  if(patSelecionado == 1){
    comprar1.setText("Equipado").setAlpha(0.5);
    botaoLoja1.setAlpha(0.5);
  }
  if(patSelecionado == 2){
    comprar2.setText("Equipado").setAlpha(0.5);
    botaoLoja2.setAlpha(0.5);
  }
  if(patSelecionado == 3){
    comprar3.setText("Equipado").setAlpha(0.5);
    botaoLoja3.setAlpha(0.5);
  }
  if(patSelecionado == 4){
    comprar4.setText("Equipado").setAlpha(0.5);
    botaoLoja4.setAlpha(0.5);
  }
  if(patSelecionado == 5){
    comprar5.setText("Equipado").setAlpha(0.5);
    botaoLoja5.setAlpha(0.5);
  }
}
});

//cena de jogo
var Jogo = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Jogo ()
    {
      Phaser.Scene.call(this, { key: 'Jogo' });
    },

    create: function ()
    {
      hora = new Date().getHours(); //recebe horario do sistema
      //pista
      rndPista = Phaser.Math.Between(0, 3);
      if(rndPista == 0){ //design randomico da pista
        tileSprite = this.add.tileSprite(630, pistaY, game.config.width, game.config.height, "pista3").setScale(1.3);
      }
      else if(rndPista == 1){
        tileSprite = this.add.tileSprite(630, pistaY, game.config.width, game.config.height, "pista2").setScale(1.3);
      }
      else if(rndPista == 2){
        tileSprite = this.add.tileSprite(630, pistaY, game.config.width, game.config.height, "pista5").setScale(1.3);
      }
      else if(rndPista == 3){
        tileSprite = this.add.tileSprite(630, pistaY, game.config.width, game.config.height, "pista4").setScale(1.3);
      }

      //patinete
      pat = this.physics.add.sprite(patX, 1400, "pat", 0).setScale(0.45);

      this.physics.world.setBoundsCollision();
      pat.body.setCollideWorldBounds(true); //colisao com limite da tela
      //interface
      circulo = this.add.image(920, 100, "circulo").setScale(0.25);
      pauseicon = this.add.image(925, 100, "pauseicon").setScale(1.7).setInteractive();
      barra = this.add.image(930, 900, "barra").setScale(2);
      chegada = this.add.image(920, 340, "chegada").setScale(1.7);
      circulo = this.add.image(930, 1400, "circulo").setScale(0.1); //400 fim 1400 inicio
      energia = this.add.sprite(60, 250, "energia", 7).setScale(0.4);
      velocimetro = this.add.sprite(495, 75, "velocimetro", 0).setScale(0.6);
      //animação
      this.anims.create({
      key: 'pat',
      frames: this.anims.generateFrameNumbers('pat', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
      });
      this.anims.create({
      key: 'pat2',
      frames: this.anims.generateFrameNumbers('pat2', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
      });
      this.anims.create({
      key: 'pat3',
      frames: this.anims.generateFrameNumbers('pat3', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
      });
      this.anims.create({
      key: 'pat4',
      frames: this.anims.generateFrameNumbers('pat4', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
      });
      this.anims.create({
      key: 'bikeSprite',
      frames: this.anims.generateFrameNumbers('bikeSprite', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
      });
      this.anims.create({
        key: 'moeda',
        frames: this.anims.generateFrameNumbers('moeda', { start: 0, end: 5 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'carro3',
        frames: this.anims.generateFrameNumbers('carro3', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'caminhonete',
        frames: this.anims.generateFrameNumbers('caminhonete', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'caminhonete2',
        frames: this.anims.generateFrameNumbers('caminhonete2', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
      });


      if(patSelecionado == 1){
        pat.setTexture('pat');
        pat.play('pat');
      }
      if(patSelecionado == 2){
        pat.setTexture('pat2');
        pat.play('pat2');
      }
      else if(patSelecionado == 3){
        pat.setTexture('pat3');
        pat.play('pat3');
      }
      else if(patSelecionado == 4){
        pat.setTexture('pat4');
        pat.play('pat4');
      }
      else if(patSelecionado == 5){
        pat.setTexture('bikeSprite');
        pat.play('bikeSprite');
      }

      pontuacaoParcial = 0;
      //textos da interface in game
      textTempo = this.add.bitmapText(130, 50, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.7).setCenterAlign().setText("Tempo:00:00");
      //textKm = this.add.text(30, 90).setScale(2);
     // textKm.setText("Km:0,0" + "/" + distancia + ",0");
      //botao de pause chama a cena do pause
      pauseicon.on('pointerdown', function(){
        this.scene.pause();
        this.scene.launch('Pause');
      }, this);

      if(hora > 19 || hora >= 0 && hora < 5){
        botaoAcelerar = this.add.sprite(90, 1500, "acelerarNoite", 0).setScale(0.25).setInteractive().setAlpha(0.5);
        botaoFreiar = this.add.sprite(90, 1660, "freiarNoite", 0).setScale(0.25).setInteractive().setAlpha(0.5);
      }
      else if(hora >= 5 && hora <= 19){
        botaoAcelerar = this.add.sprite(90, 1500, "acelerarDia", 0).setScale(0.25).setInteractive().setAlpha(0.5);
        botaoFreiar = this.add.sprite(90, 1660, "freiarDia", 0).setScale(0.25).setInteractive().setAlpha(0.5);
      }

        gyro.startTracking(function(o) {
            pat.x += o.gamma/1.5;
        });

    },

    update: function ()
    {

      //movimentação para os lados com clica na tela
      var pointer = this.input.activePointer;

      if (pointer.isDown){
        //mover para os lados
        if(pointer.x < 530){
          if(pointer.x < 200 && pointer.y < 1415){
            pat.x -= 9;
          }
          else if(pointer.x > 200){
            pat.x -= 9;
          }
          //Acelerar e freiar
          else if(pointer.x < 200 && pointer.y > 1415){
            if(pointer.y < 1550){
              if(playerVel <= 30)
                playerVel++;
            }
            else{
              if(playerVel > 0)
                playerVel--;
            }
          }
        }
        else{
          pat.x += 9;
        }

      }

      //pontuacaoParcial++;

      //pausar animação do patinete quando parado
      if(playerVel == 0){
        pat.anims.pause();
      }
      else{
        if(pat.anims.isPlaying == false){
          pat.anims.resume();
        }
      }

      //final por kilometragem
      if(km == 3){
        this.scene.pause('Jogo');
        this.scene.start('final');
      }
      //gameover com fim da energia
      if (frameAtual == 0){
        motivoFinal = "Veiculo sem energia";
        this.scene.stop();
        this.scene.start('gameOver');
      }
      //

      tempo++;
      delayBateria++;
      delayEnergia++;
      delayMoeda++;

      if(delayBateria >= 500){ //delay para spawnar bateria
        if(playerVel > 5){
          delayBateria = 0;
          this.criarBateria(Phaser.Math.Between(160, this.game.config.width - 160), -2000, "bateria");
        }
      }

      if(delayMoeda == 90){ //delay para spawnar moeda
        delayMoeda = 0;
        if(playerVel > 5){
          this.criarMoeda(Phaser.Math.Between(160, this.game.config.width - 160), -400, "moeda");
        }
      }

      if(delayEnergia == 200){
        delayEnergia = 0;
        if(frameAtual > 0){
          frameAtual--;
          energia.setFrame(frameAtual);
        }
      }

      if(tempo == delayCarro){ //delay para spawnar carro

        tempo = 0;
        if(rndPista == 0 || rndPista == 2){ //trafico pista de 3 faixas
          if(playerVel <= 12){ // velocidade baixa o carro spawna na parte de baixo
            rndCarro = Phaser.Math.Between(1, 2); //random pra qual carro vai spawnar
            if(rndCarro == 1){
              this.criarCarro(Phaser.Math.Between(160, this.game.config.width - 160), 2200, "caminhonete2",  1, 1.2);
            }
            else if(rndCarro == 2){
              this.criarCarro(Phaser.Math.Between(160, this.game.config.width - 160), 2200, "carro3",  1, 1.2);
            }
          }
        else if(playerVel > 16){ // velocidade alta o carro spawna na parte de cima
          rndCarro2 = Phaser.Math.Between(1, 2); //random pra qual carro vai spawnar
          if(rndCarro2 == 1){
            this.criarCarro(Phaser.Math.Between(160, this.game.config.width - 160), -400, "caminhonete2",  1, 1.2);
          }
          else if(rndCarro2 == 2){
            this.criarCarro(Phaser.Math.Between(160, this.game.config.width - 160), -400, "carro3", 1, 1.2);
          }
        }
        }
        else if(rndPista == 1 || rndPista == 3){ //trafico pista de 2 faixas
        rndFaixa = Phaser.Math.Between(1, 2); //escolher em qual pista o carro vai spawnar

        if(rndFaixa == 1){ //faixa da esquerda
           rndCarro = Phaser.Math.Between(1, 2);
          if(rndCarro == 1){
            this.criarCarro(Phaser.Math.Between(220, 380), -400, "caminhonete",  1, 1.2);
          }
          else if(rndCarro == 2){
            this.criarCarro(Phaser.Math.Between(220, 380), -400, "carro3",  1, 1.2);
          }
        }
        else if(rndFaixa == 2){ //faixa da direita
          if(playerVel <= 12){
            rndCarro = Phaser.Math.Between(1, 2);
            if(rndCarro == 1){
              this.criarCarro(Phaser.Math.Between(620, 770), 2200, "caminhonete2",  1, 1.2);
            }
            else if(rndCarro == 2){
              this.criarCarro(Phaser.Math.Between(620, 770), 2200, "carro3",  1, 1.2);
            }
          }
          else if(playerVel > 16){
            rndCarro2 = Phaser.Math.Between(1, 2);
            if(rndCarro2 == 1){
              this.criarCarro(Phaser.Math.Between(620, 770), -400, "caminhonete2",  1, 1.2);
            }
            else if(rndCarro2 == 2){
              this.criarCarro(Phaser.Math.Between(620, 770), -400, "carro3", 1, 1.2);
            }
          }
        }
        }
      }

      for(i = 0; i < carros.length; i++){

        if(carros[i].y < 1400 && carros[i].y > 1200 && carros[i].x > pat.x - 90 && carros[i].x < pat.x + 90){ //colisao com o player
          motivoFinal = "Veiculo destruido";
          this.scene.stop();
          this.scene.start('gameOver');
          /*
          carros[i].destroy();
          carros[i] = null;
          carros.splice(i, 1); //remove o carro na colisao para testar*/
        }
      }
      //atualizar pista
      tileSprite.tilePositionY -= playerVel * 0.8; //TEM QUE AJUSTAR VELOCIDADE MELHOR AINDA

      //input teclado
      var esq = this.input.keyboard.addKey('A');
      var dir = this.input.keyboard.addKey('D');
      var cima = this.input.keyboard.addKey('W');
      var baixo = this.input.keyboard.addKey('S');

      for(i = 0; i < pardal.length; i++){ //atualiza posição do pardal
        pardal[i].y += playerVel;
        if(pardal[i].y <= pat.y){
          if(playerVel >= 23){
            multasParcial++;
            pardal[i].destroy();
            pardal[i] = null;
            pardal.splice(i, 1);
          }
        }

      }

      for(i = 0; i < moedas.length; i++){
        moedas[i].y += playerVel; //atualiza posiçoes das moedas
        if(moedas[i].y < 1400 && moedas[i].y > 1200 && moedas[i].x > pat.x - 90 && moedas[i].x < pat.x + 90){ //colisao
          moedas[i].destroy();
          moedas[i] = null;
          pontuacaoParcial += 100;
          moedas.splice(i, 1); //remove a moeda na colisao
        }
      }

      for(i = 0; i < baterias.length; i++){ //colisao com a bateria
        baterias[i].y += playerVel; //atualiza posiçoes das baterias
        if(baterias[i].y < 1400 && baterias[i].y > 1200 && baterias[i].x > pat.x - 90 && baterias[i].x < pat.x + 90){ //colisao
          energia.setFrame(7);
          frameAtual = 7;
          baterias[i].destroy();
          baterias[i] = null;
          baterias.splice(i, 1); //remove a bateria na colisao
        }


      }

      for(i = 0; i < carros.length; i++){ //atualiza posiçao os carros conforme velocidade do player
        if (rndPista == 0 || rndPista == 2){ //pista de 3 faixas todos no mesmo sentido
          if(playerVel < 10 && playerVel > 0){
            carros[i].y -= 10;
          }
          else if(playerVel > 10 && playerVel < 13){
            //mesma velocidade
          }
          else if(playerVel >= 13){
            carros[i].y += 10;
          }
          else if(playerVel == 0){
            carros[i].y -= 10;
          }

          if(carros[i].y < -400 || carros[i].y > 2200){ //remove carro quando sai da tela
            carros.splice(i, 1);
          }
        }
      else if (rndPista == 1 || rndPista == 3){
        if(carros[i].x <= 380){ //faixa da esquerda
          carros[i].y += 10 + playerVel;
        }
        else if(carros[i].x >= 620){
          if(playerVel < 15 && playerVel > 0){
            carros[i].y -= 10;
          }
          else if(playerVel > 15 && playerVel < 18){
            //mesma velocidade
          }
          else if(playerVel > 18){
            carros[i].y += 10;
          }
          else if(playerVel == 0){
            carros[i].y -= 10;
          }

          if(carros[i].y < -400 || carros[i].y > 2200){ //remove carro quando sai da tela
            carros.splice(i, 1);
          }
        }
        }
      }
      //atualiza posicao e velocidade do player
      if (esq.isDown)
      {
        pat.x -= 9;
      }
      if (dir.isDown)
      {
        pat.x += 9;
      }
      if(cima.isDown){
        if(playerVel < 30){
          playerVel++;
        }
      }
      if(baixo.isDown){
        if(playerVel > 0){
          playerVel--;
        }
      }

      ms++;
      aux2 = 0;
      if (aux >= 180){
        m++;
        aux2 = m;
        aux = 0;
        //textKm.setText("Km:" + km + "," + m + "/" + distancia + ",0");

        circulo.y -= (1000 / (distancia * 10)); //barra de progresso, 1000px da barra dividido pelo comprimento pra saber quanto vai avançar cada vez q 100m for alcançado
      }
      if(m > 9){
        m = 0;
        km++;
        //textKm.setText("Km:" + km + "," + m + "/" + distancia + ",0");
        //aaaaaa
        this.criarPardal(50, -400, "pardal");
      }
      if(aux2 == 9){
        this.criarPardal(50, -400, "PlacaPardal");
        aux2 = 0;
      }
      ////CALCULA TEMPO COM BASE NO TEMPO DE ATUALIZACAO DO JOGO 60 FRAMES POR SEGUNDO
      if(ms == 60){
        seg++;
        ms = 0;
        textTempo.setText("Tempo:" + (min < 10 ? "0" + min : min) + ":" + (seg < 10 ? "0" + seg : seg));
        aux += playerVel * 2; //CALCULA DISTANCIA COM BASE NO TEMPO E VELOCIDADE
      }
      if(seg == 60){
        min++;
        seg = 0;
        textTempo.setText("Tempo:" + (min < 10 ? "0" + min : min) + ":" + (seg < 10 ? "0" + seg : seg));
      }


      //Seta frame para o velocimetro
      if(playerVel <= 3){
        velocimetro.setFrame(0);
      }
      else if(playerVel > 3 && playerVel <= 6){
        velocimetro.setFrame(1);
      }
      else if(playerVel > 6 && playerVel <= 9){
        velocimetro.setFrame(2);
      }
      else if(playerVel > 9 && playerVel <= 12){
        velocimetro.setFrame(3);
      }
      else if(playerVel > 12 && playerVel <= 15){
        velocimetro.setFrame(4);
      }
      else if(playerVel > 15 && playerVel <= 18){
        velocimetro.setFrame(5);
      }
      else if(playerVel > 20 && playerVel <= 23){
        velocimetro.setFrame(6);
      }
      else if(playerVel > 23){
        velocimetro.setFrame(7);
      }
    },

    criarCarro: function(x, y, img, scaleX, scaleY)
    {
     // carros.push(this.add.sprite(x, y, img).setScale(0.3));
        carros.push(this.add.sprite(x, y, img).setScale(scaleX, scaleY));
        //inicia a animação do veiculo criado
        if(img == 'carro3'){
          carros[carros.length - 1].play('carro3');
        }
        else if(img == 'caminhonete'){
          carros[carros.length - 1].play('caminhonete');
        }
        else if(img == 'caminhonete2'){
          carros[carros.length - 1].play('caminhonete2');
        }
    },

    criarMoeda: function(x, y, img)
    {
      moedas.push(this.add.sprite(x, y, img).setScale(0.50));
      //inicia a animação da moeda criada
      moedas[moedas.length - 1].play('moeda');
    },

    criarBateria: function(x, y, img)
    {
      baterias.push(this.add.sprite(x, y, img).setScale(0.50));
    },

    criarPardal: function(x, y, img)
    {
      pardal.push(this.add.sprite(x, y, img).setScale(0.70));
    },

});

//cena de pause
var Pause = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Pause ()
    {
        Phaser.Scene.call(this, { key: 'Pause' });
    },

    create: function ()
    {
        fundopreto = this.add.sprite(500, 800, "fundopreto", 0).setScale(2, 3);
        if(hora > 19 || hora >= 0 && hora < 5){
          voltar = this.add.sprite(500, 700, "botaoNoite", 0).setScale(1.5, 1.5).setInteractive();
          sair = this.add.sprite(500, 900, "botaoNoite", 0).setScale(1.5, 1.5).setInteractive();
          giroscopio = this.add.sprite(500, 1100, "botaoNoite", 0).setScale(1.5, 1.5).setInteractive();
        }
        else if(hora >= 5 && hora <= 19){
          voltar = this.add.sprite(500, 700, "botaoDia", 0).setScale(1.5, 1.5).setInteractive();
          sair = this.add.sprite(500, 900, "botaoDia", 0).setScale(1.5, 1.5).setInteractive();
          giroscopio = this.add.sprite(500, 1100, "botaoDia", 0).setScale(1.5, 1.5).setInteractive();
        }

        voltartext = this.add.bitmapText(490, 700, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Voltar");
        sairtext = this.add.bitmapText(490, 900, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Sair");
        girotext = this.add.bitmapText(490, 1100, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Giroscopio");
        fundopreto.alpha = 0.9;
        gyro.stopTracking();

        if(girosc){
            giroscopio.setAlpha(1);
            girotext.setAlpha(1);
          }
          else{
            giroscopio.setAlpha(0.5);
            girotext.setAlpha(0.5);
          }

        voltar.on('pointerdown', function () {
          this.scene.stop();
          this.scene.resume('Jogo');
          if(girosc){

            gyro.startTracking(function(o) {
           
            });
          }
        }, this);

        sair.on('pointerdown', function () {
          this.reset();
          this.scene.stop('Jogo');
          this.scene.start('menu');
 
            gyro.startTracking(function(o) {
           
            });
        }, this);

        sair.on('pointerdown', function () {
          this.reset();
          this.scene.stop('Jogo');
          this.scene.start('menu');
        }, this);

        giroscopio.on('pointerdown', function () {
          if(girosc){
            gyro.stopTracking();
            giroscopio.setAlpha(0.5);
            girotext.setAlpha(0.5);
            girosc = false;
          }
          else{
            giroscopio.setAlpha(1);
            girotext.setAlpha(1);

            gyro.startTracking(function(o) {
            pat.x += o.gamma/1.5;
            });
            girosc = true;
          }

        }, this);
    },

    reset: function() //resetar variaveis
    {
      ms = 0, seg = 0, min = 0; //tempo
      m = 0, km = 0, aux = 0; //distancia
      patX = 400;
      tempo = 0;
      carros.length = 0;
      moedas.length = 0;
      circulo.y = 100;
    }

});

//cena de fim da corrida
var Final = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

    function Final ()
    {
        Phaser.Scene.call(this, { key: 'final' });
    },

    create: function ()
    {

        playerData.corridas++;

        if(min <= 1){
          pontuacaoParcial += 3000;
        }
        else if(min == 2){
          pontuacaoParcial += 2000;
        }
        else if(min >= 3){
          pontuacaoParcial += 1000;
        }

        sair = this.add.sprite(500, 1000, "botaoNoite", 0).setScale(1.5, 1.5).setInteractive();
        sairtext = this.add.bitmapText(490, 1000, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Sair");

        sair.on('pointerdown', function () {
          this.scene.stop();
          this.scene.start('menu');
        }, this);

        playerData.dinheiro += pontuacaoParcial / 10;
        var teste = playerData.pontuacao + pontuacaoParcial;
        playerData.pontuacao = teste; // += nao ta indo, n faço ideia pq
        var teste2 = playerData.multas + multasParcial;
        playerData.multas = teste2; // += nao ta indo, n faço ideia pq
        ref.push(playerData); //salva as informações

        textFinal = this.add.bitmapText(600, 530, 'fontPixel', '', 38).setOrigin(0.5).setScale(1.2).setCenterAlign().setText("Corrida finalizada!");
        textPontuacao = this.add.bitmapText(500, 700, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Pontuacao: " + pontuacaoParcial);
        textMultas = this.add.bitmapText(490, 800, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Multas: " + multasParcial);
        /*jogarDia = this.add.sprite(500, 800, "jogarDia", 0).setScale(1.5, 1.5).setInteractive(); //botao pra voltar pro menu

        jogarDia.once('pointerdown', function () { //voltar para o menu
          this.scene.stop();
          this.scene.start('menu');
        }, this)*/
        this.reset(); // reseta o jogo

    },

    update: function (time, delta)
    {

    },

    reset: function() //resetar variaveis
    {
      ms = 0, seg = 0, min = 0; //tempo
      m = 0, km = 0, aux = 0; //distancia
      patX = 400, playerVel = 5;
      tempo = 0;
      carros.length = 0, moedas.length = 0;
      circulo.y = 100;
      frameAtual = 8;
      pontuacaoParcial = 0, multasParcial = 0;
      gyro.stopTracking();
    }

});

//cena de game over
var GameOver = new Phaser.Class({

Extends: Phaser.Scene,

initialize:

function GameOver ()
{
    Phaser.Scene.call(this, { key: 'gameOver' });
},

create: function ()
{

    playerData.corridas++;

    if(min <= 1){
      pontuacaoParcial += 3000;
    }
    else if(min == 2){
      pontuacaoParcial += 2000;
    }
    else if(min >= 3){
      pontuacaoParcial += 1000;
    }

    sair = this.add.sprite(500, 1000, "botaoNoite", 0).setScale(1.5, 1.5).setInteractive();
    sairtext = this.add.bitmapText(490, 1000, 'fontPixel', '', 38).setOrigin(0.5).setScale(0.9).setCenterAlign().setText("Sair");

    sair.once('pointerdown', function () {
      this.scene.stop();
      this.scene.start('menu');
    }, this);

    textFinal = this.add.bitmapText(570, 600, 'fontPixel', '', 38).setOrigin(0.5).setScale(1.2).setCenterAlign().setText("Game Over!");
    motivofinalText = this.add.bitmapText(570, 700, 'fontPixel', '', 38).setOrigin(0.5).setScale(1.2).setCenterAlign().setText(motivoFinal);

    this.reset(); // reseta o jogo
},

reset: function() //resetar variaveis
{
  ms = 0, seg = 0, min = 0; //tempo
  m = 0, km = 0, aux = 0; //distancia
  patX = 400, playerVel = 5;
  tempo = 0;
  carros.length = 0, moedas.length = 0;
  circulo.y = 100;
  frameAtual = 8;
  pontuacaoParcial = 0, multasParcial = 0;
  gyro.stopTracking();
}

});

var config = {
    type: Phaser.AUTO,
    width: 980,
    height: 1800,
    scene: [Login, Menu, Social, Loja, Jogo, Pause, Final, GameOver, Registrar],
    physics: {
    default: 'arcade'
  }
};

var game = new Phaser.Game(config);