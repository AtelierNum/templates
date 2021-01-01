//state-"store"
let isAlreadyCalling = false;
let getCalled = false;

let localStream = null;

const peers = {
	//<remoteSocketId>:<RTCPeerConnection>
}

async function getPeerConnection(socketId){
	if(peers[socketId]){
		return peers[socketId];
	}

	peers[socketId] = new RTCPeerConnection()

	peers[socketId].ontrack = function(rtcTrackEvent) {
		console.dir(peers);
		if(rtcTrackEvent.track.kind == "video"){
			addVideoContainer(socketId,rtcTrackEvent.streams[0]);
		}
	};

	const stream = await getLocalMediaStream();
	stream.getTracks().forEach(track => peers[socketId].addTrack(track, stream));
	
	return peers[socketId];
}

async function getLocalMediaStream(){
	if(localStream){
		return localStream;
	}

	const stream = await navigator.mediaDevices.getUserMedia({video:true, audio: true});
	localStream = stream;
	return stream;
}

//actuall RTC work
const { RTCPeerConnection, RTCSessionDescription } = window;

//media accessing and manipulation
getLocalMediaStream().then(function(stream) {
	const localVideo = document.getElementById("local-video");
	if (localVideo) {
		localVideo.srcObject = stream;
	}

	// stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
	
})
.catch(function(err) {
	console.error(err);
});

async function callUser(socketId) {
	const peerConnection = await getPeerConnection(socketId)
	const offer = await peerConnection.createOffer();
	await peerConnection.setLocalDescription(new RTCSessionDescription(offer));
	
	socket.emit("call-user", {
		offer,
		to: socketId
	});
}

//socket stuff
var socket = io();

socket.on("update-user-list", ({ users }) => {
	updateUserList(users);
});
	
socket.on("remove-user", ({ socketId }) => {
	const elToRemove = document.getElementById(socketId);
	
	if (elToRemove) {
		elToRemove.remove();
	}
});

socket.on("call-made", async data => {
  const peerConnection = await getPeerConnection(data.socket)
  await peerConnection.setRemoteDescription(
    new RTCSessionDescription(data.offer)
  );
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(new RTCSessionDescription(answer));

  socket.emit("make-answer", {
    answer,
    to: data.socket
  });
  getCalled = true;
});

socket.on("answer-made", async data => {
	const peerConnection = await getPeerConnection(data.socket)
	await peerConnection.setRemoteDescription(
		new RTCSessionDescription(data.answer)
	);
		
	callUser(data.socket);
});

socket.on("call-rejected", data => {
  alert(`User: "Socket: ${data.socket}" rejected your call.`);
  unselectUsersFromList();
});

//mostly UI
function updateUserList(socketIds) {
	const activeUserContainer = document.getElementById("active-user-container");
	
	socketIds.forEach(socketId => {
		const alreadyExistingUser = document.getElementById(socketId);
		if (!alreadyExistingUser) {
			const userContainerEl = createUserItemContainer(socketId);
			activeUserContainer.appendChild(userContainerEl);
		}
	});
}

function createUserItemContainer(socketId) {
	const userContainerEl = document.createElement("div");
	
	const usernameEl = document.createElement("p");
	
	userContainerEl.setAttribute("class", "active-user");
	userContainerEl.setAttribute("id", socketId);
	usernameEl.setAttribute("class", "username");
	usernameEl.innerHTML = `Socket: ${socketId}`;
	
	userContainerEl.appendChild(usernameEl);
	
	userContainerEl.addEventListener("click", () => {
		unselectUsersFromList();
		userContainerEl.setAttribute("class", "active-user active-user--selected");
		const talkingWithInfo = document.getElementById("talking-with-info");
		talkingWithInfo.innerHTML = `Talking with: "Socket: ${socketId}"`;
		callUser(socketId);
	}); 
	return userContainerEl;
}

function unselectUsersFromList() {
  const alreadySelectedUser = document.querySelectorAll(
    ".active-user.active-user--selected"
  );

  alreadySelectedUser.forEach(el => {
    el.setAttribute("class", "active-user");
  });
}

function addVideoContainer(peerSocketId, srcObj){
	const vcContainer = document.getElementsByClassName("video-chat-container")[0];

	const newVCContainer = document.createElement("video");
	newVCContainer.setAttribute("autoplay", "true");
	newVCContainer.setAttribute("class","remote-video");
	newVCContainer.setAttribute("id",peerSocketId);
	newVCContainer.srcObject = srcObj;

	vcContainer.appendChild(newVCContainer);
}