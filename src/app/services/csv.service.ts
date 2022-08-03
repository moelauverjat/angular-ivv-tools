import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  /* Seul cette fonction est utilisée pour le moment dans ce service
  Permet de sauvegarder les données d'un tableau du modèle Issue au format .csv */ 
  public saveDataInCSV(data: Array<any>): string {
    if (data.length == 0) {
      return '';
    }

    // let propertyNames = Object.keys(data[0]);
    let propertyNames = ["number", "title", "link", "workaround", "creation", "closure"]
    let rowWithPropertyNames = propertyNames.join(',') + '\n';

    let csvContent = rowWithPropertyNames;

    let rows: string[] = [];
    console.log(propertyNames)

    data.slice().reverse().forEach((item) => {
      let values: string[] = [];

      propertyNames.forEach((key) => {
        let val = item[key];
        if(key == "title") {
          const re : RegExp = /,/
          val = val.toString().replace(re, "-")
        }

        if (val !== undefined && val !== null) {
          val = new String(val);
        } else {
          val = '';
        }
        values.push(val);
      });
      rows.push(values.join(','));
    });
    csvContent += rows.join('\n');

    return csvContent;
  }

  public importDataFromCSV(csvText: string): Array<any> {
    const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');

    let dataArray: any[] = [];
    dataRows.forEach((row) => {
      let values = row.split(',');

      let obj: any = new Object();

      for (let index = 0; index < propertyNames.length; index++) {
        const propertyName: string = propertyNames[index];

        let val: any = values[index];
        if (val === '') {
          val = null;
        }

        obj[propertyName] = val;
      }

      dataArray.push(obj);
    });

    return dataArray;
  }

  public importDataFromCSVByType(csvText: string, obj: any): Array<any> {
    const propertyNames = csvText.slice(0, csvText.indexOf('\n')).split(',');
    const dataRows = csvText.slice(csvText.indexOf('\n') + 1).split('\n');

    
    let dataArray: any[] = [];
    dataRows.forEach((row) => {
      let values = row.split(',');

      let dataObj: any = new Object();
      for (let index = 0; index < propertyNames.length; index++) {
        const propertyName: string = propertyNames[index];

        let value: any = values[index];
        if (value === '') {
          value = null;
        }


        if (typeof obj[propertyName] === 'undefined') {
          dataObj[propertyName] = undefined;
        } 
        else if (typeof obj[propertyName] === 'boolean') {
          dataObj[propertyName] = value.toLowerCase() === 'true';
        } 
        else if (typeof obj[propertyName] === 'number') {
          dataObj[propertyName] = Number(value);
        } 
        else if (typeof obj[propertyName] === 'string') {
          dataObj[propertyName] = value;
        }
        else if (typeof obj[propertyName] === 'object') {
          console.error("do no have algorithm to convert object");
        }
      }

      dataArray.push(dataObj);
    });

    return dataArray;
  }
}

