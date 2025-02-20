import { IProperty } from "@/models/Property";

export function convertToSerializableObject(
  leanDocument: Record<string, any>
): IProperty {
  for (const key of Object.keys(leanDocument)) {
    if (
      typeof leanDocument[key] === "object" &&
      leanDocument[key] !== null &&
      "toJSON" in leanDocument[key] &&
      "toString" in leanDocument[key]
    ) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }

  // Assert that the transformed object conforms to IPropertyLean
  return leanDocument as IProperty;
}
