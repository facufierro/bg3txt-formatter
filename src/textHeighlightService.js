class TextHeighlightService {
    // Initialize static arrays and objects
    static patterns = [];
    static rules = [];
    static tmLanguageData = null;

    // Method to initialize TextHeighlightService
    static initialize() {
        try {
            // If already initialized, return early to avoid reinitialization
            if (this.tmLanguageData !== null) {
                return;
            }

            // Define properties for different text patterns and their corresponding rules
            const properties = {
                keywords: { "name": "keywords.bg3txt", "match": "new entry|type|data|using", "color": "#FF0000" },
                statements: { "name": "statements.bg3txt", "match": "IF|not|\\:", "color": "#FF0000" },
                comment_line: { "name": "comment.bg3txt", "match": "//", "color": "#FF0000" },
                operators: { "name": "operators.bg3txt", "match": "\\+|\\-|\\*|\\/|\\%|\\=|\\>|\\<|\\!|\\&|\\||\\^|\\~|\\?|\\'|\\,|\\;|\\\"", "color": "#FF0000" }
            };

            // Loop through each property and populate the patterns and rules arrays
            for (const key in properties) {
                if (Object.prototype.hasOwnProperty.call(properties, key)) {
                    this.patterns.push({
                        "name": properties[key].name,
                        "match": properties[key].match
                    });

                    this.rules.push({
                        "scope": properties[key].name,
                        "settings": {
                            "foreground": properties[key].color
                        }
                    });
                }
            }

            // Populate the tmLanguageData object
            this.tmLanguageData = {
                "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
                "name": "bg3txt",
                "patterns": this.patterns,
                "scopeName": "source.bg3txt"
            };
        } catch (error) {
            // Log any errors that occur during initialization
            console.error(`An error occurred during TextHeighlightService initialization: ${error.message}`);
        }
    }
}

// Export TextHeighlightService class
module.exports = TextHeighlightService;
