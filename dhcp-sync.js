function syncLease(server) {
    if (!server) {
        console.log("Invalid DHCP server data received");
        return;
    }

    console.log(server.toUpperCase());
    console.log(`Lease synchronized for ${server}`);
}

syncLease();