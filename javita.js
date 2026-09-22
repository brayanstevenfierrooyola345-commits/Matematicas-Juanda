// ==========================================
// MÓDULO 01: OPERACIONES CON FRACCIONARIOS
// ==========================================

// Función auxiliar para hallar el Máximo Común Divisor (MCD)
function mcd(a, b) {
  return b === 0 ? Math.abs(a) : mcd(b, a % b);
}

function calcularFraccion() {
  const n1 = parseInt(document.getElementById('num1').value);
  const d1 = parseInt(document.getElementById('den1').value);
  const n2 = parseInt(document.getElementById('num2').value);
  const d2 = parseInt(document.getElementById('den2').value);
  const operacion = document.getElementById('operacionFraccion').value;
  const resElem = document.getElementById('resFraccion');

  if (isNaN(n1) || isNaN(d1) || isNaN(n2) || isNaN(d2)) {
    resElem.innerHTML = "<span class='fs-6 text-danger'>Llena todos los campos</span>";
    return;
  }

  if (d1 === 0 || d2 === 0) {
    resElem.innerHTML = "<span class='fs-6 text-danger'>El denominador no puede ser 0</span>";
    return;
  }

  let numRes = 0;
  let denRes = 1;

  switch (operacion) {
    case 'suma':
      numRes = n1 * d2 + n2 * d1;
      denRes = d1 * d2;
      break;
    case 'resta':
      numRes = n1 * d2 - n2 * d1;
      denRes = d1 * d2;
      break;
    case 'multiplicacion':
      numRes = n1 * n2;
      denRes = d1 * d2;
      break;
    case 'division':
      if (n2 === 0) {
        resElem.innerHTML = "<span class='fs-6 text-danger'>División inválida</span>";
        return;
      }
      numRes = n1 * d2;
      denRes = d1 * n2;
      break;
  }

  // Simplificación
  const divisor = mcd(numRes, denRes);
  numRes /= divisor;
  denRes /= divisor;

  // Manejo de signos negativos
  if (denRes < 0) {
    numRes = -numRes;
    denRes = -denRes;
  }

  resElem.innerText = denRes === 1 ? `${numRes}` : `${numRes} / ${denRes}`;
}


// ==========================================
// MÓDULO 02: RETO DE ECUACIONES
// ==========================================

let estadoJuego = {
  puntos: 0,
  errores: 0,
  tiempo: 15,
  timerId: null,
  respuestaCorrecta: null,
  activo: false
};

function iniciarJuego() {
  estadoJuego.puntos = 0;
  estadoJuego.errores = 0;
  estadoJuego.activo = true;
  
  document.getElementById('puntosJuego').innerText = '0';
  document.getElementById('erroresJuego').innerText = '0';
  document.getElementById('btnStartJuego').innerText = 'Reiniciar Juego';

  generarEcuacion();
}

function generarEcuacion() {
  if (!estadoJuego.activo) return;

  clearInterval(estadoJuego.timerId);
  estadoJuego.tiempo = 15;
  document.getElementById('timerJuego').innerText = `${estadoJuego.tiempo}s`;

  // timer
  estadoJuego.timerId = setInterval(() => {
    estadoJuego.tiempo--;
    document.getElementById('timerJuego').innerText = `${estadoJuego.tiempo}s`;
    if (estadoJuego.tiempo <= 0) {
      clearInterval(estadoJuego.timerId);
      estadoJuego.errores++;
      document.getElementById('erroresJuego').innerText = estadoJuego.errores;
      generarEcuacion();
    }
  }, 1000);

  // Generar ecuación aleatoria: aX + b = c
  const a = Math.floor(Math.random() * 5) + 1;
  const x = Math.floor(Math.random() * 10) + 1; // Respuesta real
  const b = Math.floor(Math.random() * 10) + 1;
  const c = a * x + b;

  document.getElementById('ecuacionTexto').innerText = `${a}x + ${b} = ${c}`;

  // Opciones
  let opciones = [x];
  while (opciones.length < 3) {
    let randOpt = Math.floor(Math.random() * 12) + 1;
    if (!opciones.includes(randOpt)) opciones.push(randOpt);
  }
  
  // Desordenar opciones
  opciones.sort(() => Math.random() - 0.5);
  estadoJuego.respuestaCorrecta = x;

  for (let i = 0; i < 3; i++) {
    const btn = document.getElementById(`opt${i}`);
    btn.innerText = opciones[i];
    btn.disabled = false;
    btn.dataset.val = opciones[i];
  }
}

