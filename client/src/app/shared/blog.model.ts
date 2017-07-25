export interface IBlog {
    _id: String;
    title: String;
    body: String;
    createdAt: Date;
    createdBy: String;
    comments: any[],
    likedBy: any[],
    dislikedBy: any[]
}