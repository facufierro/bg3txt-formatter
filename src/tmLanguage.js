
keywords = "new entry|type|data|using";
statements = "IF|not|\\:";
comment_line = "//";
operators = "\\+|\\-|\\*|\\/|\\%|\\=|\\>|\\<|\\!|\\&|\\||\\^|\\~|\\?|\\'|\\,|\\;|\\\"";

const tmLanguageData = {
  "$schema": "https://raw.githubusercontent.com/martinring/tmlanguage/master/tmlanguage.json",
  "name": "bg3txt",
  "patterns": [
    {
      "name": "all.bg3txt",
      "match": ".*"
    },
    {
      "name": "keyword.bg3txt",
      "match": "\\b(" + keywords + ")\\b"
    },
    {
      "name": "statement.bg3txt",
      "match": "\\b(" + statements + ")\\b"
    },
    {
      "name": "first-column.bg3txt",
      "match": "(?<=\\b(" + keywords + ")\\s)\"[^\"]+\""
    },
    {
      "match": "(" + operators + ")",
      "name": "operator.bg3txt"
    },
    {
      "match": "^(\\s)*" + comment_line + ".* $",
      "name": "comment.bg3txt"
    },
  ],
  "scopeName": "source.bg3txt"
};

module.exports = {
  tmLanguageData,
  keywords,
  statements,
  comment_line,
  operators
}