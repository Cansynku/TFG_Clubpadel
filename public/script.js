// Espera a que el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {

    // Hacer una solicitud HTTP GET para obtener los datos de los profesores
    fetch('/profesores')
        .then(response => response.json())
        .then(data => {
            // Llama a la función para mostrar los datos de los profesores en la página
            mostrarProfesores(data);
        })
        .catch(error => console.error('Error al obtener los datos de los profesores:', error));
});

// Función para mostrar los datos de los profesores en la página
function mostrarProfesores(profesores) {
    const profesoresLista = document.getElementById('profesores-lista');
    // Limpiar la lista antes de agregar nuevos elementos
    profesoresLista.innerHTML = '';
    // Itera sobre los datos de los profesores y agrega elementos a la lista
    profesores.forEach(profesor => {
        const div = document.createElement('div');
        div.classList.add('profesor-item');





        const nombreApellido = document.createElement('h3');
        nombreApellido.textContent = `${profesor.nombre} ${profesor.apellido}`;
        nombreApellido.classList.add('nombre-apellido'); // Agregar clase
        nombreApellido.addEventListener('click', () => toggleInfoProfesor(div));
        div.appendChild(nombreApellido);


        // Descripción del profesor
        const descripcion = document.createElement('p');
        descripcion.textContent = profesor.descripcion;
        descripcion.classList.add('descripcion-profesor'); // Agregar clase para ocultar la descripción inicialmente
        div.appendChild(descripcion);

        // Detalles adicionales (email, nivel, etc.)
        const detalles = document.createElement('div');
        detalles.classList.add('detalles-profesor', 'info-profesor'); // Agrega la clase 'info-profesor' para estilos comunes
        detalles.innerHTML = `
            <p><strong>ID:</strong> ${profesor.id}</p>
            <p><strong>Email:</strong> ${profesor.email}</p>
            <p><strong>Nivel:</strong> ${profesor.nivel_id}</p>
            <p><strong>Descripción:</strong> ${profesor.descripcion}</p>
            <!-- Agrega más detalles según sea necesario -->
        `;
        // Oculta inicialmente los detalles
        detalles.classList.add('hidden');
        div.appendChild(detalles);

        profesoresLista.appendChild(div);
    });
}

// Función para mostrar u ocultar la información de un profesor
function toggleInfoProfesor(profesorItem) {
    const infoDiv = profesorItem.querySelector('.info-profesor');
    // Si la información del profesor está visible, la oculta; de lo contrario, la muestra
    infoDiv.classList.toggle('open');
}


