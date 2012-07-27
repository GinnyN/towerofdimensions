var usuario;
var document;

$(document).ready(function(){
		$("#login").submit(
			function(e){
				e.preventDefault();
				var login = $("#nameLogin").val();

				$.ajax({
					url: "php/newUser.php",
					type: "POST",
					data: {login: login},
					success: function(object){
						usuario = jQuery.parseJSON(object);
						
						$.each(usuario,
							function(i, attr){
								if(attr == null)
									attr = [];
							}
						);
						
						$("#principal").html("");
						$("#menu").html('<ul id="menuList"><li id="dashboard">Dashboard</li><li id="dimensiones">Dimensiones</li><li id="tienda">Tienda</li><li id="mercenarios">Mercenarios</li></ul>');
						
						html="Nombre: "+usuario.name+" ";
						html=html+"Dinero: "+usuario.dinero+" ";
						
						$("#datos").html(html);
						
						setMenu();
					},
					error: function(){alert("Fail!")}
				});

				
			}
		);
		
		$(window).unload(function() {
		  $.ajax({
				url: "php/save.php",
				type: "POST",
				success: function(){
				},
				error: function(){alert("Fail!")}
			});
		});
	}
);

function formatTime(time) {
    sec_numb    = parseInt(time);
    var hours   = Math.floor(sec_numb / 3600);
    var minutes = Math.floor((sec_numb - (hours * 3600)) / 60);
    var seconds = sec_numb - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    time    = hours+'hrs '+minutes+'mns '+seconds+"secs";
    return time;
}
