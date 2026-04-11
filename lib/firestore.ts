import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from './firebase';
import { Category, Product } from './types';

export async function getCategories(): Promise<Category[]> {
  const categoriesRef = collection(db, 'categories');
  const q = query(categoriesRef, where('active', '==', true), orderBy('order', 'asc'));
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Category));
}

export async function getProducts(categoryId?: string | null): Promise<Product[]> {
  const productsRef = collection(db, 'products');
  const conditions = [where('active', '==', true)];
  
  if (categoryId) {
    conditions.push(where('categoryId', '==', categoryId));
  }
  
  const q = query(productsRef, ...conditions);
  const snapshot = await getDocs(q);
  
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as Product));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('slug', '==', slug), where('active', '==', true), limit(1));
  const snapshot = await getDocs(q);
  
  if (snapshot.empty) return null;
  
  const doc = snapshot.docs[0];
  return {
    id: doc.id,
    ...doc.data()
  } as Product;
}
