# Sistema de inventario para laboratorio de quimica

Aplicacion web para controlar materiales y reactivos con alertas preventivas, validacion de existencias y trazabilidad de movimientos.

## Funcionalidades principales

- Alta de materiales y reactivos con cantidad inicial.
- Validacion para impedir cantidades negativas.
- Validacion para impedir materiales duplicados por nombre.
- Alertas visuales y filas en rojo cuando la existencia queda en cero.
- Historial de movimientos con fecha, usuario, motivo, cantidad anterior y cantidad resultante.
- Dashboard con resumen de materiales, stock bajo, sin existencia y movimientos del dia.

## Requisitos

- Node.js 18 o superior.

## Ejecucion

```bash
npm install
npm start
```

La aplicacion quedara disponible en `http://localhost:3000`.

## Persistencia

La informacion se guarda en el archivo `datos.json` en la raiz del proyecto.