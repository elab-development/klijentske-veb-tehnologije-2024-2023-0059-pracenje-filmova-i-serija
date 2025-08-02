export interface MovieCardProps{
    title: string,
    type: 0 | 1,
    banner: string,
    rating: number,
    description?: string,
}

export interface MovieCardClassProps extends MovieCardProps{
    id: string
}

export interface Top5MovieCardProps extends MovieCardClassProps{
    index: number
}