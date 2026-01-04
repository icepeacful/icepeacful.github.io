import fs from 'fs';
import path from 'path';

export function readFilesInDirectory(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    files.forEach((file) => {
        if (!file.isDirectory()) {
            arrayOfFiles.push(file.name);
        }
    });

    return arrayOfFiles;
}

export function readAllFilesInDirectory(dirPath: string, arrayOfFiles: string[] = []): string[] {
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    files.forEach((file) => {
        if (file.isDirectory()) {
            readAllFilesInDirectory(path.join(dirPath, file.name), arrayOfFiles);
        }
        else {
            arrayOfFiles.push(path.join(dirPath, file.name));
        }
    });

    return arrayOfFiles;
}