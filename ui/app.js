var IpfsHttpClient = require('ipfs-http-client');
var ipfs = undefined;

/** Uses `URL.createObjectURL` free returned ObjectURL with `URL.RevokeObjectURL` when done with it.
 * 
 * @param {string} cid CID you want to retrieve
 * @param {string} mime mimetype of image
 * @param {number} limit size limit of image in bytes
 * @returns ObjectURL
 */
async function loadImgURL(cid, mime, limit) {
	if (cid == "" || cid == null || cid == undefined) {
		return;
	}
	const content = [];
	for await (const chunk of ipfs.cat(cid, {length:limit})) {
		content.push(chunk);
	}
	return URL.createObjectURL(new Blob(content, {type: mime}));
}

async function setImage() {
    document.getElementById("myImage").src = await loadImgURL("Qmcm32sVsMYhURY3gqH7vSQ76492t5Rfxb3vsWCb35gVme", "image/png", 524288);
}

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
	setImage();
}