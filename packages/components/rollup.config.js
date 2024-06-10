import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";

const { PRODUCTION } = process.env;

export default {
  input: "src/index.ts",
  output: {
    file: "dist/index.js",
    globals: {
      react: "React",
      "react-dom": "ReactDOM",
    },
  },
  external: ["react", "react-dom"],
  plugins: [
    commonjs(),
    typescript(),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-react"],
      babelHelpers: "bundled",
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(PRODUCTION ? "production" : "development"),
      preventAssignment: true,
    }),
  ],
};
