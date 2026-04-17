import { useState } from "react";
import { useApp } from "../context/AppContext";
import { Layout } from "../components/Layout";
import { Button } from "../components/ui/button";
import { Pencil, Trash, Plus } from "lucide-react";

export function TablesEdit() {
  const { tables, addTable, updateTable, deleteTable } = useApp();

  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editName, setEditName] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    addTable(newName);
    setNewName("");
  };

  const handleUpdate = (id: number) => {
    updateTable(id, editName);
    setEditingId(null);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white">Editar Mesas</h1>

        {/* Crear mesa */}
        <div className="flex gap-2">
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nombre de mesa"
            className="px-3 py-2 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <Button onClick={handleAdd}>
            <Plus className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        </div>

        {/* Lista */}
        <div className="space-y-3">
          {tables.map((table) => (
            <div
              key={table.id}
              className="flex items-center justify-between bg-zinc-900 p-3 rounded-lg border border-zinc-800"
            >
              {editingId === table.id ? (
                <input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="px-2 py-1 bg-zinc-800 text-white border border-zinc-700 rounded"
                />
              ) : (
                <span className="text-white">{table.name}</span>
              )}

              <div className="flex gap-2">
                {editingId === table.id ? (
                  <Button onClick={() => handleUpdate(table.id)}>
                    Guardar
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      setEditingId(table.id);
                      setEditName(table.name);
                    }}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                )}

                <Button
                  onClick={() => deleteTable(table.id)}
                  className="bg-red-500 hover:bg-red-600"
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}