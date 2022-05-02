import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection } from './snake.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'
//this is the root js document, that I have called all functions for as well as importing/exporting from 
//other documents. 
let lastRenderTime = 0
let gameOver = false
const gameBoard = document.getElementById('game-board')

function main(currentTime) {
  if (gameOver) {
    if (confirm('You lost. Press Restart Snake to restart.')) {
      window.location = '/'
      
    }
    return
  }


  window.requestAnimationFrame(main)
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return


  lastRenderTime = currentTime
  draw()
}

window.requestAnimationFrame(main)
//I will be updating snake, food, and the snake's final 'death' in this function when it eats, runs into a wall, or runs into itself. 
function update() {
  updateSnake()
  updateFood()
  checkDeath()
}
// this function here is more for the game board itself, when it comes to the grid and where the food, snake is positioned. 
function draw() {
  gameBoard.innerHTML = ''
  drawSnake(gameBoard)
  drawFood(gameBoard)
}
//this function serves pupose to the outcome of the snake, if it died by hitting itself or the wall. 
function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}