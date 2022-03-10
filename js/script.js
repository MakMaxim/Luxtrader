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

// ============== BildSlider ============================================================================
let sliders = document.querySelectorAll('._swiper');
if (sliders) {
	for (let index = 0; index < sliders.length; index++) {
		let slider = sliders[index];
		if (!slider.classList.contains('swiper-bild')) {
			let slider_items = slider.children;
			if (slider_items) {
				for (let index = 0; index < slider_items.length; index++) {
					let el = slider_items[index];
					el.classList.add('swiper-slide');
				}
			}
			let slider_content = slider.innerHTML;
			let slider_wrapper = document.createElement('div');
			slider_wrapper.classList.add('swiper-wrapper');
			slider_wrapper.innerHTML = slider_content;
			slider.innerHTML = '';
			slider.appendChild(slider_wrapper)
			slider.classList.add('swiper-bild');
		}
	}
	sliders_bild_callback()
}

function sliders_bild_callback(params) { }
//  ======================================================================================================

//  ======== lots-swiper =================================================================================
let lots_slider = new Swiper('.slider-lots__body', {
	/*
	effect: 'fade',
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	*/
	observer: true,
	observeParents: true,
	slidesPerView: 1,
	spaceBetween: 0,
	// centeredSlides: true,
	// autoHeight: true,
	speed: 800,
	// touchRatio: 0,
	// simulateTouch: false,
	loop: true,
	// preloadImages: false,
	// lazy: true,
	// Dotts
	// pagination: {
	// 	el: '.slider-quality__pagging',
	// 	clickable: true,
	// },
	// Arrows
	navigation: {
		nextEl: '.control-slider-lots__arrow_next',
		prevEl: '.control-slider-lots__arrow_prev',
	},

	breakpoints: {
		// 320: {
		// 	slidesPerView: 1,
		// },
		550: {
			slidesPerView: 2,
			// centeredSlides: false,
		},
		872: {
			slidesPerView: 3,
		},
		// 1268: {
		// 	slidesPerView: 1,
		// 	spaceBetween: 0,
		// },
	},

	on: {
		lazyImageReady: function () {
			ibg();
		},
	}
	// And if we need scrollbar
	// scrollbar: {
	// el: '.swiper-scrollbar',
	// },
})
// ======================================================================================================

//=================== Прокрутка при клике ================================================================
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
			// menuLinks.forEach(menuLink => {
			// 	menuLink.classList.remove('_active')
			// })
			// menuLink.classList.add('_active')

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


