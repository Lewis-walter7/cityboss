
import dns from 'node:dns';

// Targeted patch: Only force IPv4 for Uploadthing domains to fix connectivity
// while respecting the user's preference to keep IPv6 enabled for everything else.

const originalLookup = dns.lookup;

// @ts-ignore
dns.lookup = (hostname, options, callback) => {
    let opts: dns.LookupOptions = {};
    let cb = callback;

    if (typeof options === 'function') {
        cb = options;
        opts = {};
    } else if (typeof options === 'number') {
        opts = { family: options };
    } else if (!options) {
        opts = {};
    } else {
        opts = { ...options };
    }

    // Check if current hostname is related to Uploadthing
    if (typeof hostname === 'string' && hostname.includes('uploadthing.com')) {
        opts.family = 4;
    }

    // @ts-ignore
    return originalLookup(hostname, opts, cb);
};
