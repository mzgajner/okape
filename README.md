# O Ka Pe

A simple webapp to find out when the garbage is being picked up if you don't find the OKP website intuitive enough.

## Development commands

### Backend

#### Prerequisites

Download the latest [PocketBase executable](https://github.com/pocketbase/pocketbase/releases) for your architecture and extract it to the root of the project. It's in `.gitignore` so it shouldn't cause a diff.

```bash
# Make it executable
chmod +x pocketbase

# Start DB
./pocketbase serve
```

### Frontend

```bash
cd frontend

# Download dependencies
bun install

# Run hot-reloadable Vite server
bun run dev

# Compile and minify for production
bun run build

# Lint and format all files
bun run fix-all
```

## Credits

The line drawing is [Garbage Truck](https://thenounproject.com/browse/?i=1815676) by Karla Design from the Noun Project.
