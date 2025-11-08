import { type Zen, get, subscribe } from "@sylphx/zen";
import { useEffect, useState } from "preact/hooks";

export function useStore<T>(store: Zen<T>): T {
	const [value, setValue] = useState<T>(get(store));

	useEffect(() => {
		setValue(get(store));
		return subscribe(store, setValue);
	}, [store]);

	return value;
}
