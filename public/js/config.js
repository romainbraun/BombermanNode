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







	$('.clear-storage').on('click', function () {
		localStorage.clear();
		window.location.reload();
	});









	if (localStorage.currentUserID === '' || localStorage.currentUserID === undefined) {
		currentUserID = Math.floor(Math.random() * 1000);
		localStorage.setItem('currentUserID', currentUserID);
	} else {
		currentUserID = localStorage.currentUserID;
		
			$('.characters-container').hide();
		
	}

	
	socketio.on('retriveCharactersTC', function (data) {
		
		$('body').append('<div>Users online : ' + data.connection  + '</div>');
		$('body').append('<div>Players : ' + data.players  + '</div>');

		for (var i in data.users) {
			new BobConstructor({
				userID : data.users[i].userID,
				bobSprite : data.users[i].bobSprite, 
				character: data.users[i].character,
				direction : data.users[i].direction,
				speed : data.users[i].speed,
				position : {
					top : data.users[i].position.top,
					left : data.users[i].position.left
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