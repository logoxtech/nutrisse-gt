"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  doc, getDoc, setDoc, updateDoc, collection, getDocs, serverTimestamp
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Category } from "@/lib/types";
import { UploadCloud, X, ArrowLeft, Loader } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const schema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  slug: z.string().min(1, "El slug es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  longDescription: z.string().optional(),
  price: z.coerce.number().positive("El precio debe ser mayor a 0"),
  comparePrice: z.coerce.number().min(0).optional().or(z.literal("")),
  categoryId: z.string().min(1, "Selecciona una categoría"),
  stock: z.coerce.number().min(0, "El stock no puede ser negativo"),
  featured: z.boolean(),
  active: z.boolean(),
});

// Explicit interface avoids Zod v4 coerce.number() inferring `unknown`
interface FormData {
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  price: number;
  comparePrice?: number | "";
  categoryId: string;
  stock: number;
  featured: boolean;
  active: boolean;
}

function generateSlug(name: string) {
  return name.toLowerCase().replace(/[áàä]/g, "a").replace(/[éèë]/g, "e")
    .replace(/[íìï]/g, "i").replace(/[óòö]/g, "o").replace(/[úùü]/g, "u")
    .replace(/ñ/g, "n").replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").trim();
}

export default function ProductFormPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;
  const isNew = productId === "nuevo";

  const [categories, setCategories] = useState<Category[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [dragging, setDragging] = useState(false);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as Resolver<FormData>,
    defaultValues: { active: true, featured: false, stock: 0 }
  });

  const watchedName = watch("name");

  useEffect(() => {
    getDocs(collection(db, "categories")).then(snap =>
      setCategories(snap.docs.map(d => ({ id: d.id, ...d.data() } as Category)))
    );
  }, []);

  useEffect(() => {
    if (!isNew && productId) {
      getDoc(doc(db, "products", productId)).then(snap => {
        if (snap.exists()) {
          const d = snap.data();
          Object.keys(d).forEach(key => setValue(key as keyof FormData, d[key]));
          setImages(d.images || []);
        }
        setLoading(false);
      });
    }
  }, [isNew, productId, setValue]);

  // Auto-generate slug only for new products
  useEffect(() => {
    if (isNew && watchedName) {
      setValue("slug", generateSlug(watchedName));
    }
  }, [watchedName, isNew, setValue]);

  const handleImageUpload = useCallback(async (files: File[]) => {
    if (images.length + files.length > 5) {
      alert("Máximo 5 imágenes permitidas.");
      return;
    }
    setUploadingImages(true);
    try {
      const id = isNew ? `temp_${Date.now()}` : productId;
      const urls = await Promise.all(
        files.map(async file => {
          const storageRef = ref(storage, `products/${id}/${Date.now()}_${file.name}`);
          await uploadBytes(storageRef, file);
          return getDownloadURL(storageRef);
        })
      );
      setImages(prev => [...prev, ...urls]);
    } catch (e) {
      console.error(e);
      alert("Error al subir imágenes.");
    }
    setUploadingImages(false);
  }, [images.length, isNew, productId]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = Array.from(e.dataTransfer.files).filter(f => f.type.startsWith("image/"));
    if (files.length) handleImageUpload(files);
  };

  const removeImage = (url: string) => setImages(prev => prev.filter(i => i !== url));

  const onSubmit = async (data: FormData) => {
    setSaving(true);
    try {
      const docRef = isNew ? doc(collection(db, "products")) : doc(db, "products", productId);
      const payload = {
        ...data,
        comparePrice: data.comparePrice || null,
        images,
        id: docRef.id,
        updatedAt: serverTimestamp(),
        ...(isNew && { createdAt: serverTimestamp() }),
      };
      if (isNew) {
        await setDoc(docRef, payload);
      } else {
        await updateDoc(docRef, payload);
      }
      router.push("/productos");
    } catch (e) {
      console.error(e);
      alert("Error al guardar el producto.");
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64"><div className="w-8 h-8 border-4 border-nutrisse-sage border-t-transparent rounded-full animate-spin"/></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/productos" className="text-stone-400 hover:text-stone-700 transition"><ArrowLeft size={20}/></Link>
        <h1 className="text-2xl font-bold text-stone-800">{isNew ? "Nuevo Producto" : "Editar Producto"}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 space-y-5">
          <h2 className="font-semibold text-stone-700 border-b border-stone-100 pb-3">Información General</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Nombre *</label>
              <input {...register("name")} className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"/>
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Slug (URL) *</label>
              <input {...register("slug")} className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:ring-2 focus:ring-nutrisse-sage focus:outline-none font-mono text-sm"/>
              {errors.slug && <p className="text-red-500 text-xs mt-1">{errors.slug.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Descripción Corta *</label>
            <textarea {...register("description")} rows={2} className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:ring-2 focus:ring-nutrisse-sage focus:outline-none resize-none"/>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Descripción Larga</label>
            <textarea {...register("longDescription")} rows={5} className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:ring-2 focus:ring-nutrisse-sage focus:outline-none resize-y"/>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 space-y-5">
          <h2 className="font-semibold text-stone-700 border-b border-stone-100 pb-3">Precio e Inventario</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Precio (GTQ) *</label>
              <input type="number" step="0.01" {...register("price")} className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"/>
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Precio Comparativo</label>
              <input type="number" step="0.01" {...register("comparePrice")} className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">Stock *</label>
              <input type="number" {...register("stock")} className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:ring-2 focus:ring-nutrisse-sage focus:outline-none"/>
              {errors.stock && <p className="text-red-500 text-xs mt-1">{errors.stock.message}</p>}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">Categoría *</label>
            <select {...register("categoryId")} defaultValue="" className="w-full px-4 py-2 border border-stone-200 rounded-lg bg-stone-50 focus:ring-2 focus:ring-nutrisse-sage focus:outline-none appearance-none">
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" {...register("active")} className="w-5 h-5 rounded accent-nutrisse-sage"/>
              <span className="text-sm font-medium text-stone-700">Activo (visible en tienda)</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" {...register("featured")} className="w-5 h-5 rounded accent-nutrisse-sage"/>
              <span className="text-sm font-medium text-stone-700">Destacado</span>
            </label>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 space-y-4">
          <h2 className="font-semibold text-stone-700 border-b border-stone-100 pb-3">Imágenes del Producto <span className="text-stone-400 font-normal text-sm">(máx. 5)</span></h2>
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer ${dragging ? "border-nutrisse-sage bg-nutrisse-sage/5" : "border-stone-200 hover:border-stone-300"}`}
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <input id="image-upload" type="file" accept="image/*" multiple className="hidden"
              onChange={e => e.target.files && handleImageUpload(Array.from(e.target.files))} />
            {uploadingImages ? (
              <div className="flex flex-col items-center gap-3 text-nutrisse-sage">
                <Loader size={32} className="animate-spin"/>
                <p className="text-sm">Subiendo imágenes...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3 text-stone-400">
                <UploadCloud size={32}/>
                <p className="text-sm">Arrastra imágenes o <span className="text-nutrisse-sage underline">haz clic para seleccionar</span></p>
                <p className="text-xs">{images.length}/5 imágenes subidas</p>
              </div>
            )}
          </div>
          {images.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {images.map((url, i) => (
                <div key={url} className="relative aspect-square rounded-lg overflow-hidden group border border-stone-200">
                  <Image src={url} alt={`Imagen ${i+1}`} fill className="object-cover"/>
                  <button
                    type="button"
                    onClick={() => removeImage(url)}
                    className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={12}/>
                  </button>
                  {i === 0 && <span className="absolute bottom-0 left-0 right-0 bg-nutrisse-sage/80 text-white text-xs text-center py-0.5">Principal</span>}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/productos" className="px-6 py-2 border border-stone-200 text-stone-600 rounded-lg hover:bg-stone-50 transition font-medium">
            Cancelar
          </Link>
          <button type="submit" disabled={saving} className="px-6 py-2 bg-nutrisse-sage text-white rounded-lg hover:bg-nutrisse-sage/90 transition font-medium disabled:opacity-60">
            {saving ? "Guardando..." : isNew ? "Crear Producto" : "Guardar Cambios"}
          </button>
        </div>
      </form>
    </div>
  );
}