document.addEventListener('DOMContentLoaded', function () {
    const preguntas = [
        {
            pregunta: '¿Cuánto tiempo has estado jugando al pádel?',
            opciones: [
                'Menos de 6 meses',
                'Entre 6 meses y 1 año',
                'Entre 1 y 2 años',
                'Más de 2 años'
            ]
        },
        {
            pregunta: '¿Cómo describirías tu nivel de habilidad?',
            opciones: [
                'Soy nuevo en el pádel y aún estoy aprendiendo las reglas básicas',
                'Puedo mantener un rally pero todavía tengo dificultades con la técnica',
                'Tengo un buen control sobre mis golpes y puedo mantener rallies consistentes',
                'Tengo un nivel avanzado y participo regularmente en torneos'
            ]
        },
        {
            pregunta: '¿Con qué frecuencia juegas al pádel?',
            opciones: [
                'Menos de una vez al mes',
                'Una vez a la semana',
                '2-3 veces por semana',
                'Prácticamente todos los días'
            ]
        },
        {
            pregunta: '¿Cómo te sientes con respecto a tu conocimiento de las estrategias de juego?',
            opciones: [
                'Todavía estoy aprendiendo las estrategias básicas',
                'Comienzo a entender las estrategias pero aún me falta experiencia',
                'Tengo un buen entendimiento de las estrategias y puedo aplicarlas en mi juego',
                'Tengo un amplio conocimiento de las estrategias y puedo adaptarme fácilmente a diferentes situaciones en la pista'
            ]
        },
        {
            pregunta: '¿Has participado alguna vez en torneos de pádel?',
            opciones: [
                'No, nunca he participado en un torneo',
                'Sí, pero solo en torneos locales',
                'Sí, he participado en torneos regionales',
                'Sí, compito regularmente en torneos y tengo experiencia a nivel nacional/internacional'
            ]
        }
    ];

    const testContainer = document.getElementById('test-container');
    const submitButton = document.getElementById('submit-test');
    const testResult = document.getElementById('test-result');

    // Función para crear y mostrar las preguntas del test
    function mostrarPreguntas() {
        preguntas.forEach((pregunta, index) => {
            const div = document.createElement('div');
            div.classList.add('pregunta');
            const preguntaTexto = document.createElement('p');
            preguntaTexto.textContent = `${index + 1}. ${pregunta.pregunta}`;
            div.appendChild(preguntaTexto);
            pregunta.opciones.forEach((opcion, i) => {
                const input = document.createElement('input');
                input.type = 'radio';
                input.name = `pregunta${index}`;
                input.value = i + 1;
                const label = document.createElement('label');
                label.textContent = opcion;
                const br = document.createElement('br'); // Agregar salto de línea entre opciones
                div.appendChild(input);
                div.appendChild(label);
                div.appendChild(br);
            });
            testContainer.appendChild(div);
        });
    }

    // Función para calcular el resultado del test y mostrarlo
    function calcularResultado() {
        // Verificar si todas las preguntas han sido respondidas
        const todasRespondidas = preguntas.every((pregunta, index) => {
            return document.querySelector(`input[name="pregunta${index}"]:checked`);
        });

        if (!todasRespondidas) {
            alert("Por favor, responde todas las preguntas antes de enviar tus respuestas.");
            return; // Detener el proceso si no todas las preguntas han sido respondidas
        }
        let total = 0;
        preguntas.forEach((pregunta, index) => {
            const respuesta = document.querySelector(`input[name="pregunta${index}"]:checked`);
            if (respuesta) {
                total += parseInt(respuesta.value);
            }
        });

        let nivel = '';
        if (total >= 5 && total <= 7) {
            nivel = 'Principiante (1)';
        } else if (total >= 8 && total <= 10) {
            nivel = 'Intermedio (2)';
        } else if (total >= 11 && total <= 13) {
            nivel = 'Avanzado (3)';
        } else if (total >= 14 && total <= 16) {
            nivel = 'Competitivo (4)';
        } else if (total >= 17 && total <= 20) {
            nivel = 'Profesional (5)';
        }

        testResult.innerHTML = `<p class="nivel-mensaje">¡Tu nivel de pádel es: ${nivel}!</p>
                                <p class="guia-mensaje">Ahora puedes elegir un profesor con tu nivel.</p>`;
        testResult.style.display = 'block';
    }

    // Evento click para el botón de enviar respuestas
    submitButton.addEventListener('click', function () {
        calcularResultado();
    });

    // Mostrar las preguntas del test al cargar la página
    mostrarPreguntas();
});
// Obtener referencia al enlace "Consultar Torneos"
const consultarTorneos = document.getElementById('consultar-torneos');

// Agregar un evento de clic al enlace
consultarTorneos.addEventListener('click', function (event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

    // Crear la ventana modal
    const modal = document.createElement('div');
    modal.classList.add('modal');

    // Crear la imagen del torneo en la ventana modal
    const imgTorneo = document.createElement('img');
    imgTorneo.src = 'img/torneos.jpg';
    imgTorneo.alt = 'Torneos de pádel';
    imgTorneo.width = 800; // Ajustar el ancho según sea necesario
    imgTorneo.height = 600; // Ajustar la altura según sea necesario
    modal.appendChild(imgTorneo);

    // Agregar la ventana modal al cuerpo del documento
    document.body.appendChild(modal);

    // Cerrar la ventana modal al hacer clic fuera de ella
    modal.addEventListener('click', function () {
        modal.remove();
    });
});
// Función para desplazarse hacia arriba al hacer clic en el botón
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Función para mostrar el mensaje de reserva y redirigir a Playtomic
function reservarPista() {
    alert("A partir de ahora tus reservas en 200x100 Padel se hacen a través de Playtomic. Serás redirigido a la página oficial de Playtomic.");
    window.location.href = "https://playtomic.io/200-x-100-padel/054e5816-d4ff-49aa-9027-e509c2dc47a6?q=PADEL~2024-04-22~~~";
}

