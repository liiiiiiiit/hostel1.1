import { db, BusinessDB, BusinessTranslationDB, ArticleDB, ArticleTranslationDB } from '../database/schema';

export interface BusinessWithTranslations extends BusinessDB {
  id: number;
  translations: Record<string, { name: string; description: string; services: string }>;
}

export const BusinessService = {
  async getAll(): Promise<BusinessWithTranslations[]> {
    const businesses = await db.businesses.toArray();
    const result: BusinessWithTranslations[] = [];

    for (const business of businesses) {
      const translations = await db.businessTranslations.where('businessId').equals(business.id!).toArray();
      const translationMap: Record<string, { name: string; description: string; services: string }> = {};
      for (const t of translations) {
        translationMap[t.locale] = { name: t.name, description: t.description, services: t.services };
      }

      result.push({
        ...business,
        id: business.id!,
        translations: translationMap,
      });
    }

    return result;
  },

  async getById(id: number): Promise<BusinessWithTranslations | null> {
    const business = await db.businesses.get(id);
    if (!business) return null;

    const translations = await db.businessTranslations.where('businessId').equals(id).toArray();
    const translationMap: Record<string, { name: string; description: string; services: string }> = {};
    for (const t of translations) {
      translationMap[t.locale] = { name: t.name, description: t.description, services: t.services };
    }

    return {
      ...business,
      id: business.id!,
      translations: translationMap,
    };
  },

  async count(): Promise<number> {
    return await db.businesses.count();
  },
};

export interface ArticleWithTranslations extends ArticleDB {
  id: number;
  translations: Record<string, { title: string; excerpt: string; content: string }>;
}

export const ArticleService = {
  async getAll(status?: 'draft' | 'published' | 'archived'): Promise<ArticleWithTranslations[]> {
    let articles = await db.articles.toArray();
    if (status) {
      articles = articles.filter(a => a.status === status);
    }

    const result: ArticleWithTranslations[] = [];

    for (const article of articles) {
      const translations = await db.articleTranslations.where('articleId').equals(article.id!).toArray();
      const translationMap: Record<string, { title: string; excerpt: string; content: string }> = {};
      for (const t of translations) {
        translationMap[t.locale] = { title: t.title, excerpt: t.excerpt, content: t.content };
      }

      result.push({
        ...article,
        id: article.id!,
        translations: translationMap,
      });
    }

    return result;
  },

  async getBySlug(slug: string): Promise<ArticleWithTranslations | null> {
    const article = await db.articles.where('slug').equals(slug).first();
    if (!article) return null;

    const translations = await db.articleTranslations.where('articleId').equals(article.id!).toArray();
    const translationMap: Record<string, { title: string; excerpt: string; content: string }> = {};
    for (const t of translations) {
      translationMap[t.locale] = { title: t.title, excerpt: t.excerpt, content: t.content };
    }

    return {
      ...article,
      id: article.id!,
      translations: translationMap,
    };
  },

  async count(): Promise<number> {
    return await db.articles.count();
  },

  async countByStatus(status: 'draft' | 'published' | 'archived'): Promise<number> {
    return await db.articles.where('status').equals(status).count();
  },
};
