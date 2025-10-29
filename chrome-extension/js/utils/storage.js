// Quota-safe chrome.storage helper with simple LRU eviction

const INDEX_KEY = 'storage_index';

function nowTs() {
	return Date.now();
}

async function readIndex() {
	try {
		const { [INDEX_KEY]: index } = await chrome.storage.local.get(INDEX_KEY);
		return index && typeof index === 'object' ? index : { lastAccess: {} };
	} catch {
		return { lastAccess: {} };
	}
}

async function writeIndex(index) {
	try {
		await chrome.storage.local.set({ [INDEX_KEY]: index });
	} catch {
		// ignore index write failures
	}
}

async function touchKey(key) {
	const index = await readIndex();
	index.lastAccess[key] = nowTs();
	await writeIndex(index);
}

function pickEvictionCandidates(index, priorities) {
	const entries = Object.entries(index.lastAccess);
	// Sort by time asc (oldest first)
	entries.sort((a, b) => (a[1] || 0) - (b[1] || 0));
	// Prioritize by key prefix if provided
	if (Array.isArray(priorities) && priorities.length) {
		entries.sort((a, b) => {
			const ap = priorities.findIndex(p => a[0].startsWith(p));
			const bp = priorities.findIndex(p => b[0].startsWith(p));
			return (ap === -1 ? priorities.length : ap) - (bp === -1 ? priorities.length : bp);
		});
	}
	return entries.map(e => e[0]);
}

async function evictSome(priorities) {
	const index = await readIndex();
	const candidates = pickEvictionCandidates(index, priorities);
	// Remove up to 5 keys per attempt
	const toRemove = candidates.slice(0, 5);
	if (toRemove.length === 0) return false;
	await chrome.storage.local.remove(toRemove);
	toRemove.forEach(k => delete index.lastAccess[k]);
	await writeIndex(index);
	return true;
}

const storage = {
	async get(keys) {
		const result = await chrome.storage.local.get(keys);
		if (Array.isArray(keys)) {
			await Promise.all(keys.map(k => touchKey(k)));
		} else if (typeof keys === 'string') {
			await touchKey(keys);
		} else if (typeof keys === 'object' && keys !== null) {
			await Promise.all(Object.keys(keys).map(k => touchKey(k)));
		}
		return result;
	},

	async setSafe(obj, priorities = []) {
		try {
			await chrome.storage.local.set(obj);
			await Promise.all(Object.keys(obj).map(k => touchKey(k)));
			return true;
		} catch (error) {
			const message = String(error && error.message || error || '');
			if (!message.includes('QUOTA') && !message.includes('MAX_BYTES') && !message.includes('MAX_WRITE_OPERATIONS')) {
				throw error;
			}
			// Try eviction and retry once
			const evicted = await evictSome(priorities);
			if (!evicted) throw error;
			await chrome.storage.local.set(obj);
			await Promise.all(Object.keys(obj).map(k => touchKey(k)));
			return true;
		}
	}
};

export default storage;