function mostrarTarifas(tipo) {
    // Obtener el elemento donde se muestra la tabla de precios
    var tablaPrecios = document.getElementById('tabla-precios');

    // Limpiar la tabla de precios existente
    tablaPrecios.innerHTML = '';

    // Construir la tabla de precios según el tipo seleccionado
    switch (tipo) {
        case 'mañanas':
            tablaPrecios.innerHTML = `
                    <h3 style="text-align: center; font-size: 24px;">Tarifas Pádel Mañanas</h3>
                    <table>
                        <tr>
                            <th></th>
                            <th style="color: black;">1 H/SEM</th>
                            <th style="color: black;">2 H/SEM</th>
                        </tr>
                        <tr>
                            <td>GRUPO DE 4 ALUMNOS</td>
                            <td>31€</td>
                            <td>62€</td>
                        </tr>
                        <tr>
                            <td>GRUPO DE 3 ALUMNOS</td>
                            <td>40€</td>
                            <td>80€</td>
                        </tr>
                        <tr>
                            <td>GRUPO DE 2 ALUMNOS</td>
                            <td>60€</td>
                            <td>120€</td>
                        </tr>
                    </table>
                `;
            break;
        case 'tardes':
            tablaPrecios.innerHTML = `
                    <h3 style="text-align: center; font-size: 24px;">Tarifas Pádel Tardes</h3>
                    <table>
                        <tr>
                            <th></th>
                            <th style="color: black;">1 H/SEM</th>
                            <th style="color: black;">2 H/SEM</th>
                        </tr>
                        <tr>
                            <td>GRUPO DE 4 ALUMNOS</td>
                            <td>45€</td>
                            <td>85€</td>
                        </tr>
                        <tr>
                            <td>GRUPO DE 3 ALUMNOS</td>
                            <td>60€</td>
                            <td>114€</td>
                        </tr>
                        <tr>
                            <td>GRUPO DE 2 ALUMNOS</td>
                            <td>85€</td>
                            <td>160€</td>
                        </tr>
                    </table>
                `;
            break;
        case 'infantil':
            tablaPrecios.innerHTML = `
                    <h3 style="text-align: center; font-size: 24px;">Tarifas Pádel Infantil</h3>
                    <table>
                        <tr>
                            <th></th>
                            <th style="color: black;">1 H/SEM</th>
                            <th style="color: black;">2 H/SEM</th>
                        </tr>
                        <tr>
                            <td>GRUPO DE 4-6 ALUMNOS</td>
                            <td>38€</td>
                            <td>72€</td>
                        </tr>
                        <tr>
                            <td>GRUPO DE 4 ALUMNOS</td>
                            <td>45€</td>
                            <td>85€</td>
                        </tr>
                    </table>
                `;
            break;
        case 'particulares':
            tablaPrecios.innerHTML = `
                    <h3 style="text-align: center; font-size: 24px;">Tarifas Pádel Particulares</h3>
                    <table>
                        <tr>
                            <th></th>
                            <th style="color: black;">BONO 5 HORAS</th>
                            <th style="color: black;">BONO 10 HORAS</th>
                        </tr>
                        <tr>
                            <td></td>
                            <td>160€</td>
                            <td>295€</td>
                        </tr>
                    </table>
                `;
            break;
        default:
            break;
    }
}
const dniSection = document.getElementById('dni-section');
const errorMessage = document.getElementById('error-message');
const opinionForm = document.getElementById('opinion-form');

document.getElementById('verificar-dni').addEventListener('click', function (event) {
    event.preventDefault();

    const dniInput = document.getElementById('dni').value;

    fetch(`/verificar-dni/${dniInput}`)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('El servidor respondió con un estado ' + response.status);
            }
        })
        .then(data => {
            if (data.valid) {
                dniSection.style.display = 'none';
                errorMessage.style.display = 'none';
                opinionForm.style.display = 'block';
                cargarProfesores();
            } else {
                errorMessage.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error al verificar el DNI:', error);
            errorMessage.style.display = 'block';
        });
});

function cargarProfesores() {
    fetch('/profesores')
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Error al cargar los datos de los profesores');
            }
        })
        .then(data => {
            construirOpcionesProfesores(data);
        })
        .catch(error => {
            console.error('Error al cargar los profesores:', error);
        });
}

