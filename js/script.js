// ============ Адаптив картинок ibg ====================================================================
function ibg() {
	let ibg = document.querySelectorAll('.ibg')
	for (let i = 0; i < ibg.length; i++) {
		if (ibg[i].querySelector('img')) {
			ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
		}
	}
}
ibg()
// ======================================================================================================

// ============= Выпадание меню по клику на значок user =================================================
let user_icon = document.querySelector('.user-header__icon')
let user_menu = document.querySelector('.user-header__menu')
const iconMenu = document.querySelector('.icon-menu')
const menuBody = document.querySelector('.menu__body')
user_icon.addEventListener('click', function (e) {
	user_menu.classList.toggle('_active')
	iconMenu.classList.remove('_active')
	menuBody.classList.remove('_active')
	document.body.classList.remove('_lock')
});
// =========== Закрытие этого меню по клику на любую другую лбласть ======================================
document.documentElement.addEventListener('click', function (e) {
	if (!e.target.closest('.user-header')) {
		user_menu.classList.remove('_active')
	}
})
// ======================================================================================================

// =========== Меню бургер ==============================================================================

if (iconMenu) {
	iconMenu.addEventListener('click', function (e) {
		document.body.classList.toggle('_lock')
		iconMenu.classList.toggle('_active')
		menuBody.classList.toggle('_active')
	})
}
// ======================================================================================================

//  ========= main-swiper ===============================================================================
const swiper3 = new Swiper('.main-slider', {
	slidesPerView: 1,
	spaceBetween: 0,
	speed: 800,
	loop: true,
	navigation: {
		nextEl: '.control-main-slider__arrow_next',
		prevEl: '.control-main-slider__arrow_prev',
	},
});
//  =====================================================================================================

//  ======== lots-swiper =================================================================================
let lots_slider = new Swiper('.lots__slider', {
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	speed: 800,
	loop: true,
	navigation: {
		nextEl: '.control-slider-lots__arrow_next',
		prevEl: '.control-slider-lots__arrow_prev',
	},

	breakpoints: {
		550: {
			slidesPerView: 2,
		},
		872: {
			slidesPerView: 3,
		},
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
})
// ======================================================================================================

//=================== Прокрутка при клике ===============================================================
const menuLinks = document.querySelectorAll('.menu__link[data-goto]')
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener('click', onMenuLinkClick)
	})

	function onMenuLinkClick(e) {
		const menuLink = e.target
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto)
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight
			// выделение пункта меню при клике на него ==========
			// menuLinks.forEach(menuLink => {
			// 	menuLink.classList.remove('_active')
			// })
			// menuLink.classList.add('_active')
			// ==================================================
			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock')
				iconMenu.classList.remove('_active')
				menuBody.classList.remove('_active')
			}

			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth'
			})
			e.preventDefault()
		}
	}
}
//  ======================================================================================================

//  ========== выделение пункта меню при скролле =========================================================
window.addEventListener('scroll', () => {
	let scrollDistance = window.scrollY;
	document.querySelectorAll('.active-scroll').forEach((el, i) => {
		if (el.offsetTop - document.querySelector('header').clientHeight - 1 <= scrollDistance) {
			document.querySelectorAll('.menu__body a').forEach((el) => {
				if (el.classList.contains('_active')) {
					el.classList.remove('_active')
				}
			})
			document.querySelectorAll('.menu__body li')[i].querySelector('a').classList.add('_active')
		}
	})
})
//  ======================================================================================================
