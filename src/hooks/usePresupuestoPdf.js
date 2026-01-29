import { toast } from 'react-toastify';
import jsPDF from 'jspdf';
import { projectService } from '../services/projectService';

export const usePresupuestoPdf = () => {
  // Margen inferior antes de crear nueva página
  const PAGE_HEIGHT = 280;
  const MARGIN_BOTTOM = 20;

  // Colores corporativos
  const COLORS = {
    headerBlue: [91, 155, 213], // Azul para headers de tabla
    lightBlue: [217, 225, 242], // Azul claro para filas alternas
    darkGray: [89, 89, 89], // Gris oscuro para títulos
    mediumGray: [128, 128, 128], // Gris medio para texto secundario
    black: [0, 0, 0], // Negro para texto normal
    white: [255, 255, 255], // Blanco
  };

  // Función auxiliar para verificar si necesitamos nueva página
  const checkPageBreak = (doc, currentY, requiredSpace = 10) => {
    if (currentY + requiredSpace > PAGE_HEIGHT - MARGIN_BOTTOM) {
      doc.addPage();
      return 15;
    }
    return currentY;
  };

  // --- UTILITY: CREAR LA TABLA DE MATERIALES EN PDF ---
  const drawMaterialTable = (doc, data, startY) => {
    let y = checkPageBreak(doc, startY, 30);

    // Determinar la moneda
    const moneda = data.length > 0 && data[0].hasOwnProperty('precioUnitario') ? 'BOB' : 'USD';

    // Configuración de la tabla
    const tableX = 20;
    const tableWidth = 175;
    const colWidths = {
      material: 80,
      cantidad: 35,
      precioUnitario: 30,
      subtotal: 30,
    };
    const rowHeight = 6;

    // HEADER de la tabla
    doc.setFillColor(...COLORS.headerBlue);
    doc.rect(tableX, y - 4, tableWidth, rowHeight, 'F');

    doc.setTextColor(...COLORS.white);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');

    let currentX = tableX + 2;
    doc.text('Material', currentX, y);
    currentX += colWidths.material;
    doc.text('Cantidad', currentX, y);
    currentX += colWidths.cantidad;
    doc.text('Precio Unitario', currentX, y);
    currentX += colWidths.precioUnitario;
    doc.text('Subtotal', currentX, y);

    y += rowHeight;

    // Restaurar color de texto
    doc.setTextColor(...COLORS.black);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);

    // Filas de datos
    let isAlternate = false;
    data.forEach((item) => {
      y = checkPageBreak(doc, y, rowHeight + 2);

      // Fondo alternado
      if (isAlternate) {
        doc.setFillColor(...COLORS.lightBlue);
        doc.rect(tableX, y - 4, tableWidth, rowHeight, 'F');
      }

      // Bordes
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.1);
      doc.rect(tableX, y - 4, tableWidth, rowHeight, 'S');

      // Líneas divisorias verticales
      let dividerX = tableX + colWidths.material;
      doc.line(dividerX, y - 4, dividerX, y + 2);
      dividerX += colWidths.cantidad;
      doc.line(dividerX, y - 4, dividerX, y + 2);
      dividerX += colWidths.precioUnitario;
      doc.line(dividerX, y - 4, dividerX, y + 2);

      // Contenido
      currentX = tableX + 2;
      doc.text(item.material || 'N/A', currentX, y);
      currentX += colWidths.material;
      doc.text(`${item.cantidad?.toString() || '0'} ${item.unidad || ''}`, currentX, y);
      currentX += colWidths.cantidad;
      doc.text(`${item.precioUnitario ? item.precioUnitario.toFixed(2) : '0.00'} ${moneda}`, currentX, y);
      currentX += colWidths.precioUnitario;
      doc.text(`${item.subtotal ? item.subtotal.toFixed(2) : '0.00'} ${moneda}`, currentX, y);

      y += rowHeight;
      isAlternate = !isAlternate;
    });

    // Fila de Total
    y = checkPageBreak(doc, y, 10);
    doc.setFont(undefined, 'bold');
    doc.setFillColor(240, 240, 240);
    doc.rect(tableX, y - 4, tableWidth, rowHeight, 'F');
    doc.rect(tableX, y - 4, tableWidth, rowHeight, 'S');

    doc.text('Total', tableX + colWidths.material + colWidths.cantidad + colWidths.precioUnitario - 10, y);

    const totalMat = data.reduce((sum, item) => sum + (item.subtotal || 0), 0);
    doc.text(`${totalMat.toFixed(2)} ${moneda}`, tableX + tableWidth - 2, y, { align: 'right' });

    doc.setFont(undefined, 'normal');

    return y + 10;
  };

  // --- TABLA DE ÁREAS ---
  const drawAreasTable = (doc, areas, startY) => {
    let y = startY;

    const tableX = 20;
    const tableWidth = 100;
    const col1Width = 70;
    const rowHeight = 6;

    // HEADER
    doc.setFillColor(...COLORS.headerBlue);
    doc.rect(tableX, y - 4, tableWidth, rowHeight, 'F');

    doc.setTextColor(...COLORS.white);
    doc.setFontSize(9);
    doc.setFont(undefined, 'bold');
    doc.text('Ambiente', tableX + 3, y);
    doc.text('Área (m²)', tableX + tableWidth - 3, y, { align: 'right' });

    y += rowHeight;
    doc.setTextColor(...COLORS.black);
    doc.setFont(undefined, 'normal');
    doc.setFontSize(8);

    // Filas
    let isAlternate = false;
    areas.forEach((a) => {
      y = checkPageBreak(doc, y, rowHeight + 2);

      const isTotal = a.ambiente === 'Total';

      // Fondo
      if (isTotal) {
        doc.setFillColor(240, 240, 240);
        doc.setFont(undefined, 'bold');
      } else if (isAlternate) {
        doc.setFillColor(...COLORS.lightBlue);
      } else {
        doc.setFillColor(...COLORS.white);
      }

      doc.rect(tableX, y - 4, tableWidth, rowHeight, 'F');

      // Bordes
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.1);
      doc.rect(tableX, y - 4, tableWidth, rowHeight, 'S');
      doc.line(tableX + col1Width, y - 4, tableX + col1Width, y + 2);

      // Contenido
      doc.text(a.ambiente, tableX + 3, y);
      doc.text(`${a.areaM2?.toFixed(2) || '0.00'}`, tableX + tableWidth - 3, y, { align: 'right' });

      y += rowHeight;

      if (!isTotal) {
        isAlternate = !isAlternate;
      }

      doc.setFont(undefined, 'normal');
    });

    return y + 5;
  };

  // --- FUNCIÓN PRINCIPAL DE GENERACIÓN DEL PDF ---
  const generatePdfFromPresupuesto = async (presupuestoJson, imageBase64) => {
    const doc = new jsPDF('p', 'mm', 'a4');
    let y = 15;

    // ------------------ TÍTULO PRINCIPAL ------------------
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...COLORS.black);
    doc.text(presupuestoJson.reporteTitulo || 'REPORTE DE PRESUPUESTO DE MATERIALES', 105, y, { align: 'center' });
    y += 10;

    // ------------------ INFORMACIÓN DEL PROYECTO ------------------
    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...COLORS.mediumGray);

    const info = presupuestoJson.informacionGeneral || {};
    doc.text(`Proyecto: ${info.proyecto || 'N/A'} - ${info.superficieTotal || '0'} ${info.unidadSuperficie || 'm²'}`, 20, y);
    y += 4;
    doc.text(`Generado por: ${info.generadoPor || 'Sistema IA'}`, 20, y);
    y += 4;
    doc.text(`Fecha: ${info.fecha || new Date().toLocaleDateString()}`, 20, y);
    y += 10;

    // ------------------ IMAGEN DEL PLANO ------------------
    y = checkPageBreak(doc, y, 100);

    const pageWidth = 210;
    const maxImageWidth = 170;
    const maxHeight = 100;

    await new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        let imgWidth = img.width;
        let imgHeight = img.height;

        const scaleFactor = maxImageWidth / imgWidth;
        imgWidth *= scaleFactor;
        imgHeight *= scaleFactor;

        if (imgHeight > maxHeight) {
          imgWidth = (maxHeight / imgHeight) * imgWidth;
          imgHeight = maxHeight;
        }

        if (y + imgHeight > PAGE_HEIGHT - MARGIN_BOTTOM) {
          doc.addPage();
          y = 15;
        }

        const imageX = (pageWidth - imgWidth) / 2;
        doc.addImage(img.src, 'PNG', imageX, y, imgWidth, imgHeight);
        y += imgHeight + 8;
        resolve();
      };
      img.onerror = () => {
        // eslint-disable-next-line no-console
        console.warn('Error al cargar la imagen del diagrama para PDF.');
        y += 10;
        resolve();
      };
      img.src = `data:image/png;base64,${imageBase64}`;
    });

    // ------------------ 1. Resumen general del proyecto ------------------
    y = checkPageBreak(doc, y, 30);

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...COLORS.darkGray);
    doc.text('1. Resumen general del proyecto', 20, y);
    y += 6;

    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...COLORS.black);

    const resumen = info.resumen || {};
    const resumenItems = [
      `- Superficie total de piso: ${resumen.superficiePiso?.toFixed(2) || '0.00'} m²`,
      `- Altura estándar de muros: ${resumen.alturaEstandar?.toFixed(2) || '0.00'} m`,
      `- Superficie total de muros neta: ${resumen.superficieMurosNeta?.toFixed(2) || '0.00'} m²`,
      `- Ambientes detectados: ${resumen.ambientesDetectados || 0}`,
      `- Aberturas detectadas: ${resumen.aberturasDetectadas || 0}`,
    ];

    resumenItems.forEach((item) => {
      y = checkPageBreak(doc, y, 5);
      doc.text(item, 20, y);
      y += 4;
    });
    y += 6;

    // ------------------ 2. Área de pisos por ambiente ------------------
    y = checkPageBreak(doc, y, 30);

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...COLORS.darkGray);
    doc.text('2. Área de pisos por ambiente', 20, y);
    y += 6;

    const areas = presupuestoJson.areasPorAmbiente || [];
    y = drawAreasTable(doc, areas, y);

    // ------------------ 3. Costo estimado ------------------
    y = checkPageBreak(doc, y, 30);

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...COLORS.darkGray);
    doc.text('3. Costo estimado', 20, y);
    y += 6;

    const materiales = presupuestoJson.costoEstimado?.detalleMateriales || [];
    y = drawMaterialTable(doc, materiales, y);

    // ------------------ Observaciones ------------------
    y = checkPageBreak(doc, y, 30);

    doc.setFontSize(11);
    doc.setFont(undefined, 'bold');
    doc.setTextColor(...COLORS.darkGray);
    doc.text('Observaciones:', 20, y);
    y += 6;

    doc.setFontSize(8);
    doc.setFont(undefined, 'normal');
    doc.setTextColor(...COLORS.black);

    const observaciones = presupuestoJson.observaciones
      || 'Los cálculos se basan en una interpretación estándar del plano 2D presentado. '
      + 'Los precios unitarios y la mano de obra son estimados y no contractuales. '
      + 'Se recomienda verificar en sitio y ajustar según especificaciones detalladas.';

    const splitText = doc.splitTextToSize(observaciones, 170);
    splitText.forEach((line) => {
      y = checkPageBreak(doc, y, 5);
      doc.text(line, 20, y);
      y += 4;
    });

    // ------------------ Pie de página ------------------
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i += 1) {
      doc.setPage(i);
      doc.setFontSize(7);
      doc.setTextColor(...COLORS.mediumGray);
      doc.text('Los cálculos fueron generados automáticamente a partir del plano digital interpretado por IA.', 20, 280);
      doc.text('Los precios unitarios pueden personalizarse según el mercado o proveedor.', 20, 283);
      doc.text('Este presupuesto es estimado, no contractual.', 20, 286);
      doc.text(`Página ${i} de ${pageCount}`, 190, 289, { align: 'right' });
    }

    // Guardar/Descargar
    const projectName = presupuestoJson.informacionGeneral?.proyecto || 'NuevoProyecto';
    const date = presupuestoJson.informacionGeneral?.fecha || new Date().toISOString().split('T')[0];
    doc.save(`Presupuesto_IA_${projectName}_${date}.pdf`);
  };

  const handleGenerateIAPresupuesto = async () => {
    const diagram = window.floorplanDiagram;

    if (!diagram) {
      toast.error('📐 No hay diagrama cargado para generar el presupuesto.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const toastId = toast.info('🤖 Analizando plano y estimando presupuesto...', {
      position: 'top-right',
      autoClose: false,
      isLoading: true,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
    });

    try {
      const plano2dJson = JSON.parse(diagram.model.toJson());

      const imageData = diagram.makeImageData({
        background: 'white',
        scale: 2,
        type: 'image/png',
      });
      const base64Image = imageData.split(',')[1];

      const presupuestoJson = await projectService.generateIAPresupuesto(plano2dJson, base64Image);

      await generatePdfFromPresupuesto(presupuestoJson, base64Image);

      toast.update(toastId, {
        render: '✅ Presupuesto generado y descargado correctamente',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error en el flujo de presupuesto IA:', error);

      let errorMsg = 'Error desconocido al estimar presupuesto';
      if (error.message) {
        errorMsg = error.message;
      }

      toast.update(toastId, {
        render: `❌ ${errorMsg}`,
        type: 'error',
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return handleGenerateIAPresupuesto;
};