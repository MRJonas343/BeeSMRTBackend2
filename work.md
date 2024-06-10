--- Alan, Cesarin ---

Crear la ruta /getMemoryGameLevels

La ruta es de tipo POST, y recibe los siguientes headers que seran necesarios para
crear la respuesta (email, englishLevel, Game)

Primero debera solicitar a la BD todos los niveles disponibles de ese juego


La tabla Levels se vera de la siguiente manera: 


id | EnglishLevel | LevelName   | Game         | Level

1  | A1  	  | "House"	| MemoryGame   | A1Level4

2  | A1           | "Food"	| MemoryGame   | A1Level6

3  | A1           | "Animals"   | MemoryGame   | A1Level3

2  | B1           | "Education" | Hangman      | B1level5

3  | C2           | "Law"	| DreagandDrop | C2level1

Y la consulta se veria algo asi: "SELECT EnglishLevel, LevelName, Level from Levels where Game = "req.Game"

Dicha respuesta se parseara a Json y quedara algo asi: 

const Levels = [
   {
	EnglishLevel : "A1",
	LevelName : "House",
	Level : "A1Level4"
	
   },
   {
	EnglishLevel : "A1",
	LevelName : "Food",
	Level : "A1Level1"
	
   },
   {
	EnglishLevel : "B1",
	LevelName : "Education",
	Level : "B1level5"
   },
  
]

*Ahora toca obtener el registro del puntaje del usuario en los niveles


Primero tendras que hacer una consulta a esta tabla : usersTrophys

id | Level     | Game       |  Trophys   | emailUser

1  | B2Level4  | MemoryGame | 100	 | test3@gmail.com

2  | B2Level5  | MemoryGame | 75	 | test3@gmail.com

3  | B2Level6  | MemoryGame | 50	 | test3@gmail.com

4  | A2Level3  | Hangman    | 20    	 | test3@gmail.com


La consulta se veria algo asi: "SELECT Level, Trophys from usersTrophys where
emailUser = req.email and game = req.Game"

El resultado en parseado a Json se veria algo asi: 

const userTrophys = [
   {
	Level : B2Level4,
	Trophys : 100
   },
   {
	Level : B2Level5,
	Trophys : 75
   },
   {
	Level : A2Level3,
	Trophys : 20
   }
]

--Ahora que se tienen ambos Json se necesita unirlos para enviarlos al frontEnd

--Primero crearemos el tipado:

type LevelsProgress {
  EnglishLevel : string,
  LevelName : string
  Level : string
  Trophys : number  
}

--Ahora creamos una variable que almacenara todos los datos Formateados y unidos

let data : levelProgress


--Lopear para crear la respuesta para el usuario

for (i = 0; i < Levels.length; i++){
 const EnglishLevel = Levels[i].EnglishLevel
 const LevelName = Levels[i].LevelName
 const Level = Levels[i].Level
 let Trophys = 0
 
 for(j = 0; j < userTrophys.length; j ++){
   if(userTrophys[j].Level === Level){
  	Trophys = userTrophys[j].Trophys
  	break
    }

   if(j === userTrophys.lenght-1 ){
    Trophys = 0
   }
 }
  
  data.push({
    englishLevel : EnglishLevel,
    levelName : LevelName,
    level : Level,
    Trophys : Trophys
  })
}

---Por ultimo enviamos la respuesta --

res.send(data)
res.status(200)

---------------------------------------------
Realizar todas las validaciones necesarias
Probar el endPoint cons postman





