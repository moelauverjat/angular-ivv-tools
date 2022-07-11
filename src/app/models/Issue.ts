//version légère d'une classe
export interface Issue {
    number: number;
    title: string;
    link: string;
    workaround: boolean;
    creation: string;
    closure: string | null;
}