game.module(
    'game.main'
)
.require(
    'game.assets',
    'game.objects'
)
.body(function() {

game.createScene('Main', {
    init: function() {
        var score = 0;
        var counter = 0;
        var levels = 1
        
        /**
        * This is the part where the game score is being manipulated; 
        */
        this.addTimer(300, function() {     
            
            // iterate this variable which will be used as the score
            counter++;                   
            // Call the function to display the score
            // Parameter: counter variable which uses seconds
            game.scene.addScore(counter++);
            if( counter > 450 && counter < 900){
                //levels += 1;
                levels = 2; 
                game.scene.addLevels(levels);return;
            }
            else if( counter > 900  && counter < 1350 ) {
                levels = 3;
                game.scene.addLevels(levels);return;
            }
            else if( counter > 1350 ) {
                levels = 4;
                game.scene.addLevels(levels);return;
            }
            //console.log(this.addTimer.time());                   
        }, true);

        this.world = new game.World(0, 2000);
        var floorBody = new game.Body({
            position: {
                x: game.system.width / 2,
                y: game.system.height - 40
            },
            collisionGroup: 1
        });
        var floorShape = new game.Rectangle(game.system.width, 50);
        floorBody.addShape(floorShape);
        this.world.addBody(floorBody);

        var bg = new game.Sprite('02_sky_moon.png').addTo(this.stage);
        this.addParallax('05_city.png', 150, -200);
        this.addParallax('04_city.png', 100, -300);
        this.addParallax('05_trees.png', 100, -400);
        this.addParallax('05_bush.png', 50, -500);
        this.addParallax('platform.png', 0, -600);

        this.objectContainer = new game.Container().addTo(this.stage);
        this.playerContainer = new game.Container().addTo(this.stage);

        this.player = new game.Player(400, game.system.height - 400);
        this.player.sprite.addTo(this.playerContainer);

        this.addTimer(1500, this.spawnRandomObject.bind(this), true);
        this.spawnRandomObject();


        /**
        * This is the part where the score is added to the game scene
        */
        this.scoreText = new game.BitmapText('', { font: 'Cartoon' });
        this.scoreText.position.set(12, game.system.height - 45);
        this.addScore(0);
        this.stage.addChild(this.scoreText);

        /**
        * This is the part where the game level is added to the game scene
        */
        this.levelsText = new game.BitmapText('', { font: 'Cartoon' });
        this.levelsText.position.set(game.system.width / 2 - 100, game.system.height - 45);
        this.addLevels(1);
        this.stage.addChild(this.levelsText);
    },

    addScore: function(amount) {
        console.log('Amount is' + amount);
        //console.log('Scire is' + this.score);
        this.score += amount;
        //this.scoreText.setText('SCORE: ' + this.score.toString());
        this.scoreText.setText('DISTANCE: ' + amount + ' m');

        if( amount > 250 ) { // 450 is the limit for each level; incrementally adds 450 for each level

            console.log("You have now reached a new level");

        }
    },

    addLevels: function(amount) {
        this.levels += amount;
        //this.movesText.setText('MOVES: ' + this.moves.toString());
        this.levelsText.setText('LEVEL: ' + amount);
    },

    spawnRandomObject: function() {
        var rand = Math.random();

        if (rand < 0.5) {
            var coin = new game.Coin(game.system.width, 400 + Math.random() * 400);
        }
        else if (rand < 0.8) {
            var oneway = new game.Oneway(game.system.width, 700);
        }
        else {
            var tires = new game.Tires(game.system.width, 850);
        }
    },

    addParallax: function(texture, pos, speed) {
        var sprite = new game.TilingSprite(texture, game.system.width);
        sprite.speed.x = speed;
        sprite.position.y = game.system.height - sprite.height - pos;
        this.addObject(sprite);
        this.stage.addChild(sprite);
        console.log("Sprite speed x: " + sprite.speed.x);
    },

    mousedown: function() {
        this.player.jump();
    },

    keydown: function(key) {
        if (key === 'SPACE') this.player.jump();
    }
});

});
