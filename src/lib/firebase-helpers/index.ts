import {app, database} from './firebase-config';
import { getDatabase, get, child, ref } from "firebase/database";
import { Blog, Profile, Project, Session, Tag } from '@/types/types';
import { ResponseParser } from '../response-parser';

const dbRef = ref(database);
const sync = (entity: string) => get(child(dbRef, `${entity}/`));

export class FirebaseHelper {
    static async syncAllProjects(): Promise<Project[]> {
        const snapshot = await sync('projects');
        const projects = ResponseParser.parse<Project>(snapshot.val());
        this.attachTags(projects);
        return projects.sort((a, b) => (a.pos || 0) - (b.pos || 0))
    }

    static async syncAllBlogs(): Promise<Blog[]> {
        const snapshot = await sync('blogs');
        const blogs = ResponseParser.parse<Blog>(snapshot.val());
        this.attachTags(blogs);
        return blogs.sort((a, b) => (a.pos || 0) - (b.pos || 0))
    }

    static async syncAllTags(): Promise<Tag[]> {
        const snapshot = await sync('tags');
        const tags = ResponseParser.parse<Tag>(snapshot.val());
        return tags;
    }

    static async syncMyProfile(): Promise<Profile> {
        const snapshot = await sync('profile');
        const myProfile = snapshot.val();
        return myProfile;
    }

    static async syncAllSessions(): Promise<Session[]> {
        const snapshot = await sync('sessions');
        const sessions = snapshot.val();
        return sessions;
    }

    static async attachTags(entity: Project[] | Blog[]) {
        const tags = await this.syncAllTags();
        entity.forEach((e) => {
            e.tags = (e.tags || []).map((x) => {
                return tags.find(t => t.id === x)
            }) as any
        })
    }
}