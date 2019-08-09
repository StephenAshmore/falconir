const isExcel = (fileName: string) => {
    return fileName.endsWith('.xls') || fileName.endsWith('.csv') || fileName.endsWith('.xlsx');
};

export { isExcel };
