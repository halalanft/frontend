import commonjs from '@rollup/plugin-commonjs';
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import rust from "@wasm-tool/rollup-plugin-rust";
import injectProcessEnv from "rollup-plugin-inject-process-env";
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { getEnv } from "./rollup.common.js";
export default {
    input: {
        index: "./Cargo.toml",
    },
    output: {
        dir: "devhtml/js",
        format: "es",
        sourcemap: true,
        chunkFileNames: "[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash][extname]",
    },
    plugins: [
        json(),
        rust({
            serverPath: "/js/",
            debug: false,
            verbose: true
        }),
        nodeResolve({
            browser: true,
            preferBuiltins: true,
        }),

        commonjs(),
        
        nodePolyfills(),
        
        injectProcessEnv(getEnv()),
    ],
    
    preserveEntrySignatures: false,
};