var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1, 
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                {type: 'myObstacle', x:100, y:200}
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(true);

        // BEGIN EDITING YOUR CODE HERE
       var hitZoneSize = 25;
       var damageFromObstacle = 10;
       var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
       
       sawBladeHitZone.x = 400;
       sawBladeHitZone.y = 200;
       
       game.addGameItem(sawBladeHitZone); 
       
        function createSawBlade(x, y) {
       x = sawBladeHitZone.x;
       y = sawBladeHitZone.y;
        } 
         createSawBlade(500, 100);
         createSawBlade(300, 300);
         createSawBlade(450, 150);
         createSawBlade(550, 250);
         createSawBlade(350, 190);
       
       var obstacleImage = draw.bitmap('img/sawblade.png');
       sawBladeHitZone.addChild(obstacleImage);
       obstacleImage.x = -25;
       obstacleImage.y = -25;
      
         
        var firstGameItemObject = levelData.gameItems[0];
        var firstX = firstGameItemObject.x;
        var firstY = firstGameItemObject.y;
        createSawBlade(firstX, firstY);
       for (var i = 0; i < levelData.gameItems.length; i++) {
    var createSawblade = levelData.gameItems[i];

}
        
        function createMyObstacle(x,y) {
   
        };
        createMyObstacle(100,200);
        
        var enemy =  game.createGameItem('enemy',25);
        var redSquare = draw.rect(50,50,'gold');
        redSquare.x = -25;
        redSquare.y = -25;
        enemy.addChild(redSquare);
      
        
        enemy.x = 400;
        enemy.y = groundY-50;
        game.addGameItem(enemy);
        enemy.velocityX = -1;
         var rotationVelocity = 10;
         
         enemy.onPlayerCollision = function() {
             console.log('The enemy has hit Halle');
         };
         game.changeIntegrity(10);
          game.changeIntegrity(-10);
          
        function onProjectileCollision(){
              console.log('Halle has hit the enemy');
        }
        game.increaseScore(100);
       
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
