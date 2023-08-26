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
                // key_word: { "name": "keywords.bg3txt", "color": "#C792EA", "match": "\\b(new entry|data|using|type)\\b" },
                // comment: { "name": "comment.bg3txt", "color": "#6A9955", "match": "^(\\s*\\/\\/.*$)" },
                entry_name: { "name": "entry_name.bg3txt", "color": "#ff0000", "match": "^\\s*new\\s+entry\\s+\"([^\"]+)\"" },

                // entry_type: { "name": "entry_type.bg3txt", "color": "#ff0000", "match": "(?<=\\btype\\s+\")([^\"]+)" },
                // variable: { "name": "variable.bg3txt", "color": "#ff0000", "match": "(?<=\\bdata\\s+\")([^\"]+)" },
                // value: { "name": "value.bg3txt", "color": "#ff0000", "match": "(?<=\\bvariable\\s+\")[^\"]+" }
            };


            //             instead there will be:
            // key_word :  a list of perfectly matched words
            // comment: for comments
            // entry_name : the only word surrounded by quotes in the first line of a paragraph or the word surrounded by quotes after the key_word using
            // entry_type : the word after the key_word type that is surrounded by quotes
            // variable: the first word surrounded by quotes after the key_word data
            // value: the next encastd string after a variable (this can be multiple words) 
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
            // Add a log here to debug
            // console.log("Updated TextMate Rules: ", this.rules);
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
