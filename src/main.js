function animateText() {
	document.querySelectorAll('.navigation li a').forEach(text => {
		text.innerHTML = text.innerText
			.split('')
			.map(letter => `<span>${letter}</span>`)
			.join('');
	});

	document.querySelectorAll('.navigation li a span').forEach(span => {
		let duration = Math.random() * 25;
		span.style.animationDuration = `${duration}s`;
		span.style.animationDelay = `${duration}s`;
	});
}

animateText();

function initCursorAnimation() {
	let cursor = document.querySelector('#cursor');
	let body = document.querySelector('body');

	let lastTime = Date.now();

	document.onmousemove = function (e) {
		moveCursor(e);
		let currentTime = Date.now();
		if (currentTime - lastTime >= 50) {
			createFloatingElement(e);
			lastTime = currentTime;
		}
	};

	function moveCursor(e) {
		cursor.style.top = e.pageY + 'px';
		cursor.style.left = e.pageX + 'px';
		body.style.backgroundPositionX = e.pageX / -4 + 'px';
		body.style.backgroundPositionY = e.pageY / -4 + 'px';
	}

	function createFloatingElement() {
		let element = document.createElement('div');
		element.className = 'binary';
		body.prepend(element);

		let maxX = window.innerWidth - element.offsetWidth;
		let maxY = window.innerHeight - element.offsetHeight;

		let rect = cursor.getBoundingClientRect();
		element.style.left = Math.min(rect.x, maxX) + 'px';
		element.style.top = Math.min(rect.y, maxY) - 10 + 'px';

		setTimeout(() => {
			animateElement(element);
		}, 100);
	}

	function animateElement(element) {
		let directionX = Math.random() < 0.5 ? -1 : 1;
		let directionY = Math.random() < 0.5 ? -1 : 1;
		element.style.left = parseInt(element.style.left) - directionX * (Math.random() * 200) + 'px';
		element.style.top = parseInt(element.style.top) - directionY * (Math.random() * 200) + 'px';
		element.style.opacity = 0;
		element.style.transform = 'scale(0.25)';
		element.innerHTML = randomNumber();

		setTimeout(() => {
			element.remove();
		}, 1000);
	}

	function randomNumber() {
		let numbers = '0 1'.split(' ');
		return numbers[Math.floor(Math.random() * numbers.length)];
	}
}

initCursorAnimation();

function initCardAnimation() {
	let cards = document.querySelectorAll('.card');
	cards.forEach(card => {
		card.onmousemove = function (e) {
			let rect = card.getBoundingClientRect();
			let x = e.clientX - rect.left;
			let y = e.clientY - rect.top;

			card.style.setProperty('--x', x + 'px');
			card.style.setProperty('--y', y + 'px');
		};
	});
}

initCardAnimation();
