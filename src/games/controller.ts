//Setup a webserver using routing-controllers and 
//create a `GET /games` endpoint that returns 
//all the games (with envelope!)
//http :4000/games

import {JsonController, Get, Post, Body, BadRequestError, HttpCode, NotFoundError, Param, Put,} from 'routing-controllers'
import Game, { moves, boardColor, colorsAllowed, colorIsAllowed} from './entity'

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return {games}
    }

    // Add an endpoint `POST /games` for which 
    //the only input is a name. The created game 
    //should receive a random color out of these 
    //colors: red, blue, green, yellow, magenta. 
    //So every new game that gets created is 
    //assigned a random color. 
    //http post :4000/games name="ellies game"

        //When a **game starts**, your app should 
    //set the board to an empty board. The board 
    //is a two dimensional array that contains 
    //three arrays with three times the letter 'o'.

    @Post('/games')
    @HttpCode(201)
    async createGame(@Body() game: Game)
    {
        game.color = boardColor()
        console.log(`the new game color is ${game.color}`)
        const newGame = await Game.create(game).save()
        return {newGame}
}
    //Add an endpoint `PUT /games/:id` or 
    //`PATCH /games/:id` that allows to 
    //overwrite one or more fields of the game. 
    //E.g. calling `PUT /games` with 
    //JSON body `{ "name": "new name" }` 
    //should update the name, same for 
    //color and board (not for id). 
    //http put :4000/games/1 name="Barrys wicked game"

    //When a **game is changed** and the board field is updated, 
    //make sure there is only 1 move is made. That means that 
    //only one element out of the 9 can be changed into 
    //something else. You can use the function below to count 
    //the number of moves between two boards. If somebody tries 
    //to make more moves, return a `HTTP 400 Bad Request` 
    //response. If everything is fine, update the board 
    //field of the game.  \*\* 

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game> 
    ) {

        const game = await Game.findOne(id)

        if (!game) throw new NotFoundError('Cannot find game')

        if(update.color !== colorIsAllowed(update.color)) 
        throw new BadRequestError('Color choice is not permitted. Please choose from:' + colorsAllowed.join(','))

        if(update.board && moves(game.board, update.board) !== 1) 
        throw new BadRequestError('Player is allowed to make ONE move per go')
    
        return Game.merge(game, update).save()
    }

 
        

}