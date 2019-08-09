import * as _ from 'lodash';

import * as fs from 'fs';
import * as xlsx from 'xlsx';

import { IArguments } from './arguments';

class Converter {
    convertToJson(args: IArguments) {
        try {
            const fileContents = fs.readFileSync(args.input);
            const wb = xlsx.read(fileContents);

            let json = xlsx.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]) as any;

            // removal step:
            if (args.remove) {
                json = _.map(json, j => {
                    return _.omit(j, args.remove);
                });
            }

            if (args.order) {
                json = _.map(json, j => {
                    const o: any = {};
                    for (const order of args.order) {
                        o[order] = j[order];
                    }
                    return o;
                });
            }

            fs.writeFileSync(args.output, JSON.stringify(json));
        } catch (err) {
            console.log('Failed trying to convert file.', err);
        }
    }

    convertToExcel(args: IArguments) {
        try {
            const fileContents = fs.readFileSync(args.input);
            let json = JSON.parse(fileContents.toString());

            // removal step:
            if (args.remove) {
                json = _.map(json, j => {
                    return _.omit(j, args.remove);
                });
            }

            if (args.order) {
                json = _.map(json, j => {
                    const o: any = {};
                    for (const order of args.order) {
                        o[order] = j[order];
                    }
                    return o;
                });
            }

            // conversion step:
            const wb = xlsx.utils.book_new();
            xlsx.utils.book_append_sheet(wb, xlsx.utils.json_to_sheet(json));
            xlsx.writeFile(wb, args.output);
        } catch (err) {
            console.log('Failed trying to convert file.', err);
        }
    }
}

const converter = new Converter();
export default converter;
