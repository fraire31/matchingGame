var memory_array = ['A','A','B','B','C','C','D','D','E','E','F','F','G','G','H','H', 'I','I', 'J', 'J', 'K','K','L','L'];
var memory_values = [];
var memory_tile_ids = [];
var tiles_flipped = 0 ;
 


//SHUFFLE METHOD TO SHUFFLE FOR NEW GAME
function shuffleArray(array){
	for(var i = array.length -1; i > 0; i--){
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;

	}
}

shuffleArray(memory_array);

//GENERATING A NEW BOARD 
//FOR LOOP FOR ARRAY WITH LETTERS
function newBoard(){ //SENDING TO ARGUMENTS TO FUNCTION, 1.THIS = DIV , DATA = ITEM IN ARRAY
	tiles_flipped = 0;
	var output = '';
	for(var i = 0; i < memory_array.length; i++){ 
		output += '<div class="inside" id="tile_ '+ i +'" onclick="memoryFlipTile(this,\'' + memory_array[i] + '\')"></div>';
	}

	document.getElementById('memory_board').innerHTML = output;
}


//MEMORY FLIPTILE FUNCTION
//the arguments come from the onclick values we set up earlier
function memoryFlipTile(tile,val){


	if(this.innerHTML == null && memory_values.length < 2){ //IF THE TILE IS EMPTY AND ARRAY IS LESS THAT 2
		tile.classList.remove('inside');
		tile.style.backgroundColor = 'white'
		tile.innerHTML = val; //WHEN CLICKED THE TILE WITH INHERIT VAL'S LETTER - SET RIGHT ABOVE

		if(memory_values.length == 0){ //WHICH IS BY DEFAULT
			memory_values.push(val);  //PUSH THE LETTER TO MEMORYVALUE ARRAY
			memory_tile_ids.push(tile.id); //PUSH TILES ID TOANOTHER ARRAY

		}else if(memory_values.length == 1){ //IF THIS ARRAY HAS ONE THEN USER CAN STILL CLICK TO GET SECOND MATCH
			memory_values.push(val); //THE VALUE OF THIS CARD GETS PUSHED AS WELL
			memory_tile_ids.push(tile.id);
			if(memory_values[0] == memory_values[1]){ //NOW WE CHECK IF BOTH OF THE CARDS MATCH
				function matchingCards(){
					tiles_flipped += 2; //IF THEY DO MATCH THAN ADD 2 POINTS TO TILES MATCH ARRAY
					var tile_1 = document.getElementById(memory_tile_ids[0])
					var tile_2 = document.getElementById(memory_tile_ids[1])
					
					tile_1.innerHTML = '';
					tile_2.innerHTML ='';


					tile_1.classList += 'match';
					tile_2.classList += 'match';

					console.log(tiles_flipped);
					

					//CLEAR BOTH ARRAYS TO START OVER FOR THE NEXT MATCH
					memory_values = [];
					memory_tile_ids = [];
				} setTimeout(matchingCards, 700 );
				

			}else{
				function flip2Back(){ //IF THE CARDS DONT MATCH
					//Flip the 2 tiles back over
					var tile_1 = document.getElementById(memory_tile_ids[0]);
					var tile_2 = document.getElementById(memory_tile_ids[1]);
					tile_1.classList += 'inside';
					tile_1.innerHTML = "" ;
					tile_2.classList += 'inside';
					tile_2.innerHTML = "";
					//clear both arrays
					memory_values = [];
					memory_tile_ids = [];

				}
				setTimeout(flip2Back, 700);
			}
		}
	}
}

