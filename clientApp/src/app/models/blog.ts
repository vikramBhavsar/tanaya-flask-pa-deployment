export interface Blog {
    id:string;
    blogName:string;
    isPublished:Boolean;
}

export interface MediaGroupSection{
    id:string;
    mediaURL:string;
    BlogSectionID:string;
    mediaDes:string
}

export interface BlogSection{
    id:string;
    sectionType:string;
    sectionText:string;
    mediaURL?:File;
    mediaDes:string;
    videoURL:string;
    blogID:string;
    media_group_section:MediaGroupSection[];
}


export interface BlogSectionForUpdate{
    id:string;
    sectionText:string;
    blogID:string;
}



export interface BlogDetails{
    id:string;
    blogName:string;
    isPublished:Boolean;
    blog_sections: BlogSection[];
}
