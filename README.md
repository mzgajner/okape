# O Ka Pe
A simple webapp to find out when the garbage is being picked up if you don't find the OKP website intuitive enough.

## Development commands
```bash
# Setup project
yarn install

# Compiles and hot-reload for development
yarn run serve

# Compile and minify for production
yarn run build

# Lint and fix files
yarn run lint
```

## Parser
There is a simple parser in the root of the project that can be run with `node parser.js`. It will load [this page](https://okp.si/jsnaga_urniki_odvoza_gospodinjstvo_2019.php), parse the weekday schedule table at the bottom and produce a fresh `src/schedule.json`. The latter is also in the repo for convenience.

## Credits
The line drawing is [Garbage Truck](https://thenounproject.com/browse/?i=1815676) by Karla Design from the Noun Project.
