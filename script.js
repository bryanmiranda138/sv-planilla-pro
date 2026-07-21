// ==========================================
// 1. SISTEMA DE NAVEGACIÓN (TABS)
// ==========================================
const btnCalculadora = document.getElementById('btn-calculadora');
const btnLeyes = document.getElementById('btn-leyes');
const vistaCalculadora = document.getElementById('vista-calculadora');
const vistaLeyes = document.getElementById('vista-leyes');

btnCalculadora.addEventListener('click', () => {
    // Mostrar calculadora
    vistaCalculadora.classList.remove('hidden');
    vistaLeyes.classList.add('hidden');
    // Activar botón
    btnCalculadora.classList.add('border-blue-600', 'text-blue-600');
    btnCalculadora.classList.remove('border-transparent', 'text-gray-500');
    // Desactivar el otro
    btnLeyes.classList.remove('border-blue-600', 'text-blue-600');
    btnLeyes.classList.add('border-transparent', 'text-gray-500');
});

btnLeyes.addEventListener('click', () => {
    // Mostrar leyes
    vistaLeyes.classList.remove('hidden');
    vistaCalculadora.classList.add('hidden');
    // Activar botón
    btnLeyes.classList.add('border-blue-600', 'text-blue-600');
    btnLeyes.classList.remove('border-transparent', 'text-gray-500');
    // Desactivar el otro
    btnCalculadora.classList.remove('border-blue-600', 'text-blue-600');
    btnCalculadora.classList.add('border-transparent', 'text-gray-500');
});

// ==========================================
// 2. LÓGICA DE CÁLCULO SALARIAL
// ==========================================
const formatoDinero = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

