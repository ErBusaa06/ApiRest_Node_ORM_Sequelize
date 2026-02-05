import service from "../../services/productosService.js";

export const getAll = async (req, res) => {
    try {
        const data = await service.findAll();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener productos", error });
    }
};

export const getById = async (req, res) => {
    try {
        const item = await service.findById(req.params.id);
        if (!item) return res.status(404).json({ msg: "No encontrado" });
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al obtener producto", error });
    }
};

export const create = async (req, res) => {
    try {
        const item = await service.create(req.body);
        res.status(201).json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al crear producto", error });
    }
};

export const update = async (req, res) => {
    try {
        const item = await service.update(req.params.id, req.body);
        if (!item) return res.status(404).json({ msg: "No encontrado" });
        res.json(item);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al actualizar producto", error });
    }
};

export const remove = async (req, res) => {
    try {
        const item = await service.remove(req.params.id);
        if (!item) return res.status(404).json({ msg: "No encontrado" });
        res.json({ msg: "Producto eliminado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al eliminar producto", error });
    }
};
