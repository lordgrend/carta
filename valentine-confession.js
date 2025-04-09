$("#messageState").on("change", (x) => {
	$(".message").removeClass("openNor").removeClass("closeNor");
	if ($("#messageState").is(":checked")) {
		$(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
		$(".heart").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
		$(".container").stop().animate({"backgroundColor": "#f48fb1"}, 2000);
		console.log("Abrindo");
	} else {
		$(".message").removeClass("no-anim").addClass("closeNor");
		$(".heart").removeClass("openHer").removeClass("openedHer").addClass("closeHer");
		$(".container").stop().animate({"backgroundColor": "#fce4ec"}, 2000);
		console.log("fechando");
	}
});

$(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	console.log("Animation End");
	if ($(".message").hasClass("closeNor"))
		$(".message").addClass("closed");
	$(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
});

$(".heart").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
	console.log("Animation End");
	if (!$(".heart").hasClass("closeHer"))
		$(".heart").addClass("openedHer").addClass("beating");
	else
		$(".heart").addClass("no-anim").removeClass("beating");
	$(".heart").removeClass("openHer").removeClass("closeHer");
});

$(document).ready(function(){
    $('#messageState').change(function(){
        if($(this).is(":checked")) {
            $('.message').removeClass('closeNor').addClass('openNor');
            $('.heart').removeClass('closeHer').removeClass('openedHer').addClass('openHer');
            $('.instruction').fadeOut();
        } else {
            $('.message').removeClass('openNor').addClass('closeNor');
            $('.heart').removeClass('openHer').addClass('closeHer');
        }
    });

    // --- Lógica para los botones ---

    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const responseContainer = document.getElementById('response-container');

    // Evento para el botón "Sí"
    yesButton.addEventListener('click', () => {
        // Muestra el NUEVO mensaje de celebración
        responseContainer.innerHTML = '<p style="font-family: Quicksand, sans-serif; color: #2c3e50; font-size: 20px; font-weight: bold;">¡Genial! ¡Ya verás qué divertido es esto! 😄</p>';

        // Oculta ambos botones después de decir sí
        yesButton.style.display = 'none';
        noButton.style.display = 'none';

        // Mantenemos el confeti :)
        createConfetti(); 
    });

    // Evento para el botón "No" (escapista)
    noButton.addEventListener('mouseover', () => {
        const messageRect = document.querySelector('.message').getBoundingClientRect();
        const containerRect = document.querySelector('.container').getBoundingClientRect();

        // Límites dentro del mensaje (aproximado)
        const minX = messageRect.left - containerRect.left + 20;
        const limitX = messageRect.right - containerRect.left - noButton.offsetWidth - 20;
        const minY = messageRect.top - containerRect.top + messageRect.height * 0.6; // Un poco más abajo
        const limitY = messageRect.bottom - containerRect.top - noButton.offsetHeight - 20;

        // Calcular nueva posición aleatoria 
        const newX = Math.random() * (limitX - minX) + minX;
        const newY = Math.random() * (limitY - minY) + minY; 

        noButton.style.position = 'absolute'; 
        noButton.style.left = newX + 'px';
        noButton.style.top = newY + 'px';
        noButton.style.transition = 'left 0.3s ease, top 0.3s ease'; 
    });

    // Función para crear efecto confeti 
    function createConfetti() {
        const confettiContainer = document.querySelector('body'); 
        const colors = ['#e74c3c', '#f1c40f', '#3498db', '#2ecc71', '#ffffff', '#f39c12']; // Añadido naranja
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed'; // Usar fixed para que no se mueva con scroll
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * -50 + 'vh'; 
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = Math.random() * 0.8 + 0.2; // Rango 0.2-1.0
            confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            // Ajuste animación confeti
            const fallDuration = Math.random() * 3 + 4; // Duración entre 4s y 7s
            confetti.style.animation = `fall ${fallDuration}s linear ${Math.random() * 2}s forwards`; // Usar forwards para que desaparezca
            confetti.style.zIndex = '1000'; 
            confetti.style.pointerEvents = 'none';
            confettiContainer.appendChild(confetti);
            
            // Limpiar confeti del DOM después de la animación
            confetti.addEventListener('animationend', () => {
                 confetti.remove();
            });
        }
        // CSS para la animación de caída (asegurar que sólo se añada una vez)
        if (!document.getElementById('confetti-styles')) {
            const styleSheet = document.createElement("style");
            styleSheet.id = 'confetti-styles'; // ID para evitar duplicados
            styleSheet.type = "text/css";
            styleSheet.innerText = `@keyframes fall { 0% { transform: translateY(0vh) rotate(0deg); } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`;
            document.head.appendChild(styleSheet);
        }
    }

});