function verificarRespuesta(index) {
  if (!estadoJuego.activo) return;

  const btn = document.getElementById(`opt${index}`);
  const valorSeleccionado = parseInt(btn.dataset.val);

  if (valorSeleccionado === estadoJuego.respuestaCorrecta) {
    estadoJuego.puntos++;
    document.getElementById('puntosJuego').innerText = estadoJuego.puntos;
  } else {
    estadoJuego.errores++;
    document.getElementById('erroresJuego').innerText = estadoJuego.errores;
  }

  generarEcuacion();
}


// ==========================================
// MÓDULO 04: CALCULADORA GEOMÉTRICA
// ==========================================

let figuraActual = 'cuadrado';

const configuracionesFiguras = {
  cuadrado: {
    titulo: 'Cuadrado',
    campos: [
      { id: 'lado', label: 'Lado (l)', placeholder: 'Ej: 5' }
    ]
  },
  rectangulo: {
    titulo: 'Rectángulo',
    campos: [
      { id: 'base', label: 'Base (b)', placeholder: 'Ej: 8' },
      { id: 'altura', label: 'Altura (h)', placeholder: 'Ej: 4' }
    ]
  },
  triangulo: {
    titulo: 'Triángulo (Equilátero/Isósceles)',
    campos: [
      { id: 'base', label: 'Base (b)', placeholder: 'Ej: 6' },
      { id: 'altura', label: 'Altura (h)', placeholder: 'Ej: 5' },
      { id: 'lado1', label: 'Lado 1 (a)', placeholder: 'Ej: 5' },
      { id: 'lado2', label: 'Lado 2 (c)', placeholder: 'Ej: 5' }
    ]
  },
  rombo: {
    titulo: 'Rombo',
    campos: [
      { id: 'diagMayor', label: 'Diagonal Mayor (D)', placeholder: 'Ej: 10' },
      { id: 'diagMenor', label: 'Diagonal Menor (d)', placeholder: 'Ej: 6' },
      { id: 'lado', label: 'Lado (l)', placeholder: 'Ej: 5' }
    ]
  },
  circulo: {
    titulo: 'Círculo',
    campos: [
      { id: 'radio', label: 'Radio (r)', placeholder: 'Ej: 4' }
    ]
  }
};

function seleccionarFigura(figura) {
  figuraActual = figura;
  
  // Actualizar botones activos
  document.querySelectorAll('.btn-figura').forEach(btn => btn.classList.remove('active'));
  document.getElementById(`fig-${figura}`).classList.add('active');

  // Actualizar título
  document.getElementById('tituloFigura').innerText = configuracionesFiguras[figura].titulo;

  // Renderizar campos de entrada
  const contenedorCampos = document.getElementById('camposGeometria');
  contenedorCampos.innerHTML = '';

  configuracionesFiguras[figura].campos.forEach(campo => {
    const col = document.createElement('div');
    col.className = 'col-6';
    col.innerHTML = `
      <label class="form-label text-muted small">${campo.label}</label>
      <input type="number" id="geo_${campo.id}" class="form-control cyber-input text-start" placeholder="${campo.placeholder}">
    `;
    contenedorCampos.appendChild(col);
  });

  // Limpiar resultados
  document.getElementById('resArea').innerText = '0.00';
  document.getElementById('resPerimetro').innerText = '0.00';
}

function calcularGeometria() {
  let area = 0;
  let perimetro = 0;

  const getVal = (id) => parseFloat(document.getElementById(`geo_${id}`)?.value) || 0;

  switch (figuraActual) {
    case 'cuadrado':
      const l = getVal('lado');
      area = l * l;
      perimetro = 4 * l;
      break;

    case 'rectangulo':
      const b = getVal('base');
      const h = getVal('altura');
      area = b * h;
      perimetro = 2 * (b + h);
      break;

    case 'triangulo':
      const baseT = getVal('base');
      const altT = getVal('altura');
      const l1 = getVal('lado1');
      const l2 = getVal('lado2');
      area = (baseT * altT) / 2;
      perimetro = baseT + l1 + l2;
      break;

    case 'rombo':
      const D = getVal('diagMayor');
      const d = getVal('diagMenor');
      const ladoR = getVal('lado');
      area = (D * d) / 2;
      perimetro = 4 * ladoR;
      break;

    case 'circulo':
      const r = getVal('radio');
      area = Math.PI * Math.pow(r, 2);
      perimetro = 2 * Math.PI * r;
      break;
  }

  document.getElementById('resArea').innerText = area.toFixed(2);
  document.getElementById('resPerimetro').innerText = perimetro.toFixed(2);
}

// Inicializar campos por defecto al cargar
document.addEventListener('DOMContentLoaded', () => {
  seleccionarFigura('cuadrado');
});