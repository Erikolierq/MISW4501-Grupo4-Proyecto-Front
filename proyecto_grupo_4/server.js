const express = require('express');
const path = require('path');

const app = express();

// Ahora servimos desde /app/dist (donde copiamos el contenido de /browser)
const distPath = path.join(__dirname, 'dist');

app.use(express.static(distPath));

// Redirigir todo al index.html para Angular Routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`✅ Servidor Express corriendo en http://localhost:${PORT}`);
});
