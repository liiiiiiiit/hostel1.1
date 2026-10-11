import { db, JobDB, JobTranslationDB, JobApplicationDB } from '../database/schema';

export interface JobWithTranslations extends JobDB {
  id: number;
  translations: Record<string, { title: string; description: string; requirements: string }>;
}

export const JobService = {
  async getAll(publishedOnly = true): Promise<JobWithTranslations[]> {
    let jobs = await db.jobs.toArray();
    if (publishedOnly) {
      jobs = jobs.filter(j => j.published);
    }

    const result: JobWithTranslations[] = [];

    for (const job of jobs) {
      const translations = await db.jobTranslations.where('jobId').equals(job.id!).toArray();
      const translationMap: Record<string, { title: string; description: string; requirements: string }> = {};
      for (const t of translations) {
        translationMap[t.locale] = { title: t.title, description: t.description, requirements: t.requirements };
      }

      result.push({
        ...job,
        id: job.id!,
        translations: translationMap,
      });
    }

    return result;
  },

  async getById(id: number): Promise<JobWithTranslations | null> {
    const job = await db.jobs.get(id);
    if (!job) return null;

    const translations = await db.jobTranslations.where('jobId').equals(id).toArray();
    const translationMap: Record<string, { title: string; description: string; requirements: string }> = {};
    for (const t of translations) {
      translationMap[t.locale] = { title: t.title, description: t.description, requirements: t.requirements };
    }

    return {
      ...job,
      id: job.id!,
      translations: translationMap,
    };
  },

  async count(): Promise<number> {
    return await db.jobs.count();
  },
};

export const JobApplicationService = {
  async create(application: Omit<JobApplicationDB, 'id' | 'createdAt' | 'updatedAt' | 'status'>): Promise<JobApplicationDB> {
    const now = new Date();
    const id = await db.jobApplications.add({
      ...application,
      status: 'SUBMITTED',
      createdAt: now,
      updatedAt: now,
    });
    const created = await db.jobApplications.get(id);
    return created!;
  },

  async updateStatus(id: number, status: JobApplicationDB['status']): Promise<void> {
    await db.jobApplications.update(id, { status, updatedAt: new Date() });
  },

  async getAll(): Promise<JobApplicationDB[]> {
    return await db.jobApplications.toArray();
  },

  async getByUserId(userId: number): Promise<JobApplicationDB[]> {
    return await db.jobApplications.where('userId').equals(userId).toArray();
  },

  async getByJobId(jobId: number): Promise<JobApplicationDB[]> {
    return await db.jobApplications.where('jobId').equals(jobId).toArray();
  },

  async count(): Promise<number> {
    return await db.jobApplications.count();
  },
};
