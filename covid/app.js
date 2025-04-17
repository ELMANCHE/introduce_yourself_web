
// la creacion de este juego tiene una historia graciosa,todo empezo cuando me dio covid en estas ultimas semanas hahaha.



//creacion de funcion
function initCanvas(){
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var backgroundImage = new Image();
    var naveImage   = new Image(); // nave
    var enemiespic1  = new Image(); // enemigo 1
    var enemiespic2 = new Image(); // enemigo 2

    // Imagenes de fondo y png de enemigos
    backgroundImage.src = "images/background-pic2.jpg"; //fondo
    naveImage.src       = "images/spaceship-pic2.png"; //Snave de ataque contra el covid
    // Enemigos fotos
    enemiespic1.src     = "images/enemigo7.png";
    enemiespic2.src     = "images/enemigo6.png"; //enemigos png
    
    // ancho y alto
    var cW = ctx.canvas.width; // 700px 
    var cH = ctx.canvas.height;// 600px

    // plantillas de las naves
    var enemyTemplate = function(options){
        return {
            id: options.id || '',
            x: options.x || '',
            y: options.y || '',
            w: options.w || '',
            h: options.h || '',
            image: options.image || enemiespic1
        }
    }

    // enemigos
    var enemies = [
                   // Primer grupo de enemigos
                   new enemyTemplate({id: "covid1", x: 100, y: -20, w: 50, h: 30 }),
                   new enemyTemplate({id: "covid2", x: 225, y: -20, w: 50, h: 30 }),
                   new enemyTemplate({id: "covid3", x: 350, y: -20, w: 80, h: 30 }),
                   new enemyTemplate({id: "covid4", x:100,  y:-70,  w:80,  h: 30}),
                   new enemyTemplate({id: "covid5", x:225,  y:-70,  w:50,  h: 30}),
                   new enemyTemplate({id: "covid6", x:350,  y:-70,  w:50,  h: 30}),
                   new enemyTemplate({id: "covid7", x:475,  y:-70,  w:50,  h: 30}),
                   new enemyTemplate({id: "covid8", x:600,  y:-70,  w:80,  h: 30}),
                   new enemyTemplate({id: "covid9", x:475,  y:-20,  w:50,  h: 30}),
                   new enemyTemplate({id: "covid10",x: 600, y: -20, w: 50, h: 30}),

                   // Segundo grupo de enemigos
                   new enemyTemplate({ id: "covid11", x: 100, y: -220, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: "covid12", x: 225, y: -220, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: "covid13", x: 350, y: -220, w: 80, h: 50, image: enemiespic2 }),
                   new enemyTemplate({ id: "covid14", x: 100, y: -270, w: 80, h: 50, image: enemiespic2 }),
                   new enemyTemplate({ id: "covid15", x: 225, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: "covid16", x: 350, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: "covid17", x: 475, y: -270, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: "covid18", x: 600, y: -270, w: 80, h: 50, image: enemiespic2 }),
                   new enemyTemplate({ id: "covid19", x: 475, y: -200, w: 50, h: 30, image: enemiespic2 }),
                   new enemyTemplate({ id: "covid20", x: 600, y: -200, w: 50, h: 30, image: enemiespic2 })
                  ];

    // Esto ayuda a poder tener mas enemigos sin necesidad de una funcion 
    // esto nos ayuda a saber si los enemigos estan siendo golpeados
    var renderEnemies = function (enemyList) {
        for (var i = 0; i < enemyList.length; i++) {
            console.log(enemyList[i]);
            ctx.drawImage(enemyList[i].image, enemyList[i].x, enemyList[i].y += .5, enemyList[i].w, enemyList[i].h);
            // detectar disparo
            launcher.hitDetectLowerLevel(enemyList[i]);
        }
    }

    function Launcher(){
        // ubicación de balas
        this.y = 500, 
        this.x = cW*.5-25, 
        this.w = 100, 
        this.h = 100,   
        this.direccion, 
        this.bg="white", // color de bala
        this.misiles = [];

         // Isi deseas cambiar el color de los mensajes , los puedes hacer en fillsrtyle
         this.gameStatus = {
            over: false, 
            message: "",
            fillStyle: 'yellow',
            font: 'italic bold 36px Arial, sans-serif',
        }

        this.render = function () {
            if(this.direccion === 'left'){
                this.x-=5;
            } else if(this.direccion === 'right'){
                this.x+=5;
            }else if(this.direccion === "downArrow"){
                this.y+=5;
            }else if(this.direccion === "upArrow"){
                this.y-=5;
            }
            ctx.fillStyle = this.bg;
            ctx.drawImage(backgroundImage, 10, 10); // fondo
            ctx.drawImage(naveImage,this.x,this.y, 100, 90); // Necesitamos asegurarnos de que la nave espacial esté en el mismo lugar que las balas.

            for(var i=0; i < this.misiles.length; i++){
                var m = this.misiles[i];
                ctx.fillRect(m.x, m.y-=5, m.w, m.h); // direccion de la bala
                this.hitDetect(this.misiles[i],i);
                if(m.y <= 0){ 
                    this.misiles.splice(i,1); 
                }
            }
            // Cuando el jugador gane...
            if (enemies.length === 0) {
                clearInterval(animateInterval); // detener el bucle del juego
                ctx.fillStyle = 'yellow';
                ctx.font = this.gameStatus.font;
                ctx.fillText('Estas a salvo por ahora...', cW * .5 - 80, 50);
            }
        }
        // Detectar impacto de bala
        this.hitDetect = function (m, mi) {
            console.log('crush');
            for (var i = 0; i < enemies.length; i++) {
                var e = enemies[i];
                if(m.x+m.w >= e.x && 
                   m.x <= e.x+e.w && 
                   m.y >= e.y && 
                   m.y <= e.y+e.h){
                    this.misiles.splice(this.misiles[mi],1); // Remover misil
                    enemies.splice(i, 1); // eliminacion del enemigo cuando es golpeado
                    document.querySelector('.barra').innerHTML = "Destruccion de "+ e.id+ " ";
                }
            }
        }
        //Preguntar a la nave del jugador si un enemigo ha pasado o ha golpeado la nave del jugador
        this.hitDetectLowerLevel = function(enemy){
            if(enemy.y > 550){
                this.gameStatus.over = true;
                this.gameStatus.message = 'Te contagiaste mi ciela!';
            }
            // Esto detecta un choque de la nave con enemigos
            if(enemy.id === 'covid3'){
                console.log(this.x);
            }
            //Si el enemigo y es mayor que este.y - 25 => entonces sabemos que hay una colisión
            //Si el enemigo x es menor que this.x + 45 && enemigo x > this.x - 45 entonces sabemos que hay una colisión
            if ((enemy.y < this.y + 25 && enemy.y > this.y - 25) &&
                (enemy.x < this.x + 45 && enemy.x > this.x - 45)) { 
                    this.gameStatus.over = true;
                    this.gameStatus.message = 'Estiraste la pata...'
                }

            if(this.gameStatus.over === true){  
                clearInterval(animateInterval); // detener el bucle
                ctx.fillStyle = this.gameStatus.fillStyle; 
                ctx.font = this.gameStatus.font;
                ctx.fillText(this.gameStatus.message, cW * .5 - 80, 50); 
            }
        }
    }
    
    var launcher = new Launcher();
    function animate(){
        ctx.clearRect(0, 0, cW, cH);
        launcher.render();
        renderEnemies(enemies);
    }
    var animateInterval = setInterval(animate, 6);
    
    var left_btn  = document.getElementById('left_btn');
    var right_btn = document.getElementById('right_btn');
    var fire_btn  = document.getElementById('fire_btn'); 

    
// esto nos ayudara a mover la nabe a la derecha,izquierda,arriba y abajo
   document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) 
        {
         launcher.direccion = 'left';  
            if(launcher.x < cW*.2-130){
                launcher.x+=0;
                launcher.direccion = '';
            }
       }    
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 37)
        {
         launcher.x+=0;
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 39) 
        {
         launcher.direccion = 'right';
         if(launcher.x > cW-110){
            launcher.x-=0;
            launcher.direccion = '';
         }
        
        }
    });

    document.addEventListener('keyup', function(event) {
        if(event.keyCode == 39) 
        {
         launcher.x-=0;   
         launcher.direccion = '';
        }
    }); 

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 38) 
         {
           launcher.direccion = 'upArrow';  
           if(launcher.y < cH*.2-80){
              launcher.y += 0;
              launcher.direccion = '';
            }
         }
    });

    document.addEventListener('keyup', function(event){
         if(event.keyCode == 38) 
         {
           launcher.y -= 0;
           launcher.direccion = '';
         }
    });

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 40) 
         {
           launcher.direccion = 'downArrow';  
          if(launcher.y > cH - 110){
            launcher.y -= 0;
            launcher.direccion = '';
           }
         }
    });
    document.addEventListener('keyup', function(event){
         if(event.keyCode == 40) 
         {
           launcher.y += 0;
           launcher.direccion = '';
         }
    });

    document.addEventListener('keydown', function(event){
         if(event.keyCode == 80) 
         {
          location.reload();
         }
    });

    // botones de control
    left_btn.addEventListener('mousedown', function(event) {
        launcher.direccion = 'left';
    });

    left_btn.addEventListener('mouseup', function(event) {
        launcher.direccion = '';
    });

    right_btn.addEventListener('mousedown', function(event) {
        launcher.direccion = 'right';
    });

    right_btn.addEventListener('mouseup', function(event) {
        launcher.direccion = '';
    });
    //balas
    fire_btn.addEventListener('mousedown', function(event) {
        launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3, h: 10});
    });
    // disparar al apretar espacio 
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 32) {
           launcher.misiles.push({x: launcher.x + launcher.w*.5, y: launcher.y, w: 3,h: 10});
        }
    });
}

window.addEventListener('load', function(event) {
    initCanvas();
});
