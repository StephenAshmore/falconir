#!/usr/bin/env node

import convertArguments from './arguments';
import converter from './converter';
import { isExcel } from './utils';

function run() {
    const a = convertArguments();

    if (isExcel(a.input)) {
        converter.convertToJson(a);
    } else {
        converter.convertToExcel(a);
    }
}

if (require.main === module) {
    run();
}
