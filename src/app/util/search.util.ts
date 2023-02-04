export class SearchUtil {
  
  static matchAny(searchTerm: string, ...entries: Array<string>): boolean {
    const searchTermI = searchTerm.toLowerCase();
    return entries.some(entry => entry.toLowerCase().includes(searchTermI));
  }
  
}