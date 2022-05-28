export interface ServerData{
    // for list of projects
    PROJECTS:ProjectGLRY[];
}

export interface ProjectGLRY{
    // Project part of the model
    id:string;
    projectName:string;
    projectDescription:string;
    // for list of sections
    sections:SectionGLRY[];


    // ***** DIFFERENT TYPES OF SECTIONS ***** //
    // (MG) -- multiple gallery contents
    // (SD) -- Single image with description
    // (S) -- Single Image with no description (currently looks okay)
    // (MC) -- Multiple image with Carousal
    // (MC) -- multiple image with carousal description
    // (3W) -- Three images without description
    // (2W) -- Two images without description
}

export interface SectionGLRY{
    // section part of the model
    id:string;
    sectionDisplayType:string;
    projectID:string;
    sectionName:string;
    sectionDescription:string;

    // for list of images
    mediaContent: ImagesGLRY[]
}


export interface ImagesGLRY{
    // Image part of the model
    id:string;
    mediaFile:string;
    isVideo:string;
    mediaDescription:string;
    videoUrl:string;
    sectionID:string;
}


//  *** individual Project model for creating objetcs
export interface ProjectModel{
    id:string;
    projectName:string;
    projectDescription:string;
}

export interface SectionModel{
    id:string;
    sectionName:string;
    sectionDescription:string;
    projectID:string;
}