function syncLease(server) {
    if (!server) {
        throw new Error("Server not found");
    }

    console.log(`Lease synchronized for ${server}`);
}

syncLease("Reliance-DHCP-Node");