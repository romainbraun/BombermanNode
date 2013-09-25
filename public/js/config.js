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
				img : 'maps/wall.jpg',
				action : { 
					type : 'conflict', 
					proba : 1
				} 
			})
		}		
	];
	Map.addItems(items);

	







	var characterIsChoosen = false;

	if (localStorage.currentUserID === '' || localStorage.currentUserID === undefined) {
		currentUserID = Math.floor(Math.random() * 1000);
		localStorage.setItem('currentUserID', currentUserID);
	} else {
		currentUserID = localStorage.currentUserID;
		if (characterIsChoosen) { 
			$('.characters-container').hide();
		}
	}

	
	socketio.on('retriveCharactersTC', function (users) {
		console.log(currentUserID);
		console.log(users);
		for (var i in users) {
			new BobConstructor({
				userID : users[i].userID,
				bobSprite : users[i].bobSprite, 
				character: users[i].character,
				direction : users[i].direction,
				speed : users[i].speed,
				position : {
					top : users[i].position.top,
					left : users[i].position.left
				}
			});
		}
	});



	socketio.on("createBobTC", function (user) {
		
		new BobConstructor({
			userID : user.userID,
			bobSprite : user.bobSprite, 
			character: user.character,
			direction : user.direction,
			speed : user.speed,
			position : {
				top : user.position.top,
				left : user.position.left
			}
		});

	 });

	$('.character').on('click', function() {

		characterIsChoosen = true;
		$('.characters-container').hide();
		
		var user = {
			userID : currentUserID,
			bobSprite : 'sacha'+currentUserID,
			character : $(this).attr('data-character'), 
			direction : 'down',
			speed : 500,
			position : {
				top : Math.floor(Math.random() * 11),
				left : Math.floor(Math.random() * 11)
			}
		};
		
		socketio.emit("createBobTS", user);

	});


});