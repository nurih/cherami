export interface QrData {
  id: number;
  text: string;
  name?:string;
}

export class QrStorage {

  readonly STORAGE_ITEM_NAME: string = 'QrItems'
  constructor() { }
  save(data: QrData[]): void {
    try {
      localStorage.setItem(this.STORAGE_ITEM_NAME, JSON.stringify(data));
      console.info('Objects saved to local storage successfully.');
    } catch (error) {
      console.error('Error saving objects to local storage:', error);
    }
  }

  load(): QrData[] | null {
    try {
      const storedData = localStorage.getItem(this.STORAGE_ITEM_NAME);
      if (storedData) {
        return JSON.parse(storedData);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error loading objects from local storage:', error);
      return null;
    }
  }
  clear(): void {
    localStorage.clear();
  }
}


