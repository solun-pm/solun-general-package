import { saveError } from "solun-database-package";

export function extractContentOutsideTags(input: string): string[] {
    try {
        let regex = /([^<>]+)(?:<[^>]*>)?/g;
        let matches = [];
        let match;

        while ((match = regex.exec(input)) !== null) {
            matches.push(match[1].trim());
        }

        return matches;
    } catch (err) {
        saveError("extractContentOutsideTags", err, "error");
        return [];
    }
}
