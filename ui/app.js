var IpfsHttpClient = require('ipfs-http-client');

async function onload() {
	ipfs = await IpfsHttpClient.create({url: "http://127.0.0.1:5001", timeout: "5m"});

	// try to get our peerid
	try {	
		me = await ipfs.id();
	} catch { // if we fail, try again in 1 second
		setTimeout(function(){onload()}, 1000);
		return;
	}

	document.getElementById("status").innerHTML = "Kubo node is running, PeerID: " + me.id.toString();
}