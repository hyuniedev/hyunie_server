import { Llama } from "node-llama-cpp";

try {
  const llama = new Llama({ buildGpu: false });
  console.log("✅ Llama instance created successfully");
} catch (err) {
  console.error("❌ Failed to load Llama bindings");
  console.error(err);
}
