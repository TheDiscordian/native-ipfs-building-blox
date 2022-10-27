This is scaffolding to assist in building desktop-based IPFS applications using JS/HTML/CSS /w Tauri.

This is a work in progress, there be 🐉.

## Requirements

- [Rust](https://www.rust-lang.org/)
- [Python3](https://python.org)

## Setup

### Install Tauri

```sh
cargo install tauri-cli
```

### Install libraries

```sh
npm install
npm run build
```

Note that the browserification is done by `tools/copyImports.py`, which is *very* simple. Feel free to implement your own browserification solution if you'd rather.

### Fetch Kubo

We need to fetch Kubo, and name it in a way that Tauri is happy with it.

#### Linux / Mac

This script **should** do all the work for you:

```sh
./fetch-kubo.sh
```

If it doesn't work for you refer to the Windows instructions for how to obtain and rename the kubo binary.

#### Windows

Grab the appropriate [kubo binary](https://dist.ipfs.tech/#kubo). Ensure you extract the package, pulling the ipfs binary out. Then move it to `bin/` naming it according to [this guide](https://tauri.app/v1/guides/building/sidecar/)'s parameters (final name will be something like `kubo-x86_64-pc-windows-msvc.exe`, probably, check [here](https://doc.rust-lang.org/nightly/rustc/platform-support.html#tier-1-with-host-tools) if you can't figure out your triple).

## Run

```sh
cargo tauri dev
```

## Configure

### Repo Path

The default repo path for Kubo is set to `.kubo`, you can configure this value in `src/main.rs` in `REPO_PATH`.

### Add new JS libs

By default `copyImports.py` will only work with libs which ultimately generate a `dist/index.min.js` file. If your lib does, install it how you normally would (`npm install --save <LIB>`), then add it into `ui/index.html` like `<script src="<LIB>.min.js"></script>`.

You don't need to use `copyImports.py`, if you figure out an easier way to accomplish the same thing, please share.


