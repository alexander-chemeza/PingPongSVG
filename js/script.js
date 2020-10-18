    const cort = {
      width : 800,
      height : 400,
      getSize : function(){
        let svg = document.getElementById("svg");  
        svg.setAttribute("width", this.width);  
        svg.setAttribute("height", this.height);           
      },
    };
    const ball = {
      radius : 8,  
      posX : cort.width / 2,
      posY : cort.height / 2,  
      speedY : 3,
      speedX : 3,
      accel : 1.1,
    };
    const rockets = {
      widht : 7,
      height : 80,  
      posLeftY : 0,
      posRightY : 0,
      stepMove : 10,
    };
    const counterMax = 5; // играем до 5 очков
    let vectorX = 1;
    let vectorY = -1;
    let leftPoint = 0;
    let rightPoint = 0;

    // рисуем с SVG
    const svgNS = "http://www.w3.org/2000/svg";

      cort.getSize();
      
      toDrawCort();
      function toDrawCort(){
        let cortDraw = document.createElementNS(svgNS, "rect");
        
        cortDraw.setAttributeNS(null, "id", "cort");
        cortDraw.setAttributeNS(null, "x", 0);
        cortDraw.setAttributeNS(null, "y", 0);
        cortDraw.setAttributeNS(null, "width", cort.width);
        cortDraw.setAttributeNS(null, "height", cort.height);
        cortDraw.setAttributeNS(null, "fill", "#a2e8a2");
        
        svg.append(cortDraw);
      };
      
      toDrawLeftRocket();
      function toDrawLeftRocket(){
        let rocketLeft = document.createElementNS(svgNS, "rect");
        
        rocketLeft.setAttributeNS(null, "id", "rocketLeft");
        rocketLeft.setAttributeNS(null, "x", 0);
        rocketLeft.setAttributeNS(null, "y", rockets.posLeftY);
        rocketLeft.setAttributeNS(null, "width", rockets.widht);
        rocketLeft.setAttributeNS(null, "height", rockets.height);
        rocketLeft.setAttributeNS(null, "fill", "grey");
        
        svg.append(rocketLeft);
      }

      toDrawRightRocket();
      function toDrawRightRocket(){
      let rocketRight = document.createElementNS(svgNS, "rect");
      
      rocketRight.setAttributeNS(null, "id", "rocketRight");
      rocketRight.setAttributeNS(null, "x", cort.width - rockets.widht);
      rocketRight.setAttributeNS(null, "y", rockets.posRightY);
      rocketRight.setAttributeNS(null, "width", rockets.widht);
      rocketRight.setAttributeNS(null, "height", rockets.height);
      rocketRight.setAttributeNS(null, "fill", "grey");
      
      svg.append(rocketRight);
      }
      
      toDrawBall();
      function toDrawBall(){
        let ballDraw = document.createElementNS(svgNS, "circle");
        
        ballDraw.setAttributeNS(null, "id", "ball");
        ballDraw.setAttributeNS(null, "cx", ball.posX);
        ballDraw.setAttributeNS(null, "cy", ball.posY);
        ballDraw.setAttributeNS(null, "r", ball.radius);
        ballDraw.setAttributeNS(null, "fill", "yellow");
        
        svg.append(ballDraw);
      }

      toDrawGoll();
      function toDrawGoll(){   
      let count = document.createElementNS(svgNS, "text");
      
      count.setAttributeNS(null, "id", "goll");
      count.setAttributeNS(null, "x", cort.width / 2);
      count.setAttributeNS(null, "y", cort.height /3);
      count.setAttributeNS(null, "fill", "red");
      count.setAttributeNS(null, "font-size", 70);
      count.setAttributeNS(null, "text-anchor", "middle");

      svg.append(count);
    } 
    
    // движение шарика
    function getMoveBall(){
      let leftRocket = document.getElementById("rocketLeft");
      let rightRocket = document.getElementById("rocketRight");
      let leftRocketY = +leftRocket.getAttributeNS(null, "y");
      let rightRocketY = +rightRocket.getAttributeNS(null, "y");
      let rightRocketW = +rightRocket.getAttributeNS(null, "width");
      let leftRocketW = +leftRocket.getAttributeNS(null, "width");

      ball.posX += ball.speedX * vectorX;
      ball.posY += ball.speedY * vectorY;
        
      // вылетел ли мяч правее стены?
      if(ball.posX + ball.radius > cort.width - rightRocketW){
        if(ball.posY >= rightRocketY && ball.posY <= rightRocketY + rockets.height){
          ball.speedX = -ball.speedX * ball.accel;
          ball.posX = (cort.width - rightRocketW) - ball.radius; 
        }else{
          ball.speedX = 0;
          ball.speedY = 0;
          ball.posX = cort.width - ball.radius;

          let b = document.getElementById("ball");
          b.remove();
          toDrawBall();
          leftPoints();
          
          if(leftPoint < counterMax){
            getGollStyle("GOLL");
            setTimeout(getNextStart, 1000);
            return;
          }else{
            getGollStyle("GOLL");
            setTimeout(function(){
              getGollStyle("победил левый игрок");
            },1000);
            start.disabled = false;
            return;
          }
        }
      }
      // вылетел ли мяч левее стены?
      if(ball.posX - ball.radius < leftRocketW){
        if(ball.posY >= leftRocketY && ball.posY <= leftRocketY + rockets.height){
          ball.speedX = -ball.speedX * ball.accel;
          ball.posX = leftRocketW + ball.radius;
        }else{
          ball.speedX = 0;
          ball.speedY = 0;
          ball.posX = ball.radius; 

          let b = document.getElementById("ball");
          b.remove();
          toDrawBall();
          rightPoints();
          
          if(rightPoint < counterMax){
            getGollStyle("GOLL");
            setTimeout(getNextStart, 1000);
            return;
          }else{
            getGollStyle("GOLL");
            setTimeout(function(){
              getGollStyle("победил правый игрок");
            },1000);  
            start.disabled = false;
            return;
          } 
        }
      }
      // вылетел ли мяч ниже пола?
      if(ball.posY + ball.radius > cort.height){
        ball.speedY = -ball.speedY * ball.accel;
        ball.posY = cort.height - ball.radius;  
      }
      // вылетел ли мяч выше потолка?
      if(ball.posY - ball.radius < 0){
        ball.speedY = -ball.speedY * ball.accel;
        ball.posY = ball.radius;
      }
      let b = document.getElementById("ball");
      b.remove();  
      toDrawBall();
      requestAnimationFrame(getMoveBall);
    }

    // управление ракетками
    (function getControlRockets(){    
      let a = null;
      let b = null;
   
      document.addEventListener("keydown", function(event){
        event.preventDefault();
        if(event.code == "ControlLeft" && !event.repeat){
          requestAnimationFrame(goDownLeft);
        }
        if(event.code == "ShiftLeft" && !event.repeat){
          requestAnimationFrame(goUpLeft);
        }
        if(event.code == "ArrowDown" && !event.repeat){
          requestAnimationFrame(goDownRight);
        }
        if(event.code == "ArrowUp" && !event.repeat){
          requestAnimationFrame(goUpRight);
        }
      })   
    
      document.addEventListener("keyup", function(event){
        event.preventDefault();
        if(event.code == "ControlLeft"){
          cancelAnimationFrame(a);
        }
        if(event.code == "ShiftLeft"){
          cancelAnimationFrame(a);
        }
        if(event.code == "ArrowDown"){
          cancelAnimationFrame(b);
        }
        if(event.code == "ArrowUp"){
          cancelAnimationFrame(b);
        }
      })  

      function goDownLeft(){
        if(rockets.posLeftY < cort.height - rockets.height){
          rockets.posLeftY += rockets.stepMove;
          let left = document.getElementById("rocketLeft");
          left.remove();
          toDrawLeftRocket();
          a = requestAnimationFrame(goDownLeft);
        }
      }  

      function goUpLeft(){
        if(rockets.posLeftY > 0){
          rockets.posLeftY -= rockets.stepMove;
          let left = document.getElementById("rocketLeft");
          left.remove();
          toDrawLeftRocket();
          a = requestAnimationFrame(goUpLeft);
        }
      }  

      function goDownRight(){
        if(rockets.posRightY < cort.height - rockets.height){
          rockets.posRightY += rockets.stepMove;
          let right = document.getElementById("rocketRight");
          right.remove();
          toDrawRightRocket();
          b = requestAnimationFrame(goDownRight);
        }
      }  

      function goUpRight(){
        if(rockets.posRightY > 0){
          rockets.posRightY -= rockets.stepMove;
          let right = document.getElementById("rocketRight");
          right.remove();
          toDrawRightRocket();
          b = requestAnimationFrame(goUpRight);
        }
      }
    })();

    // стартовая позиция
    function getStartPosition(){
      document.getElementById("ball").remove();
      document.getElementById("rocketLeft").remove();
      document.getElementById("rocketRight").remove();

      ball.posX = cort.width / 2;
      ball.posY = cort.height / 2;
      ball.speedX = 3;
      ball.speedY = 3;
     
      rockets.posLeftY = 0;
      rockets.posRightY = 0;
      
      toDrawBall();
      toDrawRightRocket();
      toDrawLeftRocket();
    }
    
    // начало отсчета и старт игры
    function startCounter(){    
      setTimeout(function(){
        getGollStyle("3");
        setTimeout(function(){
          getGollStyle("2");
          setTimeout(function(){
            getGollStyle("1");
            setTimeout(function(){
              getGollStyle("");  
              requestAnimationFrame(getMoveBall);
            },500); 
          },1000);
        },1000);
      },0);
    }
    
    // кнопка запуска игры
    (function pressButtonStartGame(){
      let start = document.getElementById("start");

      start.addEventListener("click", function getStartGame(){
        leftPoint = -1;
        leftPoints();

        rightPoint = -1;
        rightPoints();

        vectorX = -vectorX;
        vectorY = -vectorY;
        getStartPosition();
        startCounter();
        start.disabled = true;  
      });
    })();

    // счетчик очков
    function leftPoints(){
        leftPoint++;
        let p = document.getElementById("leftScore");
        p.innerHTML = leftPoint;
    }
    function rightPoints(){
        rightPoint++;
        let p = document.getElementById("rightScore");
        p.innerHTML = rightPoint;
    }

    // оформляем текстовое извещение, когда забивают ГОЛ
    function getGollStyle(txt){
      let goll = document.getElementById("goll");
      goll.innerHTML = txt;
    }

    // запуск игры после забитого гола
    function getNextStart(){
        getGollStyle("")
        getStartPosition();
        //задаем начальный вектор движения шара
        vectorX = -vectorX;
        vectorY = -vectorY;
        startCounter();
    }


