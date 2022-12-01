
export interface getmyprofile {
    accessToken: string
}
export interface getexperiencebyprofile {
    profileId: any,
    accessToken: string
}

export interface updateBaseProfile {
    data: {
        address?: string,
        email?: string,
        phone_number?: string,
        dob?: string
    }
    accessToken: string,
    userId: any
}
export interface createStaffProfile {
    data: {
        file: any,
        introduction: string
    }
    accessToken: string
}
export interface updateStaffProfile {
    data: {
        file?: any,
        introduction?: string
    }
    id: any,
    accessToken: string
}
export interface addExperience {
    data: {
        position: string,
        description: string,
        from_time: string,
        to_time: string,
        profileId: any
    }
    accessToken: string
}
export interface updateExperience {
    data: {
        position?: string,
        description?: string,
        from_time?: string,
        to_time?: string,
    }
    id: any,
    accessToken: string
}
export interface deleteExperience {
    id: any,
    accessToken: string
}

export interface uploadNewAvatar {
    data: {
        file: any
    }
    accessToken: string
}

export interface changeAvatar {
    data: {
        avatarId: any,
    }
    accessToken: string
}
export interface deleteAvatar {
    avatarId: any,
    accessToken: string
}