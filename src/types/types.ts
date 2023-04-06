export interface HasId {
  id?: string;
}

export interface HasImageUrl {
  imageUrl: string;
}

export interface HasName {
  name: string;
}

export interface HasCreatedAt {
  createdAt: string;
}

export enum Entites {
  Projects = "projects",
  Blogs = "blogs",
  Profile = "profile",
  Tags = "tags",
  Comments = "comments",
  Sessions = "sessions",
  Notifications = "notifications",
  Contact = "contact",
}

export type SkillLevelTypes = "expert" | "medium" | "basic";

export enum SkillsLevel {
  Expert = "Expert",
  Medium = "Medium",
  Basic = "Basic",
}

export interface Tag extends HasId, HasName, HasImageUrl {
  level: SkillLevelTypes;
  description: string;
}

export type TagId = string;

export interface Blog extends HasId, HasName, HasImageUrl, HasCreatedAt {
  description: string;
  content: string;
  views: number;
  tags: Tag[] | TagId[];
  comments: Comment[];
  pos?: number;
}

export interface Acheivement extends HasImageUrl {
  title: string;
  description?: string;
}

export interface Company extends HasId, HasName {
  from: string;
  to: string;
  currentlyWorking: boolean;
  description: string;
}

export interface SocialAccounts {
  githubUrl?: string;
  linkedInUrl?: string;
  instagramUrl?: string;
}

export interface Profile extends HasName, HasImageUrl {
  designation: string;
  aboutMe: string;
  status: string;
  acheivements: Acheivement[];
  companies: Company[];
  email: string;
  social: SocialAccounts;
  coverImageUrl: string;
}

export interface Project extends HasId, HasName, HasImageUrl, HasCreatedAt {
  description: string;
  content: string;
  views: number;
  tags: Tag[] | string[];
  url: string;
  pos?: number;
}


export type SessionType = 'all' | 'upcoming' | 'past';
export interface SessionResources {
  name: string;
  url: string;
}

export interface Session extends HasId, HasName, HasImageUrl, HasCreatedAt {
  description: string;
  views: number;
  tags: Tag[] | string[];
  url: string;
  sessionTiming: {
    start: string;
    end: string;
  };
  date: string;
  attachedFiles?: SessionResources[]
}
