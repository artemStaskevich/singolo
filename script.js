window.onload = function() {

	addNavClickHandler();

	addHorizontalPhoneClickHandler();

	addVerticalPhoneClickHandler();

	addSlider();

	addPortfolioNavClickHandler();

	addPortfolioImageClickHandler();

	addFormHandler();

	addPopupCloseHandler();
};

const addNavClickHandler = () => {
	document.getElementById('navigation-bar').addEventListener('click', function(event) {
		document.getElementById('navigation-bar').querySelectorAll('li').forEach(el => el.classList.remove('active'));
		event.target.parentElement.classList.add('active');
	});
};

const addHorizontalPhoneClickHandler = () => {
	document.querySelector('.horizontal').addEventListener('click', function() {
		var screen = document.querySelector('.horizontal-screen');

		changePhoneScreenStatus(screen);
	});
};

const addVerticalPhoneClickHandler = () => {
	document.querySelector('.vertical').addEventListener('click', function() {
		var screen = document.querySelector('.vertical-screen');

		changePhoneScreenStatus(screen);
	});
};

const changePhoneScreenStatus = (screen) => {
	if (screen.classList.contains('hidden')) {
		screen.classList.remove('hidden');
	} else {
		screen.classList.add('hidden');
	}
};

const addPortfolioNavClickHandler = () => {
	document.querySelector('.portfolio-buttons').addEventListener('click', (event) => {
		if (event.target.classList.contains('button')) {
			changePortfolioSelectedButton(event);

			movePortfolioImages();
		}
	});
};

const changePortfolioSelectedButton = (event) => {
	document.getElementById('portfolio').querySelectorAll('button').forEach(el => el.classList.remove('active-button'));
	event.target.classList.add('active-button');
};

const movePortfolioImages = () => {
	var buf = document.getElementById('portfolio').querySelectorAll('img')[0],
		div = document.getElementById('portfolio').querySelector('.images');

	document.getElementById('portfolio').querySelectorAll('img')[0].remove();
	div.append(buf);	
}

const addPortfolioImageClickHandler = () => {
	document.querySelector('.images').addEventListener('click', (event) => {
		if (event.target.classList.contains('portfolio-image')) {
			changePortfolioImageBorder(event);
		}
	});
};

const changePortfolioImageBorder = (event) => {
	document.getElementById('portfolio').querySelectorAll('img').forEach(el => el.classList.remove('active-img'));
	event.target.classList.add('active-img');
};

const addSlider = () => {
	document.querySelector('.arrow-left').addEventListener('click', function() {
		previousItem(currentItem);
	});
	
	document.querySelector('.arrow-right').addEventListener('click', function() {
		nextItem(currentItem);
	});
};

const addFormHandler = () => {
	document.querySelector('.contacts-form').onsubmit = function() {
		createPopupDate(document.querySelector('.contacts-form').elements);
	
		document.querySelector('.popup').classList.remove('hidden');
	
		return false;
	};
};

const createPopupDate = (data) => {
	var subject = data.subject.value.toString(),
		descriprion = data.description.value.toString();

	if (subject) {
		document.getElementById('popup-theme').innerHTML = 'Тема: ' + subject;
	} else {
		document.getElementById('popup-theme').innerHTML = 'Без темы';
	}

	if (descriprion) {
		document.getElementById('popup-description').innerHTML = 'Описание: ' + descriprion;
	} else {
		document.getElementById('popup-description').innerHTML = 'Без описания';
	}
};

const addPopupCloseHandler = () => {
	document.getElementById('close').addEventListener('click', function() {
		document.querySelector('.popup').classList.add('hidden');
	});
};

// Slider
var items = document.getElementById('slider').querySelectorAll('.item'),
	currentItem = 0;

const changeCurrentItem = (n) =>  {
	currentItem = (n + items.length) % items.length;
};

const nextItem = (n) => {
	items[currentItem].classList.remove('active');
	changeCurrentItem(n + 1);
	items[currentItem].classList.add('active');
};

const previousItem = (n) => {
	items[currentItem].classList.remove('active');
	changeCurrentItem(n - 1);
	items[currentItem].classList.add('active');
};