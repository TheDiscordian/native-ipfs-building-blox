async function setImage() {
	let myImage = document.getElementById("myImage");
	myImage.src = await loadImgURL("Qmcm32sVsMYhURY3gqH7vSQ76492t5Rfxb3vsWCb35gVme", "image/png", 524288);
	myImage.onload = function() {
		URL.revokeObjectURL(myImage.src); // free memory
	}
}

async function onload() {
	await INIT_IPFS();

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