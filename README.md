# Web boilerplate

## Setting the development environment

### Version requirements

-   [Node.js](https://nodejs.org/en/): **v15**
    -   It is recommended that you install Node.js with [nvm](https://github.com/nvm-sh/nvm), as it allows you to change between versions easily.
-   [npm](https://www.npmjs.com/): **v6**
    -   It is important to match the npm version as a different one may cause changes to the _package-lock.json_ file. You can install this npm version by running `npm i -g npm@6`
-   [Server boilerplate](https://github.com/sangonz193/server-boilerplate): **v0.0.1**
    -   This boilerplate is intended to work with an instance of the Server boilerplate. You may setup an instance following the repositories _README.md_.

### Setup steps

-   Clone this repository and open a terminal inside of it.
-   Run `npm i` to install dependencies.
-   You must create a _.env_ file at the root of the project that contains the same environment variables listed in _.env.app_ and also _.env.cli_. You may start with copying the entire content of the _.env.app_ file (`cp .env.app .env`) and modifying the values as you find it necessary, and then adding the entries from _.env.cli_ `cat .env.cli >> .env`.
    > Note: Only the variables defined in the _.env.app_ file will be read by the app. The cli utility has access to the variables listed in both files. In both cases, the values assigned to each variable will be those defined in the _.env_ file.

### Running the app in development mode

Run the command `npm run dev` (or `node cli dev`) to run the dev server. Depending on the value of the `PORT` environment variable in the `.env` file, the app will be available at _http<span></span>://localhost:$PORT_.

## Included command line utility

Apart from the app itself, this project contains a cli utility that you may find useful while developing. To invoke it, you will run `node cli <command>` at the root of the project. For information about it, you can run `node cli --help` which will list all available commands. For more information about a specific command, you may run `node cli <command> --help` where _[command]_ is the name of a command from the previous list.

## License

[MIT](https://choosealicense.com/licenses/mit/)
