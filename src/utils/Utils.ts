export class Utils {
    formatBigStrings(str: string, maxLength: number): string {
        // formata a string para retornar reticencias caso ela seja muito grande
        return str.length > maxLength ? `${str.substring(0, maxLength)}...` : str;
    }


}