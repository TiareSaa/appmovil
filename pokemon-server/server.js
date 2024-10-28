const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para manejar JSON en las solicitudes
app.use(bodyParser.json());

// Ruta para obtener todos los Pokémon
app.get('/pokemons', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo' });
    }
    const pokemons = JSON.parse(data);
    res.json(pokemons);
  });
});

// Ruta para agregar un Pokémon
app.post('/pokemons', (req, res) => {
  fs.readFile('data.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo' });
    }

    const pokemons = JSON.parse(data);
    const newPokemon = req.body;

    // Asignar ID autoincremental al nuevo Pokémon
    const newId = pokemons.length > 0 ? Math.max(...pokemons.map(p => p.id)) + 1 : 1; // Cambia la generación de ID
    const pokemonToAdd = { ...newPokemon, id: newId }; // Asegúrate de que 'id' sea numérico

    pokemons.push(pokemonToAdd);

    fs.writeFile('data.json', JSON.stringify(pokemons), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al escribir en el archivo' });
      }
      res.status(201).json(pokemonToAdd);
    });
  });
});

// Ruta para editar un Pokémon
app.put('/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  fs.readFile('data.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo' });
    }

    let pokemons = JSON.parse(data);
    pokemons = pokemons.map(pokemon => (pokemon.id === id ? { ...pokemon, ...req.body } : pokemon));

    fs.writeFile('data.json', JSON.stringify(pokemons), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al escribir en el archivo' });
      }
      res.json(req.body);
    });
  });
});

// Ruta para eliminar un Pokémon
app.delete('/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  fs.readFile('data.json', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer el archivo' });
    }

    let pokemons = JSON.parse(data);
    pokemons = pokemons.filter(pokemon => pokemon.id !== id);

    fs.writeFile('data.json', JSON.stringify(pokemons), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error al escribir en el archivo' });
      }
      res.status(204).send();
    });
  });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
