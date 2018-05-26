//Setup a webserver using routing-controllers and 
//create a `GET /games` endpoint that returns 
//all the games (with envelope!)

import {JsonController, Get, Post, BodyParam, Body, BadRequestError, HttpCode, NotFoundError, Param, Put, MethodNotAllowedError,} from 'routing-controllers'
import Game from './entity'

@JsonController()
export default class GameController {

    @Get('/games')
    async allGames() {
        const games = await Game.find()
        return {games}
    }
}