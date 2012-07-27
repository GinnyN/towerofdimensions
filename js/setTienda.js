function setTienda(){
	$("#tienda").click(
		function(){
			html = "<ul id='storeTabs'>";
				html = html + "<li id='equipable'>Equip</li>";
				html = html + "<li id='consumable'>Items</li>";
				html = html + "<li id='material'>Material</li>";
			html = html+"</ul>";
			html = html + "<div id='store'></div>";
			html = html + "<div id='inventory'></div>";
		
			$("#principal").html(html);
			
			$("#equipable").click(
				function(){
					var category = "Equipable";
					fillStore(category);
				}	
			);
			$("#consumable").click(
				function(){
					var category = "Consumable";
					fillStore(category);
				}	
			);
			$("#material").click(
				function(){
					var category = "Material";
					fillStore(category);
				}	
			);
			
			fillInventory();
		}
	);
}

function fillInventory(){
	
	html = "<ul>";
	
	$.each(usuario.items,
		function(i,item){
			html = html + "<li class='sell sell"+item.idBase+"'>"+item.nombre;
				html = html + "<ul>";
					html = html + "<li>" + item.descripcion + "</li>";
					html = html + "<li>Precio de Venta: "+(parseInt(item.valor)/2)+"</li>"; 
				html = html + "</ul>";
			html = html + "</li>";
		}
	);
	
	html = html + "</ul>";
	
	$("#inventory").html(html);
}

function fillStore(category){
	$.ajax({
		url: "json/items.json",
		success: function(object){
			var disponible = [];
			$.each(usuario.dimensiones,
				function(i,dimension){
					disponible.push(dimension.idBase);
				}
			);
			html = "<ul>";
			$.each(object.item,
				function(i,item){
					if(item.category == category && i != 0 && $.inArray(item.disponible, disponible) > -1){
						html = html + "<li class='buy buy"+item.idBase+"' >"+item.nombre+"<ul>";
							html = html + "<li>Valor: "+item.valor +"</li>";
							html = html + "<li>Descripcion: "+item.descripcion +"</li>";
						html = html + "</ul></li>";
					}
				}
			);
			html = html + "</ul>";
			
			$("#store").html(html);
			
			$(".buy").click(
				function(){
					var id = $(this).attr("class").split('buy buy')[1];
					html = "<div class='confirmation'>";
						html = html + "Comprar?";
						html = html + "<span id='yes'>Yes</span>";
						html = html + "<span id='no'>No</span>";
					html = html + "</div>"
					
					$("#principal").append(html);
					
					$("#no").click(function(){$(this).parent().remove();});
					$("#yes").click(function(){
						buyItem(id);
						$(this).parent().remove();
					});
				}
			);
		}
	});
}

function buyItem(id){
	$.ajax({
		url: "json/items.json",
		success: function(object){
			$.each(object.item,
				function(i,item){
					if(item.idBase == id){
						if(usuario.dinero > item.valor){
							usuario.items.push(new Item(item));
							usuario.dinero = usuario.dinero - item.valor;
							return false;
						}
					}
				}
			);
			fillInventory();
			$("#datos").html("Nombre: "+usuario.name+" Dinero: "+usuario.dinero);
		}
	});
}