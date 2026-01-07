import { getFunctions, httpsCallable } from "firebase/functions";
import type { Functions } from "firebase/functions";

export async function runUrlAnalyzer(functions: Functions, url: string) {
  const fn = httpsCallable(functions, "analyzeUrl");
  const result = await fn({ url });
  // The Firebase function returns a result with a `data` property.
  // We assume the report is nested inside, so we extract it.
  return (result.data as any).report;
}
