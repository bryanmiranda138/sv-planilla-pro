# 🇸🇻 Sueldo-SV | Calculadora de Salario y Planilla (El Salvador)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

**Sueldo-SV** (anteriormente SV-PlanillaPro) es una aplicación web de una sola página (SPA) diseñada para calcular con precisión matemática y legal el salario líquido, los descuentos de ley y las prestaciones anuales correspondientes a los trabajadores en El Salvador.


---

## 🚀 Características Principales

- **Cálculo Exacto de Ley:** Aplica las tasas de retención actualizadas para ISSS (3%), AFP (7.25%) y las 4 tablas de tramos del Impuesto Sobre la Renta (ISR) del Ministerio de Hacienda.
- **Desglose Quincenal y Mensual:** Muestra de forma clara cuánto recibirá el empleado por quincena y por mes.
- **Cálculo de Horas Extra:** Determina el valor exacto de la hora laboral y aplica los multiplicadores de ley (x2.00, x2.25, x1.50, x1.75) para horas extra diurnas, nocturnas y días de descanso.
- **Prestaciones Anuales:** Calcula de forma automática el Aguinaldo (según años de antigüedad), la Vacación Anual (15 días + 30% prima) y bonos extra-ley como la "Quincena 25".
- **Generación de Boleta (Impresión):** Utiliza reglas de CSS Print (`@media print`) para transformar la interfaz web en una boleta de pago formal, limpia y lista para guardar en PDF o imprimir en papel.
- **Modo Oscuro (Dark Mode):** Interfaz moderna con soporte nativo para temas claros y oscuros, mejorando la accesibilidad y la experiencia del usuario (UX).


---

## 🛠️ Tecnologías Utilizadas

Este proyecto fue construido priorizando el rendimiento, la ligereza y la ausencia de dependencias complejas (Zero-build-step):

* **Estructura:** HTML5 Semántico.
* **Estilos:** Tailwind CSS (vía CDN) configurado con clases de utilidad y `Dark Mode`.
* **Lógica:** Vanilla JavaScript (ES6+). Manipulación directa del DOM y uso de la API `Intl.NumberFormat` para el manejo preciso de divisas (USD).
* **Animaciones:** Animaciones personalizadas con `@keyframes` en CSS puro (`style.css`).

---
## 📚 Base Legal (El Salvador)

La lógica de JavaScript de este proyecto fue programada siguiendo el Código de Trabajo vigente en El Salvador:

* **Art. 177:** Cálculo de prima por vacaciones (30%).
* **Art. 198:** Días correspondientes de aguinaldo según antigüedad.
* **Reformas SAP 28 de septiembre 2017:** Tasas de retención de Administradoras de Fondos de Pensiones (AFP).
* **Ministerio de Hacienda:** Tablas de retención mensual y quincenal del ISR.

---
## ⚙️ Instalación y Uso Local

Al ser un proyecto estático sin servidor backend (Node.js/PHP), no necesitas instalar dependencias ni usar NPM.

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/bryanmiranda138/sv-planilla-pro.git](https://github.com/bryanmiranda138/sv-planilla-pro.git)

---
## 👨‍💻 Autor
Ing. Bryan Andres Candelario Miranda
* **📧 Correo:**  bryan.miranda138@gmail.com

 
Si este proyecto te pareció útil o interesante, ¡no olvides dejarle una ⭐ estrella en el repositorio!
---
