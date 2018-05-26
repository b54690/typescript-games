//Setup a webserver using routing-controllers and 
//create a `GET /games` endpoint that returns 
//all the games (with envelope!)
//http :4000/games

import {JsonController, Get, Post, BodyParam, Body, BadRequestError, HttpCode, NotFoundError, Param, Put, MethodNotAllowedError,} from 'routing-controllers'
import Game from './entity'

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

    @Post('/games')
    @HttpCode(201)
    createGame(@Body() game: Game) {
      const setColor = () => {
        const colors= ["Red", "Blue", "Yellow", "Green", "Magenta"]
        return colors[Math.floor(Math.random()* colors.length)]
      }
      game.color = setColor()
      console.log(`the new game color is ${game.color}`)
      return game.save()
      
}
}