// Contenido completo del JS final
$(document).ready(function(){
    // Lógica para el corazón y apertura/cierre del mensaje
    $('#messageState').change(function(){
        if($(this).is(":checked")) {
            $('.message').removeClass('closed').removeClass('no-anim').addClass('openNor');
            $('.heart').removeClass('no-anim').removeClass('closeHer').removeClass('openedHer').addClass('openHer');
            $('.instruction').fadeOut();
            // Cambio de fondo del container (opcional)
            // $('.container').stop().animate({"backgroundColor": "#f48fb1"}, 2000);
        } else {
            $('.message').removeClass('no-anim').addClass('closeNor');
            $('.heart').removeClass('openedHer').removeClass('beating').removeClass('no-anim').addClass('closeHer');
            $('.instruction').text('¡Espero te haya gustado! ❤️').fadeIn();
            // Cambio de fondo del container (opcional)
            // $('.container').stop().animate({"backgroundColor": "#fce4ec"}, 2000);
        }
    });

    $('.message').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        if ($(".message").hasClass("closeNor"))
            $(".message").addClass("closed");
        $(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
    });

    $('.heart').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
        if (!$(".heart").hasClass("closeHer"))
            $(".heart").addClass("openedHer").addClass("beating");
        else
            $(".heart").addClass("no-anim").removeClass("beating");
        $(".heart").removeClass("openHer").removeClass("closeHer");
    });

    // --- Lógica para los botones ---
    const yesButton = document.getElementById('yes-button');
    const noButton = document.getElementById('no-button');
    const responseContainer = document.getElementById('response-container');

    // Evento para el botón "Sí"
    yesButton.addEventListener('click', () => {
        responseContainer.innerHTML = '<p style="font-family: Quicksand, sans-serif; color: #2c3e50; font-size: 20px; font-weight: bold;">¡Genial! ¡Ya verás qué divertido es esto! 😄❤️</p>';
        yesButton.style.display = 'none';
        noButton.style.display = 'none';
        createConfetti(); 
    });

    // Evento para el botón "No" (escapista)
    noButton.addEventListener('mouseover', () => {
        const messageRect = document.querySelector('.message').getBoundingClientRect();
        // Obtenemos el contenedor del botón (.buttons) para referencia
        const buttonContainerRect = noButton.parentElement.getBoundingClientRect(); 

        // Calculamos límites seguros DENTRO del contenedor del mensaje, relativo al viewport
        const safePadding = 20; // Margen para que no se pegue a los bordes
        const messageInnerLeft = messageRect.left + safePadding;
        const messageInnerRight = messageRect.right - noButton.offsetWidth - safePadding;
        // Empezar a moverlo desde más abajo para que no tape el texto inicial
        const messageInnerTop = messageRect.top + messageRect.height * 0.5; 
        const messageInnerBottom = messageRect.bottom - noButton.offsetHeight - safePadding;

        // Validar que los límites tengan sentido
        if (messageInnerRight <= messageInnerLeft || messageInnerBottom <= messageInnerTop) {
            // Si los límites son inválidos, mejor no moverlo
            console.warn("Límites inválidos para mover el botón, no se moverá esta vez.");
            return; 
        }

        // Calcular las coordenadas absolutas (viewport) del nuevo objetivo
        const targetX = Math.random() * (messageInnerRight - messageInnerLeft) + messageInnerLeft;
        const targetY = Math.random() * (messageInnerBottom - messageInnerTop) + messageInnerTop;

        // Convertir las coordenadas absolutas a relativas al contenedor .buttons
        const newLeftRelative = targetX - buttonContainerRect.left;
        const newTopRelative = targetY - buttonContainerRect.top;

        // Aplicar posición absoluta y las nuevas coordenadas relativas
        noButton.style.position = 'absolute'; 
        noButton.style.left = newLeftRelative + 'px';
        noButton.style.top = newTopRelative + 'px';
        noButton.style.transition = 'left 0.3s ease, top 0.3s ease'; 
    });

    // Función para crear efecto confeti 
    function createConfetti() {
        const confettiContainer = document.querySelector('body'); 
        const colors = ['#e74c3c', '#f1c40f', '#3498db', '#2ecc71', '#ffffff', '#f39c12'];
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed'; 
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = Math.random() * -50 + 'vh'; 
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.opacity = Math.random() * 0.8 + 0.2;
            confetti.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
            const fallDuration = Math.random() * 3 + 4;
            confetti.style.animation = `fall ${fallDuration}s linear ${Math.random() * 2}s forwards`;
            confetti.style.zIndex = '1000'; 
            confetti.style.pointerEvents = 'none';
            confettiContainer.appendChild(confetti);
            confetti.addEventListener('animationend', () => {
                 confetti.remove();
            });
        }
        if (!document.getElementById('confetti-styles')) {
            const styleSheet = document.createElement("style");
            styleSheet.id = 'confetti-styles'; 
            styleSheet.type = "text/css";
            styleSheet.innerText = `@keyframes fall { 0% { transform: translateY(0vh) rotate(0deg); } 100% { transform: translateY(110vh) rotate(720deg); opacity: 0; } }`;
            document.head.appendChild(styleSheet);
        }
    }
});
