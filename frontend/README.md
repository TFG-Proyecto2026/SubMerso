# SubMerso Frontend

Frontend de la aplicación SubMerso - Red Social de Buceo.

## Tecnologías

- **Angular 17+** - Framework principal con standalone components
- **TypeScript** - Lenguaje de programación
- **Tailwind CSS** - Framework de utilidades CSS
- **Bootstrap 5** - Componentes UI y iconos

## Estructura del Proyecto

```
src/
├── app/
│   ├── core/           # Servicios, guards e interceptors
│   │   ├── services/   # AuthService, UserService, etc.
│   │   ├── guards/     # AuthGuard, RoleGuard
│   │   └── interceptors/ # JWT Interceptor
│   ├── shared/         # Componentes reutilizables
│   │   ├── components/ # Navbar, Footer, Cards, Modals
│   │   ├── pipes/      # Pipes personalizados
│   │   └── directives/ # Directivas personalizadas
│   └── features/       # Módulos de la aplicación
│       ├── auth/       # Login y Registro (FUNCIONAL)
│       ├── profile/    # Perfil de usuario (FUNCIONAL)
│       ├── social/     # Feed y Followers (placeholder)
│       ├── marketplace/# Búsqueda, Booking, Pagos (placeholder)
│       ├── logbook/    # Registro de inmersiones (placeholder)
│       └── deepblue-bot/ # Asistente IA (placeholder)
├── environments/       # Variables de entorno
└── assets/            # Recursos estáticos
```

## Instalación

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm start

# Build de producción
npm run build
```

## Configuración

El frontend se conecta al backend en `http://localhost:8080/api`. 
Puedes modificar esta URL en `src/environments/environment.ts`.

## Módulos Funcionales

### Autenticación
- Login con email y contraseña
- Registro con validación de formularios
- Gestión de sesión con JWT
- Interceptor para añadir token a las peticiones

### Perfiles
- Ver perfil de usuarios
- Editar perfil propio
- Sistema de follow/unfollow
- Estadísticas de inmersiones

## Módulos Placeholder

Los siguientes módulos tienen diseño visual pero sin funcionalidad backend:
- Feed Social
- Marketplace
- Logbook Digital
- DeepBlue Bot

## Tema Visual

La aplicación usa una paleta de colores oceánicos:
- `ocean-500`: #0099e6 (azul principal)
- `deep-500`: #006080 (azul oscuro)
- Gradientes marinos para headers y CTAs

## Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Compila para producción
- `npm test` - Ejecuta tests unitarios
- `npm run watch` - Compila en modo watch
