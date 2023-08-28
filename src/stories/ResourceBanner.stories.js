import { ResourcesBanner } from '../Pages/HowToContribute/components/ResourcesBanner';

export default {
    title: 'How To Controute/Resource Banner',
    component: ResourcesBanner,
    tags: ['autodocs'],
    argTypes:{
        resource: {control: "radio", description: "resource type", options: ['researchers', 'archivists', 'educators','students','nwc participants']},
        text: {control: "text", description: "summary text"},
        icon: {control: "object", description: "img object from Strapi"}
    }
}

export const Base =  {
    resource: "researchers",
}