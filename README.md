# Feliz cumpleaños, mami — una carta para ti

Tarjeta de cumpleaños interactiva con tres cartas (John, Esteban y Helena), pétalos animados y el soundtrack de *"A Thousand Years"* (Christina Perri) sonando al abrir la carta.

## Estructura

```
proyecto/
├── index.html                  # Estructura de la tarjeta
├── css/
│   └── styles.css              # Todos los estilos (tema, animaciones, responsive)
├── js/
│   └── script.js               # Lógica: puerta de entrada, tabs, pétalos y música
├── assets/
│   ├── images/
│   │   └── hero.jpg            # Foto del hero (extraída del base64 original)
│   └── audio/
│       └── thousand_years.m4a  # Soundtrack que se reproduce al abrir la carta
└── README.md
```

## Cómo abrir

Abre `index.html` en cualquier navegador (doble clic). Haz clic en **"Abrir la carta"** para
entrar: ahí comienza la música y se muestran los pétalos.

> Nota: los navegadores solo permiten reproducir audio con sonido después de una interacción
> del usuario, por eso la música inicia al hacer clic en "Abrir la carta" y no antes.

## Compartir la tarjeta

`index.html` y la carpeta `assets/` deben viajar juntos (misma carpeta), ya que la música y la
foto se cargan desde rutas relativas. Si se comparte solo el HTML, la página usa como respaldo
el reproductor embebido de YouTube del mismo tema musical.

## Personalizar

- **Cambiar la foto:** reemplaza `assets/images/hero.jpg` manteniendo el mismo nombre.
- **Cambiar la canción:** reemplaza `assets/audio/thousand_years.m4a` por tu propio audio en
  formato M4A/AAC (o MP3 ajustando la extensión y la ruta en `index.html`).
- **Editar las cartas:** el texto está en `index.html`, dentro de los `<article>` con la clase `.letter`.
- **Colores/fuentes:** las variables del tema están al inicio de `css/styles.css` (`:root`).

## Despliegue (opcional)

Al ser un sitio 100 % estático, puedes subirlo gratis a Netlify, Vercel o GitHub Pages
simplemente arrastrando/empujando la carpeta `proyecto/`. En hosting bajo HTTPS, el respaldo
de YouTube queda disponible automáticamente.