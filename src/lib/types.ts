export interface ProfileBase {
    username: string;
    displayName: string;
    profilePic?: string;
}

export interface NewProfile extends ProfileBase {
    userId: string
}

export interface Profile extends ProfileBase {
    userId: string;
    id: number;
}
