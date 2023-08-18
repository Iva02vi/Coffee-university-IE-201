onchange = function calc () {
	let sortPrice = document.getElementById("sort").value;
	let quantPrice = document.getElementById("quant").value;
	let typePrice = 0;
	if (document.getElementById("type1").checked) {
		typePrice = document.getElementById("type1").value;
	}
	else if (document.getElementById("type2").checked) {
		typePrice = document.getElementById("type2").value;
	}

	let addPrice = 0;
	if (document.getElementById("add1").checked) {
		addPrice += parseInt(document.getElementById("add1").value);
	}
	if (document.getElementById("add2").checked) {
		addPrice += parseInt(document.getElementById("add2").value);
	}
	if (document.getElementById("add3").checked) {
		addPrice += parseInt(document.getElementById("add3").value);
	}
	
	let totalPrice = (sortPrice*quantPrice*typePrice+addPrice).toFixed(2);
	document.getElementById("total_price").value = totalPrice;
}

function initModals() {
	const modalOpenButtons = document.querySelectorAll('[data-open-modal]');

	const modalsEls = document.querySelectorAll('[data-modal]');

	const modals = {};

	for (let i = 0; i < modalsEls.length; i++) {
		const name = modalsEls[i].getAttribute('data-modal') || modalsEls[i].id;

		if (!name) {
			console.error('Modal doesn`t have name:');
			console.log(modalsEls[i]);
			continue;
		}

		modals[name] = modalsEls[i];
	}

	function openModal(name) {
		if (modals[name] && !modals[name].classList.contains('active')) {
			modals[name].classList.add('active');
			modals[name].addEventListener('click', onModalClick);
		}
	}

	function closeModal(element) {
		element.classList.remove('active');
		element.removeEventListener('click', onModalClick);
	}

	function onModalOpenButtonClick($event) {
		openModal($event.target.getAttribute('data-open-modal'))
	}

	function onModalClick($event) {
		const target = $event.target;

		if (target.hasAttribute('data-modal')) {
			closeModal(target)
		} else if (
			target.classList.contains('js-modal-close') ||
				Boolean(target.closest('.js-modal-close'))
		) {
			closeModal(target.closest('[data-modal]'))
		}
	}

	for (let i = 0; i < modalOpenButtons.length; i++) {
		const button = modalOpenButtons[i];

		const modalName = button.getAttribute('data-open-modal')

		if (modalName && modalName in modals) {
			button.addEventListener('click', onModalOpenButtonClick)
		} else if (!modalName){
			console.error('Modal name is required:')
			console.log(button)
		} else {
			console.error('No modal with name: ' + modalName)
			console.log(button)
		}
	}
}

if (document.readyState !== 'complete') {
	document.addEventListener('DOMContentLoaded', initModals);
} else {
	initModals();
}
