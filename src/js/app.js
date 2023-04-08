//UTILIZO document.getElementById//
const menuDeNavegacion = document.getElementById('menuDeNavegacion');
const indicadorMenu = document.getElementById('indicadorMenu');
const secciones = document.querySelectorAll('.seccion');

let tamañoIndicadorMenu = menuDeNavegacion.querySelector('.enlaceMenu').offsetWidth;
indicadorMenu.style.width = tamañoIndicadorMenu + 'px';
let indexSeccionActiva;

const observador = new IntersectionObserver((entradas,observador)=>{
	entradas.forEach(entrada=>{
		if(entrada.isIntersecting){
			//OBTENGO CUAL ES LA SECCION QUE ESTA ENTRANDO EN PANTALLA//
			//CREO UN ARREGLO CON LAS SECCIONES y DESPUES OBTENGO EL INDEX DE LA SECCION QUE ESTA ACTUALMENTE EN PANTALLA//
			indexSeccionActiva = [...secciones].indexOf(entrada.target);
			indicadorMenu.style.transform = `translateX(${tamañoIndicadorMenu * indexSeccionActiva}px)`;
		}
	});
},{
	rootMargin: '-80px 0px 0px 0px',
	threshold: 0.2
});

//AGREGO UN OBSERVADOR PARA EL TEXTO PRINCIPAL//
observador.observe(document.getElementById('textoPrincipal'));

//ASIGNO UN OBSERVADOR A CADA UNA DE LAS SECCIONES//
secciones.forEach(seccion => observador.observe(seccion));

//CREO UN EVENTO PARA CUANDO LA PANTALLA CAMBIE DE TAMAÑO//
const cambioDeTamaño = ()=>{
	//CALCULO EL NUEVO TAMAÑO QUE DEBERIA TENER EL INDICADOR//
	tamañoIndicadorMenu = menuDeNavegacion.querySelector('.enlaceMenu').offsetWidth;

	//CAMBIO EL TAMAÑO DEL INDICADOR//
	indicadorMenu.style.width = `${tamañoIndicadorMenu}px`;

	//VUELVO A POSICIONAR EL INDICADOR//
	indicadorMenu.style.transform = `translateX(${tamañoIndicadorMenu * indexSeccionActiva}px)`;
}
window.addEventListener('resize',cambioDeTamaño);