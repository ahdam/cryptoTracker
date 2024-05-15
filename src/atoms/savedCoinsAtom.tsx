import { atomWithStorage, createJSONStorage } from "jotai/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";

// create a storage instance with AsyncStorage
const storage = createJSONStorage(() => AsyncStorage) as any;
// create an atom with storage to persist the saved coins
export const savedCoinsAtom = atomWithStorage<string[]>(
  "saved-coins",
  [],
  storage
);
