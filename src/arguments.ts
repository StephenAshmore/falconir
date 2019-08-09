import * as argparse from 'argparse';

interface IArguments {
    input: string;
    output: string;
    order?: string[];
    remove?: string[];
}

export default () => {
    const parser = new argparse.ArgumentParser({
        version: '1.0.0',
        description: 'falconir',
    });
    parser.addArgument(['-i', '--input'], {
        dest: 'input',
        help: 'input filename',
        required: true,
    });
    parser.addArgument(['-o', '--output'], {
        dest: 'output',
        help: 'output filename',
        required: true,
    });
    parser.addArgument(['-r', '--remove', '--strip'], {
        dest: 'remove',
        action: 'append',
        help: 'remove keys from the json file before converting.',
    });
    parser.addArgument('--order', {
        dest: 'order',
        action: 'append',
        help: 'order the keys should be in the file.',
    });

    const finalArgs = parser.parseArgs();
    return finalArgs as IArguments;
};

export { IArguments };
