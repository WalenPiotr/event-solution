import fetch from "node-fetch";
import { CodeGen } from "swagger-typescript-codegen";
import * as fs from "fs";

const generate = async () => {
  const res = await fetch("http://localhost:4000/api-json");
  var swagger = await res.json();
  var tsSourceCode = CodeGen.getTypescriptCode({
    className: "API",
    swagger: swagger,
  });
  fs.mkdir("./src/generated", () => {
    console.log("> CREATED OUT DIR");
  });
  fs.writeFile("./src/generated/API.ts", tsSourceCode, () => {
    console.log("> GENERATED SUCCESSFULLY");
  });
};

generate();
