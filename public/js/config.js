$(function () {

	Screen = new ScreenConstructor({
		screenWidth : 363,
		screenHeight : 363,
		cellWidth : 33,
		cellHeight : 33,
		$elem : $('.screen')
	});

	
	Map = new MapConstructor(Screen.screenWidth / Screen.cellWidth, Screen.screenHeight / Screen.cellHeight);


	items = 
	[
		{
			name : 'wall', 
			value :  new ItemConstructor({
				y : 1,
				x : 1,
				height : 1,
				width : 1,
				img : 'maps/wall.jpg',
				action : { 
					type : 'conflict', 
					proba : 1
				} 
			})
		},
		{
			name : 'wall', 
			value :  new ItemConstructor({
				y : 2,
				x : 2,
				height : 1,
				width : 5,
				img : 'maps/wall.jpg',
				action : { 
					type : 'conflict', 
					proba : 1
				} 
			})
		},
		{
			name : 'wall', 
			value :  new ItemConstructor({
				y : 3,
				x : 2,
				height : 1,
				width : 1,
				img : 'maps/chen/wall.jpg',
				action : { 
					type : 'conflict', 
					proba : 1
				} 
			})
		},
		{
			name : 'wall', 
			value :  new ItemConstructor({
				y : 0,
				x : 4,
				height : 1,
				width : 7,
				img : 'maps/wall.jpg',
				action : { 
					type : 'conflict', 
					proba : 1
				} 
			})
		},
		{
			name : 'wall', 
			value :  new ItemConstructor({
				y : 5,
				x : 2,
				height : 5,
				width : 1,
				img : 'maps/chen/wall.jpg',
				action : { 
					type : 'conflict', 
					proba : 1
				} 
			})
		}		
	];


	Map.addItems(items);



	currentUserID = Math.floor(Math.random() * 1000);
	var user = {
		userID : currentUserID,
		bobSprite : 'sacha'+currentUserID,
		character : 'A', 
		direction : 'down',
		speed : 500,
		position : {
			top : Math.floor(Math.random() * 11),
			left : Math.floor(Math.random() * 11)
		}
	};
	
	socketio.emit("createBobTS", user);
	socketio.on("createBobTC", function (users) {
		console.log(users);
		for (var i in users) {
			new BobConstructor({
				userID : users[i].userID,
				bobSprite : users[i].bobSprite, 
				direction : users[i].direction,
				speed : users[i].speed,
				position : {
					top : users[i].position.top,
					left : users[i].position.left
				}
			});
		}
	});

});