var Bomberman = function() {
		
	socketio = io.connect("127.0.0.1:3000");   
	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	
	/**
	 * Class : Screen(Object params)
	 * @Docs : Permet de construir un objet Screen 
	 */
	ScreenConstructor = function Screen (params){
		
		this.cellWidth = params.cellWidth; 
		this.cellHeight = params.cellHeight;
		this.screenWidth = params.screenWidth;
		this.screenHeight = params.screenHeight;
		this.$elem = params.$elem;
		this.ScreenWidthCell = (this.screenWidth/this.cellWidth);
		this.ScreenHeightCell = (this.screenHeight/this.cellHeight);
		
		this.build();	
	};


	/**
	 * method : buid()
	 * @Docs : build coordinates y and x for the grid
	 */
	ScreenConstructor.prototype.build = function(){

		var width = this.$elem.width()/this.cellWidth;
		var height = this.$elem.height()/this.cellWidth;
		var grid = [];
		
		this.$elem
		.width(this.screenWidth)
		.height(this.screenHeight);


		for(var y = 0; y < height; y++){
			grid[y] = [];
			for(var x = 0; x < width; x++){
				grid[y][x] = new SpriteConstructor(x,y);
				grid[y][x].build();
			}
		}		

	};


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	
	/**
	 * Class : Map()
	 * @Docs : Permet de construir le tableau et ses coordonnées y puis x  
	 */
	MapConstructor = function Map(width, height) {
		this.map = [];
		for(var y = 0; y < height; y++){
			this.map[y] = [];
			for(var x = 0 ;x < width; x++){
				this.map[y][x] = new CellConstructor(x,y);
			}
		}
	};

	/**
	 * method : addItems()
	 * @Docs : Permet d'ajouter les items sur la map  
	 */
	MapConstructor.prototype.addItems = function(items){
		for(var i = 0; i < items.length; i++){
			for(var x = 0; x < items[i].value.width; x++){
				for(var y = 0; y < items[i].value.height; y++){
					var currentCell = this.map[y+items[i].value.coords.y][x+items[i].value.coords.x];
					currentCell.addSprite(items[i].value.img,x,y);
					currentCell.action = items[i].value.action;
					currentCell.proba = items[i].value.proba;
					currentCell.map = items[i].value.map;
				}
			}
		}
	};
	
	/**
	 * method : isWalkable()
	 * return : true | false
	 * @Docs : permet de savoir si la case est walkable  
	 */
	MapConstructor.prototype.isWalkable = function(y, x){		
		var actionSprite = Map.map[y][x].action;
		switch (actionSprite){
			case 'conflict' : return false;
			default : return true;
		}
	};


/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


	/**
	 * method : Item(int y, int x, int height, int width, string img, string action [,int proba])
	 * @Docs : Permet de construir une Item  
	 */
	ItemConstructor = function Item(params){		
		this.width = params.width;
		this.height = params.height;
		this.coords = { x : params.x, y : params.y };
		this.img = 'img/'+ params.img;
		this.action = params.action.type;
		this.proba = params.action.proba;
	
	};

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

		
	/**
	 * Class : Cell()
	 * @Docs : Permet de construir une cellule  
	 */
	var CellConstructor = function Cell(x,y) {
		this.sprite = null;
		this.x = x;
		this.y = y;
		this.render = [];
	};


	/**
	 * method : addSprite()
	 * @Docs : Recupère les coordonnées et coupe l'image en sprite grâce à la method updateRender
	 */
	CellConstructor.prototype.addSprite = function(img,x,y) {
		this.sprite = { img : img, x : x, y : y };
		var render = $('<div class="sprite"></div>').appendTo('.screen');
		render.width(Screen.cellWidth);
		render.height(Screen.cellHeight);
		render.css({
			'position': 'absolute',
			'top': (this.y*Screen.cellHeight)+'px',
			'left' : (this.x*Screen.cellWidth)+'px',
			'overflow' : 'hidden',
			'background-image' : 'url('+this.sprite.img+')',
			'background-position' : (this.sprite.x*Screen.cellWidth*-1)+'px '+(this.sprite.y*Screen.cellHeight*-1)+'px'
		});
		this.render.push(render);
	};
	

/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

	/**
	 * Class : Sprite(int x, int y)
	 * @Docs : Sprite constructor
	 */
	var SpriteConstructor = function Sprite(x,y) {
		this.x = x;
		this.y = y;
	};


	/**
	 * method : build()
	 * @Docs : build the sprite with the good size and give it the good position on the grid
	 */
	SpriteConstructor.prototype.build = function() {
		$('<div data-y="'+this.y+'" data-x="'+this.x+'" class="sprite"></div>')
		.appendTo(Screen.$elem)
		.width(Screen.cellWidth)
		.height(Screen.cellWidth)
		.css({
			'position': 'absolute',
			'top': (this.y*Screen.cellWidth)+'px',
			'left': (this.x*Screen.cellWidth)+'px',
			'overflow': 'hidden'
		});

	};
	
/*--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
	
	
	/**
	 * Class : Sasha(jQuery sasha, string direction, obj position)
	 * @Docs : Permet de construir un objet Sasha
	 */
	BobConstructor = function Bob(params) {
		this.userID = params.userID;
		this.y = params.position.top;
		this.x = params.position.left;
		this.speed = params.speed;

		this.spriteCharacter = this.chooseCharacter(params.character);

		Screen.$elem.append('<div class="'+params.bobSprite+'"></div>');
		this.bobSprite = $('.' + params.bobSprite);
		
		//this.spriteCharacter = { x: 0, y: 128};
		this.bobSprite.css({
			width : Screen.cellWidth,
			height : Screen.cellHeight,
			'position' : 'absolute',
			'overflow' : 'hidden',
			'background-image': 'url(../img/perso.png)',
			'background-position' : this.spriteCharacter.x+'px '+this.spriteCharacter.y+'px',			
			'z-index' : 2000			
		});
		this.direction = params.direction;
		this.step = 'a';
		this.bobSprite.css({'top':(this.y*Screen.cellHeight)+'px', 'left':(this.x*Screen.cellWidth)+'px' });
		this.isRuning = false;

		if (this.userID == currentUserID) this.initKeyboard();
	};
	
	

	BobConstructor.prototype.chooseCharacter = function(character){
		var spriteCharacter = null;
		switch (character){
			case 'A' : 
				spriteCharacter = { x: 0, y: 0};
				break;
			case 'B' : 
				spriteCharacter = { x: 0, y: 128};
				break;
			case 'C' : 
				spriteCharacter = { x: 288, y: 0};
				break;
			case 'D' : 
				spriteCharacter = { x: 192, y: 0};
				break;
			case 'E' : 
				spriteCharacter = { x: 96, y: 0};
				break;
			case 'F' : 
				spriteCharacter = { x: 289, y: 128};
				break;
			case 'G' : 
				spriteCharacter = { x: 192, y: 128};
				break;	
		}
		return spriteCharacter;
	};
	
	/**
	 * method : forward(direction)
	 * @Docs : Permet de faire avancer la position de Sasha
	 * return la position de la case précédente
	 */
	BobConstructor.prototype.forward = function(){
		var prevCoords = {	
			x : this.x,
			y : this.y
		};
		
		switch (this.direction){
			case 'right' : 
				this.x += 1;
				break;
			case 'left' : 
				this.x -= 1;
				break;
			case 'up' : 
				this.y -= 1;
				break;
			case 'down' : 
				this.y += 1;
				break;
		}
		return prevCoords;
	};
	
	/**
	 * method : updateRender(direction)
	 * @Docs : Permet de mettre à jour le rendu de Sasha sur la carte
	 */
	BobConstructor.prototype.updateRender = function(coords, progress){
		var top = coords.y * Screen.cellHeight;
		var left = coords.x * Screen.cellWidth;

		var spriteCharacter = {}
		spriteCharacter.x = this.spriteCharacter.x;
		spriteCharacter.y = this.spriteCharacter.y;


		if(this.step == 'a') this.step = 'b';
		else this.step = 'a';

		switch (this.direction){
			case 'right' : 
				left += Screen.cellWidth * progress;
				spriteCharacter.y = spriteCharacter.y - 64
				if (this.step == 'a') spriteCharacter.x = spriteCharacter.x - 64;
				break;
			case 'left' : 
				left -= Screen.cellWidth * progress;
				spriteCharacter.y = spriteCharacter.y - 32;				
				if (this.step == 'a') spriteCharacter.x = spriteCharacter.x - 64;
				break;
			case 'up' : 
				top -= Screen.cellHeight * progress;
				spriteCharacter.y = spriteCharacter.y - 96;								
				if (this.step == 'a') spriteCharacter.x = spriteCharacter.x - 64;
				break;
			case 'down' : 
				top += Screen.cellHeight * progress;
				spriteCharacter.y =  this.spriteCharacter.y;								
				if (this.step == 'a') spriteCharacter.x = this.spriteCharacter.x - 64;
				break;
		}

		
		var user = {};
		user.selector = this.bobSprite.selector;
		user.step = this.step;
		user.spriteCharacter = {
			x: spriteCharacter.x,
			y: spriteCharacter.y
		};
		user.position = {
			top: top,
			left:left
		};

		this.updateRenderBySocket(user);

	};

	BobConstructor.prototype.updateRenderBySocket = function (user) {

		socketio.emit("updatePositionTS", user);		
		socketio.on('updatePositionTC', function(user) {
			$(user.selector).css({
				'top' : user.position.top+'px',
				'left' : user.position.left+'px',
				'background-position' : user.spriteCharacter.x+'px '+user.spriteCharacter.y+'px'				
			}); 
		});	
	};
	
	
	/**
	 * method : moveTo(string direction)
	 * @Docs : Permet de faire bouger Sasha sur la map
	 */
	BobConstructor.prototype.moveTo = function(direction){
		
		var self = this;
		this.timerMoveTo = null;
		this.previousTime = +(new Date);
		this.currentTime = +(new Date);
		this.timeGoCell = this.speed;
		this.progress = 0;
		this.currentStep = 0;
		
		
		
		if(this.canMoveTo(direction)){
			
			var prevPosition = self.forward();
			
			this.timerMoveTo = window.setInterval(function(){
				var newStep;			
				//Calcul du pourcentage de progression dans la case 
				//obtenu par le ratio du temps parcouru sur le temps que l'on met à parcourir une cellule
				self.currentTime = +(new Date);
				self.progress = ((self.currentTime - self.previousTime) % self.timeGoCell) / self.timeGoCell;
				

				newStep = Math.floor((self.currentTime - self.previousTime) / self.timeGoCell);
				
				//si on change de case alors on marque le new step et on clear l'interval 
				if(newStep != self.currentStep){
					self.currentStep = newStep;
					if(self.canMoveTo(self.direction)){
						prevPosition = self.forward();
						self.updateRender(prevPosition, self.progress);
					} else{
						self.updateRender(prevPosition, 1);
						clearInterval(self.timerMoveTo);
						self.timerMoveTo = null;
					} 
				} else {
					self.updateRender(prevPosition, self.progress);
				}
			},30);
			
		}		
	};
	

	

	
	/**
	 * method : canMoveTo(string direction)
	 * @Docs : Permet de tester si Sasha peut bouger sur la map
	 */
	BobConstructor.prototype.canMoveTo = function(direction){
		var ScreenWidthCell = Screen.ScreenWidthCell;
		var ScreenHeightCell = Screen.ScreenHeightCell;
		
		if (this.isPress != true) return false;
		switch (direction){
			case 'right' : 
				if(this.x+1 >= ScreenWidthCell){
					return false;
				} else{
					return Map.isWalkable(this.y,this.x+1);
				}	
			case 'left' : 
				if(this.x-1 < 0){
					return false;
				} else {
					return Map.isWalkable(this.y,this.x-1)
				}
			case 'up' : 
				if(this.y-1 < 0){
					return false;
				} else {
					return Map.isWalkable(this.y-1,this.x);
				}
			case 'down' : 
				if(this.y+1 >= ScreenHeightCell){
					return false;
				} else {
					return Map.isWalkable(this.y+1,this.x);
				}
		}
	};
	


	BobConstructor.prototype.initKeyboard = function () {
		var self = this;
		this.isPress = false;
				
		$(document).on('keydown', function(e){
			if (self.timerMoveTo) return ;
			switch(e.keyCode ) {
				case 37 : 
					this.direction = 'left';
					break;
				case 38 : 
					this.direction = 'up';
					break;
				case 39 : 
					this.direction = 'right';
					break;
				case 40 : 
					this.direction = 'down';
					break;
				default : 
					break;	
			}

			self.direction = this.direction;
			self.isPress = true;
			self.moveTo(self.direction);

		});

		$(window).keyup(function () {	
			self.isPress = false;
			if (self.timerMoveTo) return ;
		
		});
	};

	

	
};

$(function () { Bomberman(); });



