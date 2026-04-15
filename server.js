const express = require("express");
const path = require("path");
const { DataStore } = require("./backend/data-store");
const { buildDashboard, createMaterial, registerMovement, updateMaterial } = require("./backend/inventory-service");

const app = express();
const port = process.env.PORT || 3000;
const dataFilePath = path.join(__dirname, "datos.json");
const store = new DataStore(dataFilePath, { materials: [], movements: [] });

app.use(express.json());
app.use(express.static(__dirname));

app.get("/api/dashboard", async (request, response, next) => {
    try {
        const data = await store.read();
        response.json(buildDashboard(data));
    } catch (error) {
        next(error);
    }
});

app.post("/api/materials", async (request, response, next) => {
    try {
        const nextData = await store.update(async (data) => {
            const { material, movement } = createMaterial(data.materials, request.body);
            return {
                materials: [...data.materials, material],
                movements: [movement, ...data.movements],
            };
        });

        response.status(201).json(buildDashboard(nextData));
    } catch (error) {
        next(error);
    }
});

app.put("/api/materials/:materialId", async (request, response, next) => {
    try {
        const nextData = await store.update(async (data) => {
            const materials = [...data.materials];
            updateMaterial(materials, request.params.materialId, request.body);
            return {
                ...data,
                materials,
            };
        });

        response.json(buildDashboard(nextData));
    } catch (error) {
        next(error);
    }
});

app.post("/api/materials/:materialId/movements", async (request, response, next) => {
    try {
        const nextData = await store.update(async (data) => {
            const materials = [...data.materials];
            const { movement } = registerMovement(materials, request.params.materialId, request.body);
            return {
                materials,
                movements: [movement, ...data.movements],
            };
        });

        response.status(201).json(buildDashboard(nextData));
    } catch (error) {
        next(error);
    }
});

app.use((request, response) => {
    response.status(404).json({ error: "Ruta no encontrada." });
});

app.use((error, request, response, next) => {
    const status = error.status || 400;
    response.status(status).json({ error: error.message || "Ocurrio un error en el servidor." });
});

app.listen(port, async () => {
    await store.ensureFile();
    console.log(`Servidor de inventario activo en http://localhost:${port}`);
});