import convertArguments from './arguments';
import converter from './converter';

function run() {
    const a = convertArguments();

    converter.convert(a);
}

if (require.main === module) {
    run();
}
