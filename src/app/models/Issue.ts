//Pour stocker les issues
export interface Issue {
    number: number;
    title: string;
    link: string;
    workaround: boolean;
    creation: string;
    closure: string | null;
}