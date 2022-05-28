export interface ArtEducation {
}


export interface ArtProjects{
    id:string;
    projectName:string;
    projectDescription:string;
}


export interface ArtProjectMain{
    id:string;
    projectName:string;
    projectDescription:string;
    art_media:ArtMedia[];
}

export interface ArtMedia{
    id:string;
    mediaDescription:string;
    isVideo:string;
    mediaFile:string;
    videoUrl:string;
    projectID:string;
}