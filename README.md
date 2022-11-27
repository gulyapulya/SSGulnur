<p align="center">
<img width="459" alt="SSGulnur" align="center" src="https://user-images.githubusercontent.com/52351598/192425336-04087ba4-0af9-4a29-a167-b84dddbd81bb.png">
</p>

# SSGulnur

## Overview

SSGulnur is a command-line tool to generate static HTML web pages from a provided file or folder.

## Installation

Node is required. Run npm to install globally `npm install --global ssgulnur`.

Please use bash terminal.

## Usage

### ssgulnur -v | --version

Displays the tool's name and current version.

### ssgulnur -h | --help

Displays a help guide with all instructions.

```
Help guide
SSGulnur is a command-line tool to generate static HTML web page from a provided file or folder.
Usage:
ssgulnur -v | --version current version
ssgulnur -h | --help help guide
ssgulnur -i | --input <source> specify a file or folder to use
Options for input:
-o | --output <folder> specify an output folder for produced html
By default, the output folder would be ./dist unless specified otherwise
-s | --stylesheet <url> specify a stylesheet url to use
For example, https://cdn.jsdelivr.net/npm/water.css@2/out/water.css
Config:
-c | --config <file> specify a config file to use
```

### ssgulnur -i | --input <source>

- Supported file types are .txt and .md.
- Source can be a single file or a folder which can also contain sub-folders with files.
- For file names with spaces, please use quotation marks. For example: `ssgulnur -i "Example file path.txt"`.
- For each provided file an html file will be generated. By default, all html files will be placed into the `./dist` folder.
- All titles need to be the first line in the file followed by two blank lines. Otherwise, it will be considered as part of the story.

#### Options

| Option               | Argument   | Description                                                                                                                                 |
| -------------------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| `-o \| --output`     | `<folder>` | Allows to specify an output folder name. If exists, will be used, if not, gets created. <br>Cannot be a file. By default, `./dist`.         |
| `-s \| --stylesheet` | `<url>`    | Allows to specify a particular stylesheet to use for html styling. <br> For example, https://cdn.jsdelivr.net/npm/water.css@2/out/water.css |

#### Examples

- `ssgulnur -i "Example file path.txt"`
- `ssgulnur --input exampleFolderPath --output exampleOutputFolderPath`
- `ssgulnur -i exampleFolderPath -o exampleOutputFolderPath -s "https://www.exampleCSSurl.com"`

### ssgulnur -c | --config <source>

- Allows the user to consolidate the above options inside of a JSON file, instead of using the command line to specify options.
- For file names with spaces, please use quotation marks. For example: `ssgulnur -c "Example file path.json"`.

Config File Example:

example.json

```
{
  "input":"./path/to/input/files",
  "output":"./path/to/output/files",
  "stylesheet":"https://cdn.jsdelivr.net/npm/water.css@2/out/water.css"
}
```

Stories folder is provided as a sample which you can use. It contains five Sherlock Holmes stories by Sir Arthur Conan Doyle and a markdown sample file.
Generated static pages for the sample can be seen here: https://ssg-gulnur-sample.vercel.app

## Bugs and new features

If you notice a bug or have a suggestion for a new feature, please go to the issues tab of the project and check if similar ideas do not already exist. If there are no duplicates, please create a new issue and document it giving as many details as possible.

## Contribution

Contributions are always welcome! Please check the [CONTRIBUTING.md](https://github.com/gulyapulya/SSGulnur/blob/main/CONTRIBUTING.md) file for more details.
