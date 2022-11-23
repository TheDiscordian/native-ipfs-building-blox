var ipfs = undefined;
var IPFS_API_PORT = -1;
var IPFS_SWARM_PORT = -1;

async function INIT_IPFS() {
	IPFS_API_PORT = await __TAURI__.invoke('get_api_port');
	IPFS_SWARM_PORT = await __TAURI__.invoke('get_swarm_port');

	ipfs = await IpfsHttpClient.create({url: "http://127.0.0.1:"+IPFS_API_PORT.toString(), timeout: "5m"});
}

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