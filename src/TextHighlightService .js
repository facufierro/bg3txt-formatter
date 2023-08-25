class TextHighlightService {
    constructor() {
        this.patterns = [];
    }

    addHighlight(name, match, color) {
        this.patterns.push({
            name: name,
            match: match,
            color: color // just an example; you might want to use this differently
        });
    }

    generateTmLanguageData() {
        const patternsForTm = this.patterns.map(pattern => {
            return {
                name: pattern.name,
                match: pattern.match
            };
        });

        return {
            "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
            "name": "bg3txt",
            "patterns": patternsForTm,
            "scopeName": "source.bg3txt"
        };
    }

}

module.exports = TextHighlightService;
