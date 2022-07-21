/*Pour stocker la réussite ou non d'une opération lors d'une communication avec le serveur
Exemple : peut renvoyer en cas de connection et ou le mot de passe est incorrecte :
{   
    'valid':false
    'error':'le mot de passe entrée est incorrecte'
}
*/
export interface Validate {
    valid: boolean;
    error: string;
}

