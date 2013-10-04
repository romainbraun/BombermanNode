require.config({
    paths: {
        'jQuery': 'lib/jquery-1.8.2.min'
    },
    shim: {
        'jQuery': {
            exports: '$'
        }
    }
});

define(['rpg', 'jQuery'], function (Rpg, $) {

	Screen = new Rpg.Screen({
	    screenWidth : 363,
	    screenHeight : 363,
	    cellWidth : 33,
	    cellHeight : 33,
	    $elem : $('.screen')
	});

	
	Map = new Rpg.Map(Screen.screenWidth / Screen.cellWidth, Screen.screenHeight / Screen.cellHeight);


	items = 
	[
	    {
	        name : 'wall', 
	        value :  new Rpg.Item({
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
	        value :  new Rpg.Item({
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
	        value :  new Rpg.Item({
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
	        value :  new Rpg.Item({
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
	        value :  new Rpg.Item({
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


});