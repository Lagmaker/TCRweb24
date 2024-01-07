const player = document.querySelector('.player');
const sounds = {
	success: new Audio('assets/sounds/success.mp3'),
	failed: new Audio('assets/sounds/failed.mp3'),
};

const gameState = {
	playerVelocity: { x: 0, y: 0 },
	playerCenter: {
		x: parseInt(window.innerWidth / 2),
		y: parseInt(window.innerHeight / 2),
	},
	capturedPokemons: [],
	availableBalls: [],
};

function createBalls() {
	for (let i = 0; i < 25; i++) {
		const ball = document.createElement('div');
		ball.classList.add('pokeball');
		let x = Math.random() * window.innerWidth + 'px';
		let y = Math.random() * window.innerHeight + 'px';
		ball.style.left = x;
		ball.style.top = y;
		gameState.availableBalls.push(ball);
		document.body.appendChild(ball);
	}
}

function spawnPokemon() {
	const pokemonNames = ['alakazam', 'arcanine', 'charizard', 'dragonite', 'gengar', 'gyarados', 'lapras', 'scyther'];
	const randomName = pokemonNames[Math.floor(Math.random() * pokemonNames.length)];
	const pokemon = document.createElement('div');
	pokemon.style.backgroundImage = `url("assets/media/pokemons/${randomName}.gif")`;
	pokemon.classList.add('pokemon');
	let x = Math.random() * window.innerWidth + 'px';
	let y = Math.random() * window.innerHeight + 'px';
	pokemon.style.left = x;
	pokemon.style.top = y;
	gameState.capturedPokemons.push(pokemon);
	document.body.appendChild(pokemon);
}

function createPokemons() {
	for (let i = 0; i < 5; i++) {
		spawnPokemon();
	}
}

function checkCollision(div1, div2) {
	const rect1 = div1.getBoundingClientRect();
	const rect2 = div2.getBoundingClientRect();
	return !(
		rect1.right < rect2.left ||
		rect1.left > rect2.right ||
		rect1.bottom < rect2.top ||
		rect1.top > rect2.bottom
	);
}

function handleCollisions() {
	gameState.capturedPokemons.forEach(pokemon => {
		if (checkCollision(pokemon, player)) {
			sounds.success.play();
			pokemon.remove();
			gameState.capturedPokemons.splice(gameState.capturedPokemons.indexOf(pokemon), 1);
		}
	});

	gameState.availableBalls.forEach(ball => {
		if (checkCollision(ball, player)) {
			sounds.failed.play();
			ball.remove();
			gameState.availableBalls.splice(gameState.availableBalls.indexOf(ball), 1);
		}
	});
}

function checkForVictory() {
	if (gameState.capturedPokemons.length === 0) {
		setTimeout(() => {
			location.reload();
		}, 1000);
	}
}

function gameLoop() {
	gameState.playerCenter.x += gameState.playerVelocity.x;
	gameState.playerCenter.y += gameState.playerVelocity.y;

	player.style.left = gameState.playerCenter.x + 'px';
	player.style.bottom = gameState.playerCenter.y + 'px';

	handleCollisions();
	checkForVictory();

	requestAnimationFrame(gameLoop);
}

function initializeGame() {
	createBalls();
	createPokemons();
	gameLoop();
}

initializeGame();

function handleKeyPress(event) {
	switch (event.key) {
		case 'ArrowUp':
		case 'w':
			gameState.playerVelocity.y = 3;
			player.style.backgroundImage = 'url("assets/images/player/move_front.png")';
			break;
		case 'ArrowDown':
		case 's':
			gameState.playerVelocity.y = -3;
			player.style.backgroundImage = 'url("assets/images/player/move_back.png")';
			break;
		case 'ArrowLeft':
		case 'a':
			gameState.playerVelocity.x = -3;
			player.style.backgroundImage = 'url("assets/images/player/move_left.png")';
			break;
		case 'ArrowRight':
		case 'd':
			gameState.playerVelocity.x = 3;
			player.style.backgroundImage = 'url("assets/images/player/move_right.png")';
			break;
	}
	player.classList.add('active');
}

function handleKeyRelease(event) {
	switch (event.key) {
		case 'ArrowUp':
		case 'ArrowDown':
		case 'ArrowLeft':
		case 'ArrowRight':
		case 'w':
		case 'a':
		case 's':
		case 'd':
			gameState.playerVelocity.x = 0;
			gameState.playerVelocity.y = 0;
			player.classList.remove('active');
			break;
	}
}

window.addEventListener('keydown', handleKeyPress);
window.addEventListener('keyup', handleKeyRelease);
