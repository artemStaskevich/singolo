window.onload = function() {

	addNavClickHandler();

	addNavScrollHandler();

	addHorizontalPhoneClickHandler();

	addVerticalPhoneClickHandler();

	addSlider();

	addPortfolioNavClickHandler();

	addPortfolioImageClickHandler();

	addFormHandler();

	addTextareaLimit(50);

	addPopupCloseHandler();

	addBurgerMenuHandler();
};


const addNavClickHandler = () => {
	document.getElementById('navigation-bar').addEventListener('click', function(event) {
		document.getElementById('navigation-bar').querySelectorAll('li').forEach(el => el.classList.remove('active'));
		event.target.parentElement.classList.add('active');
		
		if (document.querySelector('.header-navigation').classList.contains('active')) {
			HideBurgerMenu();
		}
		
	});
};

const addNavScrollHandler = () => {
	document.addEventListener('scroll', onScroll);
};

const onScroll = () => {
	var currentPosition = window.scrollY,
		sections = document.querySelectorAll('section > div.container'),
		headerHeight = document.querySelector('.header > div').offsetHeight;
	
	sections.forEach((el) => {
		if ((el.parentElement.offsetTop - headerHeight) <= currentPosition && (el.parentElement.offsetTop + el.parentElement.offsetHeight - headerHeight) > currentPosition) {
			document.querySelectorAll('#navigation-bar a').forEach((a) => {
				a.parentElement.classList.remove('active');
				if (el.parentElement.getAttribute('id') === a.getAttribute('href').substring(1)) {
					a.parentElement.classList.add('active');
				}
			});
		}
		if ((currentPosition + document.documentElement.clientHeight) == document.body.offsetHeight) {
			document.getElementById('navigation-bar').querySelectorAll('li').forEach(el => el.classList.remove('active'));
			document.querySelector('#navigation-bar a[href="#contact"]').parentElement.classList.add('active');
		}
	});
	
};

const addHorizontalPhoneClickHandler = () => {
	var screen = document.querySelector('.horizontal-screen');
	document.querySelector('.horizontal').addEventListener('click', function() {
		changePhoneScreenStatus(screen);
	});
	document.querySelector('.horizontal-screen').addEventListener('click', function() {
		changePhoneScreenStatus(screen);
	});	
};

const addVerticalPhoneClickHandler = () => {
	var screen = document.querySelector('.vertical-screen');
	document.querySelector('.vertical').addEventListener('click', function() {
		changePhoneScreenStatus(screen);
	});
	document.querySelector('.vertical-screen').addEventListener('click', function() {
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
	var buf = document.getElementById('portfolio').querySelectorAll('img')[0].parentElement,
		div = document.getElementById('portfolio').querySelector('.images');

	document.getElementById('portfolio').querySelectorAll('img')[0].parentElement.remove();
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
		if (isEnabled) {
			previousItem(currentItem);
		}
	});
	
	document.querySelector('.arrow-right').addEventListener('click', function() {
		if (isEnabled) {
			nextItem(currentItem);
		}
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
		document.querySelector('.contacts-form').reset();
		document.querySelector('.popup').classList.add('hidden');
	});
};

const addTextareaLimit = (limit) => {
	document.querySelector('.contacts-form-textarea').addEventListener('blur', function(event) {
		if (event.target.value.length > limit) {
			event.target.value = event.target.value.substr(0, limit);
		}	
	});
};

// slider
var items = document.getElementById('slider').querySelectorAll('.item'),
	currentItem = 0,
	isEnabled = true;

const changeCurrentItem = (n) =>  {
	currentItem = (n + items.length) % items.length;
};
const  hideItem = (direction) => {
	isEnabled = false;
	items[currentItem].classList.add(direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('active', direction);
	});
}

const showItem = (direction) =>  {
	items[currentItem].classList.add('next', direction);
	items[currentItem].addEventListener('animationend', function() {
		this.classList.remove('next', direction);
		this.classList.add('active');
		isEnabled = true;
	});
}

const nextItem = (n) => {
	hideItem('to-left');
	changeCurrentItem(n + 1);
	showItem('from-right');
};

const previousItem = (n) => {
	hideItem('to-right');
	changeCurrentItem(n - 1);
	showItem('from-left');
};

// berger menu 
const addBurgerMenuHandler = () => {
	document.querySelector('.header-navigation-button').addEventListener('click', function() {
		if (document.querySelector('.header-navigation').classList.contains('active')) {
			HideBurgerMenu();
		} else {
			ShowBurgerMenu();
		}
	});
};

const HideBurgerMenu = () => {
	document.querySelector('.header-navigation').classList.remove('active');
	document.querySelector('.header-navigation-button').classList.remove('active');
	document.querySelector('.header h1').classList.remove('active');
};

const ShowBurgerMenu = () => {
	document.querySelector('.header-navigation').classList.add('active');
	document.querySelector('.header-navigation-button').classList.add('active');
	document.querySelector('.header h1').classList.add('active');
};
