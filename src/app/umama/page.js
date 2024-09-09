import ProjectPage from '@/components/ProjectPage';
import SeoSchema from '@/components/SeoSchema';
import UmamaSuboor from '@/components/UmamaSuboor';
import { HOST } from '@/constants';
import { createMetaData } from '@/seo-utils/CommonMeta';

const url = `${HOST}`;
const title = 'Umama';
const description = 'Umama';
const keywords = 'Umama';

export const metadata = {
    ...createMetaData({ title, description, keywords, url }),
};

export default function Projects() {
    return (
        <>
            <UmamaSuboor />
        </>
    );
}