function construirOpcionesProfesores(profesores) {
    const selectProfesor = document.getElementById('profesor');
    selectProfesor.innerHTML = '';
    profesores.forEach(profesor => {
        const option = document.createElement('option');
        option.value = profesor.id;
        option.textContent = profesor.nombre;
        selectProfesor.appendChild(option);
    });
}
document.getElementById('opinion-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const profesorId = document.getElementById('profesor').value;
    const comentario = document.getElementById('comentario').value;
    const dniAlumno = document.getElementById('dni').value; // Obtener el DNI del alumno

    const opinionData = {
        profesorId: profesorId,
        comentario: comentario,
        dniAlumno: dniAlumno // Agregar el DNI del alumno
    };

    fetch('/enviar-opinion', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(opinionData)
    })
        .then(response => {
            if (response.ok) {
                // Si la respuesta es exitosa, mostrar un mensaje de éxito con alert()
                alert('¡Opinión enviada correctamente!');
                // Recargar la página después de 2 segundos
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            } else {
                // Si hay algún error en la respuesta, mostrar un mensaje de error con alert()
                alert('Error al enviar la opinión. Inténtalo nuevamente.');
                throw new Error('Error al enviar la opinión');
            }
        })
        .catch(error => {
            // Capturar cualquier error y mostrar un mensaje de error con alert()
            alert('Error al enviar la opinión. Inténtalo nuevamente.');
            console.error('Error al enviar la opinión:', error);
        });
});

function mostrarSeccion(seccionId) {
    const seccion = document.getElementById(seccionId);
    if (seccion) {
        const secciones = document.querySelectorAll('.seccion');
        secciones.forEach(seccion => {
            if (seccion.id === seccionId) {
                seccion.style.display = 'block';
            } else {
                seccion.style.display = 'none';
            }
        });
        seccion.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

//INICIO UNICO 
document.addEventListener('DOMContentLoaded', function () {
    // Agregar controladores de eventos a los botones dentro de <div class="secciones-buttons">
    document.querySelectorAll('.secciones-buttons .button-card').forEach(boton => {
        boton.addEventListener('click', function () {
            const seccionId = this.getAttribute('data-seccion'); // Obtener el ID de la sección del atributo data-seccion
            mostrarSeccion(seccionId);
        });
    });

    // Mostrar solo la sección de inicio al cargar la página
    mostrarSeccion('inicio');
});
// Agregar controladores de eventos a los botones de navegación del menú principal
document.querySelectorAll('#menu-navegacion a').forEach(enlace => {
    enlace.addEventListener('click', function (evento) {
        const seccionId = this.getAttribute('href').substring(1); // Eliminar el signo '#' del href
        mostrarSeccion(seccionId);
        evento.preventDefault(); // Evitar que el enlace haga scroll hacia la sección
    });
});

document.addEventListener('DOMContentLoaded', function () {
    cargarComentarios();
});

function cargarComentarios() {
    fetch('/comentarios')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los comentarios');
            }
            return response.json();
        })
        .then(comentarios => {
            mostrarComentarios(comentarios);
        })
        .catch(error => {
            console.error('Error al obtener los comentarios:', error);
        });
}

function mostrarComentarios(comentarios) {
    const carruselComentarios = document.getElementById('carrusel-comentarios');
    let currentIndex = 0; // Índice para controlar qué comentario se está mostrando actualmente

    function mostrarComentario(index) {
        if (!comentarios || !comentarios[index] || typeof comentarios[index].comentario === 'undefined') {
            console.error('El comentario no está definido o no tiene la propiedad "comentario".', comentarios[index]);
            return;
        }

        const nombreProfesor = comentarios[index].profesor; // No manipular el nombre del profesor
        const comentarioDiv = document.createElement('div');
        comentarioDiv.classList.add('comentario-item');
        comentarioDiv.innerHTML = `
            <p>${comentarios[index].comentario}</p>
            <p class="profesor">Profesor: ${nombreProfesor}</p>
        `;
        carruselComentarios.innerHTML = ''; // Limpiar el carrusel antes de agregar un nuevo comentario
        carruselComentarios.appendChild(comentarioDiv);
    }

    function mostrarSiguienteComentario() {
        mostrarComentario(currentIndex);
        currentIndex = (currentIndex + 1) % comentarios.length; // Avanzar al siguiente comentario circularmente
    }

    // Mostrar el primer comentario al cargar la página
    mostrarComentario(currentIndex);
    currentIndex++;

    // Mostrar automáticamente los comentarios
    setInterval(mostrarSiguienteComentario, 4000); // Mostrar cada comentario durante 4 segundos
}




document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.carousel .slide');
    const nextButton = document.querySelector('.arrow.next');
    const prevButton = document.querySelector('.arrow.prev');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto play functionality (optional)
    setInterval(nextSlide, 5000); // Change slide every 5 seconds
});









