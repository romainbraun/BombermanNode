require(['config'], function(){
    
    
    var socketio = Rpg.socket; 

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
            new Rpg.Bob({
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
        
        new Rpg.Bob({
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