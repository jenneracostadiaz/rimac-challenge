# Challenge Técnico - RIMAC Seguros

Esta aplicación es una solución al challenge técnico propuesto por RIMAC Seguros. El objetivo es construir una interfaz que permita a los usuarios cotizar un seguro de salud, guiándolos a través de una serie de pasos para ingresar sus datos, seleccionar un plan y ver un resumen de su cotización.

## Características

- **Flujo de cotización en varios pasos:** La aplicación guía al usuario a través de un formulario dividido en pasos para una mejor experiencia de usuario.
- **Selección de planes:** Muestra diferentes planes de seguro para que el usuario elija el que mejor se adapte a sus necesidades.
- **Resumen de cotización:** Al final del flujo, se presenta un resumen detallado de la selección del usuario.
- **Diseño responsivo:** La interfaz está diseñada para ser usable en diferentes tamaños de pantalla.
- **Stack moderno:** Construido con React, TypeScript y Vite para un desarrollo rápido y eficiente.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- `src/components`: Componentes reutilizables de la interfaz de usuario (Header, Footer, etc.).
- `src/pages`: Componentes que representan las páginas principales de la aplicación (Inicio, Planes, Resumen).
- `src/hooks`: Hooks personalizados para manejar la lógica de negocio (formularios, estado de usuario, etc.).
- `src/services`: Lógica para comunicarse con APIs externas.
- `src/styles`: Estilos globales, variables y fuentes.
- `src/types`: Definiciones de tipos de TypeScript.

## Cómo empezar

### Prerrequisitos

- Node.js (v18 o superior)
- Bun (manejador de paquetes recomendado)

### Instalación

1.  Clona el repositorio:
    ```bash
    git clone <URL-DEL-REPOSITORIO>
    ```
2.  Navega al directorio del proyecto:
    ```bash
    cd rimac-challenge
    ```
3.  Instala las dependencias:
    ```bash
    bun install
    ```

### Ejecutando la aplicación

Para iniciar el servidor de desarrollo, ejecuta:

```bash
bun dev
```

La aplicación estará disponible en `http://localhost:5173`.
