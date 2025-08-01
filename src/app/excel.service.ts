import { Injectable } from "@angular/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
declare const $: any;
const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const EXCEL_EXTENSION = ".xlsx";

@Injectable({
    providedIn: "root",
})
export class ExcelService {
    private saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE,
        });
        FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
    }

    constructor() {}

    private autofitColumns(
        json: any[],
        worksheet: XLSX.WorkSheet,
        header?: string[]
    ) {
        const jsonKeys = header ? header : Object.keys(json[0]);

        const objectMaxLength = [];
        for (let i = 0; i < json.length; i++) {
            const value = json[i];
            for (let j = 0; j < jsonKeys.length; j++) {
                if (typeof value[jsonKeys[j]] == "number") {
                    objectMaxLength[j] = 10;
                } else {
                    const l = value[jsonKeys[j]]
                        ? value[jsonKeys[j]].length
                        : 0;

                    objectMaxLength[j] =
                        objectMaxLength[j] >= l ? objectMaxLength[j] : l;
                }
            }

            const key = jsonKeys;
            for (let j = 0; j < key.length; j++) {
                objectMaxLength[j] =
                    objectMaxLength[j] >= key[j].length
                        ? objectMaxLength[j]
                        : key[j].length;
            }
        }

        const wscols = objectMaxLength.map((w) => {
            return { width: w + 2 };
        });

        worksheet["!cols"] = wscols;
    }

    public exportAsExcelFileAOA(json: any[], excelFileName: string): void {
        const header = Object.keys(json[0]); // columns name

        let wscols = [];
        for (let i = 0; i < header.length; i++) {
            // columns length added
            wscols.push({ wch: header[i].length + 12 });
        }

        const myworksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(json);
        myworksheet["!cols"] = wscols;

        this.autofitColumns(json, myworksheet);
        

        const myworkbook: XLSX.WorkBook = {
            Sheets: { data: myworksheet },
            SheetNames: ["data"],
        };

        const excelBuffer: any = XLSX.write(myworkbook, {
            bookType: "xlsx",
            type: "array",
        });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    JsonToExcelNormal(json: any, excelFileName: string) {
        const header = Object.keys(json[0]); // columns name
        // Chequeo propio

        const myworksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);

        this.autofitColumns(json, myworksheet);

        const myworkbook: XLSX.WorkBook = {
            Sheets: { data: myworksheet },
            SheetNames: ["data"],
        };

        const excelBuffer: any = XLSX.write(myworkbook, {
            bookType: "xlsx",
            type: "array",
        });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }
}