document.getElementById('calcForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener Valores
    const salario = parseFloat(document.getElementById('salario').value);
    const tiempo = document.getElementById('tiempo').value;
    const fechaInicio = new Date(document.getElementById('fechaInicio').value);
    const hoy = new Date();

    if(fechaInicio > hoy) {
        alert("La fecha de inicio no puede ser mayor a la fecha actual.");
        return;
    }

    // --- NUEVO: CÁLCULOS POR HORA Y EXTRAS (Según multiplicadores de la imagen) ---
    const salarioDiario = salario / 30;
    const salarioHora = salarioDiario / 8; // Asumiendo jornada diurna de 8 hrs
    
    const heDiurna = salarioHora * 2.00;
    const heNocturna = salarioHora * 2.25;
    const heLibreDiurna = salarioHora * 1.50;
    const heLibreNocturna = salarioHora * 1.75;

    // --- CÁLCULOS MENSUALES DE LEY ---
    const salarioISSS = Math.min(salario, 1000);
    const isss = salarioISSS * 0.03;
    const isssPatronal = salarioISSS * 0.075;

    const salarioAFP = Math.min(salario, 7045.06);
    const afp = salarioAFP * 0.0725;
    const afpPatronal = salarioAFP * 0.0875;

    const salarioGravado = salario - isss - afp;
    let renta = 0;

    if (salarioGravado > 0.01 && salarioGravado <= 472.00) {
        renta = 0;
    } else if (salarioGravado >= 472.01 && salarioGravado <= 895.24) {
        renta = ((salarioGravado - 472.00) * 0.10) + 17.67;
    } else if (salarioGravado >= 895.25 && salarioGravado <= 2038.10) {
        renta = ((salarioGravado - 895.24) * 0.20) + 60.00;
    } else if (salarioGravado >= 2038.11) {
        renta = ((salarioGravado - 2038.10) * 0.30) + 288.57;
    }

    const descuentosMensuales = isss + afp + renta;
    const liquidoMensual = salario - descuentosMensuales;

    // --- CÁLCULOS QUINCENALES ---
    const isssQ = isss / 2;
    const afpQ = afp / 2;
    const rentaQ = renta / 2;
    const descQ = descuentosMensuales / 2;
    const liquidoQ = liquidoMensual / 2;

    // --- AGUINALDO Y PRESTACIONES ---
    const cuotaDiaria = salario / 30;
    let aguinaldoBruto = 0;
    let diasAguinaldo = 0;
    let notaAguinaldo = "";

    if (tiempo === "menos_1") {
        const diffTime = Math.abs(hoy - fechaInicio);
        const diasTrabajados = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const diasCalculo = Math.min(diasTrabajados, 365); 
        aguinaldoBruto = (cuotaDiaria * 15 / 365) * diasCalculo;
        notaAguinaldo = `Proporcional (${diasCalculo} días)`;
    } else {
        if (tiempo === "1_a_3") diasAguinaldo = 15;
        else if (tiempo === "3_a_10") diasAguinaldo = 19;
        else if (tiempo === "10_mas") diasAguinaldo = 21;
        
        aguinaldoBruto = cuotaDiaria * diasAguinaldo;
        notaAguinaldo = `Correspondiente a ${diasAguinaldo} días`;
    }

    const pagoVacacion15Dias = cuotaDiaria * 15;
    const primaVacacion = pagoVacacion15Dias * 0.30;
    const vacacionTotalBruta = pagoVacacion15Dias + primaVacacion;
    const quincena25 = salario / 2;

    // ==========================================
    // RENDERIZAR RESULTADOS
    // ==========================================
    document.getElementById('resultados').classList.remove('hidden');

    // SET: Desglose Diario/Hora (NUEVO)
    document.getElementById('r_diario').textContent = formatoDinero.format(salarioDiario);
    document.getElementById('r_hora').textContent = formatoDinero.format(salarioHora);
    document.getElementById('r_he_diurna').textContent = formatoDinero.format(heDiurna);
    document.getElementById('r_he_nocturna').textContent = formatoDinero.format(heNocturna);
    document.getElementById('r_he_libre_diurna').textContent = formatoDinero.format(heLibreDiurna);
    document.getElementById('r_he_libre_nocturna').textContent = formatoDinero.format(heLibreNocturna);

    // SET: Mensual y Quincenal
    document.getElementById('r_bruto_m').textContent = formatoDinero.format(salario);
    document.getElementById('r_isss_m').textContent = '-' + formatoDinero.format(isss);
    document.getElementById('r_afp_m').textContent = '-' + formatoDinero.format(afp);
    document.getElementById('r_renta_m').textContent = '-' + formatoDinero.format(renta);
    document.getElementById('r_desc_m').textContent = '-' + formatoDinero.format(descuentosMensuales);
    document.getElementById('r_liquido_m').textContent = formatoDinero.format(liquidoMensual);

    document.getElementById('r_bruto_q').textContent = formatoDinero.format(salario / 2);
    document.getElementById('r_isss_q').textContent = '-' + formatoDinero.format(isssQ);
    document.getElementById('r_afp_q').textContent = '-' + formatoDinero.format(afpQ);
    document.getElementById('r_renta_q').textContent = '-' + formatoDinero.format(rentaQ);
    document.getElementById('r_desc_q').textContent = '-' + formatoDinero.format(descQ);
    document.getElementById('r_liquido_q').textContent = formatoDinero.format(liquidoQ);

    // SET: Patronal y Prestaciones
    document.getElementById('r_isss_pat').textContent = formatoDinero.format(isssPatronal);
    document.getElementById('r_afp_pat').textContent = formatoDinero.format(afpPatronal);
    document.getElementById('nota_aguinaldo').textContent = notaAguinaldo;
    document.getElementById('r_aguinaldo').textContent = formatoDinero.format(aguinaldoBruto);
    document.getElementById('r_vacacion').textContent = formatoDinero.format(vacacionTotalBruta);
    document.getElementById('r_q25').textContent = formatoDinero.format(quincena25);

    // ==========================================
    // DATOS PARA LA BOLETA DE IMPRESIÓN
    // ==========================================
    
    // 1. Inyectar Fecha de Ingreso (Mejorada con formato Latino/Europeo DD/MM/YYYY)
    const fechaInput = document.getElementById('fechaInicio').value;
    if (fechaInput) {
        // Separar "2025-06-24" a un arreglo ["2025", "06", "24"]
        const partes = fechaInput.split('-');
        // Armarlo como "24/06/2025"
        const fechaIngresoFormateada = `${partes[2]}/${partes[1]}/${partes[0]}`;
        document.getElementById('print_fecha_ingreso').textContent = fechaIngresoFormateada;
    } else {
        document.getElementById('print_fecha_ingreso').textContent = "No especificada";
    }

    // 2. Generar Fecha y Hora Actual de la impresión (Estilo: 21/7/26, 11:02)
    const fechaImpresion = hoy.toLocaleDateString('es-SV', { day: 'numeric', month: 'numeric', year: '2-digit' });
    const horaImpresion = hoy.toLocaleTimeString('es-SV', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    document.getElementById('print_datetime').textContent = `${fechaImpresion}, ${horaImpresion}`;
});