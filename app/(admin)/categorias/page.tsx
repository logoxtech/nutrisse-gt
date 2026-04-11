"use client";

import { useEffect, useState, useRef } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Category } from "@/lib/types";
import { GripVertical, Pencil, Trash2, Check, X, Plus } from "lucide-react";

export default function CategoriasPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [saving, setSaving] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "categories"));
      const cats = snap.docs.map(d => ({ id: d.id, ...d.data() } as Category));
      cats.sort((a, b) => (a.order || 0) - (b.order || 0));
      setCategories(cats);
      setLoading(false);
    }
    load();
  }, []);

  const handleDragSort = async () => {
    if (dragItem.current === null || dragOverItem.current === null) return;
    const items = [...categories];
    const dragged = items.splice(dragItem.current, 1)[0];
    items.splice(dragOverItem.current, 0, dragged);
    const reordered = items.map((item, i) => ({ ...item, order: i }));
    setCategories(reordered);
    dragItem.current = null;
    dragOverItem.current = null;
    // Persist order
    await Promise.all(reordered.map(c => updateDoc(doc(db, "categories", c.id), { order: c.order })));
  };

  const handleSaveEdit = async (id: string) => {
    if (!editName.trim()) return;
    await updateDoc(doc(db, "categories", id), { name: editName.trim() });
    setCategories(prev => prev.map(c => c.id === id ? { ...c, name: editName.trim() } : c));
    setEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "categories", id));
    setCategories(prev => prev.filter(c => c.id !== id));
    setConfirmDeleteId(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setSaving(true);
    const newOrder = categories.length;
    const docRef = await addDoc(collection(db, "categories"), {
      name: newName.trim(),
      description: newDesc.trim(),
      active: true,
      order: newOrder,
      createdAt: serverTimestamp()
    });
    setCategories(prev => [...prev, { id: docRef.id, name: newName.trim(), description: newDesc.trim(), active: true, order: newOrder }]);
    setNewName("");
    setNewDesc("");
    setSaving(false);
  };

  return (
    <div className="space-y-8 max-w-2xl">
      <h1 className="text-2xl font-bold text-stone-800">Categorías</h1>

      <div className="bg-white rounded-xl shadow-sm border border-stone-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-stone-100">
          <p className="text-sm text-stone-500">Arrastra para reordenar. El orden se guarda automáticamente.</p>
        </div>
        {loading ? (
          <div className="flex justify-center py-10"><div className="w-7 h-7 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin"/></div>
        ) : categories.length === 0 ? (
          <p className="text-center text-stone-400 py-10">No hay categorías. Crea la primera abajo.</p>
        ) : (
          <ul className="divide-y divide-stone-100">
            {categories.map((cat, idx) => (
              <li
                key={cat.id}
                draggable
                onDragStart={() => { dragItem.current = idx; }}
                onDragEnter={() => { dragOverItem.current = idx; }}
                onDragEnd={handleDragSort}
                className="flex items-center gap-3 px-4 py-3 hover:bg-stone-50 transition group cursor-grab active:cursor-grabbing"
              >
                <GripVertical size={18} className="text-stone-300 group-hover:text-stone-400 flex-shrink-0" />
                {editingId === cat.id ? (
                  <input
                    autoFocus
                    value={editName}
                    onChange={e => setEditName(e.target.value)}
                    className="flex-1 border border-nutrisse-sage rounded px-3 py-1 text-sm focus:outline-none"
                    onKeyDown={e => { if (e.key === "Enter") handleSaveEdit(cat.id); if (e.key === "Escape") setEditingId(null); }}
                  />
                ) : (
                  <span className="flex-1 font-medium text-stone-700">{cat.name}</span>
                )}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                  {editingId === cat.id ? (
                    <>
                      <button onClick={() => handleSaveEdit(cat.id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded"><Check size={15}/></button>
                      <button onClick={() => setEditingId(null)} className="p-1.5 text-stone-400 hover:bg-stone-100 rounded"><X size={15}/></button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditingId(cat.id); setEditName(cat.name); }} className="p-1.5 text-stone-400 hover:bg-stone-100 rounded"><Pencil size={15}/></button>
                      <button onClick={() => setConfirmDeleteId(cat.id)} className="p-1.5 text-red-400 hover:bg-red-50 rounded"><Trash2 size={15}/></button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Delete Confirmation */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-6 shadow-xl max-w-sm mx-4 w-full">
            <h3 className="font-bold text-stone-800 mb-2">¿Eliminar categoría?</h3>
            <p className="text-stone-500 text-sm mb-6">Los productos en esta categoría quedarán sin categoría asignada.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setConfirmDeleteId(null)} className="px-4 py-2 text-sm border border-stone-200 rounded-lg hover:bg-stone-50 transition">Cancelar</button>
              <button onClick={() => handleDelete(confirmDeleteId)} className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Eliminar</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Category */}
      <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6">
        <h2 className="font-semibold text-stone-700 mb-4">Nueva Categoría</h2>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Nombre *</label>
            <input value={newName} onChange={e => setNewName(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:ring-2 focus:ring-nutrisse-sage focus:outline-none" placeholder="Ej: Suplementos" required/>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Descripción (opcional)</label>
            <input value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:ring-2 focus:ring-nutrisse-sage focus:outline-none" placeholder="Descripción breve" />
          </div>
          <button type="submit" disabled={saving} className="flex items-center gap-2 bg-nutrisse-sage text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-nutrisse-sage/90 transition">
            <Plus size={16}/> {saving ? "Creando..." : "Crear Categoría"}
          </button>
        </form>
      </div>
    </div>
  );
}
